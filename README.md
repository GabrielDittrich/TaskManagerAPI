# TaskManager

Aplicação full stack para gerenciamento de tarefas e categorias, desenvolvida com **ASP.NET Core Minimal API** no backend e **React com TypeScript** no frontend.

O sistema permite cadastrar tarefas, organizá-las por categoria, acompanhar seus status e consultar tarefas concluídas ou pendentes por meio de uma interface responsiva.

> Projeto desenvolvido para praticar criação de APIs REST, integração entre frontend e backend, persistência de dados, React, TypeScript e desenvolvimento responsivo.

---

## Funcionalidades

- Cadastro de tarefas
- Cadastro de categorias
- Associação de tarefas a categorias
- Listagem de todas as tarefas
- Listagem de tarefas concluídas
- Listagem de tarefas não concluídas
- Alteração do status das tarefas
- Exclusão de tarefas pela API
- Navegação entre páginas com React Router
- Menu responsivo para dispositivos móveis
- Feedback visual de sucesso e erro
- Documentação interativa da API com Swagger
- Integração entre frontend e backend utilizando HTTP e JSON

---

## Tecnologias utilizadas

### Backend

- C#
- .NET 8
- ASP.NET Core Minimal API
- Entity Framework Core
- LINQ
- Swagger
- OpenAPI
- API REST

### Frontend

- React
- TypeScript
- React Router DOM
- Axios
- Fetch API
- HTML
- CSS responsivo

### Ferramentas

- Visual Studio Code
- Git
- GitHub
- Linux / Debian
- Swagger UI

---

## Estrutura do projeto

```text
TaskManagerAPI/
├── backend/
│   ├── Migrations/
│   ├── Models/
│   ├── Properties/
│   ├── Tests/
│   ├── API.csproj
│   ├── API.sln
│   ├── Program.cs
│   ├── appsettings.Development.json
│   └── appsettings.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   │   └── api.ts
│   │   ├── models/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── global.d.ts
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
│
├── .gitattributes
├── .gitignore
├── README.md
└── TaskManagerAPI.sln
```

---

## Arquitetura

O projeto está dividido em duas aplicações principais:

- O **backend** disponibiliza os endpoints da API, realiza o acesso aos dados e controla as operações relacionadas às tarefas e categorias.
- O **frontend** consome a API e apresenta as funcionalidades ao usuário.
- A comunicação entre as aplicações é realizada por requisições HTTP utilizando dados no formato JSON.

```text
React + TypeScript
        │
        │ HTTP / JSON
        ▼
ASP.NET Core Minimal API
        │
        ▼
Entity Framework Core
        │
        ▼
Banco de dados
```

---

## Endpoints da API

### Categorias

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/categoria/listar` | Lista todas as categorias |
| `POST` | `/api/categoria/cadastrar` | Cadastra uma nova categoria |

### Tarefas

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/tarefas/listar` | Lista todas as tarefas |
| `GET` | `/api/tarefas/concluidas` | Lista as tarefas concluídas |
| `GET` | `/api/tarefas/naoconcluidas` | Lista as tarefas ainda não concluídas |
| `POST` | `/api/tarefas/cadastrar` | Cadastra uma nova tarefa |
| `PUT` | `/api/tarefas/alterar/{id}` | Altera o status de uma tarefa |
| `DELETE` | `/api/tarefas/excluir/{id}` | Exclui uma tarefa |

---

## Exemplos de requisições

### Cadastro de categoria

```json
{
  "nome": "Estudos"
}
```

### Cadastro de tarefa

```json
{
  "titulo": "Estudar React",
  "descricao": "Revisar componentes, estados e useEffect",
  "categoriaId": "ID_DA_CATEGORIA"
}
```

---

## Interface responsiva

A interface foi desenvolvida para funcionar em computadores, tablets e celulares.

Entre os recursos implementados estão:

