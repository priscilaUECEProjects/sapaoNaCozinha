import { useState } from "react";

export default function Cards() {
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);
  const [precoReceita, setPreco] = useState(0);
  const [materialReceita, setMaterial] = useState(0);

  const receitas = [
    { id: "receita1", nome: "Cookies", rende: 23, itens: [{nome: "Item 1", quantidadeReceita: 100, precoProduto: 8.50, quantidadeProduto: 1000}, {nome: "Item 2", quantidadeReceita: 50, precoProduto: 9.90, quantidadeProduto: 1000}, {nome: "Item 3", quantidadeReceita: 200, precoProduto: 6.50, quantidadeProduto: 1000}, {nome: "Item 4", quantidadeReceita: 75, precoProduto: 8.50, quantidadeProduto: 1000}, {nome: "Item 5", quantidadeReceita: 60, precoProduto: 10.50, quantidadeProduto: 1000}] },
    { id: "receita2", nome: "Bolo de cenoura", rende: 16, itens: [{nome: "Item 1", quantidadeReceita: 100, precoProduto: 10, quantidadeProduto: 1000}, {nome: "Item 2", quantidadeReceita: 50, precoProduto: 10, quantidadeProduto: 1000}, {nome: "Item 3", quantidadeReceita: 200, precoProduto: 10, quantidadeProduto: 1000}, {nome: "Item 4", quantidadeReceita: 75, precoProduto: 10, quantidadeProduto: 1000}, {nome: "Item 5", quantidadeReceita: 60, precoProduto: 10, quantidadeProduto: 1000}] },
    { id: "receita3", nome: "Lasanha bolonhesa", rende: 8, itens: [{nome: "Item 1", quantidadeReceita: 100, precoProduto: 8.50, quantidadeProduto: 1000}, {nome: "Item 2", quantidadeReceita: 50, precoProduto: 9.90, quantidadeProduto: 1000}, {nome: "Item 3", quantidadeReceita: 200, precoProduto: 6.50, quantidadeProduto: 1000}, {nome: "Item 4", quantidadeReceita: 75, precoProduto: 8.50, quantidadeProduto: 1000}, {nome: "Item 5", quantidadeReceita: 60, precoProduto: 10.50, quantidadeProduto: 1000}] },
    { id: "receita4", nome: "Pastel", rende: 10, itens: [{nome: "Item 1", quantidadeReceita: 100, precoProduto: 8.50, quantidadeProduto: 1000}, {nome: "Item 2", quantidadeReceita: 50, precoProduto: 9.90, quantidadeProduto: 1000}, {nome: "Item 3", quantidadeReceita: 200, precoProduto: 6.50, quantidadeProduto: 1000}, {nome: "Item 4", quantidadeReceita: 75, precoProduto: 8.50, quantidadeProduto: 1000}, {nome: "Item 5", quantidadeReceita: 60, precoProduto: 10.50, quantidadeProduto: 1000}] },
    { id: "receita5", nome: "Salgado de forno", rende: 10, itens: [{nome: "Item 1", quantidadeReceita: 100, precoProduto: 8.50, quantidadeProduto: 1000}, {nome: "Item 2", quantidadeReceita: 50, precoProduto: 9.90, quantidadeProduto: 1000}, {nome: "Item 3", quantidadeReceita: 200, precoProduto: 6.50, quantidadeProduto: 1000}, {nome: "Item 4", quantidadeReceita: 75, precoProduto: 8.50, quantidadeProduto: 1000}, {nome: "Item 5", quantidadeReceita: 60, precoProduto: 10.50, quantidadeProduto: 1000}] },
    { id: "receita6", nome: "Bolinha", rende: 10, itens: [{nome: "Item 1", quantidadeReceita: 100, precoProduto: 8.50, quantidadeProduto: 1000}, {nome: "Item 2", quantidadeReceita: 50, precoProduto: 9.90, quantidadeProduto: 1000}, {nome: "Item 3", quantidadeReceita: 200, precoProduto: 6.50, quantidadeProduto: 1000}, {nome: "Item 4", quantidadeReceita: 75, precoProduto: 8.50, quantidadeProduto: 1000}, {nome: "Item 5", quantidadeReceita: 60, precoProduto: 10.50, quantidadeProduto: 1000}] },
    { id: "receita7", nome: "Pao de queijo", rende: 10, itens: [{nome: "Item 1", quantidadeReceita: 100, precoProduto: 8.50, quantidadeProduto: 1000}, {nome: "Item 2", quantidadeReceita: 50, precoProduto: 9.90, quantidadeProduto: 1000}, {nome: "Item 3", quantidadeReceita: 200, precoProduto: 6.50, quantidadeProduto: 1000}, {nome: "Item 4", quantidadeReceita: 75, precoProduto: 8.50, quantidadeProduto: 1000}, {nome: "Item 5", quantidadeReceita: 60, precoProduto: 10.50, quantidadeProduto: 1000}] },
    { id: "receita8", nome: "Bolo de microondas", rende: 10, itens: [{nome: "Item 1", quantidadeReceita: 100, precoProduto: 8.50, quantidadeProduto: 1000}, {nome: "Item 2", quantidadeReceita: 50, precoProduto: 9.90, quantidadeProduto: 1000}, {nome: "Item 3", quantidadeReceita: 200, precoProduto: 6.50, quantidadeProduto: 1000}, {nome: "Item 4", quantidadeReceita: 75, precoProduto: 8.50, quantidadeProduto: 1000}, {nome: "Item 5", quantidadeReceita: 60, precoProduto: 10.50, quantidadeProduto: 1000}] },
  ];

  const abrirModal = (receita) => {
    setReceitaSelecionada(receita);
    calcular(receita);
  };

  const fecharModal = () => {
    setReceitaSelecionada(null);
    setPreco(0);
    setMaterial(0);
  };

  function calcular(receita){
    var i = 0;
    let preco = 0;
    let material = 0;
    while(i < receita.itens.length){
      let novoPreco = receita.itens[i].quantidadeReceita * receita.itens[i].precoProduto / receita.itens[i].quantidadeProduto;
      preco = preco + novoPreco;
      material = material + receita.itens[i].precoProduto;
      console.log(preco);
      i++;
    };

    setPreco(preco);
    setMaterial(material);
  }

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

      {receitaSelecionada && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center">
          <div className="bg-pearl p-6 rounded-lg shadow-lg max-w-md w-3/4 relative text-center">
            <button
              className="absolute font-bold text-4xl top-0 right-2 text-[var(--color-dark-green)] hover:text-[var(--color-hunter-green)] cursor-pointer"
              onClick={fecharModal}
            >
              &times;
            </button>
            <h1 className="text-3xl font-bold text-[var(--color-dark-green)] pb-4">{receitaSelecionada.nome}</h1>
            <ul>
              {receitaSelecionada.itens.map((item, index) => (
                <li key={index}>{item.nome} -------- {item.quantidadeReceita}g</li>
              ))}
            </ul><br />
            <p>Essa receita rende {receitaSelecionada.rende} unidades.</p>
            <p>A unidade dessa receita custa {precoReceita.toFixed(2)}.</p>
            <p>Os materiais para essa receita custam ao todo {materialReceita.toFixed(2)}.</p>
          </div>
        </div>
      )}
    </div>
  );
}
