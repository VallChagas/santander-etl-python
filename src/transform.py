
def transform_user(user):
    """Gera uma mensagem personalizada para o usuário."""

    name = user["name"]

    user["message"] = (
        f"Olá, {name}! "
        "Estamos felizes em ter você conosco."
    )

    return user