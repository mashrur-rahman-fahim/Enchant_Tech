import "./Home.css";
import React, {  useEffect, useState } from "react";
import ProductData from "../Product/ProductData";
import a from "../assets/PC/a.jpg";
import b from "../assets/PC/b.avif";
import c from "../assets/PC/c.webp";
import d from "../assets/PC/d.jpg";

export const Home1 = () => {
 const [src, setSrc] = useState(a);
  const [index, setIndex] = useState(0);
  const photo = [a, b, c, d];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % photo.length);
      setSrc(photo[index]);
    }, 5000); // Change the interval time (in milliseconds) as needed

    return () => clearInterval(interval);
  }, [index, photo]);
  const currentDate = new Date();
  const tenDaysAgo = new Date(currentDate.getTime() - (10 * 24 * 60 * 60 * 1000));


  
  return (
    <div>
<div className="image-carousel">
        
        <img className="image" src={src} alt="" />
      </div>
          <div className="title-line">
        <div className="line"></div>
        <div className="title">FEATURE PRODUCT</div>
        <div className="line"></div>
      </div>
      <div className="featured-shop">
        <div className="row">
          {
            ProductData.map((items,idx)=>{
              const productDate=new Date(items.date);
              if(productDate>=tenDaysAgo){
              
              return (
                <>
                {
                  
                <div className="cl1" >
                  <img src={items.img} alt="Loading"/>
                  <div className="home_price">Price {items.price}</div>
                  <button>Order Now</button>
                  

                </div>}
                
                </>
              )

            }})
          }
        </div>
        
      </div>
      <div className="shop-by-catagory">
        <div className="title-line">
          <div className="line"></div>
          <div className="title">SHOP BY CATAGORY</div>
          <div className="line"></div>
        </div>
        <div className="shop-row">
          <div className="desktop">
            <img src={a} alt="" />
            <button>Desktop</button>
          </div>
          <div className="laptop">
            <img src={b} alt="" />
            <button>Laptop</button>
          </div>
          <div className="components">
            <img src={c} alt="" />
            <button>Components</button>
          </div>
        </div>
      </div>
    </div>
  );
};
