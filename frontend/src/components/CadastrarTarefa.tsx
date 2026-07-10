import { useEffect, useState } from "react";
import { Categoria } from "../models/Categoria";
import axios from "axios";
import { Tarefa } from "../models/Tarefas";
import { useNavigate } from "react-router-dom";

function CadastrarTarefa() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [mensagem, setMensagem] = useState<string | null>(null); // Estado para a mensagem
  const [categoriaNome, setCategoriaNome] = useState(""); // Para nova categoria
  const [isNewCategoria, setIsNewCategoria] = useState(false); // Controle se é nova categoria

  useEffect(() => {
    carregarCategorias();
  }, []);

  function carregarCategorias() {
    axios
      .get<Categoria[]>("http://localhost:5000/api/categoria/listar")
      .then((resposta) => {
        setCategorias(resposta.data);
      });
  }

  // Cadastra uma nova categoria
  function cadastrarCategoria(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const categoria = {
      nome: categoriaNome,
    };

    axios
      .post("http://localhost:5000/api/categoria/cadastrar", categoria)
      .then((resposta) => {
        setMensagem("Categoria cadastrada com sucesso!");
        setTimeout(() => setMensagem(null), 3000);
        setCategoriaId(resposta.data.categoriaId); // Atualiza o ID da nova categoria
        carregarCategorias(); // Atualiza a lista de categorias
        setIsNewCategoria(false); // Reseta o estado de nova categoria
      })
      .catch(() => {
        setMensagem("Erro ao cadastrar categoria.");
        setTimeout(() => setMensagem(null), 3000);
      });
  }

  function cadastrarTarefa(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const tarefa: Tarefa = {
      titulo: titulo,
      descricao: descricao,
      categoriaId: categoriaId,
    };

    fetch("http://localhost:5000/api/tarefas/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    })
      .then((resposta) => resposta.json())
      .then((tarefa: Tarefa) => {
        console.log("Tarefa cadastrada:", tarefa);
        setMensagem("Tarefa cadastrada com sucesso!"); // Define a mensagem
        setTimeout(() => setMensagem(null), 3000); // Remove a mensagem após 3 segundos
      })
      .catch(() => {
        setMensagem("Erro ao cadastrar a tarefa.");
        setTimeout(() => setMensagem(null), 3000); // Remove a mensagem após 3 segundos
      });
  }

  return (
    <div>
      <h1>Cadastrar Tarefa</h1>
      <form onSubmit={cadastrarTarefa}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            placeholder="Título"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitulo(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="descricao">Descrição:</label>
          <input
            type="text"
            placeholder="Descrição"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescricao(e.target.value)
            }
          />
        </div>

        <div>
          <label>Categorias:</label>
          <select
            onChange={(e) => setCategoriaId(e.target.value)}
            value={categoriaId}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option value={categoria.categoriaId} key={categoria.categoriaId}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Cadastrar Tarefa</button>

        {/* Mensagem de feedback abaixo do botão */}
        {mensagem && (
          <p style={{ color: "green", marginTop: "10px" }}>{mensagem}</p>
        )}
      </form>

      {/* Exibir formulário para cadastrar nova categoria */}
      <div>
        {!isNewCategoria && (
          <button type="button" onClick={() => setIsNewCategoria(true)}>
            Criar Nova Categoria
          </button>
        )}

        {isNewCategoria && (
          <form onSubmit={cadastrarCategoria}>
            <div>
              <h2>Cadastrar Nova Categoria</h2>
              <label>Nome da Nova Categoria:</label>
              <input
                type="text"
                placeholder="Nome da categoria"
                required
                value={categoriaNome}
                onChange={(e) => setCategoriaNome(e.target.value)}
              />
              <button type="submit">Cadastrar Nova Categoria</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default CadastrarTarefa;
