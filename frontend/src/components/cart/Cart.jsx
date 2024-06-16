import React, { useEffect, useState } from "react";
import Axios from "axios";

export const Cart = () => {
    const [cartData, setCartData] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/api/cart')
        .then(response=>response.json())
        .then(data=>setCartData(data));
       

    },[])

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
                        <button className="remove">Remove</button>
                    </ul>
                </div>
            ))}
        </div>
    );
};
