import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CadastroReceita({ alternarComponente,usuario }) {
    const [nomeReceita, setNomeReceita] = useState('');
    const [rendimentoReceita, setRendimentoReceita] = useState('');
    const [ingredientesReceita, setIngredientesReceita] = useState([]);
    const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);

    useEffect(() => {
        const GetIngredientes = async () => {
            try{
                const ingredientes = await axios.post("http://localhost:3000/receitas/opcoes",{
                    ID_USUARIO: usuario.EMAIL,
                });
            setIngredientesReceita(ingredientes.data);
            } catch(error){
                console.error("Erro ao procurar ingredientes disponíveis:", error.response?.data || error.message);
            }
        }

        GetIngredientes();
    }, []);

    const adicionarIngrediente = () => {
        setIngredientesSelecionados([...ingredientesSelecionados, {ID_INGREDIENTE: '', PROPORCAO_INGREDIENTE: ''}]);
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
        const ingredientesTransformados = ingredientesSelecionados.map((ingrediente) => ({
            ID_INGREDIENTE: parseInt(ingrediente.ID_INGREDIENTE, 10),
            PROPORCAO_INGREDIENTE: parseFloat(ingrediente.PROPORCAO_INGREDIENTE)
        }));
        const novaReceita = {
            NOME: nomeReceita,
            QNT_PADRAO: parseFloat(rendimentoReceita),
            ID_USUARIO: usuario.EMAIL,
            Ingredientes_receita: [...ingredientesTransformados],
        };

        const Criar = async () => {
            try {
                console.log(novaReceita)
                const response = await axios.post('http://localhost:3000/receitas/criar', novaReceita);
            
                if (response.status === 201) {
                  toast.success('Receita criada com sucesso!');
                  window.location.reload();
                }
            } catch (error) {
                toast.error(`Erro ao criar a receita: ${error.message}`);
            }
        }

        Criar();
    }

    return(
        <div className="flex items-center justify-center min-h-screen  bg-[var(--color-quinacridone-magenta)] bg-[url('./assets/img/fundo-roxo.png')] bg-repeat bg-[size:500px]">
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8 px-2 py-4 sm:p-4 bg-[var(--color-pearl)] rounded max-h-[80vh] shadow-[-10px_-10px_30px_4px,_10px_10px_30px_4px] text-[#55133b] overflow-y-auto">

                    <label htmlFor="nome-receita" className="font-bold text-2xl">Nome da receita:</label>
                    <input type="text" id="nome-receita" name="nome-receita" className="border border-[#55133b] text-md h-10 rounded w-full"
                    value={nomeReceita} onChange={(event) => setNomeReceita(event.target.value)} required/>

                        <h2 className="font-bold">Ingredientes:</h2>
                        {ingredientesSelecionados.map((ingrediente, index) => (
                            <div key={index} className="flex flex-col sm:flex-row gap-2 w-full items-center">
                                <select
                                value={ingrediente.ID}
                                onChange={(event)=> atualizarIngrediente(index, 'ID_INGREDIENTE', event.target.value)}
                                className="border border-[#55133b] rounded cursor-pointer w-2/4">
                                <option value=""></option>
                                {ingredientesReceita.map((ing)=> (
                                    <option key={ing.ID} value={ing.ID}>{ing.NOME}</option>
                                ))}
                                </select>
                                <input type="number" step="0.01" placeholder="Proporção(%)" className="border border-[#55133b] rounded w-2/4
                                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={ingrediente.PROPORCAO_INGREDIENTE}
                                onChange={(event)=> atualizarIngrediente(index, 'PROPORCAO_INGREDIENTE', event.target.value)}/>
                                <button type="button" onClick={() => removerIngrediente(index)}>
                                <span className="material-symbols-outlined cursor-pointer hover:text-[#803c65]">delete</span></button>
                            </div>
                        ))}
                        <button type="button" onClick={adicionarIngrediente} className="font-bold border p-2 rounded cursor-pointer hover:bg-[#f3eed1]">Adicionar Ingredientes</button>

                        <div className="flex flex-col gap-2 text-bold">

                        </div>

                        <label htmlFor="rendimento-receita" className="font-bold text-2xl">Rendimento da receita(g):</label>
                        <input onChange={(event) => setRendimentoReceita(event.target.value)} type="number" id="rendimento-receita" name="rendimento-receita" step="0.01" className="border border-[#55133b] text-md h-10 rounded w-full
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>                  

                    <div className="flex items-center justify-around w-full font-bold">
                        <button type="submit" className="p-2 border border-[#55133b] cursor-pointer rounded hover:bg-[#55133b] hover:text-[#F4F1E1]">Cadastrar</button>

                            <button type="button" onClick={() => alternarComponente("ingrediente")} className="flex items-center gap-1 cursor-pointer hover:text-[#803c65]">
                                Ingredientes<span className="material-symbols-outlined">chevron_right</span></button>
                    </div>
                </form>
            </div>
    )
}
