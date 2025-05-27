from model_base import BaseModel
import os
from dotenv import load_dotenv
import textwrap
import requests
from huggingface_hub import InferenceClient
from huggingface_hub.utils import HfHubHTTPError


load_dotenv()


class LlamaClient(BaseModel):
    def __init__(self, api_key=None, model_name="codellama/CodeLlama-7b-Instruct-hf"):
        self.api_key = api_key or os.getenv(
            "CODE_LlAMA_AUTOSMELLS_LAB_API")
        self.model = model_name
        self.client = InferenceClient(model=self.model, token=self.api_key)

    def get_current_model(self) -> str:
        return self.model

    def get_all_models(self):
        return [self.model]

    def set_model_name(self, model_name) -> bool:
        self.model = model_name
        self.client = InferenceClient(model=model_name, token=self.api_key)
        return True
    
    def construct_prompt(self, code: str, language: str) -> str:
        prompt = textwrap.dedent(f"""
            You are an expert in software quality and code smell detection.

            Given a code snippet written in {language}, identify all possible code smells present.
            For each code smell, return a key-value pair in a Python dictionary format, where:

            - The key is the name of the code smell (e.g., "long method", "duplicated code").
            - The value is a brief explanation of why the smell is present and a recommended fix.

            Example:
            {
                "long method": "The method exceeds 20 lines. Consider splitting it into smaller functions.",
                "duplicated code": "Two functions perform the same logic. Consider refactoring into one."
            }

            Now analyze the following code:

            {code}
        """).strip()
        return prompt

    def analyze_code(self, prompt: str) -> str:
        try:
            response = self.client.text_generation(prompt, max_new_tokens=512)
            return response[0].get('generated_text', '')
        except HfHubHTTPError as e:
            return f"HuggingFace Hub Error: {e}"
        except requests.exceptions.HTTPError as e:
            return f"HTTP Error: {e.response.status_code} - {e.response.reason}"
        except requests.exceptions.ConnectionError:
            return "Connection error. Please check your internet."
        except requests.exceptions.Timeout:
            return "The request timed out."
        except ValueError as e:
            return f"Invalid value error: {e}"
        except Exception as e:
            return f"Unexpected error: {e}"

