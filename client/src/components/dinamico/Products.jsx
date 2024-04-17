import React, { useEffect, useContext, useState } from 'react';
import './Products.css';
import fetchProducts from '../api/fetchProducts';
import AppContext from '../api/AppContext';
import ProductCard from './ProductCard';
import Loading from '../catalogo/Loading';

function ProductsDi({ marcaFiltrada }) {
  const { products, setProducts, loading, setLoading } = useContext(AppContext);
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    async function fetchProductsAsync() {
      try {
        const response = await fetchProducts();
        console.log('Dados dos produtos:', response);

        // Certifique-se de que 'items' existe nos dados recebidos
        const productsData = response && response.length > 0 ? response : [];

        setProducts(productsData);
        console.log('produtos:', products);
        setLoading(false);
        setForceUpdate((prev) => !prev);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }

    fetchProductsAsync();
  }, [setProducts, setLoading]);

  // Função para filtrar produtos com base na marca e ativos
  const filtrarPorMarca = () => {
    if (!marcaFiltrada) {
      return products.filter((produto) => produto.ativo !== 0); // Filtra apenas produtos ativos
    }

    return products.filter((produto) => produto.nome_marca === marcaFiltrada && produto.ativo !== 0); // Filtra apenas produtos ativos
  };

  const produtosFiltrados = filtrarPorMarca();
  console.log("produtosFiltrados ", produtosFiltrados);

  return (
    <>
      <section className="products container">
        {loading ? (
          <Loading />
        ) : (
          (Array.isArray(produtosFiltrados) && produtosFiltrados.length > 0) ? (
            produtosFiltrados.map((produto) => (
              <ProductCard key={produto.id_produto} data={produto} />
            ))
          ) : (
            <p>Nenhum produto encontrado.</p>
          )
        )}
      </section>
    </>
  );
}

export default ProductsDi;
