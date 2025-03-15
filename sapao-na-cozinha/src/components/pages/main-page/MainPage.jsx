import { Element } from 'react-scroll';

import PaginaInicial from './PaginaInicial';
import PaginaCadastrar from './Cadastrar/PaginaCadastrar';
import Header from './Header';
import Footer from './Footer';
import Cards from './Receitas/Cards';

export default function MainPage() {
    return (
        <div>
            <Header />
            
            <Element name='inicio' className='min-h-screen'>
                <PaginaInicial />
            </Element>
            <Element name='cadastrar' className='min-h-screen'>
                <PaginaCadastrar />
            </Element>
            <Element name='receitas' className='min-h-screen'>
                <Cards />
            </Element>

            <Footer/>
      </div>
    );
}
