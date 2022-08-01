const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
});

const GuestBook = mongoose.model("GuestBook", guestSchema);
module.exports = { GuestBook };
