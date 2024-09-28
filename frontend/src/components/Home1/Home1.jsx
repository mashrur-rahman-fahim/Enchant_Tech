import "./Home.css";
import React, { useContext, useEffect, useState } from "react";
import a from "../assets/PC/a.jpg";
import b from "../assets/PC/b.avif";
import c from "../assets/PC/c.webp";
import d from "../assets/PC/d.jpg";
import { Link } from "react-router-dom";
import { CartContext } from "../cart/CartContext";

export const Home1 = () => {
  const { fetchCartCount } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [src, setSrc] = useState("");
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  let desktopCount = 0,
    laptopCount = 0,
    cpuCount = 0,
    gpuCount = 0,
    motherboardCount = 0,
    ramCount = 0;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/products?_limit=3&_page=${page}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts((prevIndex) => [...prevIndex, ...data]);
        if (data.length === 0) setHasMore(false);
        setProducts(data);
        setSrc(data[0]?.img);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);
  const { updateCart } = useContext(CartContext);
  const addToCart = (product) => {
    // Fetch existing cart data from local storage
    const existingCartData = JSON.parse(localStorage.getItem("cart")) || [];

    // Find if the product is already in the cart
    const existingProductIndex = existingCartData.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // Product exists in the cart, update its count
      existingCartData[existingProductIndex].count += 1;
    } else {
      // Product does not exist in the cart, add it
      existingCartData.push({ ...product, count: 1, date: new Date() });
    }

    // Save the updated cart data back to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCartData));

    // Update the cart data in the context
    updateCart(existingCartData);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % products.length);
      setSrc(products[index]?.img);
    }, 5000);

    return () => clearInterval(interval);
  }, [index, products]);
  const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  const currentDate = new Date();
  const tenDaysAgo = new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000);

  //if (loading) {
  //return <div className="loading">Loading...</div>;
  //}

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
              if (item.catagory === "desktop" && desktopCount < 3) {
                desktopCount++;

                return (
                  <div className="cl1" key={idx}>
                    <img src={item.img} alt={item.title} />
                    <div className="home_price">Price {item.price}</div>
                    <button
                      onClick={() => {
                        addToCart(item);
                      }}
                    >
                      Order Now
                    </button>
                  </div>
                );
              }
              if (item.catagory === "laptop" && laptopCount < 3) {
                laptopCount++;

                return (
                  <div className="cl1" key={idx}>
                    <img src={item.img} alt={item.title} />
                    <div className="home_price">Price {item.price}</div>
                    <button
                      onClick={() => {
                        addToCart(item);
                      }}
                    >
                      Order Now
                    </button>
                  </div>
                );
              }
              if (item.catagory === "gpu" && gpuCount < 3) {
                gpuCount++;

                return (
                  <div className="cl1" key={idx}>
                    <img src={item.img} alt={item.title} />
                    <div className="home_price">Price {item.price}</div>
                    <button
                      onClick={() => {
                        addToCart(item);
                      }}
                    >
                      Order Now
                    </button>
                  </div>
                );
              }
              if (item.catagory === "cpu" && cpuCount < 3) {
                cpuCount++;

                return (
                  <div className="cl1" key={idx}>
                    <img src={item.img} alt={item.title} />
                    <div className="home_price">Price {item.price}</div>
                    <button
                      onClick={() => {
                        addToCart(item);
                      }}
                    >
                      Order Now
                    </button>
                  </div>
                );
              }
              if (item.catagory === "motherboard" && motherboardCount < 5) {
                motherboardCount++;

                return (
                  <div className="cl1" key={idx}>
                    <img src={item.img} alt={item.title} />
                    <div className="home_price">Price {item.price}</div>
                    <button
                      onClick={() => {
                        addToCart(item);
                      }}
                    >
                      Order Now
                    </button>
                  </div>
                );
              }
              if (item.catagory === "ram" && ramCount < 3) {
                ramCount++;

                return (
                  <div className="cl1" key={idx}>
                    <img src={item.img} alt={item.title} />
                    <div className="home_price">Price {item.price}</div>
                    <button
                      onClick={() => {
                        addToCart(item);
                      }}
                    >
                      Order Now
                    </button>
                  </div>
                );
              }
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
            <Link to="/Desktop">
              <button>Desktop</button>
            </Link>
          </div>
          <div className="laptop">
            <img src={b} alt="Laptop" />
            <Link to="Laptop">
              <button>Laptop</button>
            </Link>
          </div>
          <div className="components">
            <img src={c} alt="Components" />
            <Link to="category/cpu">
              <button>Components</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    //{loading && <Loading />}
  );
};
