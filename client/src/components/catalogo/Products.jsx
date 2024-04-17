import React, { useEffect, useContext } from 'react';
import './Products.css';
import fetchProducts from '../api/fetchProducts';
import Loading from './Loading';
import AppContext from '../api/AppContext';
import ProductCard from './ProductCard';

function Products({ showDetailed }) {
  const { products, setProducts, loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    async function fetchProductsAsync() {
      try {
        const response = await fetchProducts();
        setProducts(response);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }

    fetchProductsAsync();
  }, [setProducts, setLoading]);

  console.log('Estado de products:', products); 

  return (
    <section className="products container">
      {loading ? (
        <Loading />
      ) : (
        Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id_produto} data={product} showDetailed={showDetailed} />
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )
      )}
    </section>
  );
}

export default Products;
