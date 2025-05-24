const CodeSnippet = require("../models/CodeSnippet");
const smellServcice = require("../services/smellService");
const util = require("../utils/util");


async function createCodeSnippet(code, language, smells) {
  const validationError = util.validateCodeSnippetData(code, language, smells);
  if (validationError) {
    return validationError;
  }
  try {
    const analyzedCodeSnippet = new CodeSnippet({
      code: code,
      language: language,
      detectedSmells: smells,
    });
    await analyzedCodeSnippet.save();
    console.log("New code snippet added successfully");
    return analyzedCodeSnippet;
  } catch (err) {
    console.error("Error saving code to database:", err);
    throw err;
  }
}

async function getCodeHistory(_, res) {
  try {
    const codeSnippetHistory = await CodeSnippet.find().sort({ createdAt: -1 });
    res.status(200).json(codeSnippetHistory);
  } catch (err) {
    res.status(500).json({
      error: "Failed to retrieve code snippet history.",
      details: err.message,
    });
  }
}

async function getCodeHistoryByID(req, res) {
  const codeSnippetID = req.params.snippetID;

  try {
    const choosenSnippet = await CodeSnippet.findById(codeSnippetID);

    if (!choosenSnippet) {
      return res
        .status(404)
        .json({ message: `Snippet with ID ${codeSnippetID} not found` });
    }
    res.status(200).json({ message: `Snippet ${codeSnippetID} found` });
    return choosenSnippet;
  } catch (err) {
    res.status(500).json({
      error: `Failed to find code snippet ${codeSnippetID}`,
      details: err.message,
    });
  }
}

async function deleteCodeSnippet(req, res) {
  const codeSnippetID = req.params.snippetID;

  try {
    const deletedSnippet = await CodeSnippet.findByIdAndDelete(codeSnippetID);

    if (!deletedSnippet) {
      return res
        .status(404)
        .json({ message: `Snippet with ID ${codeSnippetID} not found` });
    }

    res
      .status(200)
      .json({ message: `Snippet ${codeSnippetID} deleted successfully` });
  } catch (err) {
    res.status(500).json({
      error: `Failed to delete code snippet ${codeSnippetID}`,
      details: err.message,
    });
  }
}

async function analyzeCode(req, res) {
  const { code, language } = req.body;

  if (!code || typeof code !== "string" || code.trim() === "") {
    return res.status(400).json({
      error: "Code snippet is required and must be a non-empty string.",
    });
  }

  try {
    const detectedSmells = await smellServcice.detectSmells(code, language);
    const saved = await createCodeSnippet(code, language, detectedSmells);
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to analyze code snippet", details: err.message });
  }
}

module.exports = {
  getCodeHistory,
  getCodeHistoryByID,
  analyzeCode,
  deleteCodeSnippet,
};
