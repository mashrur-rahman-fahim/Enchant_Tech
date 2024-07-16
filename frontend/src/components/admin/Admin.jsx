import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import './Admin.css';

export const Admin = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const [product, setProduct] = useState({
    img: "",
          title: "",
          description: "",
          price: "",
          cat: "gaming",
          catagory:"laptop",
          brand: "asus",


  
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });
      if (response.ok) {
        alert("Product uploaded successfully!");
        setProduct({
          img: "",
          title: "",
          description: "",
          price: "",
          cat: "gaming",
          catagory:"laptop",
          brand: "asus",
          
        });
        document.getElementById("admin_form").reset();
        fetchProductCounts();
      } else {
        alert("Failed to upload product.");
      }
    } catch (error) {
      console.log(product)
      console.error("Error:", error);
      alert("An error occurred while uploading the product.");
    }
  };

  const fetchProductCounts = () => {
    console.log("count");
  };

  const fetchSalesData =  () => {
   console.log("sales")
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <button
          onClick={() => {
            setIsLoggedIn(false);
            
            navigate("/login");
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
              <input type="text" name="title" value={product.name} onChange={handleChange} required />
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
              <input type="url" name="img" value={product.imageUrl} onChange={handleChange} required />
            </label>
            <label>
              Category:
              <select name="catagory" value={product.category} onChange={handleChange}>
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
              <option value="asus">Asus</option>
              <option value="hp">HP</option>


              </select>
            </label>
            <button type="submit">Upload Product</button>
          </form>
        </section>
        <section className="product-counts-section">
          <h2>Product Counts</h2>
          <div className="product-counts">
            <div className="product-count">
              <h3>Laptops</h3>
              <p>{productCounts.laptop}</p>
            </div>
            <div className="product-count">
              <h3>Desktops</h3>
              <p>{productCounts.desktop}</p>
            </div>
            <div className="product-count">
              <h3>Processors</h3>
              <p>{productCounts.processor}</p>
            </div>
            <div className="product-count">
              <h3>CPU Coolers</h3>
              <p>{productCounts.cpuCooler}</p>
            </div>
            <div className="product-count">
              <h3>Motherboards</h3>
              <p>{productCounts.motherboard}</p>
            </div>
            <div className="product-count">
              <h3>Graphics Cards</h3>
              <p>{productCounts.graphicsCard}</p>
            </div>
            <div className="product-count">
              <h3>RAM</h3>
              <p>{productCounts.ram}</p>
            </div>
            <div className="product-count">
              <h3>HDDs</h3>
              <p>{productCounts.hdd}</p>
            </div>
            <div className="product-count">
              <h3>SSDs</h3>
              <p>{productCounts.ssd}</p>
            </div>
            <div className="product-count">
              <h3>Monitors</h3>
              <p>{productCounts.monitor}</p>
            </div>
            <div className="product-count">
              <h3>Casings</h3>
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
