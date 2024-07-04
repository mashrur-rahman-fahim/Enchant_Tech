import mongoose from "mongoose";




const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  
  },
  count:{
    type:Number,
    required:true,
  
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
    default:Date.now,
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
