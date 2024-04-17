import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import axios from 'axios';

function GraficosTeste() {
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
    ["Status", "Quantidade"],
    ["Cancelado", arrayCancelado],
    ["Pendente", arrayPendente],
    ["Aprovado", arrayAprovado],
    ["Preparando Envio", arrayPreparandoEnvio],
    ["Enviado com Sucesso", arrayEnviadoSucesso],
    ["Chegou em Casa", arrayChegouCasa],
  ];

  const options = {
    chart: {
      title: "Pedidos dos usuários",
      subtitle: "Guya Ecommerce 2023",
    },
  };

  return (
    <>
      <h2>Lista de Pedidos</h2>
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </>
  );
}

export default GraficosTeste;
