const Media = require("../models/mediaModel");

// Create Media Metadata
const createMedia = async (req, res) => {
  try {
    const {
      filename,
      fileType,
      fileUrl,
      fileSize
    } = req.body;

    const uploadedBy = req.user.id;

    if (!filename || !fileType || !fileUrl) {
      return res.status(400).json({
        message: "filename, fileType and fileUrl are required"
      });
    }

    const media = await Media.create({
      filename,
      fileType,
      fileUrl,
      fileSize: fileSize || 0,
      uploadedBy
    });

    res.status(201).json({
      message: "Media metadata created successfully",
      media
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create media metadata",
      error: error.message
    });
  }
};

// Get All Media
const getMedia = async (req, res) => {
  try {
    const media = await Media.find()
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Media fetched successfully",
      media
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch media",
      error: error.message
    });
  }
};

module.exports = {
  createMedia,
  getMedia
};