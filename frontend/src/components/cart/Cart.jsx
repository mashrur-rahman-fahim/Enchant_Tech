import React, { useContext, useEffect, useState } from "react";

import "./Cart.css"
import { CartContext } from "./CartContext";

export const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const { fetchCartCount } = useContext(CartContext);
    useEffect(()=>{
        fetch('http://localhost:4000/api/cart')
        .then(response=>response.json())
        .then(data=>setCartData(data));
       

    },[])
    const rmv_frm_crt=(id)=>{
        fetch(`http://localhost:4000/api/cart/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }

        })
        .then(response=>response.json())
        .then(()=>{
            setCartData(cartData.filter((usr)=>usr.id!=(id-'0')))
            
            fetchCartCount()});
    }

    return (
        <div>
            <ul className="Cart_headers">
                <li>IMAGE</li>
                <li>NAME</li>
                <li>COUNT</li>
                <li>PRICE</li>
                <li>REMOVE</li>
            </ul>
            {cartData.map((item, index) => (
                <div className="cart_list" key={index}>
                    <ul className="data_list">
                        <li><img src={`../assets/PC/a.jpg`} alt={item.title} /></li>
                        <li>{item.title}</li>
                        <li>{item.count || 1}</li> {/* Assuming there's a count field or defaulting to 1 */}
                        <li>{item.price}</li>
                        <button onClick={()=>rmv_frm_crt(item.id)} className="remove">Remove</button>
                    </ul>
                </div>
            ))}
        </div>
    );
};
