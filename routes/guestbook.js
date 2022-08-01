const express = require("express");
const router = express.Router();
const { GuestBook } = require("../models/GuestBook");

router.post("/postMessage", (req, res) => {
  const guestbook = new GuestBook({
    writer: req.body.writer,
    message: req.body.message,
  });

  guestbook
    .save()
    .then((result) => {
      res.status(200).json({
        success: true,
        result: result,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

router.get("/getMessages", async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const perPage = 8;

    const messages = await GuestBook.find({})
      .populate("writer")
      .limit(perPage * 1)
      .skip((page - 1) * perPage);

    const total = await GuestBook.countDocuments({});
    return res.status(200).json({
      success: true,
      messages,
      totalPages: Math.ceil(total / perPage),
      currentPage: page,
    });
  } catch (err) {
    res.json({ success: false, err });
    next(err);
  }
});
module.exports = router;
