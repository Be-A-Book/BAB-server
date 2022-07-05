const express = require("express");
const router = express.Router();
const { Bookstore } = require("../models/BookStore");

router.post("/getBookstoreDetail", (req, res) => {
    Bookstore.findOne({ "_id" : req.body._id })
    .populate({path: "tags", model: "Tag"})
    .exec((err, bookstore) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({ success: true, bookstore })
    })
});

module.exports = router;
