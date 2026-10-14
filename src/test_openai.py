
import os
from dotenv import load_dotenv
from openai import OpenAI

# Carrega as variáveis do arquivo .env
load_dotenv()

# Verifica se a chave foi encontrada
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("A chave OPENAI_API_KEY não foi encontrada no .env")

# Cria o cliente da API
client = OpenAI(api_key=api_key)

# Envia uma solicitação simples
response = client.responses.create(
    model="gpt-5-mini",
    instructions="Responda de forma breve e em português brasileiro.",
    input="Explique em uma frase o que é uma API."
)

# Exibe a resposta
print(response.output_text)