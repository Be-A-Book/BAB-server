const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const { Bookstore } = require("../models/Bookstore");
const { Tag } = require("../models/Tag");

router.post("/getBookstoreDetail", (req, res) => {
  Bookstore.findOne({ _id: req.body._id })
    .populate({ path: "tags", model: "Tag" })
    .exec((err, bookstore) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, bookstore });
    });
});

router.post("/getDong", (req, res) => {
  Bookstore.find({ dong: req.body.dong })
    .exec((err, bookstore) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, bookstore });
    });
});

router.post("/getGu", (req, res) => {
  Bookstore.find({ gu: req.body.gu })
    .exec((err, bookstore) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, bookstore });
    });
});

router.get("/getMapMarker", (req, res) => {
  Bookstore.find({},{"_id":1, "name":1, "tags":1, "lat":1, "lng":1, "defaultImage":1})
    .exec((err, bookstore) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, bookstore });
    });
});

router.get("/search", (req, res) => {
  let keyword = req.query.keyword;
  Bookstore.find( {$or:[{ name: {$regex : keyword} }, 
                        { address: {$regex : keyword} }
                        ]})
    .populate({ path: "tags", model: "Tag" })
    .exec((err, bookstore) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, bookstore });
    });
});

module.exports = router;
