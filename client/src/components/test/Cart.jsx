import React, { useContext, useState, useEffect } from 'react';

import './Cart.css';
import CartItem from './CartItem';
import AppContext from '../api/AppContext';
import formatCurrency from '../api/formatCurrency';
import axios from "axios";
import CartButtonClose from './CartButtonClose';

function Cart() {
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

  const fecharCarrinho = async () => {
    const token = localStorage.getItem('token');

    if (cartItems.length === 0) {
      alert('O carrinho está vazio.');
      return;
    }

    if (token) {
      const idProdutos = cartItems.map((item) => item.id_produto);
      window.location.href = '/cartpage';
      console.log('Id dos produtos no carrinho:', idProdutos);
    } else {
      window.location.href = '/login';
      alert('Para comprar, é necessário estar cadastrado e logado.');
    }
  };

  const handleUpdateCart = (updatedCartItems) => {
    updateCartAndSave(updatedCartItems);
  };

  const handleClearCart = async () => {
    try {
      if (cartItems.length === 0) {
        alert('O carrinho está vazio.');
        return;
      } else {
        // Send a request to delete the entire cart data on the server
        await axios.delete('http://127.0.0.1:3001/api/carrinhoDeleteAll');
  
        // Update the cart locally and reload the page
        updateCartAndSave([]);
        window.location.reload();
      }
    } catch (error) {
      console.error('Erro ao limpar o carrinho:', error);
    }
  };
  

  return (
    <>
      <section className={`cart ${isCartVisible ? 'cart--active' : ''}`}>
        <div className="cart-items">
          <CartButtonClose />
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.id_produto} data={cartItem} onUpdateCart={handleUpdateCart} />
          ))}
        </div>
        <div className="cart-btns">
          <button className="buy-now" onClick={fecharCarrinho}>
            Ver Carrinho
          </button>
          <button className="clear-cart" onClick={handleClearCart}>
            Limpar Carrinho
          </button>
        </div>
      </section>
    </>
  );
}

export default Cart;
