const express = require("express");
const router = express.Router();
const { StoreFavorite } = require("../models/StoreFavorite");

router.post("/postFavorite", (req, res) => {
  const favorite = new StoreFavorite({
    store: req.body.store,
    user: req.body.user,
  });
  favorite.save((err, result) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, result });
  });
});

router.post("/cancelFavorite", (req, res) => {
  let variable = { store: req.body.store, user: req.body.user };
  StoreFavorite.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, result });
  });
});

router.get("/getFavorites/:id", (req, res) => {
  StoreFavorite.find({ store: req.params.id }).exec((err, favorites) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, favorites });
  });
});

module.exports = router;
