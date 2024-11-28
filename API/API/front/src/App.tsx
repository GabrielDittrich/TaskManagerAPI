import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import ListarTarefa from './components/ListarTarefa';
import ListarConcluido from './components/ListarConcluido';
import ListarNaoConcluidos from './components/ListarNaoConcluido';
import CadastrarTarefa from './components/CadastrarTarefa';

function App() {
  return (
    <div>
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/pages/tarefa/listar">Listar Tarefas</Link>
              </li>
              <li>
                <Link to="/pages/tarefa/cadastrar">Cadastrar Tarefas</Link>
              </li>
              <li>
                <Link to="/pages/tarefa/concluidas">Listar Tarefas Concluidas
                </Link>
              </li>
              <li>
                <Link to="pages/tarefa/naoconcluidas">Listar Tarefas não Concluidas</Link>
              </li>

            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<ListarTarefa />} />
            <Route
              path="/pages/tarefa/listar"
              element={<ListarTarefa />}
            />
             <Route
              path="pages/tarefa/concluidas"
              element={<ListarConcluido />}
            />
            <Route
              path="/pages/tarefa/naoconcluidas"
              element={<ListarNaoConcluidos />}
            />
            <Route
              path="/pages/tarefa/cadastrar"
              element={<CadastrarTarefa />}
            />
          </Routes>

        </BrowserRouter>
      </div>
  );
}

export default App;
