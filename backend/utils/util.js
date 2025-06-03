function validateCodeSnippetData(code, language, smells) {
    if (!code || !language || !smells) {
      return "Missing required arguments.";
    }
    if (typeof code !== "string" || code.trim() === "" || typeof language !== "string" || language.trim() === "" || typeof smells !== "object" || smells === null || Array.isArray(smells)) {
      return "Invalid argument types or format.";
    }
    return null;
  }

  exports.validateCodeSnippetData = validateCodeSnippetData;