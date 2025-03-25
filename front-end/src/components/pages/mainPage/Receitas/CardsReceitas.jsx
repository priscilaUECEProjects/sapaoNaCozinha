import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

import ModalReceita from "./ModalReceita";

export default function CardsReceitas({usuario}) {
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    const catchReceitas = async () => {
      try{
        const response = await axios.post('http://localhost:3000/receitas', {
          ID_USUARIO: usuario.EMAIL,
        });
        setReceitas(response.data);
      } catch(error){
        toast.error(`Erro ao buscar receitas do usuário: ${error}`);
      };
    };

    catchReceitas();
  }, [usuario]);

  const abrirModal = (receita) => {
    setReceitaSelecionada(receita);
  };

  const fecharModal = () => {
    setReceitaSelecionada(null);
  };

  return (
    <div className="bg-hunter-green-ligther bg-[url('./assets/img/fundo-verde.png')] bg-repeat bg-[auto_500px] bg-[position:0%_-100%] min-h-screen grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full p-5 gap-x-3 gap-y-2">
      {receitas.map((receita) => (
        <div
          key={receita.ID}
          onClick={() => abrirModal(receita)}
          className="flex items-center justify-center text-[var(--color-dark-green)] font-bold text-2xl cursor-pointer w-full bg-pearl hover:shadow-[-5px_-5px_15px_2px,_5px_5px_15px_2px] hover:shadow-black/50 rounded-xl text-center"
        >
          <h1>{receita.NOME}</h1>
        </div>
      ))}
      { receitaSelecionada && <ModalReceita fecharModal={fecharModal} receita={receitaSelecionada} setReceitas={setReceitas} usuario={usuario}/> }
    </div>
  );
}
