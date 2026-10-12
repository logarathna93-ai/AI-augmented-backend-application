const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate Blog
const generateBlog = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({
        message: "Topic is required"
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash"
    });

    const prompt = `
Write a high-quality blog post about "${topic}".

Include:
- A clear title
- Introduction
- Main sections with headings
- Useful and informative content
- Conclusion

Return only the blog content.
`;

    let result;
let lastError;

for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    result = await model.generateContent(prompt);
    break;
  } catch (error) {
    lastError = error;

    if (attempt < 3 && error.message.includes("503")) {
      await new Promise(resolve => setTimeout(resolve, attempt * 2000));
    } else {
      throw error;
    }
  }
}

if (!result) {
  throw lastError;
}
    const response = await result.response;
    const blog = response.text();

    res.status(200).json({
      message: "Blog generated successfully",
      topic,
      blog
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      message: "Failed to generate blog",
      error: error.message
    });
  }
};


// Summarize Blog
const summarizeBlog = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        message: "Blog content is required"
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash"
    });

    const prompt = `
Summarize the following blog content clearly and briefly:

${content}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    res.status(200).json({
      message: "Blog summarized successfully",
      summary
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      message: "Failed to summarize blog",
      error: error.message
    });
  }
};


module.exports = {
  generateBlog,
  summarizeBlog
};