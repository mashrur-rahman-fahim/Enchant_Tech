// products.js (React component for front-end)
import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import { CartContext } from "../../cart/CartContext";  // Adjust the path

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i} className="star filled">★</span>);
    } else {
      stars.push(<span key={i} className="star">★</span>);
    }
  }
  return <div className="rating">{stars}</div>;
};

export const AllinOne = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState("");
  const brandOptions = ["All", "HP", "Asus", "Lenovo", "Dell", "Acer", "MSI"];

  const { updateCart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();  // Initial fetch
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/pro`, {
        params: {
          page,
          limit: 5,
        },
      });
      setItems((prevItems) => [...prevItems, ...response.data.products]);
      setFilteredItems((prevItems) => [...prevItems, ...response.data.products]);

      if (response.data.products.length < 5) {
        setHasMore(false);  // No more products to fetch
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const loadMoreProducts = () => {
    setPage((prevPage) => prevPage + 1);
    fetchProducts();
  };

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

  const addToCart = (product) => {
    const existingCartData = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = existingCartData.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      existingCartData[existingProductIndex].count += 1;
    } else {
      existingCartData.push({ ...product, count: 1, date: new Date() });
    }

    localStorage.setItem('cart', JSON.stringify(existingCartData));
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
              <p className="product-category">{item.cat.toUpperCase()}</p>
              <div className="product-price">Price: {item.price}</div>
              
              <div className="product-actions">
                <button className="cart-button" onClick={() => addToCart(item)}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <InfiniteScroll
        dataLength={filteredItems.length}
        next={loadMoreProducts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more products to show</p>}
      />
    </div>
  );
};
