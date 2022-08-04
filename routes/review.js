const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const { StoreReview } = require("../models/StoreReview");

/*
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
*/

router.get("/getReviews", async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const sort = req.query.sort == 2 ? { likes: -1 } : { createdAt: -1 }; //기본 최신순1, 인기순2
    const perPage = 4;

    const reviews = await StoreReview.find()
      .populate("writer")
      .populate("store")
      .limit(perPage * 1)
      .skip((page - 1) * perPage)
      .sort(sort);

    const total = await StoreReview.countDocuments({});
    return res.status(200).json({
      success: true,
      reviews,
      totalPages: Math.ceil(total / perPage),
      currentPage: page,
    });
  } catch (err) {
    res.json({ success: false, err });
    next(err);
  }
});

router.get("/getReviews/:id", async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const sort = req.query.sort == 2 ? { likes: -1 } : { createdAt: -1 }; //기본 최신순1, 인기순2
    const perPage = 6;

    const reviews = await StoreReview.find({ store: req.params.id })
      .populate("writer")
      .populate("store")
      .limit(perPage * 1)
      .skip((page - 1) * perPage)
      .sort(sort);

    const total = await StoreReview.countDocuments({ store: req.params.id });
    return res.status(200).json({
      success: true,
      reviews,
      totalPages: Math.ceil(total / perPage),
      currentPage: page,
    });
  } catch (err) {
    res.json({ success: false, err });
    next(err);
  }
});

/* 이미지를 포함한 후기 업로드 */

const DIR = "./public/review/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  }, //file 을 받아와서 DIR 경로에 저장한다.
  filename: (req, file, cb) => {
    // 저장할 파일의 이름을 설정한다.
    //const fileName = file.originalname.toLowerCase().split(' ').join('-');
    //cb(null, uuidv4() + '-' + fileName)
    // (uuidv4 O) 7c7c98c7-1d46-4305-ba3c-f2dc305e16b0-통지서
    // (uuidv4 X) 통지서

    let extension = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extension);
    cb(null, basename + "-" + Date.now() + extension);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // 파일 확장자 필터
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/postReview", upload.single("image"), (req, res, next) => {
  /* 이미지가 없는 경우 */

  if (req.file == null) {
    const review1 = new StoreReview(req.body);

    review1.save((err, review) => {
      if (err) return res.json({ success: false });

      StoreReview.find({ _id: review._id })
        .populate({
          path: "writer",
          populate: { path: "bookmark", model: "Bookmark" },
        })
        .exec((err, result) => {
          if (err) return res.json({ success: false, err });
          return res.status(200).json({ success: true, result });
        });
    });
  } else {
    /* 이미지가 있는 경우 */

    // upload.single('profileImg') 에서 profileImg 는 formData 의 key 를 말한다.
    // 따라서 "profileImg" key 의 value 값을 서버의 지정된 폴더에 저장한다.
    const url = req.protocol + "://" + req.get("host");
    // req.protocol => http or https
    // req.get('host') => (현재) localhost:5000
    const review = new StoreReview({
      _id: new mongoose.Types.ObjectId(),
      store: req.body.store,
      writer: req.body.writer,
      content: req.body.content,
      image: url + "/public/review/" + req.file.filename,
    });

    review
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Review registerd successfuly!",
          reviewUploaded: {
            _id: result._id,
            image: result.image,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }
});

module.exports = router;
