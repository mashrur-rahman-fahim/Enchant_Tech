import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../cart/CartContext";
import { useAuth } from "../Authentication/AuthContext";


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
  const { isLoggedIn, setIsLoggedIn } = useAuth();

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

  const { updateCart } = useContext(CartContext);
  const addToCart = (product) => {
    // Fetch existing cart data from local storage
    const existingCartData = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Find if the product is already in the cart
    const existingProductIndex = existingCartData.findIndex(item => item.id === product.id);
  
    if (existingProductIndex !== -1) {
      // Product exists in the cart, update its count
      existingCartData[existingProductIndex].count += 1;
    } else {
      // Product does not exist in the cart, add it
      existingCartData.push({ ...product, count: 1, date: new Date() });
    }
  
    // Save the updated cart data back to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCartData));
  
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
              {isLoggedIn===false?
                <button className="cart-button" onClick={() => addToCart(product)}>
                Buy Now
                </button>:
                <button className="cart-button" onClick={() =>handleRemv(product.id)}>
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
