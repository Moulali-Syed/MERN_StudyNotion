const User = require('../models/User');
const OTP = require('../models/Otp');
const Profile = require('../models/Profile');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
const { passwordUpdated } = require('../mail/templates/passwordUpdate');
require('dotenv').config();

//sendOTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body; //fetch email from req body
    const checkUserPresence = await User.findOne({ email });

    if (checkUserPresence) {
      return res
        .status(401)
        .json({ success: 'false', message: 'email already registered' });
    }

    //we have otp-generator package
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log('otp generated ' + otp);

    //check unique otp or not
    let result = await OTP.findOne({ otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    }
    console.log(email, otp);
    const otpBody = await OTP.create({ email, otp });

    res
      .status(200)
      .json({ success: true, message: 'OTP sent successfully', data: otpBody });
  } catch (error) {
    console.log('error in sendOTP ' + error);
    res.status(500).json({ error: error });
  }
};
//signUp
exports.signup = async (req, res) => {
  try {
    //data fetch from req body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;
    //validate
    if (!firstName || !lastName || !password || !confirmPassword || !email) {
      return res
        .status(400)
        .json({ success: false, message: 'all fields are required' });
    }
    //validate 2 password
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'password and confirm password value doesnot match Try Again!',
      });
    }
    //check email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'email already registered Please sign in',
      });
    }
    //validate the otp in db(get most recent)
    const recentOTP = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log('recentOTP', recentOTP);
    if (!recentOTP) {
      return res.status(400).json({ success: false, message: 'otp not valid' });
    } else if (otp != recentOTP.otp) {
      console.log(recentOTP.otp);
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let approved = '';
    approved === 'Instructor' ? (approved = false) : (approved = true);
    //create entry in DB
    const profile = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      approved: approved,
      additionalDetails: profile._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
    });
    //return res
    console.log(user);
    res.status(200).json({
      success: true,
      message: 'User is registered successfully',
      user,
    });
  } catch (error) {
    console.log(error + 'error in signup');

    res.status(500).json({
      success: false,
      message: 'user cannot be registered Please try again',
    });
  }
};
//Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email })
      .populate('additionalDetails')
      .exec();
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: 'email doesnot exist Please Register',
      });
    }

    if (await bcrypt.compare(password, existingUser.password)) {
      const payload = {
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });

      existingUser.token = token;
      existingUser.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie('token', token, options).status(200).json({
        success: true,
        token,
        user: existingUser,
        message: 'user logged in successfully',
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'password is incorrect',
      });
    }
  } catch (error) {
    console.log(error + 'error in login');

    res.status(500).json({
      success: false,
      message: 'Login Failure Please try again',
    });
  }
};
//changePassword

exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id);

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body;

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: 'The password is incorrect' });
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        'Password for your account has been updated',
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      console.log('Email sent successfully:', emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error('Error occurred while sending email:', error);
      return res.status(500).json({
        success: false,
        message: 'Error occurred while sending email',
        error: error.message,
      });
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error('Error occurred while updating password:', error);
    return res.status(500).json({
      success: false,
      message: 'Error occurred while updating password',
      error: error.message,
    });
  }
};
