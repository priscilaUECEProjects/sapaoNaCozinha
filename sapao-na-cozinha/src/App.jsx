import './App.css'

import PaginaCadastro from './components/PaginaCadastro';
import PaginaLogin from './components/PaginaLogin.jsx';
import PaginaInicial from './components/PaginaInicial';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-quinacridone-magenta)] bg-[url('./assets/images/fundo_32021F.png')] bg-repeat bg-[size:500px]">
      <PaginaCadastro />
    <div className='flex items-center justify-center min-h-screen bg-[#e7e5e4]'>
      <PaginaInicial/>
    </div>
  );
}

export default App;
