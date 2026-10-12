const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

// Create Comment
const createComment = async (req, res) => {
  try {
    const { postID, comment } = req.body;

    const userID = req.user.id;

    if (!postID || !comment) {
      return res.status(400).json({
        message: "postID and comment are required"
      });
    }

    const post = await Post.findById(postID);

    if (!post) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    const newComment = await Comment.create({
      postID,
      userID,
      comment
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add comment",
      error: error.message
    });
  }
};

// Get Comments for a Blog
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      postID: req.params.postID
    })
      .populate("userID", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Comments fetched successfully",
      comments
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch comments",
      error: error.message
    });
  }
};

module.exports = {
  createComment,
  getComments
};