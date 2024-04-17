import React, { useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import './CartButton.css';
import AppContext from '../api/AppContext';

function CartButtonClose() {
  const { isCartVisible, setIsCartVisible } = useContext(AppContext);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <button
      type="button"
      className="cart__button"
      onClick={toggleCartVisibility}
    >
      <AiOutlineClose />
    </button>
  );
}

export default CartButtonClose;
