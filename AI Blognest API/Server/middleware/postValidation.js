const { body } = require("express-validator");

const createPostValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Blog name is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Blog name must be between 3 and 200 characters"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Blog message is required")
    .isLength({ min: 10 })
    .withMessage("Blog message must be at least 10 characters")
];

module.exports = {
  createPostValidation
};