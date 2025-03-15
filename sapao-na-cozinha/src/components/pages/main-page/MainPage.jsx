import PaginaInicial from './PaginaInicial';
import PaginaCadastrar from './Cadastrar/PaginaCadastrar';
import Header from './Header';
import Footer from './Footer';
import Cards from './Cards.jsx';

export default function MainPage() {
    return (
        <div>
            <Header />
            <PaginaInicial />
            <Cards />
            <PaginaCadastrar/>
            <Footer />
        </div>
    )
}
