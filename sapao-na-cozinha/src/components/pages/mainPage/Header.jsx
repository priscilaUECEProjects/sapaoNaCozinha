import logo from "../../../assets/img/logo.png";
import { Link } from "react-scroll";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [visivel, setVisivel] = useState(true);
  const ultimoScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > ultimoScrollY.current) {
        setVisivel(false);
      } else {
        setVisivel(true);
      }
      ultimoScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSair = () =>{
    localStorage.removeItem('authToken');
    window.location.href = '/';
  }

  return (
    <header
      className={`bg-[var(--color-hunter-green)] py-4 px-6 flex justify-between items-center fixed w-full top-0 transition-transform duration-300 ${
        visivel ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo do Site" className="w-15 h-15" />
        <span className="text-2xl font-bold text-[#F4F1E1] hidden sm:block ">Sapão na Cozinha</span>
      </div>

      <nav>
        <ul className="flex justify-around gap-4">
          <li>
            <Link
              to="inicio"
              smooth={true}
              duration={500}
              className="text-[#F4F1E1] font-bold text-xs md:text-[20px] hover:text-[var(--color-dark-green)] cursor-pointer"
            >
              Início
            </Link>
          </li>
          <li>
            <Link
              to="cadastrar"
              smooth={true}
              duration={500}
              className="text-[#F4F1E1] font-bold text-xs md:text-[20px] hover:text-[var(--color-dark-green)] cursor-pointer"
            >
              Cadastrar
            </Link>
          </li>
          <li>
            <Link
              to="receitas"
              smooth={true}
              duration={500}
              className="text-[#F4F1E1] font-bold text-xs md:text-[20px] hover:text-[var(--color-dark-green)] cursor-pointer"
            >
              Receitas
            </Link>
          </li>
          <li>
            <Link
              to="ingredientes"
              smooth={true}
              duration={500}
              className="text-[#F4F1E1] font-bold text-xs md:text-[20px] hover:text-[var(--color-dark-green)] cursor-pointer"
            >
              Ingredientes
            </Link>
          </li>
          <li>
            <Link onClick={handleSair} className="text-[#ff0000] font-bold text-xs md:text-[20px] hover:text-[var(--color-dark-green)] cursor-pointer">Sair</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
