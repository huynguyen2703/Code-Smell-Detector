from models.model_gpt import GptClient
from models.model_deepseek import DeepseekClient
from models.model_gemini import GeminiClient
from models.model_claude import ClaudeClient
from models.model_base import BaseModel
from typing import List, Type


class ModelManager:
    def __init__(self):        
        self.clients: dict[str, BaseModel] = {}
        self.user_registered_models: dict[str, BaseModel] = {}
        self.__register_private_models()

    def __register_private_models(self):
        private_models = self.__instantiate_private_models()
        for private_model in private_models:
            private_model_name = private_model.get_current_model()
            self.clients[private_model_name] = private_model

    def __instantiate_private_models(self) -> List[BaseModel]:
        temp_list_of_private_models: List[Type[BaseModel]] = [
            GptClient,
            DeepseekClient,
            GeminiClient,
            ClaudeClient,
        ]
        return [cls() for cls in temp_list_of_private_models]

    def register_model(self, model_name, client: BaseModel) -> bool:
        """Register a new model into ModelManager"""
        if model_name in self.clients:
            return False
        self.clients[model_name] = client
        self.user_registered_models[model_name] = client
        return True

    def get_registered_model(self, model_name):
        if model_name not in self.user_registered_models:
            return None
        return model_name

    def get_all_registered_model(self):
        return self.user_registered_models

    def get_all_models(self):
        return self.clients

    def remove_model(self, model_name) -> bool:
        if model_name not in self.user_registered_models:
            return False
        del self.clients[model_name]
        del self.user_registered_models[model_name]
        return True

    def remove_all_registered_models(self) -> bool:
        for user_registered_model in self.user_registered_models.keys():
            del self.clients[user_registered_model]
            del self.user_registered_models[user_registered_model]

    def start_analyze(self, code: str, language: str) -> bool:
        analysis_result_list = []
        for model in self.clients.values():
            prompt = model.construct_prompt(code, language)
            analysis_result = model.analyze_code(prompt)
            analysis_result_list.append(analysis_result)
        return analysis_result_list

