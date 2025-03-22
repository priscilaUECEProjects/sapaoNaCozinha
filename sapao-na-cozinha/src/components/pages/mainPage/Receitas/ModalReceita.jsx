import { useState, useEffect } from "react";

import CalculadoraReceita from "./CalculadoraReceita";

export default function ModalReceita({ fecharModal, receita }){
    const [valorReceita, setValorReceita] = useState(0);
    const [novaGramatura, setNovaGramatura] = useState([]);
    const [valorVenda, setValorVenda] = useState(0);
    const [CMV, setCMV] = useState(0);

    const [editionForm, setEditionform] = useState(false);
    const [editaProporcao, setEditaProporcao] = useState(null);
    const [ingredientesReceita, setIngredientesReceita] = useState([]);
    const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);

    const handleValorReceitaChange = (novoValorReceita) => {
        setValorReceita(novoValorReceita);
      };
    
      const handleNovaGramaturaChange = (novaGramaturaCalculada) => {
        setNovaGramatura(novaGramaturaCalculada);
      };
    
      const handleValorVendaChange = (novoValorVenda) => {
        setValorVenda(novoValorVenda);
      };
    
      const handleCMVChange = (novoCMV) => {
        setCMV(novoCMV);
      };

      const handleClick = () => {
        setEditionform(((prevState) => !prevState));
    };

    const handleEditaProporcao = (index) => {
      setEditaProporcao((prevState) => (prevState === index ? null : index));
    };

    useEffect(() => {
      setIngredientesReceita([
        { id: 1, nome: "Farinha" },
        { id: 2, nome: "Ovo" },
        { id: 3, nome: "Leite" },
        { id: 4, nome: "Açúcar" },
      ]);
    }, []);

    const adicionarIngrediente = () => {
      setIngredientesSelecionados([...ingredientesSelecionados, { id: "", proporcao: ""}]);
  }

    const atualizarIngrediente = (index, campo, valor) => {
        const novosIngredientes = [...ingredientesSelecionados];
        novosIngredientes[index][campo] = valor;
        setIngredientesSelecionados(novosIngredientes);
    }

    const removerIngrediente = (index) => {
        setIngredientesSelecionados(ingredientesSelecionados.filter((_, i) => i !== index));
    }

    return(
                <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center">
                  <div className="bg-pearl p-6 rounded-lg shadow-lg max-w-md w-3/4 relative text-center max-h-[80vh] overflow-y-auto">
                    <button
                      className="absolute font-bold text-4xl top-0 right-2 text-[var(--color-dark-green)] hover:text-[var(--color-hunter-green)] cursor-pointer"
                      onClick={fecharModal}
                    >
                      &times;
                    </button>
                    <h1 className="text-3xl font-bold text-[var(--color-dark-green)] pb-4">{receita.nome}</h1>
                    {novaGramatura.length > 0 ? (
                        <ul>
                            {novaGramatura.map((item, index)=> (
                                <li key={index} className="flex justify-between my-3 text-[var(--color-dark-green)]">
                                    <span>{item.nome}</span>
                                    <span className="font-bold">{item.gramatura}g</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                    <ul>
                      {receita.ingredientes.map((ingrediente, index) => (
                        <li key={index}>{ingrediente.nome}</li>
                      ))}
                    </ul>
                    )}
                    {(valorReceita > 0 || CMV > 0 || valorVenda > 0) && (
                    <div className="flex flex-col sm:flex-row gap-2 justify-between my-3 w-full">
                    <p className="text-xs bg-[var(--color-dark-green)] p-[3px] rounded text-[#F4F1E1]">Valor Receita: {valorReceita}</p>
                    <p className="text-xs bg-[var(--color-dark-green)] p-[3px] w-[30%] rounded text-[#F4F1E1]">CMV: {CMV}</p>
                    <p className="text-xs bg-[var(--color-dark-green)] p-[3px] rounded text-[#F4F1E1]">Valor de Venda: {valorVenda}</p>
                    </div>)}
                      <CalculadoraReceita 
                      receita={receita}
                      setValorReceita={handleValorReceitaChange}
                      setNovaGramatura={handleNovaGramaturaChange}
                      setValorVenda={handleValorVendaChange}
                      setCMV={handleCMVChange} />
                      <div className="flex justify-between mt-4 text-[var(--color-dark-green)]">
                      <span className="material-symbols-outlined hover:text-[var(--color-hunter-green)] cursor-pointer active:text-[var(--color-dark-green)]">delete</span>
                      <span onClick={handleClick} className="material-symbols-outlined hover:text-[var(--color-hunter-green)] cursor-pointer active:text-[var(--color-dark-green)]">edit</span>
                      </div>

                      {editionForm && (
                      <div className="font-bold bg-[#d6d0ae] text-[var(--color-dark-green)] px-2 py-4 rounded mt-3">
                          <h1 className="text-2xl pb-4">Editar Receita</h1>
                          <form className="flex flex-col gap-2 ">
                              <label>Nome:</label>
                              <input type="text" className="border border-[var(--color-dark-green)] rounded" />

                              <ul>
                                {receita.ingredientes.map((ingrediente, index) => (
                                  <li key={index} className="my-2">
                                    <div className="flex items-center justify-between">
                                      <div className="font-normal flex gap-1 text-[12px]">
                                        {ingrediente.nome} - 
                                        <span>{ingrediente.proporcao}%</span>
                                      </div>
                                      
                                      <div className="flex justify-end gap-2">
                                        <span
                                          onClick={() => handleEditaProporcao(index)}
                                          className="material-symbols-outlined hover:text-[var(--color-hunter-green)] cursor-pointer active:text-[var(--color-dark-green)]"
                                        >
                                          edit
                                        </span>
                                        <span className="material-symbols-outlined hover:text-[var(--color-hunter-green)] cursor-pointer active:text-[var(--color-dark-green)]">
                                          delete
                                        </span>
                                      </div>
                                    </div>

                                    {editaProporcao === index && (
                                      <input
                                        type="number"
                                        step="0.01"
                                        className="mt-2 w-full text-[12px] p-1 border rounded-md 
                                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                                        [&::-webkit-inner-spin-button]:appearance-none"
                                        placeholder="Digite a nova proporção"
                                      />
                                    )}
                                  </li>
                                ))}
                              </ul>

                              <div>
                                {ingredientesSelecionados.map((ingrediente, index) => (
                                <div key={index} className="flex flex-col sm:flex-row justify-around gap-2 font-normal w-full my-2">
                                  <select
                                  value={ingrediente.id}
                                  onChange={(event)=> atualizarIngrediente(index, 'id', event.target.value)}
                                  className="border [var(--color-dark-green)] rounded cursor-pointer w-full">
                                  <option value="">Ingrediente:</option>
                                  {ingredientesReceita.map((ing)=> (
                                      <option key={ing.id} value={ing.id}>{ing.nome}</option>
                                  ))}
                                  </select>
                                  <input type="number" step="0.01" placeholder="Proporção(%)" className="border border-[var(--color-dark-green)] rounded w-full
                                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={ingrediente.proporcao}
                                  onChange={(event)=> atualizarIngrediente(index, 'proporcao', event.target.value)}/>
                                  <button type="button" onClick={() => removerIngrediente(index)}>
                                  <span className="material-symbols-outlined cursor-pointer hover:text-[var(--color-dark-green)] w-full">delete</span></button>
                            </div>
                        ))}
                        <button type="button" onClick={adicionarIngrediente} className="font-bold border p-2 rounded cursor-pointer hover:bg-[#f3eed1]">Adicionar Ingredientes</button>
                              </div>


                              <label>Rendimento(g):</label>
                              <input type="number" step="0.01" className="border border-[var(--color-dark-green)] rounded
                              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />

                              <button type="submit" className="p-2 border border-[var(--color-dark-green)] cursor-pointer rounded
                            hover:bg-[var(--color-dark-green)] hover:text-[#F4F1E1] active:bg-[var(--color-hunter-green)]">Salvar</button>
                          </form>
                      </div>
                      )}
                  </div>
                </div>
    );
}