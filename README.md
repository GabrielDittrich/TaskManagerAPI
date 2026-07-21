# TaskManagerAPI

Projeto de estudo e portfólio para gerenciamento de tarefas e categorias.

A aplicação possui uma API REST desenvolvida com C# e ASP.NET Core, utilizando Entity Framework Core e SQLite para persistência dos dados. Também conta com um frontend em React com TypeScript para consumir os endpoints da API.

## Funcionalidades

- Cadastro de tarefas
- Listagem de tarefas
- Atualização de status das tarefas
- Exclusão de tarefas
- Cadastro de categorias
- Listagem de tarefas concluídas
- Listagem de tarefas não concluídas
- Persistência de dados com SQLite
- Dados iniciais para testes via migrations

## Tecnologias utilizadas

### Backend

- C#
- ASP.NET Core
- Entity Framework Core
- SQLite
- Swagger

### Frontend

- React
- TypeScript
- Axios

## Estrutura do projeto

```text
TaskManagerAPI
│   ├── backend   # Backend ASP.NET Core
│   └── frontend      # Frontend React
└── README.md
```
## Como executar o projeto
### Pré-requisitos

Antes de começar, é necessário ter instalado:

- .NET SDK
- Node.js
- Git
- Entity Framework CLI

Caso não tenha o Entity Framework CLI instalado, execute:

```bash
dotnet tool install --global dotnet-ef
```

## Configuração do backend

1. Clone o repositório:

```bash
git clone https://github.com/GabrielDittrich/TaskManagerAPI.git
```

2. Acesse a pasta da API:

```bash
cd TaskManagerAPI/backend
```

3. Restaure as dependências:

```bash
dotnet restore
```

4. Crie o banco de dados com as migrations:

```bash
dotnet ef database update
```

5. Execute a API:

```bash
dotnet run
```

Após iniciar a aplicação, acesse o Swagger para testar os endpoints:

```text
http://localhost:5000/swagger
```

> A porta pode variar conforme a configuração local do projeto.

## Configuração do frontend

1. Acesse a pasta do frontend:

```bash
cd TaskManagerAPI/frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o frontend:

```bash
npm start
```

> Caso o projeto utilize Vite, use `npm run dev`.

## Endpoints da API

### Categorias

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/categoria/listar` | Lista todas as categorias |
| POST | `/api/categoria/cadastrar` | Cadastra uma nova categoria |

Exemplo de cadastro de categoria:

```json
{
  "nome": "Nome da Categoria"
}
```

### Tarefas

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/tarefas/listar` | Lista todas as tarefas |
| POST | `/api/tarefas/cadastrar` | Cadastra uma nova tarefa |
| PUT | `/api/tarefas/alterar/{id}` | Atualiza o status de uma tarefa |
| DELETE | `/api/tarefas/excluir/{id}` | Remove uma tarefa |
| GET | `/api/tarefas/naoconcluidas` | Lista tarefas não concluídas |
| GET | `/api/tarefas/concluidas` | Lista tarefas concluídas |

Exemplo de cadastro de tarefa:

```json
{
  "titulo": "Título da Tarefa",
  "descricao": "Descrição da Tarefa",
  "categoriaId": "ID da Categoria"
}
```

## Páginas do frontend

### Cadastrar tarefa

- Formulário para cadastrar tarefas
- Seleção de categorias existentes
- Opção para cadastrar uma nova categoria

### Listar tarefas

- Exibição de todas as tarefas cadastradas
- Visualização dos detalhes da tarefa
- Opção para atualizar o status

### Tarefas concluídas

- Exibição das tarefas com status concluído

### Tarefas não concluídas

- Exibição das tarefas pendentes
- Opção para alterar o status da tarefa

## Banco de dados

O projeto utiliza SQLite com Entity Framework Core.

O arquivo `.db` não é versionado no GitHub. Para criar o banco localmente, execute:

```bash
dotnet ef database update
```

As migrations já incluem dados iniciais de exemplo para facilitar os testes.

## Dados iniciais

### Categorias

| Nome |
|---|
| Trabalho |
| Estudos |
| Lazer |

### Tarefas

| Título | Descrição | Status |
|---|---|---|
| Concluir relatório | Terminar relatório para reunião | Não iniciada |
| Estudar Angular | Preparar-se para a aula de Angular | Não iniciada |
| Passeio no parque | Dar um passeio relaxante no parque | Não iniciada |

## Objetivo do projeto

Este projeto foi desenvolvido para praticar conceitos de desenvolvimento web full stack, incluindo criação de API REST, integração com banco de dados, consumo de API no frontend e organização de funcionalidades em um sistema simples de tarefas.
