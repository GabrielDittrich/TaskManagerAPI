# TaskManager Frontend

Interface web da aplicação **TaskManager**, desenvolvida com **React** e **TypeScript**.

O frontend consome a API ASP.NET Core e permite cadastrar, visualizar e organizar tarefas e categorias em uma interface responsiva.

Para uma visão geral do projeto, consulte o [README principal](../README.md).

---

## Funcionalidades

- Listagem de todas as tarefas
- Listagem de tarefas concluídas
- Listagem de tarefas pendentes
- Cadastro de tarefas
- Cadastro de categorias
- Alteração do status das tarefas
- Navegação entre páginas
- Destaque visual da rota atual
- Menu responsivo para dispositivos móveis
- Feedback de sucesso e erro
- Interface adaptada para desktop, tablet e celular
- Integração com a API utilizando Axios e Fetch API

---

## Tecnologias utilizadas

- React
- TypeScript
- React Router DOM
- Axios
- Fetch API
- HTML
- CSS
- Create React App

---

## Estrutura do frontend

```text
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── CadastrarTarefa.tsx
│   │   ├── ListarConcluido.tsx
│   │   ├── ListarNaoConcluido.tsx
│   │   └── ListarTarefa.tsx
│   │
│   ├── config/
│   │   └── api.ts
│   │
│   ├── models/
│   │   ├── Categoria.ts
│   │   └── Tarefas.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── global.d.ts
│   └── index.tsx
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

> Alguns nomes podem variar conforme a estrutura atual do projeto.

---

## Principais componentes

| Componente | Responsabilidade |
|---|---|
| `App` | Configura as rotas e o menu de navegação |
| `ListarTarefa` | Exibe todas as tarefas e permite alterar o status |
| `ListarConcluido` | Exibe as tarefas concluídas |
| `ListarNaoConcluido` | Exibe as tarefas ainda não concluídas |
| `CadastrarTarefa` | Permite cadastrar tarefas e categorias |

---

## Rotas da aplicação

| Rota | Página |
|---|---|
| `/` | Lista de todas as tarefas |
| `/pages/tarefa/concluidas` | Lista de tarefas concluídas |
| `/pages/tarefa/naoconcluidas` | Lista de tarefas pendentes |
| `/pages/tarefa/cadastrar` | Cadastro de tarefas e categorias |

---

## Interface responsiva

A interface possui adaptações para diferentes tamanhos de tela.

### Desktop

- Menu horizontal
- Tabelas com colunas
- Formulários centralizados
- Área de conteúdo com largura máxima

### Celular

- Menu recolhível
- Tarefas apresentadas como cards
- Campos ocupando a largura disponível
- Botões maiores para facilitar o toque
- Labels e valores organizados verticalmente

---

## Variável de ambiente

O endereço da API é definido pela variável:

```env
REACT_APP_API_URL
```

O arquivo local deve ficar em:

```text
frontend/.env
```

Exemplo:

```env
REACT_APP_API_URL=http://localhost:5000
```

A configuração é lida pelo arquivo:

```text
src/config/api.ts
```

Exemplo:

```ts
const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  throw new Error(
    "A variável REACT_APP_API_URL não foi configurada no arquivo .env."
  );
}

export default API_URL;
```

Nos componentes, a URL é reutilizada desta forma:

```ts
import API_URL from "../config/api";

