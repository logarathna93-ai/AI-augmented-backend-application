const express = require("express");

const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  searchPosts
} = require("../controllers/postController");

const { createPostValidation } = require("../middleware/postValidation");
const { validate } = require("../middleware/validationMiddleware");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

// Create Blog
router.post(
  "/create",
  protect,
  authorizeRoles("Admin", "Editor", "Author","User"),
  createPostValidation,
  validate,
  createPost
);

// Get All Blogs
router.get("/", getPosts);

// Search Blogs
router.get("/search", searchPosts);

// Update Blog
router.put(
  "/:id",
  protect,
  authorizeRoles("Admin", "Editor", "Author"),
  updatePost
);

// Delete Blog
router.delete(
  "/:id",
  protect,
  authorizeRoles("Admin", "Editor", "Author"),
  deletePost
);

module.exports = router;