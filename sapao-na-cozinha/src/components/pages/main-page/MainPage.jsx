import PaginaInicial from './PaginaInicial';
import PaginaCadastrar from './Cadastrar/PaginaCadastrar';
import Header from './Header';
import Footer from './Footer';

export default function MainPage() {
    return (
        <div>
            <Header />
            <PaginaInicial />
            <PaginaCadastrar/>
            <Footer />
        </div>
    )
}
