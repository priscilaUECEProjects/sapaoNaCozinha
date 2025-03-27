import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

export default function PaginaLogin(){
    const navigate = useNavigate();

    const [DadosLogin, setDadosLogin] = useState({
        emailLogin: '',
        senhaLogin: '',
    });

    const handleChangeLogin = (e) => {
        setDadosLogin({
            ...DadosLogin,
            [e.target.name]: e.target.value,
        })
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!DadosLogin.emailLogin || !DadosLogin.senhaLogin){
            toast.error('Nenhum campo pode estar vazio!');
            return;
        }

        
        try {
            const response = await axios.post('http://localhost:3000/login', {
                EMAIL: DadosLogin.emailLogin,
                SENHA: DadosLogin.senhaLogin,
            });
    
            if (response.status === 200) {
                localStorage.setItem('authToken', response.data.token);
                navigate('/SapaoNaCozinha');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error('Usuário não encontrado.');
            } else if (error.response && error.response.status === 401) {
                toast.error('Senha incorreta.');
            } else {
                toast.error('Erro ao realizar login. Tente novamente mais tarde.');
            }
        }
    };

    return(
        <div className='flex items-center justify-center w-full h-dvh bg-hunter-green-ligther bg-[url("./assets/img/fundo-verde.png")] bg-repeat bg-[auto_500px]'>
                <form onSubmit={handleLogin} method="post" className="bg-pearl w-3/8 p-4 text-[var(--color-dark-green)] shadow-[-10px_-10px_30px_4px,_10px_10px_30px_4px] shadow-dark-green rounded-2xl flex flex-col items-center gap-4">
                    <h1 className="font-bold text-3xl mb-5">Login</h1>

                    <label htmlFor="emailLogin" className='font-bold'>E-mail</label>
                    <input type="email" name="emailLogin" id="emailLogin" value={DadosLogin.emailLogin} onChange={handleChangeLogin} className="border-1 border-[var(--color-dark-green)] w-full text-md p-2 rounded" required/>

                    <label htmlFor="senhaLogin" className='font-bold'>Senha</label>
                    <input type="password" name="senhaLogin" id="senhaLogin" value={DadosLogin.senhaLogin} onChange={handleChangeLogin} className="border-1 border-[var(--color-dark-green)] w-full text-md p-2 rounded" required/>

                    <div className="flex justify-between items-center w-full mt-5">
                        <button type="submit" className="border-1 border-[var(--color-dark-green)] text-[var(--color-dark-green)] text-lg font-bold p-2 rounded cursor-pointer hover:bg-[var(--color-dark-green)] hover:text-pearl">Entrar</button>
                        <Link to="/cadastro" className='font-bold hover:underline'>Não possui uma conta?</Link>
                    </div>
                </form>
        </div>
    )
}
