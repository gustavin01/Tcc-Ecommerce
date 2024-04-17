import React from 'react';
import './ProductNotFound.css'; 
import Navbar from '../elementos/navbar';

const ProductNotFound = () => {
  return (
    <><Navbar/>
    <div className="product-not-found-container">
      <h2>Produto não encontrado</h2>
      <p>O link do produto selecionado não foi encontrado. Por favor, verifique se o link está correto.</p>
    </div>
    </>
  );
}

export default ProductNotFound;
