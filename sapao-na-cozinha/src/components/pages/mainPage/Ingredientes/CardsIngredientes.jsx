import { useState } from "react";
import axios from "axios";
import ModalIngredientes from "./ModalIngredientes";

export default function CardsIngredientes(){
    const [ingredienteSelecionado, setIngredienteSelecionado] = useState(null);

    const ingredientes = [
        { id: 1, nome: "Farinha de Trigo", precoUnitario: 4.50, gramaturaUnidade: 1000 },
        { id: 2, nome: "Açúcar", precoUnitario: 3.20, gramaturaUnidade: 1000 },
        { id: 3, nome: "Ovos", precoUnitario: 0.60, gramaturaUnidade: 50 },
        { id: 4, nome: "Manteiga", precoUnitario: 7.80, gramaturaUnidade: 200 },
        { id: 5, nome: "Leite", precoUnitario: 4.00, gramaturaUnidade: 1000 },
        { id: 6, nome: "Fermento em Pó", precoUnitario: 2.50, gramaturaUnidade: 100 },
        { id: 7, nome: "Chocolate em Pó", precoUnitario: 5.90, gramaturaUnidade: 200 },
        { id: 8, nome: "Amido de Milho", precoUnitario: 3.30, gramaturaUnidade: 500 },
        { id: 9, nome: "Sal", precoUnitario: 1.20, gramaturaUnidade: 1000 },
        { id: 10, nome: "Baunilha", precoUnitario: 8.40, gramaturaUnidade: 30 }
      ];

      useEffect(() => {
        const fetchIngredientes = async () => {
            try {
                const response = await axios.get('http://localhost:3000/INGREDIENTES');
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
        <div className="bg-[var(--color-quinacridone-magenta)] bg-[url('./assets/img/fundo-roxo.png')] bg-repeat bg-[size:500px] min-h-screen grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full p-5 gap-x-3 gap-y-2">
              {ingredientes.map((ingrediente) => (
                <div
                  key={ingrediente.id}
                  onClick={() => abrirModal(ingrediente)}
                  className="flex items-center justify-center text-[#55133b] font-bold text-2xl cursor-pointer w-full bg-pearl hover:shadow-[-5px_-5px_15px_2px,_5px_5px_15px_2px] hover:shadow-black/50 rounded-xl text-center"
                >
                  <h1>{ingrediente.nome}</h1>
                </div>
              ))}
              { ingredienteSelecionado && <ModalIngredientes fecharModal={fecharModal} ingrediente={ingredienteSelecionado} /> }
            </div>
      );
}