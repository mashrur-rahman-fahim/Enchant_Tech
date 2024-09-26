import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: false,
    trim: true,
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
  gender: {
    type: String,
    required: false,
    enum: ['Male', 'Female', 'Other'], // Optional: restrict to specific values
  },
  birthday: {
    type: Date,
    required: false,
  },
  profilePicture: {
    type: String, // URL of the profile picture
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the date when the document is created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set the date when the document is updated
  }
}, {
  timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
});

// Create a Mongoose model
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;
