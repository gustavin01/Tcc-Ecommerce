import { FaCartArrowDown, FaUserAlt, FaSafari, FaTasks, FaCheckSquare } from 'react-icons/fa'
import BarAdmin from "./barAdmin";
import AdmProduto from './admProduto';
import BarLateral from './barLateral';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Chart } from "react-google-charts";

export default function PgAdmProduto() {
    const [quantidadesPorFaixa, setQuantidadesPorFaixa] = useState([]);

    useEffect(() => {
        const obterProdutos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/obterProdutos');
                const produtosDoBanco = response.data;

                // Aqui, extraímos os valores específicos da coluna 'valor'
                const valores = produtosDoBanco.map(produto => produto.valor);

                // Conta a quantidade de valores em cada faixa de preço
                const quantidadesPorFaixa = {
                    ate1000: valores.filter(valor => valor <= 1000).length,
                    de1000a2000: valores.filter(valor => valor > 1000 && valor <= 2000).length,
                    de2000a3000: valores.filter(valor => valor > 2000 && valor <= 3000).length,
                    de3000a5000: valores.filter(valor => valor > 3000 && valor <= 5000).length,
                    maisDe5000: valores.filter(valor => valor > 5000).length,
                };

                // Define o estado com a contagem por faixa de preço
                setQuantidadesPorFaixa(quantidadesPorFaixa);
            } catch (error) {
                console.error('Erro ao obter dados dos produtos:', error);
            }
        };

        obterProdutos();
    }, []); // O array vazio [] faz com que o useEffect seja executado apenas uma vez, sem depender de props ou state

    console.log(quantidadesPorFaixa);

    const data = [
        ["", ""],
        ["R$ 1k", quantidadesPorFaixa.ate1000 || 0],
        ["R$ 2k", quantidadesPorFaixa.de1000a2000 || 0],
        ["R$ 3k", quantidadesPorFaixa.de2000a3000 || 0],
        ["R$ 5k", quantidadesPorFaixa.de3000a5000 || 0],
        ["R$ 5k+", quantidadesPorFaixa.maisDe5000 || 0],
    ];


    const options = {
        title: "Valores dos produtos",
        is3D: true,
    };

    const [loggedIn, setLoggedIn] = useState(true); // Inicializado como true por padrão

    useEffect(() => {
        // Verificar se o tokenAdm existe no localStorage
        const tokenAdm = localStorage.getItem('tokenAdm');
        if (!tokenAdm) {
            setLoggedIn(false); // Define loggedIn como false se o tokenAdm não existir
        }
    }, []);

    if (!loggedIn) {
        return (
            <div className="container text-center mt-5">
                <h2>Conteúdo restrito</h2>
                <p>Este conteúdo está disponível apenas para administradores.</p>
                <button className="btn btn-primary" onClick={() => window.location.href = '/'}>Voltar para a página inicial</button>
            </div>
        );
    }

    return (
        <><BarAdmin /><></>
            <div className='d-flex home'>
                <div className='d-flex sidebar flex-column flex-shrink-0  bg-dark'>
                    <ul className='nav nav-pills flex-column mb-auto px-0 mt-3'>
                        <BarLateral />
                    </ul>

                </div>
                <div className='content container mt-2'>
                    <div className='row'>
                        <div className='col-md-4 text-white col bg-info d-flex 
                    justify-content-around px-1 py-3 rounded'>
                            <a href={"pgadmproduto"}><span>Total Produtos</span><FaCartArrowDown /></a>
                        </div>
                        <div className='col-md-4 text-white col bg-info d-flex 
                    justify-content-around px-1 py-3 rounded'>
                            <a href={"pgadmmov"}><span>Total Movimentações</span><FaCartArrowDown /></a>
                        </div>
                        <div className='col-md-4 text-white col bg-warning d-flex 
                    justify-content-around px-1 py-3 rounded'>
                            <a href={"pgcadprodadm"}><span>Add Produtos</span><FaCartArrowDown /></a>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between mt-1">
                        <h2>Produtos</h2>
                        <button className="btn btn-warning">
                            <a href={"pgcadprodadm"}>
                                Add+
                            </a>
                        </button>

                    </div>
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        data={data}
                        options={options}
                    />
                    <AdmProduto />

                </div>
            </div>
        </>

    );
}

