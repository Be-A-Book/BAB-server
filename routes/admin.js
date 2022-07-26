const express = require("express");
const router = express.Router();
const { Bookstore } = require("../models/Bookstore");

router.put("/insertBookstore", (req, res) => {
    Bookstore.insertMany(req.body.array)
    return res.status(200).json({ success: true });
  })
  
  
module.exports = router;
