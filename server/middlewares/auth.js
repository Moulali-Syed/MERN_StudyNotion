const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

//auth
exports.auth = async (req, res, next) => {
  try {
    //extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'token is missing' });
    }

    //verify token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      //verification issue
      return res
        .status(401)
        .json({ success: false, message: 'token is invalid' });
    }
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Something went wrong while validating the token',
    });
  }
};
//isStudent
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== 'Student') {
      return res.status(404).json({
        success: false,
        message: 'This is a protected route for students only',
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User role cannot be verified,please try again',
    });
  }
};
//isInstructor
exports.isInstructor = async (req, res, next) => {
  console.log(req.user.role);
  try {
    if (req.user.role !== 'Instructor') {
      return res.status(404).json({
        success: false,
        message: 'This is a protected route for Instructor only',
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User role cannot be verified,please try again',
    });
  }
};
//isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(404).json({
        success: false,
        message: 'This is a protected route for Admin only',
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User role cannot be verified,please try again',
    });
  }
};
