# Santander ETL com Python

Projeto de estudo que demonstra um fluxo ETL (Extract, Transform, Load) em Python. O pipeline lê IDs de usuários de um arquivo CSV, consulta uma API simulada, personaliza os registros e salva o resultado em JSON.

> Os dados deste repositório são fictícios. A API original da Santander Dev Week está indisponível; para executar a extração, o projeto espera uma API local simulada pelo Mockoon.

## Índice

- [Fluxo do pipeline](#fluxo-do-pipeline)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Configuração](#configuração)
- [Execução](#execução)
- [Saída](#saída)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Demo estática](#demo-estática)
- [Teste opcional com OpenAI](#teste-opcional-com-openai)

## Fluxo do pipeline

```text
data/SDW2023.csv
        │
        ▼
Extract ── lê os IDs e consulta GET http://localhost:3000/users/{id}
        │
        ▼
Transform ── adiciona uma mensagem personalizada a cada usuário
        │
        ▼
Load ── salva os registros em data/users_transformed.json
```

As etapas estão separadas em módulos para facilitar o entendimento e a manutenção:

1. **Extract:** lê a coluna `UserID` do CSV e busca cada usuário na API.
2. **Transform:** adiciona o campo `message` usando o nome do usuário.
3. **Load:** grava a lista transformada em um arquivo JSON.

## Tecnologias

- Python 3
- Requests
- Mockoon para simular a API local
- CSV e JSON para entrada e saída de dados

## Pré-requisitos

- Python 3 instalado.
- [Mockoon](https://mockoon.com/) instalado e em execução na porta `3000`.
- A rota `GET /users/:id` configurada no Mockoon para responder com um usuário em JSON.

O pipeline principal não precisa de uma chave OpenAI nem de conexão com um serviço externo além da API local simulada.

## Configuração

Clone o repositório e acesse sua pasta:

```bash
git clone https://github.com/VallChagas/santander-etl-python.git
cd santander-etl-python
```

Crie e ative um ambiente virtual.

Windows (PowerShell):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Linux ou macOS:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Instale a dependência usada pelo pipeline:

```bash
python -m pip install requests
```

### Configure a API simulada

No Mockoon, crie uma API local na porta `3000` e configure a rota `GET /users/:id`. A resposta deve ser um objeto JSON que contenha pelo menos os campos `id` e `name`, por exemplo:

```json
{
  "id": 4,
  "name": "Ana Silva",
  "account": {
    "number": "0001-0",
    "agency": "0001",
    "balance": 1500.0,
    "limit": 500.0
  },
  "card": {
    "number": "**** **** **** 1234",
    "limit": 1000.0
  },
  "features": [],
  "news": []
}
```

Crie respostas correspondentes aos IDs `4`, `5` e `6`, presentes em `data/SDW2023.csv`, e inicie o ambiente Mockoon antes de executar o pipeline. A aplicação faz as consultas em `http://localhost:3000/users/{id}`.

## Execução

Na raiz do repositório, execute:

```bash
python src/main.py
```

O terminal informa o andamento das etapas e o caminho do arquivo gerado. Se a API simulada não estiver disponível ou uma consulta falhar, a execução apresentará o erro da requisição.

## Saída

O pipeline gera `data/users_transformed.json`. Para cada usuário, o campo `message` é adicionado durante a transformação. Exemplo reduzido:

```json
{
  "id": 4,
  "name": "Ana Silva",
  "message": "Olá, Ana Silva! Estamos felizes em ter você conosco."
}
```

O arquivo `data/SDW2023.csv` usa codificação UTF-16. Os registros do projeto são fictícios e servem apenas para fins de estudo.

## Estrutura do projeto

```text
.
├── assets/
│   ├── main.js
│   └── style.css
├── data/
│   ├── SDW2023.csv
│   ├── users.json
│   └── users_transformed.json
├── src/
│   ├── extract.py
│   ├── load.py
│   ├── main.py
│   ├── test_openai.py
│   └── transform.py
├── index.html
├── README.md
└── requirements.txt
```

## Demo estática

O site de portfólio está disponível em `index.html` e pode ser publicado no GitHub Pages. Ele inclui uma demonstração interativa executada no próprio navegador com dados de exemplo; essa demonstração é independente do pipeline Python e da API local.

Antes de publicar, substitua `https://vallchagas.github.io/santander-etl-python/` pelos dados do repositório nos links para o GitHub em `index.html`.

## Teste opcional com OpenAI

`src/test_openai.py` é um script independente do pipeline ETL. Para executá-lo, instale também `openai` e `python-dotenv`:

```bash
python -m pip install openai python-dotenv
```

Defina a variável de ambiente `OPENAI_API_KEY` antes de iniciar o script:

Windows (PowerShell):

```powershell
$env:OPENAI_API_KEY = "sua-chave"
python src/test_openai.py
```

Linux ou macOS:

```bash
export OPENAI_API_KEY="sua-chave"
python src/test_openai.py
```

Não compartilhe nem versione sua chave de API. Esse teste não é necessário para executar o pipeline ETL.
