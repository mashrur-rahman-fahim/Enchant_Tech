// file: D:/web_app/Enchant_Tech/backend/models/cart.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true // Ensure product IDs are unique
  },
  count: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  cat: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
