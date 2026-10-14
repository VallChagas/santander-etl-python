# Santander ETL Pipeline

Pipeline de ETL desenvolvido em Python para praticar extração, transformação e carregamento de dados utilizando uma API REST simulada com Mockoon.

O projeto demonstra como coletar dados de usuários, processá-los e armazenar os resultados em um arquivo JSON, aplicando conceitos de organização modular e automação de processos.

## Tecnologias utilizadas

* **Python** — lógica e processamento dos dados
* **Requests** — requisições HTTP para a API
* **Mockoon** — simulação de uma API REST
* **CSV** — fonte dos identificadores dos usuários
* **JSON** — formato de saída dos dados
* **Git e GitHub** — versionamento do código

## Como funciona

O pipeline é dividido em três etapas:

1. **Extract:** lê os IDs do arquivo CSV e busca os dados dos usuários na API simulada.
2. **Transform:** adiciona uma mensagem personalizada aos dados de cada usuário.
3. **Load:** salva os dados processados em um arquivo JSON.

## Estrutura do projeto

```text
santander-etl-python/
├── data/
│   ├── SDW2023.csv
│   └── users_transformed.json
├── src/
│   ├── extract.py
│   ├── transform.py
│   ├── load.py
│   └── main.py
├── .gitignore
├── README.md
└── requirements.txt
```

## Como executar

### 1. Clone o repositório

```bash
git clone URL_DO_SEU_REPOSITORIO
cd santander-etl-python
```

### 2. Crie e ative um ambiente virtual

No Windows:

```bash
python -m venv .venv
.venv\Scripts\activate
```

### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

### 4. Configure a API simulada

Instale o Mockoon e configure um ambiente local com as rotas esperadas pelo projeto:

* `GET /users/4`
* `GET /users/5`
* `GET /users/6`

A API deve estar disponível em `http://localhost:3000`.

### 5. Execute o pipeline

```bash
python src/main.py
```

Os dados processados serão salvos em `data/users_transformed.json`.

## Objetivo

Projeto de estudo voltado à prática de ETL, consumo de APIs REST, manipulação de dados em Python e organização de código em módulos.

Desenvolvido como parte da minha jornada de aprendizado em Ciência de Dados e Python.
