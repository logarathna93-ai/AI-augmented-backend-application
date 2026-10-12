const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const { errorHandler } = require("./middleware/errorMiddleware");
const logger = require("./utils/logger");
require("dotenv").config();

const app = express();

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const aiRoutes = require("./routes/aiRoutes");
const adminRoutes = require("./routes/adminRoutes");
const commentRoutes = require("./routes/commentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const tagRoutes = require("./routes/tagRoutes");
const mediaRoutes = require("./routes/mediaRoutes");

app.use((req, res, next) => {
  console.log("Request:", req.method, req.originalUrl);

  res.on("finish", () => {
    console.log("Status:", res.statusCode);
  });

  next();
});

app.use(cors());
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many requests. Please try again later."
  }
});

app.use("/api/", apiLimiter);

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/media", mediaRoutes);

app.use(errorHandler);
// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/blognest")
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error ❌", error);
  });

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "AI BlogNest API is running 🚀"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info("AI BlogNest API started", {
    port: PORT
  });
});