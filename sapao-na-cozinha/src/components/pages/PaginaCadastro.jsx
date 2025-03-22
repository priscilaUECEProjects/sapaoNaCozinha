import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function PaginaCadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');


    function validarNome(nome) {
        if (nome === ''){
            toast.error('O nome é obrigatório');
            return;
        }
    }

    function validarEmail(email) {
        if (email === '') {
            toast.error('O email é obrigatório');
            return;
        }
    
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
        if (!regex.test(email)) { 
            toast.error("Email inválido");
            return;
        }
    }
    
    function validarSenha(senha) {
        if (senha === '') {
            toast.error('A senha é obrigatória');
            return;
        }
        if (senha.length < 8) {
            toast.error("A senha deve ter pelo menos 8 caracteres");
            return;
        }
    }

    function validarConfirmarSenha(senha, confirmarSenha) {
        if(confirmarSenha!==senha){
            toast.error('As senhas não coincidem');
            return;
        }
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(validarNome(nome) || validarEmail(email) ||
        validarSenha(senha) || validarConfirmarSenha(senha, confirmarSenha)){
            return;
        }

        const usuario = { email, nome, senha };
    console.log("Enviando para o backend:", usuario);

        try{
            await axios.post("http://localhost:3000/USUARIOS", { email, nome, senha });
            toast.success("Usuário cadastrado com sucesso!");
        } catch (error){
            toast.error("Erro ao cadastrar novo usuário: " + (error.response?.data?.error || "Erro desconhecido"))
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--color-quinacridone-magenta)] bg-[url('./assets/img/fundo-roxo.png')] bg-repeat bg-[size:500px]">
            <div className="text-[#55133b]"> 
                <form className="flex flex-col items-center gap-4 p-4 w-105 bg-[#e6e1c5] rounded-2xl shadow-[-10px_-10px_30px_4px,_10px_10px_30px_4px]" onSubmit={handleSubmit}>
                    <h1 className="text-3xl mb-5 font-bold">Cadastro</h1>

                    <label htmlFor="nome-usuario" className="font-bold">Nome</label>
                    <input type="text" id="nome-usuario" name="nome-usuario" className="w-8/12 border-[1px] border-[#55133b] rounded text-xl"
                    value={nome} onChange={(e)=> setNome(e.target.value)}/>
                    
                    <label htmlFor="email" className="font-bold">Email</label>
                    <input type="email" id="email" name="email" className="w-8/12 border-[1px] border-[#55133b] rounded text-xl" 
                    value={email} onChange={(e)=> setEmail(e.target.value)}/>

                    <label htmlFor="senha" className="font-bold">Senha</label>
                    <input type="password" id="senha" name="senha" className="w-8/12 border-[1px] border-[#55133b] rounded text-xl" 
                    value={senha} onChange={(e)=> setSenha(e.target.value)} />

                    <label htmlFor="confirmarSenha" className="font-bold">Confirme a senha</label>
                    <input type="password" id="confirmarSenha" name="confirmarSenha" className="w-8/12 border-[1px] border-[#55133b] rounded text-xl" 
                    value={confirmarSenha} onChange={(e)=> setConfirmarSenha(e.target.value)} />

                    <div className="flex items-center gap-5 justify-around w-full font-bold">
                        <button type="submit" className="mt-5 p-2 border-[1px] border-[#55133b] cursor-pointer rounded hover:bg-[#55133b] hover:text-[#F4F1E1]">Cadastrar</button>
                        <Link to="/login" className="text-[15px] mt-5 underline decoration-transparent hover:decoration-[#55133b] hover:underline">Já possui uma conta?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

