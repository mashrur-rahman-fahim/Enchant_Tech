import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';


import './Cart.css'
import { Link } from 'react-router-dom'

export const Cart_button = () => {
  return (
    <div>
      <Link to="/Cart"><button className='cart_b'>
        <i className="fas fa-shopping-cart"></i> {/* Font Awesome cart icon */}
        cart
      </button></Link>
    </div>
  )
}
