
from extract import read_user_ids, extract_user
from transform import transform_user
from load import load_users


def main():
    # 1. Extract: buscar os usuários
    user_ids = read_user_ids()
    users = []

    for user_id in user_ids:
        user = extract_user(user_id)
        users.append(user)

    print(f"Extraídos {len(users)} usuários.")

    # 2. Transform: adicionar mensagens
    transformed_users = [
        transform_user(user) for user in users
    ]

    print("Transformação concluída.")

    # 3. Load: salvar os resultados
    load_users(transformed_users)


if __name__ == "__main__":
    main()