- Menu horizontal no desktop
- Menu recolhível em dispositivos móveis
- Destaque automático da página atual
- Formulário de cadastro organizado em um card
- Cadastro de categoria dentro da tela de tarefas
- Tarefas exibidas como cards em telas menores
- Mensagens visuais de sucesso e erro
- Campos com feedback visual ao receber foco

---

## Como executar o projeto

### Pré-requisitos

Antes de iniciar, tenha instalado:

- .NET SDK 8
- Node.js
- npm
- Git

Verifique as instalações:

```bash
dotnet --version
node --version
npm --version
git --version
```

---

## 1. Clonar o repositório

```bash
git clone https://github.com/GabrielDittrich/TaskManagerAPI.git
```

Entre na pasta do projeto:

```bash
cd TaskManagerAPI
```

---

## 2. Configurar e executar o backend

Abra um terminal na raiz do projeto e entre na pasta do backend:

```bash
cd backend
```

Restaure as dependências:

```bash
dotnet restore
```

Compile o projeto:

```bash
dotnet build
```

Execute a API:

```bash
dotnet run
```

O terminal mostrará o endereço em que a API foi iniciada.

Exemplo:

```text
Now listening on: http://localhost:5000
```

### Swagger

Com o backend em execução no ambiente de desenvolvimento, acesse:

```text
http://localhost:5000/swagger
```

Caso o terminal mostre outra porta, substitua `5000` pela porta apresentada.

Exemplo:

```text
http://localhost:5273/swagger
```

---

## 3. Configurar o frontend

Abra outro terminal na raiz do projeto:

```bash
cd frontend
```

Crie o arquivo `.env` utilizando o modelo disponível no projeto:

```bash
cp .env.example .env
```

O arquivo `.env` deve possuir:

```env
REACT_APP_API_URL=http://localhost:5000
```

A URL deve utilizar a mesma porta em que o backend está sendo executado.

Caso o backend esteja na porta `5273`, use:

```env
REACT_APP_API_URL=http://localhost:5273
```

> Sempre reinicie o frontend após alterar o arquivo `.env`.

---

## 4. Executar o frontend

Ainda dentro da pasta `frontend`, instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
npm start
```

Depois, acesse:

```text
http://localhost:3000
```

---

## Variável de ambiente

A URL da API está centralizada no arquivo:

```text
frontend/src/config/api.ts
```

A aplicação utiliza a variável:

```env
REACT_APP_API_URL
```

Dessa forma, não é necessário alterar vários componentes quando a porta ou o endereço do backend mudar.

Exemplo de utilização:

```tsx
fetch(`${API_URL}/api/tarefas/listar`);
```

O arquivo `.env` não deve ser enviado ao GitHub, pois cada desenvolvedor pode utilizar uma configuração local diferente.

O arquivo que deve ser versionado é:

```text
frontend/.env.example
```

---

## Principais componentes do frontend

| Componente | Responsabilidade |
|---|---|
| `ListarTarefa` | Lista todas as tarefas e permite alterar seus status |
| `ListarConcluido` | Exibe somente tarefas concluídas |
| `ListarNaoConcluido` | Exibe somente tarefas pendentes |
| `CadastrarTarefa` | Permite cadastrar tarefas e categorias |
| `App` | Configura as rotas e o menu de navegação |

---

## Principais conceitos aplicados

Durante o desenvolvimento foram praticados conceitos como:

- Criação de APIs REST com ASP.NET Core
- Desenvolvimento utilizando Minimal APIs
- Criação e consumo de endpoints HTTP
- Utilização do Entity Framework Core
- Criação e aplicação de migrations
- Relacionamento entre tarefas e categorias
- Consultas utilizando LINQ
- Documentação de API com Swagger
- Gerenciamento de estados com React
- Utilização do hook `useEffect`
- Prevenção de requisições repetidas
- Navegação com React Router DOM
- Requisições com Axios e Fetch API
- Tipagem de dados com TypeScript
- Variáveis de ambiente no frontend
- Desenvolvimento responsivo com CSS
- Versionamento com Git e GitHub

---
