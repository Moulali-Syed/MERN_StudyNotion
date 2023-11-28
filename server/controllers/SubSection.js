const Section = require('../models/Section');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

//create subSection
exports.createSubSection = async (req, res) => {
  try {
    //get data from req body
    //extract file/video
    //validation
    //upload video to cloudinary , get secure_url
    //create subSection and insert its id to Section
    //return response
    const { title, timeDuration, description, sectionId } = req.body;
    const video = req.files.videoFile;
    if (!title || !timeDuration || !description || !sectionId || !video) {
      return res.status(400).json({
        success: false,
        message: 'all fields are required',
      });
    }

    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.CLOUDINARY_FOLDER_NAME
    );
    const subSection = await SubSection.create({
      title,
      timeDuration,
      description,
      videoUrl: uploadDetails.secure_url,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: subSection._id,
        },
      },
      { new: true }
    ).populate('subSection');
    res.status(200).json({
      success: true,
      message: 'subsection created successfully',
      data: updatedSection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating sub section',
      error: error.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body;
    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: 'SubSection not found',
      });
    }

    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    await subSection.save();

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      'subSection'
    );

    console.log('updated section', updatedSection);

    return res.json({
      success: true,
      message: 'Section updated successfully',
      data: updatedSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating the section',
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );
    const subSection = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: 'SubSection not found' });
    }

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      'subSection'
    );

    return res.json({
      success: true,
      message: 'SubSection deleted successfully',
      data: updatedSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the SubSection',
    });
  }
};
