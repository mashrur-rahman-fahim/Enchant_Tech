import mongoose from "mongoose";

const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    gigid: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      required: true,
      enum:[1,2,3,4,5]
    },
    desc: {
      type: String,
      required: true,
    },
  
  date:{
    type: Date,
    default: Date.now
  }}
);

//export default mongoose.model("Review", ReviewSchema);

const Review = mongoose.model('Review', ReviewSchema);

export default Review;