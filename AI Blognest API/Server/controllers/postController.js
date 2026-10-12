const Post = require("../models/postModel");

// Create Blog/Post
const createPost = async (req, res) => {
  try {
    const { name, photo, message, categoryID, tags } = req.body;

    // User ID comes from the verified JWT token
    const userID = req.user.id;

    if (!name || !message) {
      return res.status(400).json({
        message: "name and message are required"
      });
    }

    const post = await Post.create({
      userID,
      name,
      photo: photo || "",
      message,
      categoryID: categoryID || null,
      tags: tags || []
    });

    res.status(201).json({
      message: "Blog created successfully",
      post
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create blog",
      error: error.message
    });
  }
};

// Get All Blogs/Posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("categoryID", "name description")
      .populate("tags", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Blogs fetched successfully",
      posts
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch blogs",
      error: error.message
    });
  }
};

// Update Blog/Post
const updatePost = async (req, res) => {
  try {
    const {
      name,
      photo,
      message,
      categoryID,
      tags
    } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    // Only the owner or Admin/Editor can update
    if (
      post.userID.toString() !== req.user.id &&
      req.user.role !== "Admin" &&
      req.user.role !== "Editor"
    ) {
      return res.status(403).json({
        message: "You do not have permission to update this blog"
      });
    }

    post.name = name || post.name;
    post.photo = photo !== undefined ? photo : post.photo;
    post.message = message || post.message;

    if (categoryID !== undefined) {
      post.categoryID = categoryID || null;
    }

    if (tags !== undefined) {
      post.tags = tags;
    }

    await post.save();

    res.status(200).json({
      message: "Blog updated successfully",
      post
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update blog",
      error: error.message
    });
  }
};

// Delete Blog/Post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    // Only the owner or Admin/Editor can delete
    if (
      post.userID.toString() !== req.user.id &&
      req.user.role !== "Admin" &&
      req.user.role !== "Editor"
    ) {
      return res.status(403).json({
        message: "You do not have permission to delete this blog"
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Blog deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete blog",
      error: error.message
    });
  }
};
// Search Blogs
const searchPosts = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({
        message: "Search keyword is required"
      });
    }

    const posts = await Post.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { message: { $regex: keyword, $options: "i" } }
      ]
    })
      .populate("categoryID", "name description")
      .populate("tags", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Search completed successfully",
      count: posts.length,
      posts
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to search blogs",
      error: error.message
    });
  }
};
module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  searchPosts
};