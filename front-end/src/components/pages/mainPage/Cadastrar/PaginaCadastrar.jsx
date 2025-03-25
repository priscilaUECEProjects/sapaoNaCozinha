import { useState } from "react";

import CadastroIngredientes from "./CadastroIngredientes";
import CadastroReceitas from "./CadastroReceitas";

export default function PaginaCadastrar({usuario}) {
    const [paginaAtiva, setPaginaAtiva] = useState("ingrediente");

    const alternarComponente = (pagina) => {
        setPaginaAtiva(pagina);
    };

    return (
        <div className="conteudo">
            {paginaAtiva === "ingrediente" ? (
                <CadastroIngredientes alternarComponente={alternarComponente} />
            ) : (
                <CadastroReceitas alternarComponente={alternarComponente} usuario={usuario}/>
            )}
        </div>
    );
}
