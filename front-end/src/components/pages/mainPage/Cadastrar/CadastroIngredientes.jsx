import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CadastroIngredientes({ alternarComponente, usuario }) {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [gramatura, setGramatura] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const precoNumber = parseFloat(preco);
        const gramaturaNumber = parseFloat(gramatura);

        if(nome === ""){
            toast.error("O nome é obrigatório");
            return;
        }else if(isNaN(precoNumber) || isNaN(gramaturaNumber)) {
            toast.error("Preço e Gramatura devem ser números.");
            return;
        }else if(precoNumber <= 0 || gramaturaNumber <= 0){
            toast.error("Preço e Gramatura devem ser maiores que zero.");
            return;
        }

        try{
            await axios.post("http://localhost:3000/INGREDIENTES", { nome, preco: precoNumber, gramatura: gramaturaNumber, ID_USUARIO: usuario.EMAIL });
            toast.success("Ingrediente cadastrado com sucesso!");
        } catch (error){
            toast.error("Erro ao cadastrar novo ingrediente: " + (error.response?.data?.error || "Erro desconhecido"));
        }
    }
    
    return (
            <div className="flex items-center justify-center min-h-screen  bg-[var(--color-quinacridone-magenta)] bg-[url('./assets/img/fundo-roxo.png')] bg-repeat bg-[size:500px]">
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-8 lg:w-2/8 px-2 py-4 sm:p-4 bg-[var(--color-pearl)] rounded shadow-[-10px_-10px_30px_4px,_10px_10px_30px_4px] text-[#55133b]">

                    <label htmlFor="nome-ingrediente" className="font-bold text-2xl">Nome do ingrediente:</label>
                    <input type="text" id="nome-ingrediente" name="nome-ingrediente" className="border border-[#55133b] text-md h-10 rounded w-full" 
                    onChange={(event) => setNome(event.target.value)} value={nome}/>                    

                    <label htmlFor="preco-ingrediente" className="font-bold text-2xl">Preço:</label>
                    <input type="number" id="preco-ingrediente" name="preco-ingrediente" step="0.01" className="border border-[#55133b] text-md h-10 rounded w-full
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    onChange={(event) => setPreco(event.target.value)} value={preco}/>

                    <label htmlFor="gramatura-ingrediente" className="font-bold text-2xl">Gramatura:</label>
                    <input type="number" id="gramatura-ingrediente" name="gramatura-ingrediente" step="0.01" className="border border-[#55133b] text-md h-10 rounded w-full
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    onChange={(event) => setGramatura(event.target.value)} value={gramatura}/>

                    <div className="flex items-center justify-around w-full font-bold">
                        <button type="submit" className=" p-2 border border-[#55133b] cursor-pointer rounded hover:bg-[#55133b] hover:text-[#F4F1E1]">Cadastrar</button>
                            <button type="button" onClick={() => alternarComponente("receita")} className="flex items-center gap-1 cursor-pointer hover:text-[#803c65]">
                            Receitas<span className="material-symbols-outlined">chevron_right</span></button>      
                    </div>
                    
                </form>
            </div>
    )
}