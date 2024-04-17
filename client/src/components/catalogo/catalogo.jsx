import React, { useState } from 'react';
import Cart from '../carrinho/Cart';
import Navbar from '../elementos/navbar';
import ProductCard from './ProductCard';
import './ProductCard.css';
import Products from './Products';
import Footer from '../elementos/footer';

function Catalogo() {
  const [showDetailed, setShowDetailed] = useState(true);

  return (
    <>
      <Navbar />
      <Products showDetailed={showDetailed} />
      <Cart />
      <Footer />
    </>
  );
}

export default Catalogo;
