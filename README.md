# TaskManagerAPI

TaskManagerAPI é uma API simples projetada para gerenciar tarefas e suas categorias associadas. O projeto demonstra a implementação de um backend desenvolvido com ASP.NET Core e um frontend desenvolvido com React.

## Funcionalidades

- Gerenciar tarefas com operações CRUD.
- Gerenciar categorias associadas às tarefas.
- Filtrar tarefas por status de conclusão.
- Integração suave com um banco de dados SQLite para persistência de dados.

## Tecnologias Utilizadas

### Backend
- **Linguagem:** C#
- **Framework:** ASP.NET Core
- **Banco de Dados:** SQLite
- **Bibliotecas:** Entity Framework Core

### Frontend
- **Linguagem:** TypeScript
- **Framework:** React
- **Cliente HTTP:** Axios

## Instalação e Configuração

### Configuração do Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/your-repo/TaskManagerApi.git
   cd TaskManagerApi

2. Restaure as dependências:
   ```bash
   dotnet restore

3. Execute as migrações do banco de dados:
   ```bash
   dotnet ef database update

4. Inicie a API
      ```bash
   dotnet run

### Configuração do Frontend

1. Navegue até o diretório do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o frontend:
   ```bash
   npm start
   ```

## Endpoints da API

### Categorias

- **GET** `/api/categoria/listar`: Lista todas as categorias.
- **POST** `/api/categoria/cadastrar`: Adiciona uma nova categoria. Requer um corpo JSON com a seguinte estrutura:
  ```json
  {
    "nome": "Nome da Categoria"
  }
  ```

### Tarefas

- **GET** `/api/tarefas/listar`: Lista todas as tarefas.
- **POST** `/api/tarefas/cadastrar`: Adiciona uma nova tarefa. Requer um corpo JSON com a seguinte estrutura:
  ```json
  {
    "titulo": "Título da Tarefa",
    "descricao": "Descrição da Tarefa",
    "categoriaId": "ID da Categoria"
  }
  ```
- **PUT** `/api/tarefas/alterar/{id}`: Atualiza o status de uma tarefa pelo seu ID.
- **DELETE** `/api/tarefas/excluir/{id}`: Deleta uma tarefa pelo seu ID.
- **GET** `/api/tarefas/naoconcluidas`: Lista todas as tarefas não concluídas.
- **GET** `/api/tarefas/concluidas`:  Lista todas as tarefas concluídas.

## Páginas do Frontend

### CadastrarTarefa

- Formulário para criar novas tarefas e categorias.
- Menu suspenso para selecionar categorias existentes.
- Botão para criar uma nova categoria, se necessário.

### ListarConcluido

- Exibe todas as tarefas concluídas em formato de tabela.

### ListarNaoConcluidos

- Exibe todas as tarefas não concluídas.
- Opção para atualizar o status de cada tarefa.

### ListarTarefa

- Lista todas as tarefas com seus detalhes.
- Opção para atualizar o status de cada tarefa.

## Dados de Semente do Banco de Dados

O banco de dados é inicializado com dados de exemplo para fins de teste:

### Categorias

| CategoriaId                             | Nome       | CriadoEm  |
|-----------------------------------------|------------|-----------|
| bfe4e7dc-81e4-4e47-a67b-d4fbf3e124bd   | Trabalho   | +1 Day    |
| 6d091456-5a2f-4b5a-98fc-f1a3b50a627d   | Estudos    | +2 Days   |
| 39be53a2-fc09-4b6a-bafa-18a6a23c8f6e   | Lazer      | +3 Days   |

### Tarefas

| TarefaId                               | Titulo             | Descricao                     | CategoriaId                             | Status       | CriadoEm  |
|----------------------------------------|--------------------|-------------------------------|-----------------------------------------|--------------|-----------|
| 6a8b3e4d-5e4e-4f7e-bdc9-9181e456ad0e  | Concluir relatório | Terminar relatório para reunião | bfe4e7dc-81e4-4e47-a67b-d4fbf3e124bd | Não iniciada | +7 Days   |
| 2f1b7dc1-3b9a-4e1a-a389-7f5d2f1c8f3e  | Estudar Angular    | Preparar-se para a aula de Angular | 6d091456-5a2f-4b5a-98fc-f1a3b50a627d | Não iniciada | +3 Days   |
| e5d4a7b9-1f9e-4c4a-ae3b-5b7c1a9d2e3f  | Passeio no parque  | Dar um passeio relaxante no parque | 39be53a2-fc09-4b6a-bafa-18a6a23c8f6e | Não iniciada | +14 Days  |
