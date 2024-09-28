// src/components/show-all/Show.js

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../cart/CartContext";
import "./show-all.css";
import { useAuth } from "../../Authentication/AuthContext";

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
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const { fetchCartCount } = useContext(CartContext);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const brandOptions = ["All", "HP", "Asus", "Lenovo", "Dell", "Acer", "MSI"];

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => {
        let filterData = data.filter(
          (product) => product.catagory === "desktop"
        );
        setItems(filterData);
        setFilteredItems(filterData);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    let result = [...items];
    if (searchValue) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    if (sortOption) {
      if (sortOption === "price") {
        result.sort((a, b) => a.price - b.price);
      } else if (sortOption === "popularity") {
        result.sort((a, b) => b.rating - a.rating);
      }
    }
    setFilteredItems(result);
  }, [items, searchValue, sortOption]);

  const search = (value) => {
    setSearchValue(value);
  };

  const filterByBrand = (brand) => {
    if (brand === "All") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(
        (item) => item.brand.toLowerCase() === brand.toLowerCase()
      );
      setFilteredItems(filtered);
    }
  };

  const handleSort = (option) => {
    setSortOption(option);
  };
  const handleRemv = (id) => {
    fetch(`http://localhost:4000/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload();
      });
  };
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
          {brandOptions.map((brand, index) => (
            <button key={index} onClick={() => filterByBrand(brand)}>
              {brand}
            </button>
          ))}
        </div>
        <div className="sort-options">
          <button onClick={() => handleSort("price")}>Sort by Price</button>
          <button onClick={() => handleSort("popularity")}>
            Sort by Popularity
          </button>
        </div>
      </div>
      <div className="all-product">
        {filteredItems.map((item, idx) => (
          <div className="product-card" key={idx}>
            <div className="product-image">
              <img src={item.img} alt={item.title} />
            </div>
            <div className="product-info">
              <Link to={`/${item._id}`} className="product-title">
                {item.title}
              </Link>
              <p className="product-description">{item.description}</p>
              <p className="product-category">{item.cat}</p>
              <div className="product-price">Price: {item.price}</div>

              <div className="product-actions">
                {isLoggedIn === false ? (
                  <button
                    className="cart-button"
                    onClick={() => addToCart(item)}
                  >
                    Buy Now
                  </button>
                ) : (
                  <button
                    className="cart-button"
                    onClick={() => handleRemv(item.id)}
                  >
                    REMOVE
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
