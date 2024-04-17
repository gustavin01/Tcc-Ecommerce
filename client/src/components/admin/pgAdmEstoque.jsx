import { FaCartArrowDown, FaUserAlt, FaSafari, FaTasks, FaCheckSquare } from 'react-icons/fa'
import BarAdmin from "./barAdmin";
import BarLateral from './barLateral';
import EstoqueTable from './admEstoque';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Chart } from "react-google-charts";


export default function PgAdmEstoque() {
    const [quantidadesPorFaixa, setQuantidadesPorFaixa] = useState([]);

    useEffect(() => {
        const obterEstoque = async () => {
            try {
                const response = await axios.get('http://localhost:3001/obterEstoqueGraficos');
                const estoqueDoBanco = response.data;

                // Aqui, extraímos os valores específicos da coluna 'qtde'
                const quantidades = estoqueDoBanco.map(produto => produto.qtde);

                // Define as faixas de quantidade
                const faixas = [
                    { faixa: "1-10 QTDE", min: 1, max: 10 },
                    { faixa: "11-40 QTDE", min: 11, max: 40 },
                    { faixa: "41-300 QTDE", min: 41, max: 300 },
                    { faixa: "301-1000 QTDE", min: 301, max: 1000 },
                    { faixa: "1001+ QTDE", min: 1001, max: Infinity },
                ];

                // Conta a quantidade de valores em cada faixa
                const quantidadesPorFaixa = {};

                faixas.forEach(({ faixa, min, max }) => {
                    quantidadesPorFaixa[faixa] = quantidades.filter(qtde => qtde >= min && qtde <= max).length;
                });

                // Define o estado com a contagem por faixa
                setQuantidadesPorFaixa(quantidadesPorFaixa);
            } catch (error) {
                console.error('Erro ao obter dados do estoque:', error);
            }
        };

        obterEstoque();
    }, []); // O array vazio [] faz com que o useEffect seja executado apenas uma vez, sem depender de props ou state

    console.log(quantidadesPorFaixa);

    const data = [
        ["", ""],
        ...Object.entries(quantidadesPorFaixa).map(([faixa, quantidade]) => [faixa, quantidade]),
    ];


    const options = {
        chart: {
            title: "Valor de Estoque",
            subtitle: "",
        },
        bars: "horizontal",
        axes: {
            y: {
                0: { side: "right" },
            },
        },
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
                        <h2>Estoque</h2>

                    </div>
                    <Chart
                        chartType="Bar"
                        width="100%"
                        height="400px"
                        data={data}
                        options={options}
                    />
                    <EstoqueTable />

                </div>
            </div>
        </>

    );
}

