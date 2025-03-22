import './App.css'
import { Routes, Route } from "react-router-dom";
import MainPage from './components/pages/mainPage/MainPage.jsx';

import PaginaCadastro from './components/pages/PaginaCadastro.jsx';
import PaginaLogin from './components/pages/PaginaLogin.jsx';

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="/cadastro" element={<PaginaCadastro />} />
        </Routes>
    </>
  );
}

export default App;