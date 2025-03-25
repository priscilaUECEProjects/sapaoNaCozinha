import './App.css'
import { Routes, Route } from "react-router-dom";
import MainPage from './components/pages/mainPage/MainPage.jsx';
import PrivateRoute from "./components/pages/PrivateRoute.jsx"
import PaginaCadastro from './components/pages/PaginaCadastro.jsx';
import PaginaLogin from './components/pages/PaginaLogin.jsx';

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<PaginaLogin />} />
          <Route path="/cadastro" element={<PaginaCadastro />} />
          <Route path="/SapaoNaCozinha" element={<PrivateRoute><MainPage /></PrivateRoute>} />
        </Routes>
    </>
  );
}

export default App;
