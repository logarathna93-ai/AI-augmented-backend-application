const express = require("express");

const {
  createTag,
  getTags
} = require("../controllers/tagController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

// Create Tag
router.post(
  "/create",
  protect,
  authorizeRoles("Admin", "Editor"),
  createTag
);

// Get All Tags
router.get("/", getTags);

module.exports = router;