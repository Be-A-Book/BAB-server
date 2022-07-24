const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require('multer');
const mongoose = require('mongoose');
const { StoreReview } = require("../models/StoreReview");

router.put("/insertBookstore", (req, res) => {
    Bookstore.insertMany(req.body.arr)
    return res.status(200).json({ success: true });
  })
  
  
module.exports = router;
