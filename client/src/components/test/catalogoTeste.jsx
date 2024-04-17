// CatálogoTeste.jsx
import React, { useState } from 'react';
import Cart from '../carrinho/Cart';
import ProductTeste from './ProductTeste';
import { Helmet } from 'react-helmet';
import '../estilo/style.css';
import Navbar from '../elementos/navbar';

function CatalogoTeste() {
  const [marcaFiltrada, setMarcaFiltrada] = useState(null);

  const handleFiltrarMarca = (marca) => {
    setMarcaFiltrada(marca);
  };

  const handleLimparFiltro = () => {
    setMarcaFiltrada(null);
  };

  return (
    <>
      <Helmet>
        <title>Catálogo de Produtos</title>
      </Helmet>
      <Navbar />
      <section id="new_products">
        <div className="new-product-container">
          <div className="botoes-filtro">
            <button onClick={() => handleLimparFiltro()}>Exibir Todos</button>
            <button onClick={() => handleFiltrarMarca('Nike')}>Nike</button>
            <button onClick={() => handleFiltrarMarca('Adidas')}>Adidas</button>
            <button onClick={() => handleFiltrarMarca('Puma')}>Puma</button>
          </div>
          <ProductTeste marcaFiltrada={marcaFiltrada} />
        </div>
      </section>
      <Cart />
    </>
  );
}

export default CatalogoTeste;
