const Section = require('../models/Section');
const Course = require('../models/Course');
const SubSection = require('../models/SubSection');

exports.createSection = async (req, res) => {
  try {
    //data fetch
    const { sectionName, courseId } = req.body;
    //data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'Missing Properties',
      });
    }
    //create section
    const newSection = await Section.create({ sectionName });
    //update course with section ObjectID
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: newSection._id },
      },
      { new: true }
    )
      .populate({
        path: 'courseContent',
        populate: {
          path: 'subSection',
        },
      })
      .exec();

    res.status(200).json({
      success: true,
      message: 'Section created successfully',
      updatedCourseDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to create section please try again ',
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    //data input
    const { sectionName, sectionId, courseId } = req.body;
    //data validation
    // if (!sectionName || !sectionId) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Missing Properties',
    //   });
    // }
    //update data
    console.log(sectionId, sectionName, 'im here');
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName,
      },
      { new: true }
    );
    // const course = await Course.findById(courseId)
    //   .populate({
    //     path: 'courseContent',
    //     populate: {
    //       path: 'subSection',
    //     },
    //   })
    //   .exec();
    //return response
    res.status(200).json({
      success: true,
      message: updatedSection,
      // data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to update section please try again ',
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;
    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: sectionId,
      },
    });
    const section = await Section.findById(sectionId);
    // console.log(sectionId, courseId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Section not found',
      });
    }
    // Delete the associated subsections
    await SubSection.deleteMany({ _id: { $in: section.subSection } });

    await Section.findByIdAndDelete(sectionId);

    // find the updated course and return it
    const course = await Course.findById(courseId)
      .populate({
        path: 'courseContent',
        populate: {
          path: 'subSection',
        },
      })
      .exec();

    res.status(200).json({
      success: true,
      message: 'Section deleted',
      data: course,
    });
  } catch (error) {
    console.error('Error deleting section:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
