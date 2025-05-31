from fastapi import FastAPI
from code_snippet import CodeSnippet
from models.model_manager import ModelManager
from models.synthesizer_model import Synthesizer
import logging

# Setup logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

app = FastAPI()

@app.post("/code-smell-detector/analyze")
async def analyze_code(code_snippet_obj: CodeSnippet):
    code = code_snippet_obj.code
    language = code_snippet_obj.language

    logger.info("Received code analysis request")
    logger.debug(f"Language: {language}")
    logger.debug(f"Code snippet:\n{code}")

    model_manager = ModelManager()
    synthesizer = Synthesizer()

    logger.info("Starting model analysis")
    analysis_result_list = model_manager.start_analyze(code=code, language=language)
    logger.debug(f"Model analysis result: {analysis_result_list}")

    synthesize_prompt = synthesizer.construct_prompt(analysis_result_list)
    logger.debug(f"Synthesize prompt: {synthesize_prompt}")

    final_reasoning = synthesizer.synthesize(synthesize_prompt)
    logger.info("Synthesis complete")

    logger.debug(f"Final reasoning: {final_reasoning}")

    return {
        "messages": final_reasoning
    }
