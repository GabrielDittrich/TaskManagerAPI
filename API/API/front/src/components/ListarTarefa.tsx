import { useEffect, useState } from "react";
import { Tarefa } from "../models/Tarefa";
import axios from "axios";
import React from "react";

function ListarTarefa() {
  
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

useEffect(() => {
  carregarTarefas();
},[]);

function alterar(id: string) {
  axios
    .put(`http://localhost:5000/api/tarefas/alterar/${id}`)
    .then((resposta) => {
      // setTarefas(resposta.data);
    });
}

function carregarTarefas(){
  fetch("http://localhost:5000/api/tarefas/listar")
    .then((resposta) => {
      return resposta.json();
    })
    .then((tarefas) => {
      setTarefas(tarefas)
    });
}

return (
  <div className="container">
    <h1>Lista de Tarefas</h1>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Titulo</th>
          <th>Descricao</th>
          <th>Status</th>
          <th>Criado Em</th>
          <th>Alterar Status</th>
        </tr>
      </thead>
      <tbody>
        {tarefas.map((tarefa) => (
          <tr key={tarefa.tarefaId}>
            <td>{tarefa.tarefaId}</td>
            <td>{tarefa.titulo}</td>
            <td>{tarefa.descricao}</td>
            <td>{tarefa.status}</td>
            <td>{tarefa.criadoEm}</td>
            <td>
              <button onClick={() => alterar(tarefa.tarefaId!)}>
                Alterar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default ListarTarefa;