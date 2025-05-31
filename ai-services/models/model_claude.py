from models.model_base import BaseModel
import os
import textwrap 
from dotenv import load_dotenv
from anthropic import Anthropic, APIStatusError, RateLimitError, BadRequestError, InternalServerError


load_dotenv()

class ClaudeClient(BaseModel):
    def __init__(self, api_key=None, model_name="claude-sonnet-4-20250514"):
        self.api_key = api_key or os.getenv("CLAUDE_4_SONNET_AUTOSMELLS_LAB_API")
        self.model = model_name
        self.client = Anthropic(api_key=self.api_key)

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
        body = textwrap.dedent(f"""
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
        """)

        # Add the proper Human/Assistant format
        return f"\n\nHuman: {body}\n\nAssistant:"


    def analyze_code(self, prompt: str) -> str:
        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=1024,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            return response.content[0].text

        except RateLimitError:
            return "Rate limit exceeded. Try again later."
        except BadRequestError as e:
            return f"Bad request: {e}"
        except APIStatusError as e:
            return f"API status error: {e}"
        except InternalServerError:
            return "Claude service is currently unavailable."
        except Exception as e:
            return f"Unexpected error: {e}"

    

