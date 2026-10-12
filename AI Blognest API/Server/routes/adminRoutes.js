const express = require("express");

const {
  getAllUsers,
  changeUserRole
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

// Admin can view all users
router.get(
  "/users",
  protect,
  authorizeRoles("Admin"),
  getAllUsers
);

// Admin can change user roles
router.put(
  "/users/:userId/role",
  protect,
  authorizeRoles("Admin"),
  changeUserRole
);

module.exports = router;