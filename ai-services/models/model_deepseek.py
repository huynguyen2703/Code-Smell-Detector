import textwrap
from openai import OpenAI
from openai.error import (
    AuthenticationError,
    InvalidRequestError,
    RateLimitError,
    APIConnectionError,
    ServiceUnavailableError,
    APIError
)
from model_base import BaseModel
import os
from dotenv import load_dotenv
import textwrap

load_dotenv()


class DeepseekClient(BaseModel):
    def __init__(self, api_key=None, model_name="deepseek-reasoner"):
        self.api_key = api_key or os.getenv("DEEPSEEK_R1_AUTOSMELLS_LAB_API")
        self.model = model_name
        self.client = OpenAI(api_key=self.api_key)

    def get_current_model(self) -> str:
        return self.model

    def get_all_models(self):
        return self.client.models.list()

    def set_model_name(self, model_name) -> bool:
        models_list = self.get_all_models()
        model_ids = [model["id"] for model in models_list["data"]]

        if model_name not in model_ids:
            return False
        self.model = model_name
        return True

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

    def analyze_code(self, prompt) -> str:
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}]
            )
            return response.choices[0].message["content"]
        except AuthenticationError:
            return "Authentication failed. Check your API key."
        except InvalidRequestError as e:
            return f"Invalid request: {e}"
        except RateLimitError:
            return "Rate limit exceeded. Try again later."
        except APIConnectionError:
            return "Connection error. Please check your network."
        except ServiceUnavailableError:
            return "OpenAI service is currently unavailable."
        except APIError as e:
            return f"OpenAI API error: {e}"
        except Exception as e:
            return f"Unexpected error: {e}"
