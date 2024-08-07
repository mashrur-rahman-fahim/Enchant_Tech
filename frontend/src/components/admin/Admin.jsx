// file: D:/web_app/Enchant_Tech/frontend/src/pages/Admin1.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import './Admin.css';
import { useAuth } from "../Authentication/AuthContext";
import axios from "axios";

export const Admin = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const { isLoggedIn, setIsLoggedIn } = useAuth();
  useEffect(() => {
    fetch("http://localhost:4000/auth", {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
        
          if (isLoggedIn) navigate('/Admin');
        } else {
        
          setIsLoggedIn(false);
          navigate('/Login');
        }
      })
      .catch(err => console.error(err));
  }, [navigate, isLoggedIn, setIsLoggedIn]);

  const [product, setProduct] = useState({
    img: "",
    title: "",
    description: "",
    price: "",
    cat: "gaming",
    catagory: "laptop",
    brand: "",
  });

  const [productCounts, setProductCounts] = useState({
    laptop: 0,
    desktop: 0,
    processor: 0,
    cpuCooler: 0,
    motherboard: 0,
    graphicsCard: 0,
    ram: 0,
    hdd: 0,
    ssd: 0,
    monitor: 0,
    casing: 0
  });

  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2, 3],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)"
      }
    ]
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const brandOptions = {
    laptop: ["HP", "Asus", "Lenovo", "Dell", "Apple", "Acer", "MSI","ULTRABOOK"],
    desktop: ["HP", "Asus", "Lenovo", "Dell", "Acer", "MSI","iMac"],
    processors: ["Intel", "AMD"],
    cpucoolers: ["Cooler Master", "Corsair", "Noctua", "NZXT"],
    motherboard: ["Asus", "Gigabyte", "MSI", "ASRock"],
    graphics: ["NVIDIA", "AMD", "Asus", "Gigabyte", "MSI"],
    ram: ["Corsair", "G.Skill", "Kingston", "Crucial"],
    hdds: ["Seagate", "Western Digital", "Toshiba"],
    ssds: ["Samsung", "Crucial", "Western Digital", "Kingston"],
    monitor: ["Dell", "LG", "Samsung", "Asus"],
    casing: ["Cooler Master", "Corsair", "NZXT", "Fractal Design"],
  };

  useEffect(() => {
    fetchProductCounts();
    fetchSalesData();
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
    setError("");
    setSuccess("");
    try {
      const response = await fetch("http://localhost:4000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });
      if (response.ok) {
        setSuccess("Product uploaded successfully!");
        setProduct({
          img: "",
          title: "",
          description: "",
          price: "",
          cat: "gaming",
          catagory: "laptop",
          brand: brandOptions["laptop"][0].toLowerCase(),
        });
        document.getElementById("admin_form").reset();
        fetchProductCounts();
      } else {
        const result = await response.json();
        setError(result.message || "Failed to upload product.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while uploading the product.");
    }
  };

  const fetchProductCounts = async () => {
    try {
      const response = await fetch("http://localhost:4000/products");
      const data = await response.json();

      const initialCounts = {
        laptop: 0,
        desktop: 0,
        processor: 0,
        cpuCooler: 0,
        motherboard: 0,
        graphicsCard: 0,
        ram: 0,
        hdd: 0,
        ssd: 0,
        monitor: 0,
        casing: 0,
      };

      const productCounts = data.reduce((counts, product) => {
        switch (product.catagory) {
          case "laptop":
            counts.laptop++;
            break;
          case "desktop":
            counts.desktop++;
            break;
          case "processors":
            counts.processor++;
            break;
          case "cpucoolers":
            counts.cpuCooler++;
            break;
          case "motherboard":
            counts.motherboard++;
            break;
          case "graphics":
            counts.graphicsCard++;
            break;
          case "ram":
            counts.ram++;
            break;
          case "hdds":
            counts.hdd++;
            break;
          case "ssds":
            counts.ssd++;
            break;
          case "monitor":
            counts.monitor++;
            break;
          case "casing":
            counts.casing++;
            break;
          default:
            break;
        }
        return counts;
      }, initialCounts);

      setProductCounts(productCounts);

    } catch (error) {
      console.error("Error fetching product counts:", error);
      setError("Failed to fetch product counts.");
    }
  };

  const fetchSalesData = () => {
    console.log("sales");
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
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
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
                <option value="processors">Processors</option>
                <option value="cpucoolers">CPU Coolers</option>
                <option value="motherboard">Motherboard</option>
                <option value="graphics">Graphics Card</option>
                <option value="ram">Ram</option>
                <option value="hdds">HDDs</option>
                <option value="ssds">SSDs</option>
                <option value="monitor">Monitors</option>
                <option value="casing">Casings</option>
              </select>
            </label>
            <label>
              Brand:
              <select name="brand" value={product.brand} onChange={handleChange}>
                {brandOptions[product.catagory].map((brand, index) => (
                  <option key={index} value={brand}>{brand}</option>
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
            <div className="product-count">
            <Link to={`/catagory/${"laptop"}`}><h3>Laptops</h3></Link>
              <p>{productCounts.laptop}</p>
            </div>
            <div className="product-count">
              <Link to={`/catagory/${"desktop"}`}><h3>Desktops</h3></Link>
              <p>{productCounts.desktop}</p>
            </div>
            <div className="product-count">
            <Link to={`/catagory/${"processors"}`}> <h3>Processors</h3></Link>
              <p>{productCounts.processor}</p>
            </div>
            <div className="product-count">
            <Link to={`/catagory/${"cpucoolers"}`}><h3>CPU Coolers</h3></Link>
              <p>{productCounts.cpuCooler}</p>
            </div>
            <div className="product-count">
            <Link to={`/catagory/${"motherboard"}`}> <h3>Motherboards</h3></Link>
              <p>{productCounts.motherboard}</p>
            </div>
            <div className="product-count">
            <Link to={`/catagory/${"graphics"}`}><h3>Graphics Cards</h3></Link>
              <p>{productCounts.graphicsCard}</p>
            </div>
            <div className="product-count">
            <Link to={`/catagory/${"ram"}`}><h3>RAM</h3></Link>
              <p>{productCounts.ram}</p>
            </div>
            <div className="product-count">
            <Link to={`/catagory/${"hdds"}`}><h3>HDDs</h3></Link>
              <p>{productCounts.hdd}</p>
            </div>
            <div className="product-count">
            <Link to={`/catagory/${"ssds"}`}><h3>SSDs</h3></Link>
              <p>{productCounts.ssd}</p>
            </div>
            <div className="product-count">
            <Link to={`/catagory/${"monitor"}`}><h3>Monitors</h3></Link>
              <p>{productCounts.monitor}</p>
            </div>
            <div className="product-count">
            <Link to={`/catagory/${"casing"}`}> <h3>Casings</h3></Link>
              <p>{productCounts.casing}</p>
            </div>
          </div>
        </section>
        <section className="chart-section">
          <h2>Sales Data</h2>
          <div className="chart-container">
            <Line data={chartData} />
          </div>
        </section>
      </main>
    </div>
  );
};
