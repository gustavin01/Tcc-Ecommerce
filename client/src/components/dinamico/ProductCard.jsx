import React, { useContext, useState } from 'react';
import { BsFillCartPlusFill } from 'react-icons/bs';
import AppContext from '../api/AppContext';
import "../estilo/style.css";

function ProductCardDi({ id_produto, data, onAddToCart, showDetailed }) {
  const { cartItems, setCartItems } = useContext(AppContext);
  const [productData, setProductData] = useState(data);

  // Cria um objeto para armazenar produtos por categoria
  const productsByCategory = {};

  if (!productsByCategory[data.id_categoria]) {
    productsByCategory[data.id_categoria] = [];
  }

  // Adiciona o produto ao array correspondente à sua categoria
  productsByCategory[data.id_categoria].push(productData || data);

  const handleAddCart = () => {
    const product = productData || data;
  
    if (product) {
      const existingItem = cartItems.find((item) => item.id_produto === product.id_produto);
  
      if (existingItem) {
        alert("produto ja foi adicionado!");
      } else {
        setCartItems([...cartItems, { ...product}]);
      }
    }
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

  return (
    <div className="new-product-box-wrapper">
      {Array.isArray(productsByCategory[data.id_categoria]) &&
        productsByCategory[data.id_categoria]
          .filter((product) => product.ativo !== 0) // Filtra produtos com status diferente de 1
          .map((product, index) => (
            <div className="new-product-box" key={index}>
              <a href={imageUrls[product.nome_imagemM] || getDefaultLink()} className="new-product-img">
                <span>{product.nome_marca}</span>
                <img src={`http://127.0.0.1:3001/uploads/${product.nome_imagemM}`} alt={`Imagem ${product.nome}`} />
              </a>
              <div className="new-product-text">
                <h3 className="new-product-title">{product.nome}</h3>
                <h5 >R$ {product.valor}</h5>
              </div>
              <section className="product-card">
                <div className="card__infos">Comprar</div>
                <button type="button" className="button__add-cart" onClick={() => handleAddCart(product.id_produto)}>
                  <BsFillCartPlusFill />
                </button>
              </section>
            </div>
          ))}
    </div>
  );
}

export default ProductCardDi;
