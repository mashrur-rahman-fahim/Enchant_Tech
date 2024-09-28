// file: D:/web_app/Enchant_Tech/frontend/src/pages/Admin1.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";
import { useAuth } from "../Authentication/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    brand: "hp",
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

  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://localhost:4000/payment-option");
      console.log(response.data);
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
  const [bannerImg, setBannerImg] = useState("");
  const handleBannerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/banner",
        { img: bannerImg },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status === 200) {
        setBannerImg("");
        toast.success("Banner uploaded successfully", {
          autoClose: 2000,
        });
      } else {
        toast.error("Failed to upload banner.");
      }
    } catch (error) {
      toast.error("Error uploading banner.");
    }
  };

  const fetchProductDetails = async (payments) => {
    try {
      const productIds = payments.flatMap((payment) => payment.products); // Get all product IDs
      const uniqueProductIds = [...new Set(productIds)]; // Remove duplicates
      const productDetailsPromises = uniqueProductIds.map((id) =>
        axios.get(`http://localhost:4000/productObject/${id}`)
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
        toast.success("Payment profile deleted successfully", {
          autoClose: 2000,
        });
      } else {
        console.error("Failed to delete payment profile");
      }
    } catch (error) {
      console.error("Error deleting payment profile:", error);
    }
  };

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
        toast.success("Product uploaded successfully.", {
          autoClose: 2000,
        });
      } else {
        toast.error("Failed to upload product.");
      }
    } catch (error) {
      toast.error("Error:");
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

  return (
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
        <h1>Admin Panel</h1>
      </header>
      <main className="admin-main">
        <section className="form-section">
          <h2>Upload Product</h2>
          <form id="admin_form" className="admin-form" onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Image URL:
              <input
                type="url"
                name="img"
                value={product.img}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Category:
              <select
                name="catagory"
                value={product.catagory}
                onChange={handleChange}
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
            <label>
              Brand:
              <select
                name="brand"
                value={product.brand}
                onChange={handleChange}
              >
                {brandOptions[product.catagory].map((brand, index) => (
                  <option key={index} value={brand.toLowerCase()}>
                    {brand}
                  </option>
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
        <section className="banner-section">
          <h2>Upload Banner</h2>
          <form onSubmit={handleBannerSubmit} className="admin-form">
            <label>
              Banner Image URL:
              <input
                type="url"
                name="bannerImg"
                value={bannerImg}
                onChange={(e) => setBannerImg(e.target.value)}
                required
              />
            </label>
            <button type="submit">Upload Banner</button>
          </form>
        </section>

        <section className="product-counts-section">
          <h2>Product Counts</h2>
          <div className="product-counts">
            {Object.entries(productCounts).map(([key, count]) => (
              <div key={key} className="product-count">
                <h3
                  onClick={() => {
                    const route_path = key.charAt(0) + key.slice(1);
                    if (route_path === "desktop" || route_path === "laptop") {
                      navigate(`/${route_path}`);
                    } else {
                      navigate(`/category/${key}`);
                    }
                  }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h3>
                <p>{count}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="payment-section">
          <h2 className="payment-section-title">Payments</h2>
          <ul className="payment-list">
            {payments.map((payment) => (
              <li key={payment._id} className="payment-item">
                <div className="payment-details">
                  <h3 className="payment-id">Payment ID: {payment._id}</h3>
                  <p className="payment-name">
                    <strong>Name:</strong> {payment.firstName}{" "}
                    {payment.lastName}
                  </p>
                  <p className="payment-phone">
                    <strong>Phone:</strong> {payment.phone}
                  </p>
                  <p className="payment-email">
                    <strong>Email:</strong> {payment.email}
                  </p>
                  <p className="payment-address">
                    <strong>Address:</strong> {payment.address}, {payment.city},{" "}
                    {payment.state}, {payment.zipCode}
                  </p>
                  <p className="payment-delivery-method">
                    <strong>Delivery Method:</strong> {payment.deliveryMethod}
                  </p>
                  <p className="payment-method">
                    <strong>Payment Method:</strong> {payment.paymentMethod}
                  </p>
                  <p className="payment-terms">
                    <strong>Agreed to Terms:</strong>{" "}
                    {payment.agreedToTerms ? "Yes" : "No"}
                  </p>

                  <h4 className="product-list-title">Products:</h4>
                  <div className="product-list">
                    {payment.products.map((productId) => (
                      <div key={productId} className="product-item">
                        <img
                          src={
                            productDetailsMap[productId]?.img ||
                            "placeholder.jpg"
                          }
                          alt={
                            productDetailsMap[productId]?.title || "Loading..."
                          }
                          className="product-image"
                        />
                        <p className="product-title">
                          <strong></strong>{" "}
                          {productDetailsMap[productId]?.title || "Loading..."}
                        </p>
                        <p className="product-description">
                          <strong></strong>{" "}
                          {productDetailsMap[productId]?.description ||
                            "Loading..."}
                        </p>
                        <p className="product-price">
                          <strong>Price:</strong> $
                          {productDetailsMap[productId]?.price || "Loading..."}
                        </p>
                        <p className="product-category">
                          <strong>Category:</strong>{" "}
                          {productDetailsMap[productId]?.catagory ||
                            "Loading..."}
                          ({productDetailsMap[productId]?.cat || "Loading..."})
                        </p>
                        <p className="product-brand">
                          <strong>Brand:</strong>{" "}
                          {productDetailsMap[productId]?.brand || "Loading..."}
                        </p>
                        <p className="product-date">
                          <strong>Date Added:</strong>{" "}
                          {new Date(
                            productDetailsMap[productId]?.date
                          ).toLocaleDateString() || "Loading..."}
                        </p>
                        <p className="product-rating">
                          <strong>Rating:</strong>{" "}
                          {productDetailsMap[productId]?.rating || "Loading..."}{" "}
                          / 5
                        </p>
                      </div>
                    ))}
                  </div>

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
      <ToastContainer />
    </div>
  );
};
