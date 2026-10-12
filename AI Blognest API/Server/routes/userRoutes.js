const express = require("express");

const {
  registerUser,
  loginUser
} = require("../controllers/userController");

const {
  registerValidation,
  loginValidation
} = require("../middleware/userValidation");

const { validate } = require("../middleware/validationMiddleware");

const router = express.Router();

// Register
router.post(
  "/register",
  registerValidation,
  validate,
  registerUser
);

// Login
router.post(
  "/login",
  loginValidation,
  validate,
  loginUser
);

module.exports = router;