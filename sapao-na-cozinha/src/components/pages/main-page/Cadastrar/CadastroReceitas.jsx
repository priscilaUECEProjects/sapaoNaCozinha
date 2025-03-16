import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CadastroReceita({ alternarComponente }) {
    const [nomeReceita, setNomeReceita] = useState('');
    const [ingredientesReceita, setIngredientesReceita] = useState([]);
    const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const dadosReceita = {
            nome: nomeReceita,
            ingredientes: ingredientesSelecionados,
        }
        console.log('cadastro de receita feito com sucesso', dadosReceita);
    }
    return(
        <div className="flex items-center justify-center min-h-screen  bg-[var(--color-quinacridone-magenta)] bg-[url('./assets/img/fundo-roxo.png')] bg-repeat bg-[size:500px]">
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8 px-2 py-4 sm:p-4 bg-[var(--color-pearl)] rounded max-h-[80vh] shadow-[-10px_-10px_30px_4px,_10px_10px_30px_4px] text-[#55133b] overflow-y-auto">

                    <label htmlFor="nome-receita" className="font-bold text-2xl">Nome da receita:</label>
                    <input type="text" id="nome-receita" name="nome-receita" className="border border-[#55133b] text-3xl rounded"
                    value={nomeReceita} onChange={(event) => setNomeReceita(event.target.value)} required/>

                    <label htmlFor="rendimento-receita" className="font-bold text-2xl">Rendimento da receita(g):</label>
                    <input type="number" id="rendimento-receita" name="rendimento-receita" step="0.01" className="border border-[#55133b] text-3xl rounded
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>                  

                        <h2 className="font-bold">Ingredientes:</h2>
                        {ingredientesSelecionados.map((ingrediente, index) => (
                            <div key={index} className="flex flex-col sm:flex-row gap-2">
                                <select
                                value={ingrediente.id}
                                onChange={(event)=> atualizarIngrediente(index, 'id', event.target.value)}
                                className="border border-[#55133b] rounded cursor-pointer">
                                <option value="">Selecione um ingrediente:</option>
                                {ingredientesReceita.map((ing)=> (
                                    <option key={ing.id} value={ing.id}>{ing.nome}</option>
                                ))}
                                </select>
                                <input type="number" step="0.01" placeholder="Proporção(%)" className="border border-[#55133b] rounded
                                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={ingrediente.proporcao}
                                onChange={(event)=> atualizarIngrediente(index, 'proporcao', event.target.value)}/>
                                <button type="button" onClick={() => removerIngrediente(index)}>
                                <span className="material-symbols-outlined cursor-pointer hover:text-[#803c65]">delete</span></button>
                            </div>
                        ))}
                        <button type="button" onClick={adicionarIngrediente} className="font-bold border p-2 rounded cursor-pointer hover:bg-[#f3eed1]">Adicionar Ingredientes</button>

                        <div className="flex flex-col gap-2 text-bold">

                        </div>


                    <div className="flex items-center justify-around w-full font-bold">
                        <button type="submit" className="p-2 border border-[#55133b] cursor-pointer rounded hover:bg-[#55133b] hover:text-[#F4F1E1]">Cadastrar</button>

                            <button type="button" onClick={() => alternarComponente("ingrediente")} className="flex items-center gap-1 cursor-pointer hover:text-[#803c65]">
                                Ingredientes<span className="material-symbols-outlined">chevron_right</span></button>
                    </div>
                </form>
            </div>
    )
}