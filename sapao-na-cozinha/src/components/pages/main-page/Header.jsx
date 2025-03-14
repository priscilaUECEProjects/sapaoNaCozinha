import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";

export default function Header() {
  return (
    <header className="bg-hunter-green-ligther py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo do Site" className="w-15 h-15" />
        <span className="text-2xl font-bold  text-[#F4F1E1]">Sapão na Cozinha</span> 
      </div>

      <nav>
        <ul className="flex justify-around gap-4 ">
          <li>
            <Link to="#" className="text-[#F4F1E1] font-bold hover:text-[var(--color-dark-green)]">
              Início
            </Link>
          </li>
          <li>
            <Link to="#" className="text-[#F4F1E1] font-bold hover:text-[var(--color-dark-green)]">
              Cadastrar
            </Link>
          </li>
          <li>
            <Link to="#" className="text-[#F4F1E1] font-bold hover:text-[var(--color-dark-green)]">
              Receitas
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}