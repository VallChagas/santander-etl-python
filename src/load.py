
import json
from pathlib import Path

# Define o caminho do arquivo de saída na pasta data.
OUTPUT_PATH = (
    
    Path(__file__).resolve().parent.parent
    / "data"
    / "users_transformed.json"
)


def load_users(users):
    """Salva os usuários transformados em um arquivo JSON."""

    with open(OUTPUT_PATH, "w", encoding="utf-8") as file:
        json.dump(users, file, indent=4, ensure_ascii=False)

    print(f"Dados salvos em: {OUTPUT_PATH}")