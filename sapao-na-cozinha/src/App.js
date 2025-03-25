import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const apiUrl = 'http://localhost:3000/INGREDIENTES';

function App() {
    const [ingredientes, setIngredientes] = useState([]);
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [gramatura, setGramatura] = useState('');

    useEffect(() => {
        loadIngredientes();
    }, []);

    const loadIngredientes = async () => {
        try {
            const response = await axios.get(apiUrl);
            setIngredientes(response.data);
        } catch (error) {
            console.error('Erro ao obter ingredientes', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(apiUrl, { nome, preco, gramatura });
            if (response.status === 201) {
                loadIngredientes();
                setNome('');
                setPreco('');
                setGramatura('');
            }
        } catch (error) {
            alert('Erro ao adicionar ingrediente');
        }
    };

    const deleteIngrediente = async (id) => {
        try {
            const response = await axios.delete(`${apiUrl}/${id}`);
            if (response.status === 204) {
                loadIngredientes();
            }
        } catch (error) {
            alert('Erro ao deletar ingrediente');
        }
    };

    return (
        <div className="container">
            <h1>Gerenciamento de Ingredientes</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome"
                    required
                />
                <input
                    type="number"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    placeholder="Preço"
                    required
                />
                <input
                    type="number"
                    value={gramatura}
                    onChange={(e) => setGramatura(e.target.value)}
                    placeholder="Gramatura"
                    required
                />
                <button type="submit">Adicionar Ingrediente</button>
            </form>
            <h2>Lista de Ingredientes</h2>
            <div id="ingredientesList">
                {ingredientes.map((ingrediente) => (
                    <div key={ingrediente.id} className="ingrediente">
                        <strong>{ingrediente.NOME}</strong><br />
                        Preço: {ingrediente.PRECO_UNITARIO}<br />
                        Gramatura: {ingrediente.GRAMATURA_UNITARIA}<br />
                        <button onClick={() => deleteIngrediente(ingrediente.id)}>Deletar</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;