from model_base import BaseModel
import os
import textwrap
from dotenv import load_dotenv
from google import genai
from google.api_core.exceptions import (
    InvalidArgument,
    NotFound,
    PermissionDenied,
    GoogleAPIError,
)

load_dotenv()


class GeminiClient(BaseModel):
    def __init__(self, api_key=None, model_name="gemini-1.5-pro"):
        self.api_key = api_key or os.getenv("GEMINI_1.5_PRO_AUTOSMELLS_LAB_API")
        self.model = model_name
        self.client = genai.Client(api_key=self.api_key)

    def get_current_model(self) -> str:
        return self.model

    def get_all_models(self):
        try:
            return self.client.list_models()
        except GoogleAPIError as e:
            return f"APIError while listing models: {e.message}"

    def set_model_name(self, model_name) -> bool:
        try:
            model_list = self.get_all_models()
            model_ids = [model.name for model in model_list]
            if model_name not in model_ids:
                return False
            self.model = model_name
            return True
        except Exception as e:
            return False

    def construct_prompt(self, code: str, language: str) -> str:
        prompt = textwrap.dedent(f"""
            You are an expert in software quality and code smell detection.

            Given a code snippet written in {language}, identify all possible code smells present.
            For each code smell, return a key-value pair in a Python dictionary format, where:

            - The key is the name of the code smell (e.g., "long method", "duplicated code").
            - The value is a brief explanation of why the smell is present and a recommended fix.

            Example:
            {{
                "long method": "The method exceeds 20 lines. Consider splitting it into smaller functions.",
                "duplicated code": "Two functions perform the same logic. Consider refactoring into one."
            }}

            Now analyze the following code:

            {code}
        """).strip()
        return prompt

    def analyze_code(self, prompt: str) -> str:
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt
            )
            return response.text.strip()
        except InvalidArgument as e:
            return f"InvalidArgument: {e.message}"
        except NotFound as e:
            return f"NotFound: {e.message}"
        except PermissionDenied as e:
            return f"PermissionDenied: {e.message}"
        except GoogleAPIError as e:
            return f"GoogleAPIError: {e.message}"
        except Exception as e:
            return f"Unexpected error: {str(e)}"
