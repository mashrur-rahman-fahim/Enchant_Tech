import "./Home.css";
import React, { useEffect, useState } from "react";
import a from "../assets/PC/a.jpg";
import b from "../assets/PC/b.avif";
import c from "../assets/PC/c.webp";
import d from "../assets/PC/d.jpg";
import { Link } from "react-router-dom";
export const Home1 = () => {
  const [src, setsrc] = useState(a);
  let photo = [a, b, c, d];
  let i = 0;

  function Change() {
    i++;
    if (i == 4) i = 0;

    setsrc(photo[i]);
  }
  window.onload = function () {
    setInterval(() => {
      Change();
    }, 3000);
  };

  return (
    <div>
      <img class="image" src={src} alt="" />
      <div className="title-line">
          <div className="line"></div>
          <div className="title">FEATURE PRODUCT</div>
          <div className="line"></div>
        </div>
      <div className="featured-shop">
        <div className="row">
          <div className="cl1">
            <img src={a} alt="" />

            <button>Order Now</button>
          </div>
          <div className="cl2">
            <img src={b} alt="" />
            <button>Order Now</button>
          </div>
        </div>
        <div className="row">
          <div className="cl1" id="r2">
            <img src={c} alt="" />
            <button>Order Now</button>
          </div>
          <div className="cl2">
            <img src={d} alt="" />
            <button>Order Now</button>
          </div>
        </div>
        <div className="row">
          <div className="cl1">
            <img src={a} alt="" />
            <button>Order Now</button>
          </div>
          <div className="cl2">
            <img src={b} alt="" />
            <button>Order Now</button>
          </div>
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
