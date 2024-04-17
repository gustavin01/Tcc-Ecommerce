import React, { useState } from 'react';
import Cart from '../carrinho/Cart';
import ProductsDi from './Products';
import Footer from '../elementos/footer';
import { Helmet } from "react-helmet";
import "../estilo/style.css";

function CatalogoDi() {
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
      <section id="new_products">
        <div className="new-p-heading">
          <h3>Novos Produtos</h3>
          <ul>
            <li className={`filter-list ${marcaFiltrada === null ? 'active' : ''}`} onClick={() => handleLimparFiltro()}>Todos</li>
            <li className={`filter-list ${marcaFiltrada === 'Nike' ? 'active' : ''}`} onClick={() => handleFiltrarMarca('Nike')}>Nike</li>
            <li className={`filter-list ${marcaFiltrada === 'Adidas' ? 'active' : ''}`} onClick={() => handleFiltrarMarca('Adidas')}>Adidas</li>
            <li className={`filter-list ${marcaFiltrada === 'Pulma' ? 'active' : ''}`} onClick={() => handleFiltrarMarca('Pulma')}>Pulma</li>
          </ul>
          <ProductsDi marcaFiltrada={marcaFiltrada} />
        </div>

        {/*
        <Helmet>
          <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
          <script>
            {`
              var selector = '.new-p-heading li';

              $(document).ready(function(){
                  $('.filter-list').click(function(){
                      const value = $(this).text(); // Alterado para obter o texto do elemento clicado

                      // Remover a classe 'active' de todos os itens do filtro
                      $('.filter-list').removeClass('active');
                      // Adicionar a classe 'active' apenas ao item clicado
                      $(this).addClass('active');

                      // Mostrar todos os itens
                      $('.new-product-box-wrapper').show('1000');

                      // Se a marca selecionada não for 'Todos', filtrar os itens
                      if (value !== 'Todos') {
                          $('.new-product-box-wrapper').not('.'+value).hide('1000');
                          $('.new-product-box-wrapper').filter('.'+value).show('1000');
                      }
                  });
              });
            `}
          </script>
        </Helmet>
*/}

      </section>

      <Cart />
    </>
  );
}

export default CatalogoDi;
