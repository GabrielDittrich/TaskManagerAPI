import React, { useState } from "react";
import { NavLink, Route, Routes, BrowserRouter } from "react-router-dom";

import ListarTarefa from "./components/ListarTarefa";
import ListarConcluido from "./components/ListarConcluido";
import ListarNaoConcluidos from "./components/ListarNaoConcluido";
import CadastrarTarefa from "./components/CadastrarTarefa";

import "./App.css";

function App() {
  const [menuAberto, setMenuAberto] = useState(false);

  function alternarMenu() {
    setMenuAberto(!menuAberto);
  }

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="navbar-container">
          <NavLink to="/" className="navbar-logo" onClick={fecharMenu}>
            TaskManager
          </NavLink>

          <button
            type="button"
            className="navbar-menu-button"
            onClick={alternarMenu}
            aria-label="Abrir ou fechar menu"
            aria-expanded={menuAberto}
          >
            ☰
          </button>

          <ul className={`navbar-links ${menuAberto ? "menu-aberto" : ""}`}>
            <li>
              <NavLink
                to="/"
                onClick={fecharMenu}
                className={({ isActive }) =>
                  isActive ? "navbar-link-active" : ""
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/pages/tarefa/concluidas"
                onClick={fecharMenu}
                className={({ isActive }) =>
                  isActive ? "navbar-link-active" : ""
                }
              >
                Tarefas concluídas
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/pages/tarefa/naoconcluidas"
                onClick={fecharMenu}
                className={({ isActive }) =>
                  isActive ? "navbar-link-active" : ""
                }
              >
                Tarefas pendentes
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/pages/tarefa/cadastrar"
                onClick={fecharMenu}
                className={({ isActive }) =>
                  isActive ? "navbar-link-active" : ""
                }
              >
                Cadastrar tarefa
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ListarTarefa />} />

        <Route path="/pages/tarefa/concluidas" element={<ListarConcluido />} />

        <Route
          path="/pages/tarefa/naoconcluidas"
          element={<ListarNaoConcluidos />}
        />

        <Route path="/pages/tarefa/cadastrar" element={<CadastrarTarefa />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
