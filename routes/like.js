const express = require("express");
const router = express.Router();
const { ReviewLike } = require("../models/ReviewLike");

router.post("/getLikes", (req, res) => {
  ReviewLike.find({ review: req.body.review }).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, likes });
  });
});

router.post("/postLike", (req, res) => {
  const like = new ReviewLike({ review: req.body.review, user: req.body.user });
  like.save((err, result) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, result });
  });
});

router.post("/postUnlike", (req, res) => {
  let variable = { review: req.body.review, user: req.body.user };
  ReviewLike.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, result });
  });
});
module.exports = router;
