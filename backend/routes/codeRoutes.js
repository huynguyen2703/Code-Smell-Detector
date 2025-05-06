const express = require("express");
const router = express.Router();
const CodeSnippet = require("../controllers/codeController");

router.get("/code-smell-detector/history", codeController.getCodeHistory);

router.post("/code-smell-detector/code", codeController.createCode);

router.delete("/code-smell-detector/history/:snippetID", codeController.deleteCode);

module.exports = router;

  
