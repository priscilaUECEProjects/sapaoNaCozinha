import { useState } from "react";

import CadastroIngredientes from "./CadastroIngredientes";
import CadastroReceitas from "./CadastroReceitas";

export default function PaginaCadastrar() {
    const [paginaAtiva, setPaginaAtiva] = useState("ingrediente");

    const alternarComponente = (pagina) => {
        setPaginaAtiva(pagina);
    };

    return (
        <div className="conteudo">
            {paginaAtiva === "ingrediente" ? (
                <CadastroIngredientes alternarComponente={alternarComponente} />
            ) : (
                <CadastroReceitas alternarComponente={alternarComponente} />
            )}
        </div>
    );
}