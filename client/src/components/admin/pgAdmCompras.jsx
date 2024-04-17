import { FaCartArrowDown, FaUserAlt, FaSafari, FaTasks, FaCheckSquare } from 'react-icons/fa'
import BarAdmin from "./barAdmin";
import BarLateral from './barLateral';
import PedidoTable from './admCompras';
import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import axios from 'axios';


export default function PgAdmCompras() {
    const [dadosPedidos, setDadosPedidos] = useState([]);
    const [statusArray, setStatusArray] = useState([]);

    useEffect(() => {
        const obterPedidos = async () => {
            try {
                // Faça uma solicitação para o servidor para obter os dados
                const response = await axios.get('http://localhost:3001/obterPedidosGraficos');
                const pedidos = response.data;

                // Atualize o estado geral
                setDadosPedidos(pedidos);

                // Preencha o array de status
                const statusPedidos = pedidos.map(pedido => pedido.status);
                setStatusArray(statusPedidos);
            } catch (error) {
                console.error('Erro ao obter dados dos pedidos:', error);
            }
        };

        obterPedidos();
    }, []);

    const countOccurrences = (status) => statusArray.filter(s => s === status).length;

    const arrayCancelado = countOccurrences('Cancelado');
    const arrayPendente = countOccurrences('Pendente');
    const arrayAprovado = countOccurrences('Aprovado');
    const arrayPreparandoEnvio = countOccurrences('Preparando envio');
    const arrayEnviadoSucesso = countOccurrences('Enviado com sucesso');
    const arrayChegouCasa = countOccurrences('Chegou em casa');

    const data = [
        ["", ""],
        ["Cancelado", arrayCancelado],
        ["Pendente", arrayPendente],
        ["Aprovado", arrayAprovado],
        ["Preparando envio", arrayPreparandoEnvio],
        ["Enviado com sucesso", arrayEnviadoSucesso],
        ["Chegou em casa", arrayChegouCasa],
    ];

    const options = {
        chart: {
            title: "Pedidos dos usuários",
            subtitle: "",
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
                        <h2>Compras</h2>
                    </div>
                    <Chart
                        chartType="Bar"
                        width="100%"
                        height="400px"
                        data={data}
                        options={options}
                    />
                    <PedidoTable />
                </div>
            </div>
        </>

    );
}

