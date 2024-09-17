import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  zipCode: {
    type: String,
    required: true,
    trim: true
  },
  deliveryMethod: {
    type: String,
    required: true,
    enum: ['regular', 'outside'], // Limiting the values to predefined options
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['bkash', 'nagad', 'emipay', 'cod'], // Limiting the values to predefined options
  },
  agreedToTerms: {
    type: Boolean,
    required: true,
    default: false,
  }
 
},{
    timestamps:true
});

// Creating the model
 const Payment = mongoose.model('Payment', paymentSchema);
export default Payment

