const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
      trim: true
    },

    fileType: {
      type: String,
      required: true,
      trim: true
    },

    fileUrl: {
      type: String,
      required: true,
      trim: true
    },

    fileSize: {
      type: Number,
      default: 0
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Media", mediaSchema);