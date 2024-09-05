import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth1 } from "../Authentication/LoginContest";

export const Cart = () => {
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const { cartData, updateCart, cartCount } = useContext(CartContext);
    const { isLoggedIn1, setIsLoggedIn1 } = useAuth1();

    const navigate = useNavigate();

    useEffect(() => {
        calculateTotals();
    }, [cartData, discount]);

    const rmv_frm_crt = (id) => {
        const updatedCartData = cartData.map(item => {
            if (item.id === id) {
                // Decrement the count or remove the item if the count is 1
                if (item.count > 1) {
                    return { ...item, count: item.count - 1 };
                } else {
                    return null; // Mark for removal
                }
            }
            return item;
        }).filter(item => item !== null); // Remove the marked items
    
        updateCart(updatedCartData);
    };

    const applyCoupon = () => {
        if (couponCode === "DISCOUNT10") {
            setDiscount(0.1 * subtotal);
        } else {
            setDiscount(0);
        }
    };

    const calculateTotals = () => {
        let newSubtotal = cartData.reduce((acc, item) => acc + (item.price * (item.count || 1)), 0);
        setSubtotal(newSubtotal);
        setTotal(newSubtotal - discount);
    };

    const handlePayment = () => {
       if(isLoggedIn1){
        navigate('/Payment-option');}
    else
    navigate('/Login');
    };

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
                        <li><img src={item.img} alt={item.title} /></li>
                        <li>{item.title}</li>
                        <li>{item.count || 1}</li>
                        <li>{item.price}</li>
                        <li><button onClick={() => rmv_frm_crt(item.id)} className="remove">Remove</button></li>
                    </ul>
                </div>
            ))}
            <section id="cartAdd" className="section-p1">
                <div className="coupon">
                    <h3>Apply Coupon</h3>
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button onClick={applyCoupon}>Apply</button>
                </div>
                <div className="totals">
                    <h3>Cart Total</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>Cart Total</td>
                                <td>${subtotal.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td><strong>Total</strong></td>
                                <td>${total.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={handlePayment} className="checkout-button">Checkout</button>
                </div>
            </section>
        </div>
    );
};
