import "./Home.css";
import React, { useEffect, useState } from "react";
import a from "../assets/PC/a.jpg";
import b from "../assets/PC/b.avif";
import c from "../assets/PC/c.webp";
import d from "../assets/PC/d.jpg";

export const Home1 = () => {
  const [products, setProducts] = useState([]);
  const [src, setSrc] = useState("");
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
        setSrc(data[0]?.img);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % products.length);
      setSrc(products[index]?.img);
    }, 5000);

    return () => clearInterval(interval);
  }, [index, products]);

  const currentDate = new Date();
  const tenDaysAgo = new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home-container">
      <div className="image-carousel">
        <img className="image" src={src} alt="Product" />
      </div>
      <div className="title-line">
        <div className="line"></div>
        <div className="title">FEATURE PRODUCT</div>
        <div className="line"></div>
      </div>
      <div className="featured-shop">
        <div className="row">
          {products.map((item, idx) => {
            const productDate = new Date(item.date);
            if (productDate >= tenDaysAgo) {
              return (
                <div className="cl1" key={idx}>
                  <img src={item.img} alt={item.title} />
                  <div className="home_price">Price {item.price}</div>
                  <button>Order Now</button>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="shop-by-category">
        <div className="title-line">
          <div className="line"></div>
          <div className="title">SHOP BY CATEGORY</div>
          <div className="line"></div>
        </div>
        <div className="shop-row">
          <div className="desktop">
            <img src={a} alt="Desktop" />
            <button>Desktop</button>
          </div>
          <div className="laptop">
            <img src={b} alt="Laptop" />
            <button>Laptop</button>
          </div>
          <div className="components">
            <img src={c} alt="Components" />
            <button>Components</button>
          </div>
        </div>
      </div>
    </div>
  );
};
