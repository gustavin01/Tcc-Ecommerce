import React, { useContext, useState } from 'react';
import { BsFillCartPlusFill } from 'react-icons/bs';
import AppContext from '../api/AppContext';


function ProductCard({ id_produto, data, onAddToCart, showDetailed }) {
  const { cartItems, setCartItems } = useContext(AppContext);
  const [productData, setProductData] = useState(data);

  const handleAddCart = () => {
    const product = productData || data;

    if (product) {
      const existingItem = cartItems.find((item) => item.id_produto === product.id_produto);

      if (existingItem) {
        const updatedItems = cartItems.map((item) =>
          item.id_produto === product.id_produto ? { ...item, qtde: item.qtde + 1 } : item
        );
        setCartItems(updatedItems);
      } else {
        setCartItems([...cartItems, { ...product, qtde: 1 }]);
      }
    }
  };  

  if (showDetailed) {
    let imgPath = '../../../public/imagens/';
    let imagem = data.img;
    let img = imgPath+imagem;
        console.log(img);
    return (
      <section className="product-card">
        <img src={img} alt="product" className="card__image" />
        <div className="card__infos">
        <h2 className="card__price">R$ {data.valor}</h2>
          <h2 className="card__title">{data.nome}</h2>
        </div>
        <button type="button" className="button__add-cart" onClick={handleAddCart}>
          <BsFillCartPlusFill />
        </button>
      </section>
    );
  } else {
    return (
      <section className="product-card">
        <div className="card__infos">
          {/* Renderize suas informações do produto aqui */}
        </div>
        <button type="button" className="button__add-cart" onClick={handleAddCart}>
          <BsFillCartPlusFill />
        </button>
      </section>
    );
  }
}

export default ProductCard;
