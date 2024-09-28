import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
 
  img: {
    type: String,
    required: true,
  },
 
  date: {
    type: Date,
    default: Date.now,
  },
 
});

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
