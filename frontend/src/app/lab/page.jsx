"use client";

import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { csharp } from "@replit/codemirror-lang-csharp";
import { dracula } from "@uiw/codemirror-theme-dracula";

export default function LabPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'done'
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");

  const handleAnalyze = async () => {
    setError(null);

    if (!code.trim()) {
        setError("Code cannot be empty.");
        setTimeout(() => setError(null), 3000);
        return;
    }

    // Validate if code matches choosen language
    if (!validateCodeLanguage(code, language)) {
      setError(`The code doesn't appear to be valid ${language} code`);
      setStatus("idle");
      setLoading(false);
      setTimeout(() => setError(null), 3000);
      return;
    }

    setStatus("loading");
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5050/api/code-smell-detector/analyze",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: code,
            language: language,
          }),
        }
      );

      const data = await response.json();
      setResult(data);
      setStatus("done");
    } catch (error) {
      console.error("Request failed:", error);
      setStatus("idle");
    } finally {
      setLoading(false);
    }
  };

  const rawMessage =
    status === "idle"
      ? "Click Analyze to start..."
      : result?.detectedSmells?.messages || "";

  const validateCodeLanguage = (code, language) => {
    const lowerCode = code.toLowerCase();

    switch (language) {
      case "python":
        return /\bdef\b/.test(lowerCode) || /:\n\s+/.test(code);
      case "java":
        return (
          /\bpublic class\b/.test(lowerCode) ||
          /public\s+static\s+void/.test(lowerCode)
        );
      case "cpp":
        return (
          /#include/.test(lowerCode) || /\bint\s+main\s*\(/.test(lowerCode)
        );
      case "csharp":
        return (
          /using\s+system/.test(lowerCode) || /namespace\s+/.test(lowerCode)
        );
      default:
        return true;
    }
  };

  const getLanguageExtension = () => {
    switch (language) {
      case "python":
        return python();
      case "java":
        return java();
      case "cpp":
        return cpp();
      case "csharp":
        return csharp();
      default:
        return python();
    }
  };

  return (
    <div className="min-h-screen bg-[#1D1A26] text-white p-10 flex flex-col items-center">
      <h1 className="text-xl mb-4 text-[#D6B56B] tracking-wide font-semibold">
        Enter The Code: Click Submit For Smells Analysis
      </h1>

      {/* Language Selector */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-4 px-4 py-2 rounded-md bg-[#2C2A35] text-white border border-[#444] shadow-md hover:bg-[#3B364A] transition duration-200 w-60"
      >
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="csharp">C#</option>
      </select>

      <div className="flex flex-col md:flex-row w-full max-w-6xl">
        {/* Code Editor (left) */}
        <div className="bg-[#2C2A35] rounded-lg shadow flex-[1.5] max-h-[600px] overflow-auto mt-5">
          <CodeMirror
            value={code}
            height="600px"
            extensions={[getLanguageExtension()]}
            theme={dracula}
            onChange={(val) => setCode(val)}
            basicSetup={{ lineNumbers: true }}
          />
        </div>

        {/* Output Display (right) */}
        <div className="bg-black rounded-lg p-6 flex-1 shadow-md overflow-auto max-h-[600px] mt-5">
          <div className="text-green-400 mb-4 font-semibold">
            {status === "loading"
              ? "[Analyzing...]"
              : status === "done"
              ? "[Success]"
              : ""}
          </div>

          {/* Just render raw message, supporting Markdown-like look */}
          <pre className="text-gray-300 whitespace-pre-wrap mb-6">
            <code>{rawMessage}</code>
          </pre>
        </div>
      </div>

      {error && (
        <div className="bg-red-600 text-white p-3 rounded mb-4 max-w-6xl w-full text-center">
          ⚠️ {error}
        </div>
      )}

      <button
        onClick={handleAnalyze}
        className={`mt-10 px-6 py-3 rounded-md text-white transition ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}
