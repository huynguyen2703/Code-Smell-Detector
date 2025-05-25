from models.model_gpt import GptClient
from models.model_base import BaseModel


class ModelManager:
    def __init__(self):
        self.clients: dict[str, BaseModel] = {}
        self.registered_models: dict[str, BaseModel] = {}
        self.__register_private_models()

    def __register_private_models(self):
        gpt_4 = GptClient()
        gpt_4_name = gpt_4.get_current_model()
        self.clients[gpt_4_name] = gpt_4

    def register_model(self, model_name, client: BaseModel) -> bool:
        """Register a new model into ModelManager"""
        if model_name in self.clients:
            return False
        self.clients[model_name] = client
        self.registered_models[model_name] = client
        return True

    def get_registered_model(self, model_name):
        if model_name not in self.registered_models:
            return None
        return model_name

    def get_all_registered_model(self):
        return self.registered_models

    def get_all_models(self):
        return self.clients

    def remove_model(self, model_name) -> bool:
        if model_name not in self.registered_models:
            return False
        del self.clients[model_name]
        del self.registered_models[model_name]
        return True

    def remove_all_registered_models(self) -> bool:
        for registered_model in self.registered_models.keys():
            del self.clients[registered_model]
            del self.registered_models[registered_model]
