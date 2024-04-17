import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Chart } from "react-google-charts";

function GraphComponent() {
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
      subtitle: "Porcentagem do valor de estoque dos produtos",
    },
    bars: "horizontal",
    axes: {
      y: {
        0: { side: "right" },
      },
    },
  };

  return (
    <div>
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default GraphComponent;
