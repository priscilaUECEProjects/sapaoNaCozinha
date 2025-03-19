export default function ModalIngredientes({ fecharModal, ingrediente}){
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center">
            <div className="bg-pearl p-6 rounded-lg shadow-lg max-w-md w-3/4 relative text-center max-h-[80vh] overflow-y-auto text-[#55133b]">

                <button className="absolute font-bold text-4xl top-0 right-2 
                hover:text-[#803c65] cursor-pointer"onClick={fecharModal}>
                &times;
                </button>

                <h1 className="text-3xl font-bold pb-4">{ingrediente.nome}</h1>

                <div className="flex justify-between mt-4 text-[#55133b]">
                    <span className="material-symbols-outlined hover:text-[#803c65] cursor-pointer active:text-[#55133b]">delete</span>
                    <span class="material-symbols-outlined hover:text-[#803c65] cursor-pointer active:text-[#55133b]">edit</span>
                </div>

            </div>
        </div>
    );
}