const CodeSnippet = require("../models/CodeSnippet");

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

async function createCodeSnippet(req, res) {
  const { newCode } = req.body;

  try {
    const newCodeSnippet = new CodeSnippet({ newCode });
    const savedNewSnippet = await newCodeSnippet.save();
    res.status(201).json(savedNewSnippet);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to save code snippet", details: err.message });
  }
}

async function deleteCodeSnippet(req, res) {
    const codeSnippetID = req.params.id;

    try {
      await CodeSnippet.findByIdAndDelete(codeSnippetID);
      res.status(204).json(`Snippet ${codeSnippetID} deleted`);
    } catch (err) {
      res.status(500).json({
        error: `Failed to delete code snipper ${codeSnippetID}`,
        details: err.message,
      });
    }
}

module.exports = {
    getCodeHistory,
    createCodeSnippet,
    deleteCodeSnippet
}