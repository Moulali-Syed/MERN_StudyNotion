const { instance } = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const {
  courseEnrollmentEmail,
} = require('../mail/templates/courseEnrollmentEmail');
const mongoose = require('mongoose');
const crypto = require('crypto');
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessful');
const CourseProgress = require('../models/CourseProgress');

//capture payment and initiate razorpay order
exports.capturePayment = async (req, res) => {
  try {
    //get courseId and userId
    const { courseId } = req.body;
    const userId = req.user.id;
    //validation
    //valid courseId
    if (!courseId) {
      return res.json({
        success: false,
        message: 'Please provide valid course id',
      });
    }
    //valid courseDetail
    let course;
    try {
      course = await Course.findById(courseId);
      if (!course) {
        return res
          .status(404)
          .json({ success: false, message: 'couldnot find the course' });
      }

      //user already pay for same course
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: 'Student is already enrolled' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
    //order create
    const amount = course.price;
    const currency = 'INR';
    const options = {
      amount: amount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseId,
        userId,
      },
    };

    try {
      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);

      return res.status(200).json({
        success: true,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbNail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifySignature = async (req, res) => {
  const webhookSecret = '123456789';
  const signature = req.headers('x-razorpay-signature');

  //below 3 steps , helps to convert the webhooksecret to a digest
  const shasum = crypto.createHmac('sha256', webhookSecret);
  shasum.update(JSON.stringify(shasum));
  const digest = shasum.digest();

  //now match digest and signature
  if (signature === digest) {
    console.log('payment is authorised');
    //bacche ko course mey enroll karo (hamne userId,courseId - pass kiye they notes mey
    // capturePayments -> options mey)
    const { courseId, userId } = req.body.payload.payment.entity.notes;
    try {
      //find the course and enroll student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, message: 'Course not found' });
      }

      console.log(enrolledCourse);

      //find the student and add course to list of enrolled courses
      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );

      console.log(enrolledStudent);

      //mail send karo confirmation ka
      const emailResponse = await mailSender(
        enrolledStudent.email,
        'Welcome to new learning',
        'Congratulation You are enrolled to Course'
      );

      return res.status(200).json({
        success: true,
        message: 'Signature verified and course added',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid request',
    });
  }
};

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide all the details' });
  }

  try {
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log('error in sending mail', error);
    return res
      .status(400)
      .json({ success: false, message: 'Could not send email' });
  }
};

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: 'Please Provide Course ID and User ID',
    });
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnroled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: 'Course not found' });
      }
      console.log('Updated course: ', enrolledCourse);

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      });
      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      );

      console.log('Enrolled student: ', enrolledStudent);
      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      );

      console.log('Email sent successfully: ', emailResponse.response);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: error.message });
    }
  }
};
