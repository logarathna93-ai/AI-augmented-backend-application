const express = require("express");

const {
  createComment,
  getComments
} = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Add Comment
router.post(
  "/create",
  protect,
  createComment
);

// Get Comments for a Blog
router.get(
  "/:postID",
  getComments
);

module.exports = router;