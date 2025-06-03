const mongoose = require("mongoose");

const CodeSnippetSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true
  },
  detectedSmells: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CodeSnippet", CodeSnippetSchema);
