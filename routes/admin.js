const express = require("express");
const router = express.Router();
const { Bookstore } = require("../models/Bookstore");

router.put("/insertBookstore", (req, res) => {
    Bookstore.insertMany(req.body.array)
    return res.status(200).json({ success: true });
  })
  
  
// 서가 페이지 api용 _id 가져오기
router.get("/getAllBookstore", (req, res) => {
  Bookstore.find({},{"_id":1, "name":1, "gu": 1, "dong": 1})
    .exec((err, bookstore) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, bookstore });
    });
})


module.exports = router;
