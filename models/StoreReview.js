const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    store: {
      type: Schema.Types.ObjectId,
      ref: "Bookstore",
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
      type: String,
      //default:
    },
  },
  { timestamps: true }
);

const StoreReview = mongoose.model("StoreReview", reviewSchema);
module.exports = { StoreReview };
