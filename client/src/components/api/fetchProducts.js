const fetchProducts = async () => {
  try {
    const response = await fetch('http://127.0.0.1:3001/getListProd');
    const data = await response.json();
    console.log('aqui', data);
    return data; 
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};


export default fetchProducts;