import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../cart/CartContext";


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

export const Component3 = () => {
  const { fetchCartCount } = useContext(CartContext);
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [brand, setBrand] = useState("All");

  const companyOptions = {
    gpu: ["NVIDIA", "AMD", "Asus", "MSI", "Gigabyte"],
    cpu: ["Intel", "AMD"],
    cpucooler: ["Cooler Master", "Corsair", "Noctua", "NZXT"],
    motherboard: ["Asus", "Gigabyte", "MSI", "ASRock"],
    ram: ["Corsair", "G.Skill", "Kingston", "Crucial"],
    ssd: ["Samsung", "Crucial", "Western Digital", "Kingston"],
  };
  const availableCompanies = companyOptions[category] || [];

  useEffect(() => {
    fetch(`http://localhost:4000/products`)
      .then(res => res.json())
      .then(data => {
        let filterData = data.filter(product => product.catagory === category);

        setProducts(filterData);
        setFilteredProducts(filterData);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, [category]);

  useEffect(() => {
    let result = [...products];
    if (searchValue) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    if (sortOption === "price") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "popularity") {
      result.sort((a, b) => b.rating - a.rating);
    }
    if (brand !== "All") {
      result = result.filter(
        product => product.brand.toLowerCase() === brand.toLowerCase()
      );
    }
    setFilteredProducts(result);
  }, [searchValue, sortOption, brand, products]);

  const handleAddToCart = product => {
    fetch("http://localhost:4000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...product, date: new Date() }),
    })
      .then(response => response.json())
      .then(() => fetchCartCount())
      .catch(error => console.error("Error adding item to cart:", error));
  };

  return (
    <div className="show-container">
      <div className="all-nav">
        <div className="search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>
        <div className="brand-filters">
          {availableCompanies.map((company, index) => (
            <button key={index} onClick={() => setBrand(company)}>
              {company}
            </button>
          ))}
          <button onClick={() => setBrand("All")}>All Brands</button>
        </div>
        <div className="sort-options">
          <button onClick={() => setSortOption("price")}>Sort by Price</button>
          <button onClick={() => setSortOption("popularity")}>Sort by Popularity</button>
        </div>
      </div>
      <div className="all-product">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              <img src={product.img} alt={product.title} />
            </div>
            <div className="product-info">
              <Link to={`/${product.id}`} className="product-title">
                {product.title}
              </Link>
              <p className="product-description">{product.description}</p>
              <div className="product-price">Price: {product.price}</div>
              <StarRating rating={product.rating} />
              <div className="product-actions">
                <button className="cart-button" onClick={() => handleAddToCart(product)}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
