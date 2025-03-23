import { useState } from "react";

export default function CalculadoraReceita({ setValorReceita, setNovaGramatura, setValorVenda, setCMV, CMV, receita }){
    const [novoRendimento, setNovoRendimento] = useState("");
    const [custoAdicional, setCustoAdicional] = useState("");
    const [markup, setMarkup] = useState("");

    const [erroForm, setErroForm] = useState(false);

    const calcularGramaturaIngredientes = () => {
        const rendimento = parseFloat(novoRendimento);

        const gramaturaIngredientes = receita.Ingredientes_receita.map(ing => ({
            nome: ing.Ingredientes.NOME,
            gramatura: (ing.PROPORCAO_INGREDIENTE/100)*rendimento
        }));

        setNovaGramatura(gramaturaIngredientes);
    };

    const calcularValorReceita = () => {
        const valorIngredientes = receita.Ingredientes_receita.reduce((acumulador, ing) => {
            let preco = ing.PROPORCAO_INGREDIENTE * ing.Ingredientes.PRECO_UNITARIO / ing.Ingredientes.GRAMATURA_UNITARIA
            return acumulador + preco;
        }, 0);
        setValorReceita(valorIngredientes.toFixed(2));
    };

    const calcularCMV = () => {
        const valorIngredientes = receita.Ingredientes_receita.reduce((acumulador, ing) => ing.PROPORCAO_INGREDIENTE * ing.Ingredientes.PRECO_UNITARIO / ing.Ingredientes.GRAMATURA_UNITARIA + acumulador, 0);
        const custoAdicionalFloat = parseFloat(custoAdicional) || 0;
        const valorCMV = valorIngredientes+custoAdicionalFloat;
        setCMV(valorCMV.toFixed(2));
    };

    const calcularValorVenda = () => {
        const valorIngredientes = receita.Ingredientes_receita.reduce((acumulador, ing) => ing.PROPORCAO_INGREDIENTE * ing.Ingredientes.PRECO_UNITARIO / ing.Ingredientes.GRAMATURA_UNITARIA + acumulador, 0);
        const valorCMV = valorIngredientes+custoAdicional;
        const valorMarkup = markup;

        if (!isNaN(valorCMV) && !isNaN(valorMarkup)) {
            const valorFinal = valorCMV * (1 + valorMarkup / 100);
            setValorVenda(valorFinal.toFixed(2));
          } else {
            setValorVenda(0);
          }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (parseFloat(novoRendimento) <= 0 || parseFloat(custoAdicional) < 0 || parseFloat(markup) < 0) {
            setErroForm(true);
            return;
        }

        calcularGramaturaIngredientes();
        calcularValorReceita();
        calcularCMV();
        calcularValorVenda();

    }

    return (
        <div className="my-2">
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 bg-[#d6d0ae] p-2 rounded">

                <label className="font-bold text-[var(--color-dark-green)]">Quanto você deseja preparar(g)?</label>
                <input type="number" step="0.01" value={novoRendimento} className="border border-[var(--color-dark-green)] rounded w-full
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                id="novo-rendimento" name="novo-rendimento" onChange={((event)=> setNovoRendimento(event.target.value))} required />

                <div className="flex justify-center gap-2 w-full text-xs sm:text-base">
                    <input type="number" step="0.01" value={custoAdicional} placeholder="Custo adicional($)" className="border border-[var(--color-dark-green)] rounded
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-[50%]"
                    id="custo-adicional" name="custo-adicional" onChange={((event)=> setCustoAdicional(event.target.value))} />

                    <input type="number" step="0.01" value={markup} placeholder="Markup(%)" className="border border-[var(--color-dark-green)] rounded
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-[50%]"
                    id="markup" name="markup" onChange={((event)=> setMarkup(parseFloat(event.target.value)))} />
                </div>

                {erroForm && (<p className="text-[10px] bg-[var(--color-dark-green)] p-[3px] rounded text-[#F4F1E1]">Os valores devem ser positivos</p>)}

                <button type="submit" className="font-bold p-2 mt-2 border text-[var(--color-dark-green)] border-[var(--color-dark-green)] cursor-pointer rounded
                 hover:bg-[var(--color-dark-green)] hover:text-[#F4F1E1] active:bg-[var(--color-hunter-green)] w-full">Calcular</button>
            </form>
        </div>
    );
}
