import { useEffect, useState } from "react";
import { Tarefa } from "../models/Tarefas";

function ListarConcluido() {
  
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  
  useEffect(() => {
    carregarTarefas();
  });
  
  function carregarTarefas(){
    fetch("http://localhost:5000/api/tarefas/concluidas")
      .then((resposta) => {
        return resposta.json();
      })
      .then((tarefas) => {
        setTarefas(tarefas);
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
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.tarefaId}>
              <td data-label="Id">{tarefa.tarefaId}</td>
              <td data-label="Titulo">{tarefa.titulo}</td>
              <td data-label="Descricao">{tarefa.descricao}</td>
              <td data-label="Status">{tarefa.status}</td>
              <td  data-label="CriadoEm">{tarefa.criadoEm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  }
  
  export default ListarConcluido;