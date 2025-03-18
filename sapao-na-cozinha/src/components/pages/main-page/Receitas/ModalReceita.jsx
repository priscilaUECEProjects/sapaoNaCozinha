import { useState } from "react";

import CalculadoraReceita from "./CalculadoraReceita";

export default function ModalReceita({ fecharModal, receita }){
    const [valorReceita, setValorReceita] = useState(0);
    const [novaGramatura, setNovaGramatura] = useState([]);
    const [valorVenda, setValorVenda] = useState(0);
    const [CMV, setCMV] = useState(0);

    const handleValorReceitaChange = (novoValorReceita) => {
        setValorReceita(novoValorReceita);
      };
    
      const handleNovaGramaturaChange = (novaGramaturaCalculada) => {
        console.log('novaGramatura recebida:', novaGramaturaCalculada);
        setNovaGramatura(novaGramaturaCalculada);
      };
    
      const handleValorVendaChange = (novoValorVenda) => {
        setValorVenda(novoValorVenda);
      };
    
      const handleCMVChange = (novoCMV) => {
        setCMV(novoCMV);
      };

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
                      <CalculadoraReceita 
                      receita={receita}
                      setValorReceita={handleValorReceitaChange}
                      setNovaGramatura={handleNovaGramaturaChange}
                      setValorVenda={handleValorVendaChange}
                      setCMV={handleCMVChange} />
                    {(valorReceita > 0 || CMV > 0 || valorVenda > 0) && (
                    <div className="flex gap-2 justify-center mt-5">
                    <p className="text-sm bg-[var(--color-dark-green)] p-[3px] rounded text-[#F4F1E1]">Valor Receita: {valorReceita}</p>
                    <p className="text-sm bg-[var(--color-dark-green)] p-[3px] rounded text-[#F4F1E1]">CMV: {CMV}</p>
                    <p className="text-sm bg-[var(--color-dark-green)] p-[3px] rounded text-[#F4F1E1]">Valor de Venda: {valorVenda}</p>
                    </div>)}
                  </div>
                </div>
    );
}