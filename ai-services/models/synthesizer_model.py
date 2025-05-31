from openai import OpenAI
from openai import (
    AuthenticationError,
    BadRequestError,
    RateLimitError,
    APIConnectionError,
    APIError
)
import os
import textwrap
from dotenv import load_dotenv

load_dotenv()



class Synthesizer:
    def __init__(self, api_key=None, model_name="gpt-4"):
        self.api_key = api_key or os.getenv("GPT_4_AUTOSMELLS_LAB_API")
        self.model = model_name
        self.synthesizer = OpenAI(api_key=self.api_key)

    def get_synthesizer_model(self) -> str:
        return self.model

    def set_model_name(self, model_name) -> bool:
        self.model = model_name
        return True

    def construct_prompt(self, models_opinion_list: list) -> str:
        example_opinions = """
            {
                "long parameter list": "The create_user function has too many parameters...",
                "primitive obsession": "The function uses many primitives rather than encapsulated objects...",
                "Refactored code example here": "```python\\ndef create_user(user):\\n    print('User created')\\n```"
            }
        """

        prompt = textwrap.dedent(f"""
            You are a professional synthesizer and evaluator for code smell detection and software quality.

            Your job:
            - Review the opinions of multiple LLMs regarding code smells in a provided code snippet or file.
            - Evaluate or/and combine their reasoning.
            - Formulate the most accurate set of detected code smells.
            - Provide clear explanations.
            - Then provide a properly formatted refactored version of the code as a **single multi-line string** inside a JSON field named `"Refactored code example here"`.
            
            Formatting Instructions:
            - Return the refactored code wrapped in triple backticks with `python` specified (i.e., ```python).
            - Maintain full indentation and line breaks.
            - Do NOT return the refactored code as a list of strings — instead, return it as one string that preserves formatting.
            - Escape any inner quotes as needed to ensure valid JSON.

            Format your final output strictly as a JSON object, like this:

            {{
                "code smell name": "Explanation of why it is a code smell and how to fix it.",
                ...
                "Refactored code example here": "```python\\ndef refactored_function():\\n    print('code is refactored')\\n```"
            }}

            Example LLM opinions (from GPT-4, DeepSeek R1, Gemini 1.5 Pro, Claude Sonnet 4):

            {example_opinions}

            You will receive opinions from each model respectively in this order GPT-4, Deepseek R1, Gemini 1.5 Pro, Claude Sonnet 4.

            Now evaluate the following model opinions and synthesize the final, corrected JSON-formatted result:

            {models_opinion_list}
        """).strip()
        return prompt


    def synthesize(self, prompt):
        try:
            response = self.synthesizer.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}]
            )
            return response.choices[0].message.content
        except AuthenticationError:
            return "Authentication failed. Check your API key."
        except BadRequestError as e:
            return f"Bad request: {e}"
        except RateLimitError:
            return "Rate limit exceeded. Try again later."
        except APIConnectionError:
            return "Connection error. Please check your network."
        except APIError as e:
            return f"OpenAI API error: {e}"
        except Exception as e:
            return f"Unexpected error: {e}"

