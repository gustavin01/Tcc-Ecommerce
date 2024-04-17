// Provider.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchProducts from './fetchProducts';


function Provider({ children }) {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    } catch (error) {
      console.error('Error parsing cartItems from localStorage:', error);
      return [];
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [isCartVisible, setIsCartVisible] = useState(false);

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
  }, []);

  const value = {
    products,
    setProducts,
    loading,
    setLoading,
    cartItems,
    setCartItems,
    isCartVisible,
    setIsCartVisible,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Provider;