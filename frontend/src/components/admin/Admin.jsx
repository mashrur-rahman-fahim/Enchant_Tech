// file: D:/web_app/Enchant_Tech/frontend/src/pages/Admin1.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";
import { useAuth } from "../Authentication/AuthContext";
import axios from "axios";

export const Admin = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    // Authenticate the user on page load
    axios
      .get("http://localhost:4000/auth", { withCredentials: true })
      .then((response) => {
        if (response.data.valid) {
          if (!isLoggedIn) {
            setIsLoggedIn(true);
            navigate("/Admin");
          }
        } else {
          setIsLoggedIn(false);
          navigate("/Login");
        }
      })
      .catch((err) => {
        console.error("Authentication error:", err);
        setIsLoggedIn(false);
        navigate("/Login");
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

  const [payments, setPayments] = useState([]); // State for payments
  const [productDetailsMap, setProductDetailsMap] = useState({}); // Store product details

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
    fetchPayments(); // Fetch payments on component mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "catagory") {
      setProduct((prevState) => ({
        ...prevState,
        brand: brandOptions[value][0].toLowerCase(),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/products",
        product,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
        switch (
          product.catagory // Backend uses "catagory" field
        ) {
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

  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://localhost:4000/payment-option");
      if (Array.isArray(response.data)) {
        setPayments(response.data);
        fetchProductDetails(response.data); // Fetch product details based on payment data
      } else {
        console.warn("Unexpected response format:", response.data);
        setPayments([]); // Set to empty array if not an array
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const fetchProductDetails = async (payments) => {
    try {
      const productIds = payments.flatMap((payment) => payment.products); // Get all product IDs
      const uniqueProductIds = [...new Set(productIds)]; // Remove duplicates
      const productDetailsPromises = uniqueProductIds.map((id) =>
        axios.get(`http://localhost:4000/products/${id}`)
      );
      const responses = await Promise.all(productDetailsPromises);

      const detailsMap = {};
      responses.forEach((response) => {
        if (response.status === 200) {
          const product = response.data;
          detailsMap[product._id] = product; // Store product details in a map
        }
      });
      setProductDetailsMap(detailsMap); // Update the state with product details map
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleDeletePayment = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/payment-option/${id}`
      );
      if (response.status === 200) {
        console.log("Payment profile deleted successfully");
        fetchPayments(); // Refresh payments after deletion
      } else {
        console.error("Failed to delete payment profile");
      }
    } catch (error) {
      console.error("Error deleting payment profile:", error);
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-container">
        <header className="admin-header">
          <button
            onClick={async () => {
              try {
                const response = await fetch("http://localhost:4000/logout", {
                  method: "POST",
                  credentials: "include", // This is necessary to send cookies with the request
                });

                if (response.ok) {
                  console.log("Logged out successfully");
                  setIsLoggedIn(false);
                  navigate("/login");
                } else {
                  console.error("Failed to log out");
                }
              } catch (error) {
                console.error("Error during logout:", error);
              }
            }}
            className="logout-button"
          >
            Logout
          </button>
          <h1 className="admin-title">Admin Panel</h1>
        </header>
        <main className="admin-main">
          <section className="form-section">
            <h2>Upload Product</h2>
            <form
              id="admin_form"
              className="admin-form"
              onSubmit={handleSubmit}
            >
              <label className="form-label">
                Name:
                <input
                  type="text"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Description:
                <input
                  type="text"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Price:
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Image URL:
                <input
                  type="url"
                  name="img"
                  value={product.img}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Category:
                <select
                  name="catagory"
                  value={product.catagory}
                  onChange={handleChange}
                  className="form-select"
                >
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
              <label className="form-label">
                Brand:
                <select
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  className="form-select"
                >
                  {brandOptions[product.catagory]?.map((brand, index) => (
                    <option key={index} value={brand.toLowerCase()}>
                      {brand}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className="submit-button">
                Add Product
              </button>
            </form>
          </section>
          <section className="product-counts-section">
          <h2>Product Counts</h2>
          <div className="product-counts">
            {Object.entries(productCounts).map(([key, count]) => (
              <div key={key} className="product-count">
               <h3 onClick={()=>{
                const route_path=key.charAt(0)+key.slice(1)
                if(route_path==="desktop" || route_path==="laptop")
                {navigate(`/${route_path}`)}
                else
                navigate(`/category/${key.charAt(0)+key.slice(1)}`)}}>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                <p>{count}</p>
              </div>
            ))}
          </div>
        </section>
          <section className="payment-section">
            <h2>Payments</h2>
            <ul className="payment-list">
              {payments.map((payment) => (
                <li key={payment._id} className="payment-item">
                  <div>
                    <h3>{payment.name}</h3>
                    <p>
                      Profile:{" "}
                      {productDetailsMap[payment.products[0]]?.title ||
                        "Loading..."}
                    </p>
                    <button
                      onClick={() => handleDeletePayment(payment._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Admin;