fetch(`${API_URL}/api/tarefas/listar`);
```

Assim, quando a porta do backend mudar, não é necessário alterar todos os componentes.

---

## Arquivos `.env` e `.env.example`

### `.env`

O arquivo `.env` contém a configuração utilizada localmente:

```env
REACT_APP_API_URL=http://localhost:5000
```

Esse arquivo não deve ser enviado ao GitHub.

### `.env.example`

O `.env.example` deve ser versionado e serve como modelo:

```env
REACT_APP_API_URL=http://localhost:5000
```

Quem clonar o projeto deve copiar o exemplo:

```bash
cp .env.example .env
```

Depois, deve ajustar a porta conforme o backend.

> Variáveis utilizadas no frontend ficam disponíveis no código enviado ao navegador. Não coloque senhas, tokens privados ou credenciais de banco no `.env` do React.

---

## Como executar

### Pré-requisitos

Tenha instalado:

- Node.js
- npm
- Git
- Backend do TaskManager em execução

Confira as versões:

```bash
node --version
npm --version
git --version
```

---

### 1. Entrar na pasta do frontend

Partindo da raiz do projeto:

```bash
cd frontend
```

---

### 2. Instalar as dependências

```bash
npm install
```

---

### 3. Criar o arquivo `.env`

```bash
cp .env.example .env
```

Confira o conteúdo:

```bash
cat .env
```

Exemplo:

```env
REACT_APP_API_URL=http://localhost:5000
```

Caso o backend esteja na porta `5273`, altere para:

```env
REACT_APP_API_URL=http://localhost:5273
```

---

### 4. Executar o frontend

```bash
npm start
```

A aplicação será disponibilizada em:

```text
http://localhost:3000
```

---

## Reiniciar após alterar o `.env`

O React lê as variáveis de ambiente quando o servidor é iniciado.

Depois de alterar o `.env`, pare a aplicação:

```text
Ctrl + C
```

Execute novamente:

```bash
npm start
```

Apenas atualizar a página do navegador não recarrega as variáveis.

---

## Comunicação com a API

O frontend utiliza endpoints como:

```text
GET    /api/tarefas/listar
GET    /api/tarefas/concluidas
GET    /api/tarefas/naoconcluidas
POST   /api/tarefas/cadastrar
PUT    /api/tarefas/alterar/{id}
GET    /api/categoria/listar
POST   /api/categoria/cadastrar
```

Exemplo utilizando Fetch API:

```ts
fetch(`${API_URL}/api/tarefas/listar`)
  .then((resposta) => resposta.json())
  .then((tarefas) => {
    setTarefas(tarefas);
  });
```

Exemplo utilizando Axios:

```ts
axios
  .get(`${API_URL}/api/categoria/listar`)
  .then((resposta) => {
    setCategorias(resposta.data);
  });
```

---

## Uso correto do `useEffect`

As tarefas e categorias são carregadas quando o componente é iniciado:

```tsx
useEffect(() => {
  carregarTarefas();
}, []);
```

O array vazio evita que a requisição seja executada depois de toda renderização.

Sem o array:

```tsx
useEffect(() => {
  carregarTarefas();
});
```

o componente pode criar um ciclo de requisições:

```text
Renderização
    ↓
Requisição
    ↓
Atualização do estado
    ↓
Nova renderização
    ↓
Nova requisição
```

---

## Scripts disponíveis

### Executar em desenvolvimento

```bash
npm start
```

### Criar uma versão de produção

```bash
npm run build
```

### Executar testes

```bash
npm test
```

> Os scripts disponíveis dependem da configuração atual do `package.json`.

---

## Como testar

Com o backend e o frontend em execução:

1. Abra `http://localhost:3000`.
2. Verifique se as tarefas são carregadas.
3. Acesse a página de cadastro.
4. Cadastre uma categoria.
5. Cadastre uma tarefa usando essa categoria.
6. Retorne à página inicial.
7. Altere o status da tarefa.
8. Confira as páginas de tarefas concluídas e pendentes.
9. Teste a aplicação em uma largura de celular.

No navegador, abra o DevTools:

```text
F12
```

Ative o modo responsivo:

```text
Ctrl + Shift + M
```

Larguras recomendadas:

```text
375px
414px
768px
1024px
```

---

## Verificar requisições

No DevTools:

```text
F12 → Network
```

Ao carregar uma página, deve haver uma ou poucas requisições para o endpoint correspondente.

As chamadas não devem continuar sendo criadas sem parar.

Para localizar URLs fixas no código, execute dentro de `frontend`:

```bash
grep -Rni "localhost" src
```

O ideal é que a URL esteja centralizada em:

```text
src/config/api.ts
```
