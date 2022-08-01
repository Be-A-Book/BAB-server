const mongoose = require("mongoose");

const guestSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
});

const GuestBook = mongoose.model("GuestBook", guestSchema);
module.exports = { GuestBook };
