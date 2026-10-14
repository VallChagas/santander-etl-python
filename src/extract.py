import csv
import json
import requests
from pathlib import Path

#URL base da API simulada no Mockoon
API_URL = "http://localhost:3000/users"
CSV_PATH = Path(__file__).resolve().parent.parent / "data" / "SDW2023.csv"

def read_user_ids():
    """Lê os IDs dos usuários do arquivo CSV."""
    with open(CSV_PATH, mode="r", encoding="utf-16", newline="") as file:
        reader = csv.DictReader(file)
        return [int(row["UserID"]) for row in reader]


def extract_user(user_id):
    """Busca um usuário na API simulada."""
    response = requests.get(f"{API_URL}/{user_id}", timeout=10)
    response.raise_for_status()
    return response.json()


if __name__ == "__main__":
    """Lê os IDs do usuário presentes no arquivo CSV."""
    user_ids = read_user_ids()
    print(f"IDs encontrados no CSV: {user_ids}")

    for user_id in user_ids:
        user = extract_user(user_id)
        print("\n" + "=" * 35)
        print(f"Usuário extraído: {user['name']}")
        print("=" * 35)
        print(json.dumps(user, indent=4, ensure_ascii=False))