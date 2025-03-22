import { useState } from "react";

import ModalReceita from "./ModalReceita";

export default function CardsReceitas() {
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);

  const receitas = [
  {
    id: 1,
    nome: "Bolo de Chocolate",
    rendimento: 1000,
    ingredientes: [
      { nome: "Farinha de Trigo", proporcao: 30, preco: 2.5 },
      { nome: "Açúcar", proporcao: 20, preco: 1.8 },
      { nome: "Cacau em Pó", proporcao: 15, preco: 3.2 },
      { nome: "Ovos", proporcao: 20, preco: 4.0 },
      { nome: "Manteiga", proporcao: 10, preco: 2.8 },
      { nome: "Fermento em Pó", proporcao: 5, preco: 1.0 }
    ]
  },
  {
    id: 2,
    nome: "Pão Integral",
    rendimento: 800,
    ingredientes: [
      { nome: "Farinha Integral", proporcao: 50, preco: 4.0 },
      { nome: "Água", proporcao: 30, preco: 0.5 },
      { nome: "Fermento Biológico", proporcao: 10, preco: 1.5 },
      { nome: "Sal", proporcao: 5, preco: 0.2 },
      { nome: "Açúcar Mascavo", proporcao: 5, preco: 0.8 }
    ]
  },
  {
    id: 3,
    nome: "Pizza Margherita",
    rendimento: 1200,
    ingredientes: [
      { nome: "Farinha de Trigo", proporcao: 40, preco: 3.0 },
      { nome: "Molho de Tomate", proporcao: 25, preco: 2.5 },
      { nome: "Queijo Muçarela", proporcao: 20, preco: 5.0 },
      { nome: "Manjericão", proporcao: 5, preco: 1.2 },
      { nome: "Azeite de Oliva", proporcao: 5, preco: 2.0 },
      { nome: "Sal", proporcao: 5, preco: 0.3 }
    ]
  },
  {
    id: 4,
    nome: "Lasanha de Carne",
    rendimento: 1500,
    ingredientes: [
      { nome: "Massa de Lasanha", proporcao: 40, preco: 3.5 },
      { nome: "Molho de Tomate", proporcao: 20, preco: 2.5 },
      { nome: "Carne Moída", proporcao: 20, preco: 6.0 },
      { nome: "Queijo Muçarela", proporcao: 15, preco: 5.0 },
      { nome: "Orégano", proporcao: 5, preco: 0.5 }
    ]
  },
  {
    id: 5,
    nome: "Salada Caesar",
    rendimento: 500,
    ingredientes: [
      { nome: "Alface", proporcao: 40, preco: 1.2 },
      { nome: "Peito de Frango", proporcao: 30, preco: 4.5 },
      { nome: "Queijo Parmesão", proporcao: 10, preco: 3.0 },
      { nome: "Croutons", proporcao: 10, preco: 1.0 },
      { nome: "Molho Caesar", proporcao: 10, preco: 2.0 }
    ]
  },
  {
    id: 6,
    nome: "Risoto de Cogumelos",
    rendimento: 700,
    ingredientes: [
      { nome: "Arroz Arbório", proporcao: 50, preco: 3.5 },
      { nome: "Cogumelos", proporcao: 20, preco: 4.0 },
      { nome: "Caldo de Legumes", proporcao: 20, preco: 1.5 },
      { nome: "Cebola", proporcao: 5, preco: 0.8 },
      { nome: "Parmesão Ralado", proporcao: 5, preco: 2.5 }
    ]
  },
  {
    id: 7,
    nome: "Torta de Limão",
    rendimento: 900,
    ingredientes: [
      { nome: "Farinha de Trigo", proporcao: 30, preco: 2.5 },
      { nome: "Açúcar", proporcao: 20, preco: 1.8 },
      { nome: "Manteiga", proporcao: 20, preco: 2.8 },
      { nome: "Suco de Limão", proporcao: 15, preco: 1.2 },
      { nome: "Leite Condensado", proporcao: 15, preco: 3.5 }
    ]
  },
  {
    id: 8,
    nome: "Panqueca Americana",
    rendimento: 600,
    ingredientes: [
      { nome: "Farinha de Trigo", proporcao: 40, preco: 2.5 },
      { nome: "Ovos", proporcao: 20, preco: 4.0 },
      { nome: "Leite", proporcao: 20, preco: 2.0 },
      { nome: "Manteiga", proporcao: 10, preco: 2.8 },
      { nome: "Fermento em Pó", proporcao: 10, preco: 1.0 }
    ]
  },
  {
    id: 9,
    nome: "Brownie de Chocolate",
    rendimento: 800,
    ingredientes: [
      { nome: "Chocolate Amargo", proporcao: 30, preco: 4.5 },
      { nome: "Açúcar", proporcao: 25, preco: 1.8 },
      { nome: "Manteiga", proporcao: 20, preco: 2.8 },
      { nome: "Ovos", proporcao: 20, preco: 4.0 },
      { nome: "Farinha de Trigo", proporcao: 5, preco: 2.5 }
    ]
  },
  {
    id: 10,
    nome: "Cuscuz Nordestino",
    rendimento: 700,
    ingredientes: [
      { nome: "Farinha de Milho", proporcao: 60, preco: 2.0 },
      { nome: "Água", proporcao: 30, preco: 0.5 },
      { nome: "Sal", proporcao: 5, preco: 0.2 },
      { nome: "Manteiga", proporcao: 5, preco: 2.8 }
    ]
  }
];

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
          key={receita.id}
          onClick={() => abrirModal(receita)}
          className="flex items-center justify-center text-[var(--color-dark-green)] font-bold text-2xl cursor-pointer w-full bg-pearl hover:shadow-[-5px_-5px_15px_2px,_5px_5px_15px_2px] hover:shadow-black/50 rounded-xl text-center"
        >
          <h1>{receita.nome}</h1>
        </div>
      ))}
      { receitaSelecionada && <ModalReceita fecharModal={fecharModal} receita={receitaSelecionada} /> }
    </div>
  );
}
