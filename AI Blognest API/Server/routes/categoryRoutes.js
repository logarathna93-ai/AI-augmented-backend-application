const express = require("express");

const {
  createCategory,
  getCategories
} = require("../controllers/categoryController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

// Create Category
router.post(
  "/create",
  protect,
  authorizeRoles("Admin", "Editor"),
  createCategory
);

// Get All Categories
router.get("/", getCategories);

module.exports = router;