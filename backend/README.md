# TaskManager API

Backend da aplicação **TaskManager**, desenvolvido com **C#**, **.NET 8** e **ASP.NET Core Minimal API**.

A API é responsável pelo gerenciamento de tarefas e categorias, disponibilizando endpoints REST consumidos pelo frontend React.

Para uma visão geral do projeto, consulte o [README principal](../README.md).

---

## Funcionalidades

- Cadastro de categorias
- Listagem de categorias
- Cadastro de tarefas
- Listagem de todas as tarefas
- Listagem de tarefas concluídas
- Listagem de tarefas não concluídas
- Alteração do status das tarefas
- Exclusão de tarefas
- Associação entre tarefas e categorias
- Persistência de dados com Entity Framework Core
- Documentação interativa com Swagger
- Configuração de CORS para comunicação com o frontend

---

## Tecnologias utilizadas

- C#
- .NET 8
- ASP.NET Core Minimal API
- Entity Framework Core
- LINQ
- Swagger
- OpenAPI
- API REST

---

## Estrutura do backend

```text
backend/
├── Migrations/
├── Models/
├── Properties/
│   └── launchSettings.json
├── Tests/
├── API.csproj
├── API.sln
├── Program.cs
├── appsettings.Development.json
├── appsettings.json
└── README.md
```

### Principais arquivos e pastas

| Local | Responsabilidade |
|---|---|
| `Program.cs` | Configura serviços, middlewares e endpoints da API |
| `Models/` | Contém as entidades e o contexto do Entity Framework |
| `Migrations/` | Armazena as migrations do banco de dados |
| `Properties/launchSettings.json` | Configura perfis, portas e ambiente de execução |
| `appsettings.json` | Contém configurações gerais da aplicação |
| `appsettings.Development.json` | Contém configurações específicas de desenvolvimento |
| `API.csproj` | Define o projeto .NET e suas dependências |

---

## Endpoints

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
| `GET` | `/api/tarefas/naoconcluidas` | Lista as tarefas não concluídas |
| `POST` | `/api/tarefas/cadastrar` | Cadastra uma nova tarefa |
| `PUT` | `/api/tarefas/alterar/{id}` | Altera o status de uma tarefa |
| `DELETE` | `/api/tarefas/excluir/{id}` | Exclui uma tarefa |

---

## Fluxo de status

Ao utilizar o endpoint de alteração, o status da tarefa avança conforme o fluxo:

```text
Não iniciada
      ↓
Em andamento
      ↓
Concluída
```

---

## Exemplos de requisição

### Cadastrar categoria

```http
POST /api/categoria/cadastrar
Content-Type: application/json
```

```json
{
  "nome": "Estudos"
}
```

### Cadastrar tarefa

```http
POST /api/tarefas/cadastrar
Content-Type: application/json
```

```json
{
  "titulo": "Estudar React",
  "descricao": "Revisar componentes, estados e useEffect",
  "categoriaId": "ID_DA_CATEGORIA"
}
```

---

## Como executar

### Pré-requisitos

Tenha instalado:

- .NET SDK 8
- Git
- Banco de dados configurado para o projeto

Verifique o .NET:

```bash
dotnet --version
```

---

### 1. Entrar na pasta do backend

Partindo da raiz do repositório:

```bash
cd backend
```

---

### 2. Restaurar as dependências

```bash
dotnet restore
```

---

### 3. Compilar o projeto

```bash
dotnet build
```

O resultado esperado é:

```text
Compilação com êxito.
0 Erro(s)
```

---

### 4. Aplicar as migrations

Caso o banco ainda não tenha sido criado:

```bash
dotnet ef database update
```

> Esse comando exige que a ferramenta `dotnet-ef` esteja instalada e que a configuração do banco esteja correta.

Para instalar a ferramenta globalmente:

```bash
dotnet tool install --global dotnet-ef
```

Caso já esteja instalada, atualize com:

```bash
dotnet tool update --global dotnet-ef
```

---

### 5. Executar a API

```bash
dotnet run
```

O terminal mostrará o endereço utilizado:

```text
Now listening on: http://localhost:5000
```

A porta pode ser diferente conforme o arquivo:

```text
Properties/launchSettings.json
```

---

## Swagger

O Swagger está habilitado no ambiente de desenvolvimento.

Com a API em execução, acesse:

```text
http://localhost:5000/swagger
```

Caso a API esteja em outra porta, use a porta exibida no terminal.

Exemplo:

```text
http://localhost:5273/swagger
```

Se o Swagger retornar erro `404`, confirme se o terminal mostra:

```text
Hosting environment: Development
```

Para iniciar explicitamente em desenvolvimento:

```bash
ASPNETCORE_ENVIRONMENT=Development dotnet run
```

---

## Testar pelo terminal

### Verificar se a API está respondendo

```bash
curl http://localhost:5000/
```

Resposta esperada:

```text
TaskManager API
```

### Listar tarefas

```bash
curl http://localhost:5000/api/tarefas/listar
```

### Listar categorias

```bash
curl http://localhost:5000/api/categoria/listar
```

Substitua a porta caso o backend esteja executando em outro endereço.

---

## Comunicação com o frontend

O backend possui configuração de CORS para permitir requisições realizadas pelo frontend.

Durante o desenvolvimento, o frontend geralmente executa em:

```text
http://localhost:3000
```

E utiliza a variável de ambiente:

```env
REACT_APP_API_URL=http://localhost:5000
```

A porta configurada no frontend deve ser a mesma usada pelo backend.

---

## Configuração de desenvolvimento

A configuração de porta e ambiente pode ser encontrada em:

```text
Properties/launchSettings.json
```

Exemplo:

```json
{
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "swagger",
      "applicationUrl": "http://localhost:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```
