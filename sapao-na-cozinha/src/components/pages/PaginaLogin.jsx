import { Link } from "react-router-dom";

export default function PaginaLogin(){
    return(
        <div className='flex items-center justify-center w-full h-dvh bg-hunter-green-ligther bg-[url("./assets/img/fundo-verde.png")] bg-repeat bg-[auto_500px]'>
                <form action=" " method="post" className="bg-pearl w-xl p-4 text-[var(--color-dark-green)] shadow-[-10px_-10px_30px_4px,_10px_10px_30px_4px] shadow-dark-green rounded-2xl flex flex-col items-center gap-4">
                    <h1 className="font-bold text-3xl mb-5">Login</h1>

                    <label htmlFor="email" className='font-bold'>E-mail</label>
                    <input type="email" name="email" id="email" className="border-1 border-[var(--color-dark-green)] w-10/12 text-xl p-2 rounded" required/>

                    <label htmlFor="senha" className='font-bold'>Senha</label>
                    <input type="password" name="senha" id="senha" className="border-1 border-[var(--color-dark-green)] w-10/12 text-xl p-2 rounded" required/>

                    <div className="flex justify-around items-center w-full mt-5">
                        <button type="button" onClick={"Entrar()"} className="border-1 border-[var(--color-dark-green)] text-[var(--color-dark-green)] text-lg font-bold p-2 rounded cursor-pointer hover:bg-[var(--color-dark-green)] hover:text-pearl">Entrar</button>
                        <Link to="/cadastro" className='font-bold hover:underline'>Não possui uma conta?</Link>
                    </div>
                </form>
        </div>
    )
}