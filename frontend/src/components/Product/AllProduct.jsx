import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./All_product.css";

export const AllProduct = () => {
  const { id } = useParams();
  console.log("ID Type:", typeof id);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/productObject/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error.response || error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="product-details-container advanced">
      <div className="product-image">
        <img src={product.img} alt={product.title} className="responsive" />
      </div>
      <div className="product-info">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-description">{product.description}</p>
        <div className="product-meta">
          <div className="meta-item">
            <strong>Category:</strong> <span>{product.cat}</span>
          </div>
          <div className="meta-item">
            <strong>Subcategory:</strong> <span>{product.catagory}</span>
          </div>
          <div className="meta-item">
            <strong>Brand:</strong> <span>{product.brand}</span>
          </div>
          <div className="meta-item">
            <strong>Date Added:</strong>{" "}
            <span>{new Date(product.date).toLocaleDateString()}</span>
          </div>
          <div className="meta-item">
            <strong>Rating:</strong> <span>{product.rating} / 5</span>
          </div>
        </div>
        <div className="price">
          <h4>Price:</h4>
          <p className="product-price">${product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
