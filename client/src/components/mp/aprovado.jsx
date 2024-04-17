import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import AppContext from '../api/AppContext';
import axios from "axios";

const Aprovado = () => {
  const [cookieInfo, setCookieInfo] = useState(null);

  const [productId, setProductId] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [dataSent, setDataSent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/getPedidoStatus');
        const data = await response.json();

        if (data.status === 'ok') {
          const { cookieTitle, cookiePrice, cookieQuantity, cookieData } = data;
          setCookieInfo({ title: cookieTitle, price: cookiePrice, qtd: cookieQuantity, datah: cookieData });
        } else {
          console.error('Falha ao obter dados:', data);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    fetchData();
  }, []);

  const estiloPagina = {
    textAlign: 'center',
    marginTop: '50px',
    background: 'linear-gradient(45deg, #109010 , #176917)',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
  };

  const estiloCookieInfo = {
    padding: '20px',
    border: '1px solid #ffffff',
    borderRadius: '4px',
    background: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const estiloBotao = {
    backgroundColor: '#ffffff',
    color: '#008000',
    padding: '10px 20px',
    fontSize: '20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  };

  const { cartItems, setCartItems, isCartVisible } = useContext(AppContext);

  const updateCartAndSave = (updatedCartItems) => {
    setCartItems(updatedCartItems);
  };

  useEffect(() => {
    try {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      } else {
        localStorage.setItem('cartItems', JSON.stringify([]));
      }
    } catch (error) {
      console.error('Error parsing cartItems from localStorage:', error);
    }
  }, [setCartItems]);

  // Este useEffect irá atualizar o localStorage sempre que houver uma mudança em cartItems
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleClearCart = async () => {
    try {
      // Remover dataQtdeSizeVal do localStorage, se existir
      if (localStorage.getItem('dataQtdeSizeVal')) {
        localStorage.removeItem('dataQtdeSizeVal');
      }

      // Atualizar o estado do carrinho localmente
      updateCartAndSave([]);

      // Solicitar ao servidor para limpar o carrinho
      const response = await axios.delete('http://127.0.0.1:3001/api/carrinhoDeleteAll');

      if (response.status === 200) {
        // Se a solicitação for bem-sucedida, informe ao usuário que o carrinho foi limpo
        alert('O carrinho foi limpo com sucesso.');
      } else {
        // Se a solicitação falhar, informe ao usuário sobre o erro
        alert('Erro ao limpar o carrinho. Por favor, tente novamente mais tarde.');
      }
    } catch (error) {
      // Em caso de erro, informe ao usuário sobre o erro
      console.error('Erro ao limpar o carrinho:', error);
      alert('Erro ao limpar o carrinho. Por favor, tente novamente mais tarde.');
    }
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

      // Obtenha dados de 'obterEstoqueGraficos'
      const responseEstoque = await fetch('http://localhost:3001/obterEstoqueGraficos');
      const estoqueData = await responseEstoque.json();
      console.log("EstoqueData: ", estoqueData);

      // Filtrar as linhas de estoqueData com base em allData e armazenar apenas os campos necessários
      const estoqueFiltrado = estoqueData
        .filter(estoqueItem => {
          return allData.some(dataItem =>
            dataItem.productId === estoqueItem.id_produto &&
            dataItem.selectedSize.toString() === estoqueItem.nome_tamanho
          );
        })
        .map(filteredItem => ({
          id_estoque: filteredItem.id_estoque,
          qtde: filteredItem.qtde - allData.find(dataItem =>
            dataItem.productId === filteredItem.id_produto &&
            dataItem.selectedSize === parseInt(filteredItem.nome_tamanho)
          ).selectedQuantity,
          id_produto: filteredItem.id_produto,
          nome_tamanho: filteredItem.nome_tamanho
        }));

      console.log("Estoque filtrado: ", estoqueFiltrado);

      // Adicione uma verificação para garantir que cookieInfo não seja nulo
      if (cookieInfo && cookieInfo.title) {
        let userId = localStorage.getItem('userId');
        let status = "Aprovado";

        // Envie dados para 'setPedidoStatus'
        const responsePedidoStatus = await Axios.post("http://localhost:3001/setPedidoStatus", {
          nome: cookieInfo.title,
          preco: cookieInfo.price,
          qtd: cookieInfo.qtd,
          datah: cookieInfo.datah,
          userid: userId,
          status: status,
          productId: allData.map(item => item.productId),
          selectedSize: allData.map(item => item.selectedSize),
          selectedQuantity: allData.map(item => item.selectedQuantity),
          idEstoque: estoqueFiltrado.map(item => item.id_estoque),
          qtdeUp: estoqueFiltrado.map(item => item.qtde),
          DPproductId: produtosFiltrados.map(item => item.DPproductId),
          DPnomeProd: produtosFiltrados.map(item => item.DPnomeProd),
          DPvalorProd: produtosFiltrados.map(item => item.DPvalorProd),
          DPselectedSize: produtosFiltrados.map(item => item.DPselectedSize),
          DPselectedQuantity: produtosFiltrados.map(item => item.DPselectedQuantity),
          DPsubTotal: produtosFiltrados.map(item => item.DPsubTotal),
        });

        if (responsePedidoStatus.data.status === 'ok') {
          // Limpar o carrinho
          await handleClearCart();

          // Redirecionar para a página inicial
          window.location.href = '/home';
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

  return (
    <>
      <div style={estiloPagina}>
        <h1>Pedido Aprovado</h1>
        {cookieInfo && (
          <div style={estiloCookieInfo}>
            <h4>{cookieInfo.title}</h4>
            <h5>Preço: R$ {cookieInfo.price},00</h5>
            <h5>Total: {cookieInfo.qtd} unidade</h5>
            <h5>Data: {cookieInfo.datah}</h5>
          </div>
        )}
        <br />
        <h3>Parabéns, seu pedido foi aprovado! Aguarde pela entrega.</h3>
        <button style={estiloBotao} onClick={voltarPagina}>Voltar</button>
      </div>
    </>
  );
}

export default Aprovado;
