import React, { useEffect, useState } from 'react';
import Axios from 'axios';


const PedidoRecusado = () => {
    const [cookieInfo, setCookieInfo] = useState(null);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [qtd, setQtd] = useState('');
    const [datah, setData] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/getPedidoStatus')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    const title = data.cookieTitle;
                    const price = data.cookiePrice;
                    const qtd = data.cookieQuantity;
                    const datah = data.cookieData;

                    if (title && price && qtd) {
                        setTitle(title);
                        setPrice(price);
                        setQtd(qtd);
                        setData(datah);
                        setCookieInfo({ title, price, qtd, datah });
                    } else {
                        console.error("Alguma variável não está definida.");
                    }
                } else {
                    alert("Falha ao obter dados");
                    console.log(error);
                }
            })
            .catch(error => console.error('Erro na requisição:', error));
    }, []);

    const estiloPagina = {
        textAlign: 'center',
        marginTop: '50px',
        background: 'linear-gradient(45deg, #ff0000, #7a1b0c)',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
    };

    const estiloCookieInfo = {
        padding: '20px',
        border: '1px solid #ffffff',
        borderRadius: '4px',
        background: 'rgba(255, 255, 255, 0.1)', // Cor de fundo com opacidade
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Sombra sutil
    };

    const estiloBotao = {
        backgroundColor: '#ffffff',
        color: '#ff0000',
        padding: '10px 20px',
        fontSize: '20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '20px',
    };

    const voltarPagina = async () => {
        try {
          // Obtenha dados de 'getTotalCartValue'
          const responseCartValue = await fetch('http://localhost:3001/getTotalCartValue');
    
          if (!responseCartValue.ok) {
            console.error('Erro ao obter o valor total do carrinho:', responseCartValue.statusText);
            return; // Encerre a execução em caso de erro
          }
    
          const data = await responseCartValue.json();
          console.log("data ", data);
    
          const dataqtdesize = data.dataqtdesize;
          console.log("dataqtdesize", dataqtdesize);
    
          const responseDataProducts = await fetch('http://localhost:3001/getListProd');
          if (!responseDataProducts.ok) {
            console.error('Erro ao obter o valor total do carrinho:', responseCartValue.statusText);
            return; // Encerre a execução em caso de erro
          }
    
          const allData = dataqtdesize.map(item => ({
            productId: item.productId,
            selectedSize: item.selectedSize,
            selectedQuantity: item.selectedQuantity,
          }));
    
          console.log("allData", allData);
    
          const dataProd = await responseDataProducts.json();
          console.log("dataProd ", dataProd);
    
          const allDataProd = dataProd.map(item => ({
            productId: item.id_produto,
            nomeProd: item.nome,
            valorProd: item.valor,
          }));
      
          console.log("allDataProd ", allDataProd);
      
          // Filtrar os produtos com base nos IDs presentes em allData
          const produtosFiltrados = allData.map(({ productId, selectedSize, selectedQuantity }) => {
            const produto = allDataProd.find(item => item.productId === productId);
            console.log(`Procurando por productId: ${productId}`);
            if (produto) {
              console.log(`Produto encontrado para productId ${productId}: `, produto);
              return {
                DPproductId: produto.productId,
                DPnomeProd: produto.nomeProd,
                DPvalorProd: produto.valorProd,
                DPselectedSize: selectedSize,
                DPselectedQuantity: selectedQuantity,
                DPsubTotal: produto.valorProd * selectedQuantity+'.00',
              };
            } else {
              console.log(`Nenhum produto encontrado para productId ${productId}`);
              return null;
            }
          });
              
          console.log("Produtos filtrados: ", produtosFiltrados);
          console.log("Nomes filtrados: ", produtosFiltrados.map(item => item.DPnomeProd));
    
          // Adicione uma verificação para garantir que cookieInfo não seja nulo
          if (cookieInfo && cookieInfo.title) {
            let userId = localStorage.getItem('userId');
            let status = "Cancelado";
    
            // Envie dados para 'setPedidoStatus'
            const responsePedidoStatus = await Axios.post("http://localhost:3001/setPedidoStatusRecusado", {
              nome: cookieInfo.title,
              preco: cookieInfo.price,
              qtd: cookieInfo.qtd,
              datah: cookieInfo.datah,
              userid: userId,
              status: status,
              productId: allData.map(item => item.productId),
              selectedSize: allData.map(item => item.selectedSize),
              selectedQuantity: allData.map(item => item.selectedQuantity),
              DPproductId: produtosFiltrados.map(item => item.DPproductId),
              DPnomeProd: produtosFiltrados.map(item => item.DPnomeProd),
              DPvalorProd: produtosFiltrados.map(item => item.DPvalorProd),
              DPselectedSize: produtosFiltrados.map(item => item.DPselectedSize),
              DPselectedQuantity: produtosFiltrados.map(item => item.DPselectedQuantity),
              DPsubTotal: produtosFiltrados.map(item => item.DPsubTotal),
            });
    
            if (responsePedidoStatus.data.status === 'ok') {
              window.location.href = '/home';
              //alert("Parabens");
            } else {
              alert("Falha ao registrar no banco");
              console.log(responsePedidoStatus.data);
            } 
          } else {
            console.error('cookieInfo ou cookieInfo.title é nulo ou indefinido.');
          }
        } catch (error) {
          console.error('Erro durante o processo:', error);
        }
      };
    

    /*const voltarPagina = () => {
        const userId = localStorage.getItem('userId');
        const status = "Cancelado";
        console.log(userId);
      
        Axios.post("http://localhost:3001/setPedidoStatusRecusado", {
          nome: title,
          preco: price,
          qtd: qtd,
          datah: datah,
          userid: userId,
          status: status
        })
          .then((response) => {
            if (response.data.status === 'ok') {
              //window.location.href = '/home';
              alert("Pedido Recusado");
            } else {
              alert("Falha ao registrar no banco");
              console.log(response.data); // Exibir a resposta do servidor para depuração
            }
          })
          .catch((error) => {
            alert('Erro ao obter dados do servidor: ' + error.message);
          });
      }; */

    return (
        <>
            <div style={estiloPagina}>
                <h1>Pedido Recusado</h1>
                {cookieInfo && (
                    <div style={estiloCookieInfo}>
                        <h4>{cookieInfo.title}</h4>
                        <h5>Preço: R$ {cookieInfo.price},00</h5>
                        <h5>Total: {cookieInfo.qtd} unidade</h5>
                        <h5>Data: {cookieInfo.datah}</h5>
                    </div>
                )}
                <br />
                <h3>Desculpe, seu pedido foi recusado. Entre em contato conosco para obter mais informações.</h3>
                <button style={estiloBotao} onClick={voltarPagina}>Voltar</button>
            </div>
        </>
    );
}

export default PedidoRecusado;