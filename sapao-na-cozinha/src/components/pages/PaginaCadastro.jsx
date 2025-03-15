import { useState } from "react";
import { Link } from "react-router-dom";

export default function PaginaCadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [erroNome, setErroNome] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    const [erroConfirmarSenha, setErroConfirmarSenha] = useState('');

    function validarNome(nome) {
        if (nome === ''){
            return ('O nome é obrigatório');
        }
        return '';
    }

    function validarEmail(email) {
        if(email === ''){
            return ('O email é obrigatório');
        }
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!regex.test(email)) return 'Email inválido';
        return '';
    }

    function validarSenha(senha) {
        if (senha === ''){
            return ('A senha é obrigatória');
        }
        if (senha.length < 8) return 'A senha deve ter pelo menos 8 caracteres';
        return '';
    }

    function validarConfirmarSenha(senha, confirmarSenha) {
        if(confirmarSenha!==senha){
            return ('As senhas não coincidem');
        }
        return '';
    }

    function handleSubmit(event) {
        event.preventDefault();

        const erroNome = validarNome(nome);
        const erroEmail = validarEmail(email);
        const erroSenha = validarSenha(senha);
        const erroConfirmarSenha = validarConfirmarSenha(confirmarSenha);

        setErroNome(erroNome);
        setErroEmail(erroEmail);
        setErroSenha(erroSenha);
        setErroConfirmarSenha(erroConfirmarSenha);

        if(!erroNome && !erroEmail && !erroSenha && !erroConfirmarSenha){
            return alert('Cadastro realizado com sucesso!');
        }

    }




    return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--color-quinacridone-magenta)] bg-[url('./assets/img/fundo-roxo.png')] bg-repeat bg-[size:500px]">
            <div className="text-[#55133b]"> 
                <form className="flex flex-col items-center gap-4 p-4 w-105 bg-[#e6e1c5] rounded-2xl shadow-[-10px_-10px_30px_4px,_10px_10px_30px_4px]" onSubmit={handleSubmit}>
                    <h1 className="text-3xl mb-5 font-bold">Cadastro</h1>

                    <label htmlFor="nome-usuario" className="font-bold">Nome</label>
                    <input type="text" id="nome-usuario" name="nome-usuario" className="w-8/12 border-[1px] border-[#55133b] rounded text-xl"
                    value={nome} onChange={(e)=> setNome(e.target.value)}/>
                    {erroNome && <p className="text-[10px] bg-[#55133b] p-[3px] rounded text-[#F4F1E1]">{erroNome}</p>}
                    
                    <label htmlFor="email" className="font-bold">Email</label>
                    <input type="email" id="email" name="email" className="w-8/12 border-[1px] border-[#55133b] rounded text-xl" 
                    value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    {erroEmail && <p className="text-[10px] bg-[#55133b] p-[3px] rounded text-[#F4F1E1]">{erroEmail}</p>}

                    <label htmlFor="senha" className="font-bold">Senha</label>
                    <input type="password" id="senha" name="senha" className="w-8/12 border-[1px] border-[#55133b] rounded text-xl" 
                    value={senha} onChange={(e)=> setSenha(e.target.value)} />
                    {erroSenha && <p className="text-[10px] bg-[#55133b] p-[3px] rounded text-[#F4F1E1]">{erroSenha}</p>}

                    <label htmlFor="confirmarSenha" className="font-bold">Confirme a senha</label>
                    <input type="password" id="confirmarSenha" name="confirmarSenha" className="w-8/12 border-[1px] border-[#55133b] rounded text-xl" 
                    value={confirmarSenha} onChange={(e)=> setConfirmarSenha(e.target.value)} />
                    {erroConfirmarSenha && <p className="text-[10px] bg-[#55133b] p-[3px] rounded text-[#F4F1E1]">{erroConfirmarSenha}</p>}

                    <div className="flex items-center gap-5 justify-around w-full font-bold">
                        <button type="submit" className="mt-5 p-2 border-[1px] border-[#55133b] cursor-pointer rounded hover:bg-[#55133b] hover:text-[#F4F1E1]">Cadastrar</button>
                        <Link to="/login" className="text-[15px] mt-5 underline decoration-transparent hover:decoration-[#55133b] hover:underline">Já possui uma conta?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

