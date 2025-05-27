
from abc import ABC, abstractmethod


class BaseModel(ABC):

    @abstractmethod
    def construct_prompt(self, code: str, language: str) -> str:
        """Construct prompt for the given code snippet, language and return complete prompt"""
        pass

    @abstractmethod
    def set_model_name(self, model_name: str) -> bool:
        """Set the model name if valid; return True if successful else False"""
        pass

    @abstractmethod
    def get_current_model(self) -> str:
        """Return the currently set model name"""
        pass
    
    @abstractmethod
    def get_all_models(self) -> str:
        """Return all models available from the api"""
        pass

    @abstractmethod
    def construct_prompt(self) -> str:
        """Construct a prompt for each model (this could change depending on how effective we want a specific model to respond"""
        pass

    @abstractmethod
    def analyze_code(self, prompt: str) -> str:
        """Send prompt to model and starts inference.Return result as a python dictionary but string version"""
        pass
