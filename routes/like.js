const express = require("express");
const router = express.Router();
const { StoreReview } = require("../models/StoreReview");
const { User } = require("../models/User");

router.post("/postLike", async (req, res, next) => {
  try {
    const review = await StoreReview.findOne({ _id: req.body.review });
    const user = await User.findOne({ _id: req.body.user });
    if (review.likes.includes(user._id)) {
      const index = review.likes.indexOf(user._id);
      review.likes.splice(index, 1);
      await review.save();
    } else {
      review.likes.push(user._id);
      await review.save();
    }
    return res.status(200).json({
      success: "true",
      review,
    });
  } catch (err) {
    res.json({ success: false, err });
    next(err);
  }
});

module.exports = router;
