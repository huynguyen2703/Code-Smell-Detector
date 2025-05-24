from fastapi import FastAPI
from code_snippet import CodeSnippet

app = FastAPI()

@app.post("/code-smell-detector/analyze")
async def analyze_code(code_snippet_obj: CodeSnippet):
    code = code_snippet_obj.code
    language = code_snippet_obj.language
    return {"message": f"Received: {code}", "language": language}