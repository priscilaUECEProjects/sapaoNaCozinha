import { useState, useEffect } from "react";
import axios from "axios";

import ModalIngredientes from "./ModalIngredientes";

export default function CardsIngredientes({usuario}){
    const [ingredienteSelecionado, setIngredienteSelecionado] = useState(null);
    const [ingredientes, setIngredientes] = useState([]);

    useEffect(() => {
      const fetchIngredientes = async () => {
          try {
              const response = await axios.post('http://localhost:3000/INGREDIENTES', {
                ID_USUARIO: usuario.EMAIL,
              });
              setIngredientes(response.data);
          } catch (error) {
              console.error('Erro ao obter ingredientes', error);
          }
      };

      fetchIngredientes();
  }, []);

      const abrirModal = (ingrediente) => {
        setIngredienteSelecionado(ingrediente);
      };
    
      const fecharModal = () => {
        setIngredienteSelecionado(null);
      };
      
      return(
        <div className="bg-[var(--color-quinacridone-magenta)] bg-[url('./assets/img/fundo-roxo.png')] bg-repeat bg-[size:500px] bg-[position:0%_-200%] min-h-screen grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full p-5 gap-x-3 gap-y-2">
              {ingredientes.map((ingrediente) => (
                <div
                  key={ingrediente.ID}
                  onClick={() => abrirModal(ingrediente)}
                  className="flex items-center justify-center text-[#55133b] font-bold text-2xl cursor-pointer w-full bg-pearl hover:shadow-[-5px_-5px_15px_2px,_5px_5px_15px_2px] hover:shadow-black/50 rounded-xl text-center"
                >
                  <h1>{ingrediente.NOME}</h1>
                </div>
              ))}
              { ingredienteSelecionado && <ModalIngredientes fecharModal={fecharModal} ingrediente={ingredienteSelecionado} setIngredientes={setIngredientes} /> }
            </div>
      );
}
