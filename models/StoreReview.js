const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    store: {
      type: Schema.Types.ObjectId,
      ref: "BookStore",
    },
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: Image,
      //default:
    },
  },
  { timestamps: true }
);

const StoreReview = mongoose.model("StoreReview", reviewSchema);
module.exports = { StoreReview };
