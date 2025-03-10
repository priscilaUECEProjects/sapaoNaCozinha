import React from 'react';

export default function PaginaLogin(){
    return(
        <div className='flex items-center justify-center w-full h-dvh bg-hunter-green-ligther bg-[url("./img/fundo-verde.png")] bg-repeat bg-[auto_500px]'>
            <div className="">
                <form action=" " method="post" className="bg-pearl w-xl p-4 text-green-700 shadow-[-10px_-10px_30px_4px,_10px_10px_30px_4px] shadow-dark-green rounded-2xl flex flex-col items-center gap-4">
                    <h1 className="font-bold text-4xl mb-5">Login</h1>

                    <label htmlFor="email" className='font-bold'>E-mail</label>
                    <input type="email" name="email" id="email" className="bg-pearl border-1 border-green-700 w-10/12 text-xl p-2" required/>

                    <label htmlFor="senha" className='font-bold'>Senha</label>
                    <input type="password" name="senha" id="senha" className="bg-pearl  border-1 border-green-700 w-10/12 text-xl p-2" required/>

                    <div className="flex justify-around items-center w-full mt-5">
                        <button type="button" onClick={"Entrar()"} className="bg-pearl border-1 border-green-700 text-green-700 text-lg font-bold p-2 rounded-lg cursor-pointer hover:bg-green-700 hover:text-pearl">Entrar</button>
                        <p className='font-bold hover:underline cursor-pointer'>Não possui uma conta?</p>
                    </div>
                </form>
            </div>
        </div>
    )
}