import './App.css'
import { Routes, Route } from "react-router-dom";
import MainPage from './components/pages/main-page/MainPage.jsx';

import PaginaCadastro from './components/pages/PaginaCadastro.jsx';
import PaginaLogin from './components/pages/PaginaLogin.jsx';

function App() {
  return (
    <>
      <div>
        <MainPage />
      </div>
        <Routes>
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="/cadastro" element={<PaginaCadastro />} />
        </Routes>
    </>
  );
}

export default App;