import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import './movTb.css'

export default function AdmMovimentacao() {
    const [movimentos, setMovimentos] = useState([]);
    const [pagina, setPagina] = useState(1);

    useEffect(() => {
        // Função para obter os movimentos do servidor
        const obterMovimentos = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/obterMovimentos?pagina=${pagina}`);
                setMovimentos(response.data);
            } catch (error) {
                console.error('Erro ao obter movimentos:', error);
            }
        };
        obterMovimentos();
    }, [pagina]);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID Movimento</th>
                        <th>Data de Alteração</th>
                        <th>Tipo de Alteração</th>
                        <th>Quantidade Selecionada</th>
                        <th>Nome do Produto</th>
                        <th>Estoque Atual</th>
                        <th>Tamanho do Produto</th>
                    </tr>
                </thead>
                <tbody>
                    {movimentos.map((movimento) => (
                        <tr key={movimento.id_movimento}>
                            <td>{movimento.id_movimento}</td>
                            <td>{movimento.data_alteracao}</td>
                            <td>{movimento.tipo_alteracao}</td>
                            <td>{movimento.quantidade_selecionada}</td>
                            <td>{movimento.nome_produto}</td>
                            <td>{movimento.estoque_atual}</td>
                            <td>{movimento.tamanho_produto}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={() => setPagina((prevPagina) => prevPagina - 1)} disabled={pagina === 1}>
                    Página Anterior
                </button>
                <button onClick={() => setPagina((prevPagina) => prevPagina + 1)}>
                    Próxima Página
                </button>
            </div>
        </div>
    )
}