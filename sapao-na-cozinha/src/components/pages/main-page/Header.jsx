import logo from "../../../assets/img/logo.png";
import { Link } from "react-scroll";

export default function Header() {
  return (
    <header className="bg-[var(--color-hunter-green)] py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo do Site" className="w-15 h-15" />
        <span className="text-2xl font-bold text-[#F4F1E1]">Sapão na Cozinha</span> 
      </div>

      <nav>
      <ul className="flex justify-around gap-4">
          <li>
            <Link to="inicio" smooth={true} duration={500} className="text-[#F4F1E1] font-bold hover:text-[var(--color-dark-green)] cursor-pointer">
              Início
            </Link>
          </li>
          <li>
            <Link to="cadastrar" smooth={true} duration={500} className="text-[#F4F1E1] font-bold hover:text-[var(--color-dark-green)] cursor-pointer">
              Cadastrar
            </Link>
          </li>
          <li>
            <Link to="receitas" smooth={true} duration={500} className="text-[#F4F1E1] font-bold hover:text-[var(--color-dark-green)] cursor-pointer">
              Receitas
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
