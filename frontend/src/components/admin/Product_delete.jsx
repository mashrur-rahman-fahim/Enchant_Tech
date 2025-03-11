// src/components/show-all/Show.js

import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../cart/CartContext";

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

export const Product_delete = () => {
  const { fetchCartCount } = useContext(CartContext);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { catagory } = useParams();
  const catagory1 = catagory.toString();
  const remove_product = (id) => {
    fetch(`https://enchant-tech-backend.onrender.com/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
      });
  };

  useEffect(() => {
    fetch("https://enchant-tech-backend.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        let filterData = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].catagory === catagory1) filterData.push(data[i]);
        }

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
      const filtered = items.filter((item) => item.brand === brand);
      setFilteredItems(filtered);
    }
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  const addToCart = (product) => {
    const productToAdd = { ...product, date: new Date() };

    fetch("https://enchant-tech-backend.onrender.com/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productToAdd),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Added to cart:", data);
        fetchCartCount();
      })
      .catch((error) => console.error("Error adding item to cart:", error));
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
          <button onClick={() => filterByBrand("hp")}>HP</button>
          <button onClick={() => filterByBrand("asus")}>ASUS</button>
          <button onClick={() => filterByBrand("lenovo")}>LENOVO</button>
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
              <Link to={`/${item.id}`} className="product-title">
                {item.title}
              </Link>
              <p className="product-description">{item.description}</p>
              <p className="product-category">{item.cat}</p>
              <div className="product-price">Price: {item.price}</div>
              <StarRating rating={item.rating} />
              <div className="product-actions">
                <button
                  className="remove_product"
                  onClick={() => remove_product(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
