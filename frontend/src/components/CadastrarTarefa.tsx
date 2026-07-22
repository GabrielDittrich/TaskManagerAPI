import { useEffect, useState } from "react";
import { Categoria } from "../models/Categoria";
import axios from "axios";
import { Tarefa } from "../models/Tarefas";
import API_URL from "../config/api";

function CadastrarTarefa() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [categoriaNome, setCategoriaNome] = useState("");
  const [isNewCategoria, setIsNewCategoria] = useState(false);

  useEffect(() => {
    carregarCategorias();
  }, []);

  function exibirMensagem(texto: string) {
    setMensagem(texto);

    setTimeout(() => {
      setMensagem(null);
    }, 3000);
  }

  function carregarCategorias() {
    axios
      .get<Categoria[]>(`${API_URL}/api/categoria/listar`)
      .then((resposta) => {
        setCategorias(resposta.data);
      })
      .catch(() => {
        exibirMensagem("Erro ao carregar as categorias.");
      });
  }

  function cadastrarCategoria(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const categoria = {
      nome: categoriaNome,
    };

    axios
      .post(`${API_URL}/api/categoria/cadastrar`, categoria)
      .then((resposta) => {
        exibirMensagem("Categoria cadastrada com sucesso!");

        setCategoriaId(String(resposta.data.categoriaId));
        setCategoriaNome("");
        setIsNewCategoria(false);

        carregarCategorias();
      })
      .catch(() => {
        exibirMensagem("Erro ao cadastrar categoria.");
      });
  }

  function cadastrarTarefa(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const tarefa: Tarefa = {
      titulo,
      descricao,
      categoriaId,
    };

    fetch("http://localhost:5000/api/tarefas/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Erro ao cadastrar tarefa");
        }

        return resposta.json();
      })
      .then((tarefaCadastrada: Tarefa) => {
        console.log("Tarefa cadastrada:", tarefaCadastrada);

        exibirMensagem("Tarefa cadastrada com sucesso!");

        setTitulo("");
        setDescricao("");
        setCategoriaId("");
      })
      .catch(() => {
        exibirMensagem("Erro ao cadastrar a tarefa.");
      });
  }

  const mensagemDeErro = mensagem?.startsWith("Erro");

  return (
    <main className="form-page">
      <section className="task-form-card">
        <header className="task-form-header">
          <span className="task-form-eyebrow">Gerenciamento de tarefas</span>

          <h1>Cadastrar tarefa</h1>

          <p>
            Preencha os campos abaixo para adicionar uma nova tarefa ao
            TaskManager.
          </p>
        </header>

        <form className="task-form" onSubmit={cadastrarTarefa}>
          <div className="form-field">
            <label htmlFor="titulo">Título</label>

            <input
              id="titulo"
              type="text"
              placeholder="Ex.: Finalizar documentação da API"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="descricao">Descrição</label>

            <textarea
              id="descricao"
              placeholder="Descreva o que precisa ser realizado"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={4}
            />
          </div>

          <div className="form-field">
            <label htmlFor="categoria">Categoria</label>

            <select
              id="categoria"
              required
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>

              {categorias.map((categoria) => (
                <option
                  value={categoria.categoriaId}
                  key={categoria.categoriaId}
                >
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="task-submit-button">
            Cadastrar tarefa
          </button>
        </form>

        <div className="category-divider">
          <span>ou</span>
        </div>

        {!isNewCategoria && (
          <button
            type="button"
            className="category-toggle-button"
            onClick={() => setIsNewCategoria(true)}
          >
            + Criar nova categoria
          </button>
        )}

        {isNewCategoria && (
          <section className="category-form-panel">
            <header className="category-form-header">
              <div>
                <span>Nova categoria</span>
                <h2>Cadastrar categoria</h2>
              </div>

              <button
                type="button"
                className="category-close-button"
                aria-label="Fechar cadastro de categoria"
                onClick={() => {
                  setIsNewCategoria(false);
                  setCategoriaNome("");
                }}
              >
                ×
              </button>
            </header>

            <p>Crie uma categoria para organizar melhor suas tarefas.</p>

            <form className="category-form" onSubmit={cadastrarCategoria}>
              <div className="form-field">
                <label htmlFor="categoriaNome">Nome da nova categoria</label>

                <input
                  id="categoriaNome"
                  type="text"
                  placeholder="Ex.: Estudos"
                  required
                  value={categoriaNome}
                  onChange={(e) => setCategoriaNome(e.target.value)}
                />
              </div>

              <button type="submit" className="task-submit-button">
                Cadastrar categoria
              </button>
            </form>
          </section>
        )}

        {mensagem && (
          <p
            role="status"
            className={`form-feedback ${
              mensagemDeErro ? "form-feedback-error" : "form-feedback-success"
            }`}
          >
            {mensagem}
          </p>
        )}
      </section>
    </main>
  );
}

export default CadastrarTarefa;
