import './App.css'
import { Routes, Route } from "react-router-dom";

import PaginaCadastro from './components/pages/PaginaCadastro.jsx';
import PaginaLogin from './components/pages/PaginaLogin.jsx';
import PaginaInicial from './components/pages/main-page/PaginaInicial.jsx';
import CadastroIngredientes from './components/pages/main-page/Cadastrar/CadastroIngredientes.jsx';
import CadastroReceitas from './components/pages/main-page/Cadastrar/CadastroReceitas.jsx';

function App() {
  return (
      <Routes>
        <Route path="/" element={<PaginaLogin />} />
        <Route path="/cadastro" element={<PaginaCadastro />} />
        <Route path="/home" element={<PaginaInicial />} />
        <Route path="/cadastrar-ingredientes" element={<CadastroIngredientes />} />
        <Route path="/cadastrar-receitas" element={<CadastroReceitas />} />
      </Routes>
  );
}

export default App;