import { useState, useEffect } from "react";
import axios from 'axios';
import {toast} from 'react-toastify'

import CalculadoraReceita from "./CalculadoraReceita";

export default function ModalReceita({ setReceitas, fecharModal, receita, usuario}){
    const [valorReceita, setValorReceita] = useState(0);
    const [novaGramatura, setNovaGramatura] = useState([]);
    const [valorVenda, setValorVenda] = useState(0);
    const [CMV, setCMV] = useState(0);

    const [editionForm, setEditionform] = useState(false);
    const [editaProporcao, setEditaProporcao] = useState(0);
    const [ingredientesReceita, setIngredientesReceita] = useState([]);
    const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);

    const [ingredientesDisponiveis, setIngredientesDisponiveis] = useState([]);
    const [novasProporcoes, setNovasProporcoes] = useState([]);
    const [novasInformacoes, setNovasInformacoes] = useState({
      nome: `${receita.NOME}`,
      rendimento: receita.QNT_PADRAO,
    });

    const handleChangeNovasInformacoes = (e) => {
      setNovasInformacoes({
        ...novasInformacoes,
          [e.target.name]: e.target.value,
      })
  };

  const handleProporcao = (e, ingredienteId) => {
    const value = parseFloat(e.target.value);
    console.log(value)
  
    setNovasProporcoes((prevProporcoes) => {
      const updatedProporcoes = [
        ...prevProporcoes.filter((p) => p.ID_IR !== ingredienteId),
        { ID_IR: ingredienteId, PROPORCAO_INGREDIENTE: value },
      ];
      console.log("Atualizando proporções:", updatedProporcoes);
      return updatedProporcoes;
    });
  };

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

      const handleDeleteReceita = async () => {
        try {
            await axios.delete(`http://localhost:3000/receitas/${receita.ID}`);
            fecharModal();
            setReceitas((prevReceitas) => prevReceitas.filter(r => r.ID !== receita.ID));
        } catch (error) {
            console.error("Erro ao deletar receita:", error.response?.data || error.message);
            toast.error('Erro ao deletar receitas do usuário.');
        }
      };

      const handleClick = () => {
        setEditionform(((prevState) => !prevState));
      };

      const handleEditaProporcao = (index) => {
        setEditaProporcao((prevState) => (prevState === index ? null : index));
      };
  
      useEffect(() => {
        setIngredientesReceita(receita.Ingredientes_receita)
      },[]);

      useEffect(() => {
        
        const GetIngredientes = async () => {
          try{
            const ingredientes = await axios.post("http://localhost:3000/receitas/opcoes",{
              ID_USUARIO: usuario.EMAIL,
            });
            setIngredientesDisponiveis(ingredientes.data);
          } catch(error){
            console.error("Erro ao procurar ingredientes disponíveis:", error.response?.data || error.message);
          }
        }

        GetIngredientes();
      }, []);

      const adicionarIngrediente = () => {
        setIngredientesSelecionados([...ingredientesSelecionados, { ID_INGREDIENTE: 0, PROPORCAO_INGREDIENTE: 0, ID_RECEITA: receita.ID}]);
    }
  
      const atualizarIngrediente = (index, campo, valor) => {
        setIngredientesSelecionados((prevState) => {
          const updated = [...prevState];
          updated[index][campo] = valor;
          return updated;
      });
      console.log(ingredientesSelecionados)
      }

      const removerIngrediente = (index) => {
        setIngredientesSelecionados(ingredientesSelecionados.filter((_, i) => i !== index));
      }
  
      const removerIngredienteExistente = (ID_IR) => {
        const deletando = async () => {
          try {
              await axios.delete(`http://localhost:3000/receitas/ingrediente/${ID_IR}`);
              setIngredientesReceita((prevIngredientes) =>
                prevIngredientes.filter((ingrediente) => ingrediente.ID_IR !== ID_IR)
              );
                toast.success("Ingrediente removido com sucesso");
              } catch (error) {
                toast.error("Erro ao deletar ingrediente da receita.");
              }
            };
          
            deletando();
          };

      const handleAlterar = async () => {
        const ingredientesTransformados = ingredientesSelecionados.map((ingrediente) => ({
          ID_INGREDIENTE: parseInt(ingrediente.ID_INGREDIENTE, 10),
          PROPORCAO_INGREDIENTE: parseFloat(ingrediente.PROPORCAO_INGREDIENTE),
          ID_RECEITA: ingrediente.ID_RECEITA 
        }));
        const receitaAtualizada = {
          NOME: novasInformacoes.nome,
          QNT_PADRAO: novasInformacoes.rendimento,
          Ingredientes_receita: [...novasProporcoes, ...ingredientesTransformados],
        };
      
        try {
          const response = await axios.put(`http://localhost:3000/receitas/${receita.ID}`, receitaAtualizada);
      
          if (response.status === 200) {
            console.log('Receita atualizada com sucesso:', response.data);
            toast.success('Receita atualizada com sucesso!');
          }
        } catch (error) {
          console.error('Erro ao atualizar a receita:', error.response?.data || error.message);
          toast.error('Erro ao atualizar a receita.');
        }
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
                    <h1 className="text-3xl font-bold text-[var(--color-dark-green)] pb-4">{receita.NOME}</h1>
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
                      {ingredientesReceita?.map((ingrediente) => (
                        <li key={ingrediente.ID_IR}>{ingrediente.Ingredientes.NOME}</li>
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
                      <span className="material-symbols-outlined hover:text-[var(--color-hunter-green)] cursor-pointer active:text-[var(--color-dark-green)]" onClick={handleDeleteReceita}>delete</span>
                      <span  onClick={handleClick} className="material-symbols-outlined hover:text-[var(--color-hunter-green)] cursor-pointer active:text-[var(--color-dark-green)]">edit</span>
                      </div>

                      {editionForm && (
                      <div className="font-bold bg-[#d6d0ae] text-[var(--color-dark-green)] px-2 py-4 rounded mt-3">
                          <h1 className="text-2xl pb-4">Editar Receita</h1>
                          <form onSubmit={handleAlterar} className="flex flex-col gap-2 ">
                              <label>Nome:</label>
                              <input type="text" className="border border-[var(--color-dark-green)] rounded" name="nome" value={novasInformacoes.nome} onChange={handleChangeNovasInformacoes}/>

                              <ul>
                                {ingredientesReceita?.map((ingrediente) => (
                                  <li key={ingrediente.ID_IR} className="my-2">
                                    <div className="flex items-center justify-between">
                                      <div className="font-normal flex gap-1 text-[12px]">
                                        {ingrediente.Ingredientes.NOME} - 
                                        <span>{ingrediente.PROPORCAO_INGREDIENTE}%</span>
                                      </div>
                                      
                                      <div className="flex justify-end gap-2">
                                        <span
                                          onClick={() => handleEditaProporcao(ingrediente.ID_IR)}
                                          className="material-symbols-outlined hover:text-[var(--color-hunter-green)] cursor-pointer active:text-[var(--color-dark-green)]"
                                        >
                                          edit
                                        </span>
                                        <span onClick={() => removerIngredienteExistente(ingrediente.ID_IR)} className="material-symbols-outlined hover:text-[var(--color-hunter-green)] cursor-pointer active:text-[var(--color-dark-green)]">
                                          delete
                                        </span>
                                      </div>
                                    </div>

                                    {editaProporcao === ingrediente.ID_IR && (
                                      <input
                                        type="number"
                                        step="0.01"
                                        className="mt-2 w-full text-[12px] p-1 border rounded-md 
                                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                                        [&::-webkit-inner-spin-button]:appearance-none"
                                        placeholder="Digite a nova proporção"
                                        onChange={(e) => handleProporcao(e, ingrediente.ID_IR)}
                                      />
                                    )}
                                  </li>
                                ))}
                              </ul>

                              <div>
                                {ingredientesSelecionados.map((ingrediente,index) => (
                                <div key={index} className="flex flex-col sm:flex-row justify-around gap-2 font-normal w-full my-2">
                                  <select
                                  value={ingrediente.ID}
                                  onChange={(event)=> atualizarIngrediente(index, 'ID_INGREDIENTE', event.target.value)}
                                  className="border [var(--color-dark-green)] rounded cursor-pointer w-full">
                                  <option value="">Ingrediente:</option>
                                  {ingredientesDisponiveis.map((ing)=> (
                                    <option key={ing.ID || `fallback-${ing.ID}`} value={ing.ID || ''}>
                                      {ing.NOME || 'Ingrediente Desconhecido'}
                                    </option>
                                  ))}
                                  </select>
                                  <input type="number" step="0.01" placeholder="Proporção(%)" className="border border-[var(--color-dark-green)] rounded w-full
                                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={ingrediente.proporcao}
                                  onChange={(event)=> atualizarIngrediente(index, 'PROPORCAO_INGREDIENTE', event.target.value)} />
                                  <button type="button" onClick={() => removerIngrediente(index)}>
                                  <span className="material-symbols-outlined cursor-pointer hover:text-[var(--color-dark-green)] w-full">delete</span></button>
                            </div>
                        ))}
                        <button type="button" onClick={adicionarIngrediente} className="font-bold border p-2 rounded cursor-pointer hover:bg-[#f3eed1]">Adicionar Ingredientes</button>
                              </div>


                              <label>Rendimento(g):</label>
                              <input type="number" step="0.01" name="rendimento" value={novasInformacoes.rendimento} onChange={handleChangeNovasInformacoes} className="border border-[var(--color-dark-green)] rounded
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
