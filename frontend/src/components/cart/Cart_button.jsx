import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';


import './Cart.css'

export const Cart_button = () => {
  return (
    <div>
      <button className='cart_b'>
        <i className="fas fa-shopping-cart"></i> {/* Font Awesome cart icon */}
        cart
      </button>
    </div>
  )
}
