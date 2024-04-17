import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BsCartDashFill } from 'react-icons/bs';
import './CartItem.css';
import formatCurrency from '../api/formatCurrency';
import AppContext from '../api/AppContext';
import axios from 'axios';

function CartItem({ data, onUpdateCart }) {
  const { cartItems, setCartItems } = useContext(AppContext);
  const { id_produto, nome, valor, nome_imagemM } = data;
  const [productDetails, setProductDetails] = useState(null);
  const [qtdeDados, setQtdeDados] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtém os detalhes do produto
        const productResponse = await axios.put(`http://127.0.0.1:3001/api/produtos/${id_produto}`);
        if (productResponse.data) {
          setProductDetails(productResponse.data);
        }

        const totalCartValueResponse = await fetch(`http://localhost:3001/qtdeCI/${id_produto}`);
        if (totalCartValueResponse.ok) {
          const selectedQuantities = await totalCartValueResponse.json();
                
          setQtdeDados(selectedQuantities); // Define allDados com os selectedQuantities
        
        } else {
          console.error('Erro ao obter o valor total do carrinho:', totalCartValueResponse.statusText);
        }
        
        
      } catch (error) {
        console.error('Erro ao obter detalhes do produto ou valor total do carrinho:', error);
      }
    };
    fetchData();
  }, [id_produto]);

  const handleRemoveItem = async () => {
    // Mostra um alerta de confirmação antes de excluir o item
    const confirmed = window.confirm("Tem certeza de que deseja remover este produto?\n(Você perderá todos os produtos relacionados a este)");
    if (!confirmed) {
      return; // Se o usuário cancelar, saia da função
    }
  
    try {
      await new Promise((resolve) => {
        // Delay execution by 2 seconds
        setTimeout(resolve, 1000);
      });
  
      let updatedItems;
  
      // Verifica se os detalhes do produto estão disponíveis
      if (productDetails) {
        // Envia uma requisição DELETE para remover o item do carrinho.json no servidor
        await axios.delete(`http://127.0.0.1:3001/api/carrinho/${id_produto}`);
      }
  
      // Atualiza o estado do carrinho removendo o item localmente
      updatedItems = cartItems.filter(item => item.id_produto !== id_produto);
      setCartItems(updatedItems);
      onUpdateCart(updatedItems);
  
    } catch (error) {
      console.error('Erro ao remover o item do carrinho:', error);
    }
    getTotalCartValue();
    window.location.reload();
  };  

  const imageUrls = {
    'image-1705088087318-269733145.png': 'ProdDesc',
    'image-1705086396897-474130.png': 'prodtadizero',
    'image-1705086762712-508218331.png': 'prodtcampusf',
    'image-1705086686584-764464360.png': 'prodforumb',
    'image-1705086513929-106225260.png': 'prodtcampus00s',
    'image-1705086837096-832032392.png': 'prodjordan1',
    'image-1705086902066-784912006.png': 'prodforum84',
    'image-1705087022711-16949409.png': 'prodfastfwd',
    'image-1705087146818-423925594.png': 'proddiscblaze',
    'image-1705087195358-744144182.png': 'prodchuspeed',
    'image-1705088160982-878482314.png': 'ProdAch22',
    'image-1705088018483-399304474.png': 'ProdAirf',
  };

  const getDefaultLink = () => {
    return 'prodnotfound';
  };

  const getTotalCartValue = async () => {
    console.log("chegou no getTotalCartValue");
    try {
      const response = await fetch('http://localhost:3001/getTotalCartValue');
      if (response.ok) {
        const data = await response.json();
        console.log("data ", data);

        // Agora você pode acessar diretamente os dadosqtdesize
        const dataqtdesize = data.dataqtdesize;


        const qtdeF = qtdeDados.totalQuantity;
        const valorUp = valor * qtdeF;

        // Armazene todos os dados em uma única variável
        const allData = dataqtdesize.map(item => ({
          productId: item.productId,
          selectedSize: item.selectedSize,
          selectedQuantity: item.selectedQuantity,
        }));

        console.log("allData", allData);

        const totalValueSumString = localStorage.getItem('totalValueSum');
        const totalValueSumRecuperado = totalValueSumString ? parseInt(totalValueSumString, 10) : 0;
        const totalValueSum = totalValueSumRecuperado - valorUp;
        localStorage.setItem('totalValueSum', totalValueSum.toString());


        console.log("valorUp ",valorUp);
        console.log("totalValueSumRecuperado ", totalValueSumRecuperado);
        console.log("totalValueSum ", totalValueSum);


      } else {
        console.error('Erro ao obter o valor total do carrinho:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao obter o valor total do carrinho:', error);
    }
  };

  return (
    <section className="cart-item">
      <img src={`http://127.0.0.1:3001/uploads/${nome_imagemM}`} alt="imagem do produto" className="cart-item-image" />

      <div className="cart-item-content">
        <a href={imageUrls[nome_imagemM] || getDefaultLink()}>
          <h3 className="cart-item-title">{nome}</h3>
        </a>
        <h4 className="cart-item-price">R$ {valor ? formatCurrency(valor, 'BRL') : 'Valor indisponível'}</h4>

        {productDetails && (
          <>
            <p>Qtde: {productDetails.selectedQuantity} | Tam: {productDetails.selectedSize} </p>

          </>
        )}

        <button type="button" className="button__remove-item" onClick={handleRemoveItem}>
          <BsCartDashFill />
        </button>
      </div>
    </section>
  );
}

CartItem.propTypes = {
  data: PropTypes.shape({
    id_produto: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    valor: PropTypes.number,
    nome_imagemM: PropTypes.string.isRequired,
  }).isRequired,
  onUpdateCart: PropTypes.func.isRequired,
};

export default CartItem;