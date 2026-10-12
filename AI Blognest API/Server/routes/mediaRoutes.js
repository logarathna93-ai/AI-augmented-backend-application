const express = require("express");

const {
  createMedia,
  getMedia
} = require("../controllers/mediaController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

// Create Media Metadata
router.post(
  "/create",
  protect,
  authorizeRoles("Admin", "Editor", "Author"),
  createMedia
);

// Get All Media
router.get(
  "/",
  protect,
  getMedia
);

module.exports = router;