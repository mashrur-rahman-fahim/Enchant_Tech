import React, { useEffect, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';


import './Cart.css'
import { Link } from 'react-router-dom'


export const Cart_button = () => {
  const [cartCount,setCartCount]=useState(0);
 useEffect(()=>{
    fetch('http://localhost:4000/api/cart')
    .then(response=>response.json())
    .then(data=>setCartCount(data.length))

  },[])
  return (
    <div>
      <Link to="/Cart"><button className='cart_b'><span>{cartCount}</span>
        <i className="fas fa-shopping-cart"></i> {/* Font Awesome cart icon */}
        cart
      </button></Link>
    </div>
  )
}
