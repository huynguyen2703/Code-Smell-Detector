const mongoose = require("mongoose");

const CodeSnippetSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  detectedSmells: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CodeSnippet", CodeSnippetSchema);
