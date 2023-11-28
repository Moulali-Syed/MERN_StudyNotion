const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

//send verification mail
async function sendVerificationEmail(email, otp) {
  try {
    const mailSent = await mailSender(
      email,
      'Verfication Email from LMS - Moula Ali',
      otp
    );
    // console.log('mail sent successfully ', mailSent);
  } catch (error) {
    console.log('error occured while sending email' + error);
    throw error;
  }
}

otpSchema.pre('save', async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model('OTP', otpSchema);
