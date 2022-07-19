const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteScema = mongoose.Schema({
  store: {
    type: Schema.Types.ObjectId,
    ref: "Bookstore",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const StoreFavorite = mongoose.model("StoreFavorite", favoriteScema);
module.exports = { StoreFavorite };
