/*
reset password flow:

    hamm mail id provide karenge , kahenge hamey password reset karna hai

    Hamey aik link milega apne mail id par ,a link hamey frontend par
    aik page par le jaayega , yaha ham naya password provide kartey
    hai , aur a db mey update ho jaatha hai
*/

const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    //check for email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: `Your email ${email} is not registered with us`,
      });
    }
    //generate token
    const token = crypto.randomBytes(20).toString('hex');
    //update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    );
    //generate a link
    const url = `http://localhost:5173/update-password/${token}`;
    //send a mail containing url
    await mailSender(email, 'Password Reset', `Password Reset link: ${url}`);

    res.status(200).json({
      success: true,
      message:
        'Email sent successfully, Please check email and change password',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while sending reset password mail',
    });
  }
};
//resetPassword
exports.resetPassword = async (req, res) => {
  try {
    //token,password,resetPassword fetch data
    const { password, confirmPassword, token } = req.body;
    //validation
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'password and confirm password must be same',
      });
    }
    //get user details from db using token
    const userDetails = await User.findOne({ token });
    //if no entry - invalid token
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: 'Token is Invalid',
      });
    }
    //token time check
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: 'Token is expired Please regenerate token',
      });
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //update password
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );
    //return response
    res
      .status(200)
      .json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while resetting password',
    });
  }
};
