// file: D:/web_app/Enchant_Tech/frontend/src/pages/Admin1.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Admin.css';
import { useAuth } from "../Authentication/AuthContext";
import axios from "axios";

export const Admin = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    // Authenticate the user on page load
    axios.get("http://localhost:4000/auth", { withCredentials: true })
      .then(response => {
        if (response.data.valid) {
          if (!isLoggedIn) {
            setIsLoggedIn(true);
            navigate('/Admin');
          }
        } else {
          setIsLoggedIn(false);
          navigate('/Login');
        }
      })
      .catch(err => {
        console.error("Authentication error:", err);
        setIsLoggedIn(false);
        navigate('/Login');
      });
  }, [navigate, isLoggedIn, setIsLoggedIn]);

  const [product, setProduct] = useState({
    img: "",
    title: "",
    description: "",
    price: "",
    cat: "gaming",
    catagory: "laptop", // Backend uses "catagory" field
    brand: "",
  });

  const [productCounts, setProductCounts] = useState({
    laptop: 0,
    desktop: 0,
    gpu: 0,
    cpu: 0,
    cpucooler: 0,
    motherboard: 0,
    ram: 0,
    ssd: 0,
  });

  const brandOptions = {
    laptop: ["HP", "Asus", "Lenovo", "Dell", "Apple", "Acer", "MSI"],
    desktop: ["HP", "Asus", "Lenovo", "Dell", "Acer", "MSI"],
    gpu: ["NVIDIA", "AMD", "Asus", "MSI", "Gigabyte"],
    cpu: ["Intel", "AMD"],
    cpucooler: ["Cooler Master", "Corsair", "Noctua", "NZXT"],
    motherboard: ["Asus", "Gigabyte", "MSI", "ASRock"],
    ram: ["Corsair", "G.Skill", "Kingston", "Crucial"],
    ssd: ["Samsung", "Crucial", "Western Digital", "Kingston"],
  };

  useEffect(() => {
    fetchProductCounts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'catagory') {
      setProduct(prevState => ({
        ...prevState,
        brand: brandOptions[value][0].toLowerCase()
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/products", product, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200) {
        setProduct({
          img: "",
          title: "",
          description: "",
          price: "",
          cat: "gaming",
          catagory: "laptop",
          brand: brandOptions["laptop"][0].toLowerCase(),
        });
        fetchProductCounts();
      } else {
        console.error("Failed to upload product.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchProductCounts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/products");
      const data = response.data;

      const initialCounts = {
        laptop: 0,
        desktop: 0,
        gpu: 0,
        cpu: 0,
        cpucooler: 0,
        motherboard: 0,
        ram: 0,
        ssd: 0,
      };

      const productCounts = data.reduce((counts, product) => {
        switch (product.catagory) { // Backend uses "catagory" field
          case "laptop":
            counts.laptop++;
            break;
          case "desktop":
            counts.desktop++;
            break;
          case "gpu":
            counts.gpu++;
            break;
          case "cpu":
            counts.cpu++;
            break;
          case "cpucooler":
            counts.cpucooler++;
            break;
          case "motherboard":
            counts.motherboard++;
            break;
          case "ram":
            counts.ram++;
            break;
          case "ssd":
            counts.ssd++;
            break;
          default:
            break;
        }
        return counts;
      }, initialCounts);

      setProductCounts(productCounts);
    } catch (error) {
      console.error("Error fetching product counts:", error);
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <button
          onClick={() => {
            setIsLoggedIn(false);
            navigate("/Login");
          }}
          className="logout-button"
        >
          Logout
        </button>
        <h1>Admin Panel</h1>
      </header>
      <main className="admin-main">
        <section className="form-section">
          <h2>Upload Product</h2>
          <form id="admin_form" className="admin-form" onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="title" value={product.title} onChange={handleChange} required />
            </label>
            <label>
              Description:
              <input type="text" name="description" value={product.description} onChange={handleChange} required />
            </label>
            <label>
              Price:
              <input type="number" name="price" value={product.price} onChange={handleChange} required />
            </label>
            <label>
              Image URL:
              <input type="url" name="img" value={product.img} onChange={handleChange} required />
            </label>
            <label>
              Category:
              <select name="catagory" value={product.catagory} onChange={handleChange}>
                <option value="laptop">Laptop</option>
                <option value="desktop">Desktop</option>
                <option value="gpu">GPU</option>
                <option value="cpu">CPU</option>
                <option value="cpucooler">CPU Cooler</option>
                <option value="motherboard">Motherboard</option>
                <option value="ram">RAM</option>
                <option value="ssd">SSD</option>
              </select>
            </label>
            <label>
              Brand:
              <select name="brand" value={product.brand} onChange={handleChange}>
                {brandOptions[product.catagory].map((brand, index) => (
                  <option key={index} value={brand.toLowerCase()}>{brand}</option>
                ))}
              </select>
            </label>
            <label>
              Type:
              <select name="cat" value={product.cat} onChange={handleChange}>
                <option value="gaming">Gaming</option>
                <option value="all">ALL-IN-ONE</option>
              </select>
            </label>
            <button type="submit">Upload Product</button>
          </form>
        </section>
        <section className="product-counts-section">
          <h2>Product Counts</h2>
          <div className="product-counts">
            {Object.entries(productCounts).map(([key, count]) => (
              <div key={key} className="product-count">
                <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                <p>{count}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
