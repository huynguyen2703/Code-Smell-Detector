const express = require("express");
const router = express.Router();
const codeController = require("../controllers/codeController")

router.get("/code-smell-detector/history", codeController.getCodeHistory);

router.post("/code-smell-detector/analyze", codeController.analyzeCode);

router.get("/code-smell-detector/history/:snippetID", codeController.getCodeHistoryByID);

router.delete("/code-smell-detector/history/delete/:snippetID", codeController.deleteCodeSnippet);


module.exports = router;

  
