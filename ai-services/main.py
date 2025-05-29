from fastapi import FastAPI
from code_snippet import CodeSnippet
from models.model_manager import ModelManager

app = FastAPI()
model_manager: ModelManager = None

@app.post("/code-smell-detector/analyze")
async def analyze_code(code_snippet_obj: CodeSnippet):
    code = code_snippet_obj.code
    language = code_snippet_obj.language

    model_manager = ModelManager()

    analysis_result_list = model_manager.start_analyze(code=code, language=language)

    return {"message": analysis_result_list, "language": language}