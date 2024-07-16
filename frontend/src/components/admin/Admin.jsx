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
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "laptop",
    brand: "",
    date: new Date().toISOString().split('T')[0]
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
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });
      if (response.ok) {
        alert("Product uploaded successfully!");
        setProduct({
          name: "",
          description: "",
          price: "",
          imageUrl: "",
          category: "laptop",
          brand: "",
          date: new Date().toISOString().split('T')[0]
        });
        fetchProductCounts();
      } else {
        alert("Failed to upload product.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the product.");
    }
  };

  const fetchProductCounts = async () => {
    try {
      const response = await fetch("/api/products/counts");
      if (response.ok) {
        const data = await response.json();
        setProductCounts(data);
      } else {
        console.error("Error fetching product counts");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchSalesData = async () => {
    try {
      const response = await fetch("/api/sales");
      if (response.ok) {
        const data = await response.json();
        setChartData({
          labels: ["January", "February", "March", "April", "May"],
          datasets: [
            {
              label: "Sales",
              data: data,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)"
            }
          ]
        });
      } else {
        console.error("Error fetching sales data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
          <form className="admin-form" onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={product.name} onChange={handleChange} required />
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
              <input type="url" name="imageUrl" value={product.imageUrl} onChange={handleChange} required />
            </label>
            <label>
              Category:
              <select name="category" value={product.category} onChange={handleChange}>
                <option value="laptop">Laptop</option>
                <option value="desktop">Desktop</option>
              </select>
            </label>
            <label>
              Brand:
              <input type="text" name="brand" value={product.brand} onChange={handleChange} required />
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
