const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeScema = mongoose.Schema({
  review: {
    type: Schema.Types.ObjectId,
    ref: "StoreReview",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const ReviewLike = mongoose.model("ReviewLike", likeScema);
module.exports = { ReviewLike };
