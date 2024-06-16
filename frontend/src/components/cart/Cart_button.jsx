import React, { useContext } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Cart.css';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

export const Cart_button = () => {
  const { cartCount } = useContext(CartContext);

  return (
    <div>
      <Link to="/cart">
        <button className='cart_b'>
          <span>{cartCount}</span>
          <i className="fas fa-shopping-cart"></i> {/* Font Awesome cart icon */}
          cart
        </button>
      </Link>
    </div>
  );
};
