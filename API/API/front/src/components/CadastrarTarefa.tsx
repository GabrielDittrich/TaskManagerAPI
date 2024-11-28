import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Categoria } from "../models/Categoria";
import axios from "axios";
import { Tarefa } from "../models/Tarefa";
import React from "react";

function CadastrarTarefa() {
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [categorias, setCategorias] = useState<Categoria[]>([]);
  
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
  
    function cadastrarTarefa(e: any) {
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
        .then((resposta) => {
          return resposta.json();
        })
        .then((tarefa: Tarefa) => {
          console.log("Produto cadastrado", tarefa);
        });
    }
  
  
    return (
      <div>
        <h1>Cadastrar Tarefa</h1>
        <form onSubmit={cadastrarTarefa}>
          <div>
            <label>Titulo:</label>
            <input
              type="text"
              placeholder="titulo"
              required
              onChange={(e: any) => setTitulo(e.target.value)}
            />
          </div>
  
          <div>
            <label htmlFor="descricao">Descrição</label>
            <input
              type="text"
              placeholder="descrição"
              onChange={(e: any) => setDescricao(e.target.value)}
            />
          </div>
  
          <div>
            <label htmlFor="quantidade">Categorias</label>
            <select onChange={(e: any) => setCategoriaId(e.target.value)}>
              {categorias.map((categoria) => (
                <option value={categoria.categoriaId} key={categoria.categoriaId}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>
  
          <button type="submit">Cadastrar Produto</button>
        </form>
      </div>
    );
  }
  
  export default CadastrarTarefa;