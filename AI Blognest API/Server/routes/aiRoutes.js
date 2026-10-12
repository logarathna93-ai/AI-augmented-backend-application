const express = require("express");

const {
  generateBlog,
  summarizeBlog
} = require("../controllers/aiController");

const router = express.Router();

router.post("/generate-blog", generateBlog);

router.post("/summarize", summarizeBlog);

module.exports = router;