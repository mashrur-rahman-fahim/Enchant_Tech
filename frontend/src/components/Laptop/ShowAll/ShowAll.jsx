// src/components/show-all/Show.js

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../cart/CartContext";
import { useAuth } from "../../Authentication/AuthContext";


const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i} className="star filled">★</span>);
    } else if (i - rating < 1) {
      stars.push(<span key={i} className="star half-filled">★</span>);
    } else {
      stars.push(<span key={i} className="star">★</span>);
    }
  }
  return <div className="rating">{stars}</div>;
};

export const ShowAll = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const { fetchCartCount } = useContext(CartContext);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const brandOptions = ["All", "HP", "Asus", "Lenovo", "Dell", "Apple", "Acer", "MSI"];
  const handleRemv=(id)=>{
    fetch(`http://localhost:4000/products/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }

      
    })
    .then(response => response.json())
    .then(data =>{ window.location.reload()})
}
  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(res => res.json())
      .then(data => {
        let filterData = data.filter(product => product.catagory === "laptop");
        setItems(filterData);
        setFilteredItems(filterData);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    let result = [...items];
    if (searchValue) {
      result = result.filter(product =>
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
      const filtered = items.filter((item) => item.brand.toLowerCase() === brand.toLowerCase());
      setFilteredItems(filtered);
    }
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  const addToCart = (product) => {
    const productToAdd = { ...product, date: new Date() };

    fetch("http://localhost:4000/api/cart", {
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
          {brandOptions.map((brand, index) => (
            <button key={index} onClick={() => filterByBrand(brand)}>
              {brand}
            </button>
          ))}
        </div>
        <div className="sort-options">
          <button onClick={() => handleSort("price")}>Sort by Price</button>
          <button onClick={() => handleSort("popularity")}>Sort by Popularity</button>
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
              {isLoggedIn===false?
                <button className="cart-button" onClick={() => addToCart(item)}>
                Buy Now
                </button>:
                <button className="cart-button" onClick={() =>handleRemv(item.id)}>
                REMOVE
                </button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
