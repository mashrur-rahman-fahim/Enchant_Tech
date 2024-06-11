import React, { useState } from "react";
import ProductData from "../../Product/ProductData";
import "./show-all.css";
import { Link } from "react-router-dom";

export const Show = () => {
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
      sortedItems = [...items].sort((a, b) => b.popularity - a.popularity);
    }
    setItems(sortedItems);
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
              <div className="product-actions">
                <button className="buy-button">Buy Now</button>
                <button className="cart-button">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
