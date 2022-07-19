const express = require("express");
const router = express.Router();
const { StoreReview } = require("../models/StoreReview");

router.post("/postReview", (req, res) => {
  const review = new StoreReview(req.body);

  review.save((err, review) => {
    if (err) return res.json({ success: false });

    StoreReview.find({ _id: review._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
});

router.get("/getReviews", (req, res) => {
  StoreReview.find().exec((err, reviews) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, reviews });
  });
});

router.get("/getReviews/:id", (req, res) => {
  StoreReview.find({ store: req.params.id })
    .populate("writer")
    .exec((err, reviews) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, reviews });
    });
});

module.exports = router;
