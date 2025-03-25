import { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'

export default function ModalIngredientes({ fecharModal, ingrediente }){
    const [editionForm, setEditionform] = useState(false);

    const [novoNome, setNovoNome] = useState(ingrediente.NOME);
    const [novoPreco, setNovoPreco] = useState(ingrediente.PRECO_UNITARIO);
    const [novaGramatura, setNovaGramatura] = useState(ingrediente.GRAMATURA_UNITARIA);

    const handleClick = () => {
        setEditionform(((prevState) => !prevState));
    };

    const handleEditionFormSubmit = async (e) => {
        e.preventDefault();

        const precoNumber = parseFloat(novoPreco) || 0;
        const gramaturaNumber = parseFloat(novaGramatura) || 0;

        try {
            await axios.put(`http://localhost:3000/INGREDIENTES/${ingrediente.ID}`, {
                NOME: novoNome,
                PRECO_UNITARIO: precoNumber,
                GRAMATURA_UNITARIA: gramaturaNumber
            });

            toast.success("Ingrediente atualizado com sucesso!");
        
        } catch (error) {
            toast.error(`Erro ao editar ingrediente: ${error.message}`);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/INGREDIENTES/${ingrediente.ID}`);

            fecharModal();

            toast.success("Ingrediente deletado com sucesso!");

        } catch (error) {
            toast.error(`Erro ao deletar ingrediente:  ${error}`);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center">
            <div className="bg-pearl p-6 rounded-lg shadow-lg max-w-md w-3/4 relative text-center max-h-[80vh] overflow-y-auto text-[#55133b]">

                <button className="absolute font-bold text-4xl top-0 right-2 
                hover:text-[#803c65] cursor-pointer"onClick={fecharModal}>
                &times;
                </button>

                <h1 className="text-3xl font-bold pb-4">{ingrediente.NOME}</h1>
                <ul>
                    <li className="flex justify-between my-3">Preço unitário: <span className="font-bold">R${Number(ingrediente.PRECO_UNITARIO || 0).toFixed(2)}</span></li>
                    <li className="flex justify-between my-3">Gramatura(Un): <span className="font-bold">{(ingrediente.GRAMATURA_UNITARIA || 0)}g</span></li>
                </ul>

                <div className="flex justify-between mt-4 text-[#55133b]">
                    <span onClick={handleDelete} className="material-symbols-outlined hover:text-[#803c65] cursor-pointer active:text-[#55133b]">delete</span>
                    <span onClick={handleClick} className="material-symbols-outlined hover:text-[#803c65] cursor-pointer active:text-[#55133b]">edit</span>
                </div>

                {editionForm && (
                <div className="font-bold bg-[#d6d0ae] px-2 py-4 rounded mt-3">
                    <h1 className="text-2xl pb-4">Editar ingrediente</h1>
                    <form className="flex flex-col gap-2" onSubmit={handleEditionFormSubmit}>
                        <label>Nome:</label>
                        <input type="text" className="border border-[#55133b] rounded"
                        onChange={(e) => setNovoNome(e.target.value)} value={novoNome} />

                        <label>Preço:</label>
                        <input type="number" step="0.01" className="border border-[#55133b] rounded
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        onChange={(e) => setNovoPreco(e.target.value)} value={novoPreco} />

                        <label>Gramatura:</label>
                        <input type="number" step="0.01" className="border border-[#55133b] rounded
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        onChange={(e) => setNovaGramatura(e.target.value)} value={novaGramatura} />

                        <button type="submit" className="p-2 border border-[#55133b] cursor-pointer rounded hover:bg-[#55133b] hover:text-[#F4F1E1]">Editar</button>
                    </form>
                </div>
                )}
            </div>
        </div>
    );
}