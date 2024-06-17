import React, { useState, useContext } from "react";
import ProductData from "../../Product/ProductData";
import "./show-all.css";

import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../cart/CartContext";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>
      );
    } else if (i - rating < 1) {
      stars.push(
        <span key={i} className="star half-filled">
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="star">
          ★
        </span>
      );
    }
  }
  return <div className="rating">{stars}</div>;
};

export const Show = () => {
  const { fetchCartCount } = useContext(CartContext);
  const [items, setItems] = useState(ProductData);
  const [sortOption, setSortOption] = useState("");

  const search = (value) => {
    if (!value) {
      setItems(ProductData);
    } else {
      const filter_it = ProductData.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setItems(filter_it);
    }
  };

  const filterByBrand = (brand) => {
    if (brand === "All") {
      setItems(ProductData);
    } else {
      const filteredItems = ProductData.filter((item) => item.brand === brand);
      setItems(filteredItems);
    }
  };

  const handleSort = (option) => {
    setSortOption(option);
    let sortedItems;
    if (option === "price") {
      sortedItems = [...items].sort((a, b) => a.price - b.price);
    } else if (option === "popularity") {
      sortedItems = [...items].sort((a, b) => b.rating - a.rating);
    }
    setItems(sortedItems);
  };

  const add_to_cart = (test) => {
    fetch("http://localhost:4000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(test),
    })
      .then((response) => response.text())
      .then(() => fetchCartCount());
  };

  return (
    <div className="show-container">
      <div className="all-nav">
        <div className="search">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => search(e.target.value)}
          />
        </div>
        <div className="brand-filters">
          <button onClick={() => filterByBrand("All")}>Show All</button>
          <button onClick={() => filterByBrand("HP")}>HP</button>
          <button onClick={() => filterByBrand("ASUS")}>ASUS</button>
          <button onClick={() => filterByBrand("LENOVO")}>LENOVO</button>
        </div>
        <div className="sort-options">
          <button onClick={() => handleSort("price")}>Sort by Price</button>
          <button onClick={() => handleSort("popularity")}>Sort by Popularity</button>
        </div>
      </div>
      <div className="all-product">
        {items.map((item, idx) => (
          <div className="product-card" key={idx}>
            <div className="product-image">
              <img src={item.img} alt={item.title} />
            </div>
            <div className="product-info">
              <Link to={`/${item.id}`} className="product-title">
                {item.title}
              </Link>
              <p className="product-description">{item.description}</p>
              <p className="product-category">{item.cat}</p>
              <div className="product-price">Price: {item.price}</div>
              <StarRating rating={item.rating} />
              <div className="product-actions">
                <button className="buy-button">Buy Now</button>
                <button className="cart-button" onClick={() => add_to_cart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
