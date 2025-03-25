import { useState } from "react";

export default function ModalIngredientes({ fecharModal, ingrediente}){
    const [editionForm, setEditionform] = useState(false);

    const handleClick = () => {
        setEditionform(((prevState) => !prevState));
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center">
            <div className="bg-pearl p-6 rounded-lg shadow-lg max-w-md w-3/4 relative text-center max-h-[80vh] overflow-y-auto text-[#55133b]">

                <button className="absolute font-bold text-4xl top-0 right-2 
                hover:text-[#803c65] cursor-pointer"onClick={fecharModal}>
                &times;
                </button>

                <h1 className="text-3xl font-bold pb-4">{ingrediente.nome}</h1>
                <ul>
                    <li className="flex justify-between my-3">Preço unitário: <span className="font-bold">R${ingrediente.precoUnitario.toFixed(2)}</span></li>
                    <li className="flex justify-between my-3">Gramatura(Un): <span className="font-bold">{ingrediente.gramaturaUnidade}g</span></li>
                </ul>

                <div className="flex justify-between mt-4 text-[#55133b]">
                    <span className="material-symbols-outlined hover:text-[#803c65] cursor-pointer active:text-[#55133b]">delete</span>
                    <span onClick={handleClick} class="material-symbols-outlined hover:text-[#803c65] cursor-pointer active:text-[#55133b]">edit</span>
                </div>

                {editionForm && (
                <div className="font-bold bg-[#d6d0ae] px-2 py-4 rounded mt-3">
                    <h1 className="text-2xl pb-4">Editar ingrediente</h1>
                    <form className="flex flex-col gap-2 ">
                        <label>Nome:</label>
                        <input type="text" className="border border-[#55133b] rounded" />

                        <label>Preço:</label>
                        <input type="number" step="0.01" className="border border-[#55133b] rounded
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />

                        <label>Gramatura:</label>
                        <input type="number" step="0.01" className="border border-[#55133b] rounded
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />

                        <button type="submit" className="p-2 border border-[#55133b] cursor-pointer rounded hover:bg-[#55133b] hover:text-[#F4F1E1]">Editar</button>
                    </form>
                </div>
                )}
            </div>
        </div>
    );
}