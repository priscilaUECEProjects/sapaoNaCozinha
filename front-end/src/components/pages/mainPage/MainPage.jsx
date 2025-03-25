import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Element } from 'react-scroll';
import {toast} from 'react-toastify';

import PaginaInicial from './PaginaInicial';
import PaginaCadastrar from './Cadastrar/PaginaCadastrar';
import Header from './Header';
import Footer from './Footer';
import CardsReceitas from './Receitas/CardsReceitas';
import CardsIngredientes from './Ingredientes/CardsIngredientes';

export default function MainPage() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const fetchUsuario = async () => {
            const token = localStorage.getItem('authToken');
    
            if (!token) {
                toast.error('Usuário não autenticado. Redirecionando para a página de login.');
                window.location.href = '/';
                return;
            }
    
            try {
                const response = await axios.get('http://localhost:3000/login/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsuario(response.data);
            } catch (error) {
                toast.error(`Erro ao buscar informações do usuário. Faça login novamente: ${error}`);
                localStorage.removeItem('authToken');
                window.location.href = '/';
            }
        };
    
        fetchUsuario();
    }, []);

    return (
        <div>
             {usuario ? (
            <div>
                <Header />
                
                <Element name='inicio' className='min-h-screen'>
                    <PaginaInicial usuario={usuario} />
                </Element>
                <Element name='cadastrar' className='min-h-screen'>
                    <PaginaCadastrar usuario={usuario} />
                </Element>
                <Element name='receitas' className='min-h-screen'>
                    <CardsReceitas usuario={usuario} />
                </Element>
                <Element name='ingredientes' className='min-h-screen'>
                    <CardsIngredientes />
                </Element>

                <Footer/>
            </div>
            ) : (
                <div className='flex space-x-2 justify-center items-center bg-pearl h-screen dark:invert'>
                    <span className='sr-only'>Carregando...</span>
                    <div className='h-8 w-8 bg-hunter-green-ligther rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div className='h-8 w-8 bg-hunter-green-ligther rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div className='h-8 w-8 bg-hunter-green-ligther rounded-full animate-bounce'></div>
                </div>
            )}
        </div>
    );
}
