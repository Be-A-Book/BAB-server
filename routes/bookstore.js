const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const { Bookstore } = require("../models/Bookstore");

router.post("/getBookstoreDetail", (req, res) => {
  Bookstore.findOne({ _id: req.body._id })
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
                        { address: {$regex : keyword} },
                        { introduction: {$regex : keyword}},
                        { tags: {$regex : keyword}}
                        ]})
    .exec((err, bookstore) => {
      if (err) return res.status(400).send(err);
      
      var searchResult = [];
      for (var i=0; i<5; i++) {
        if(bookstore[i]!=null) {
          searchResult.push(bookstore[i])
        }
      }
      return res.status(200).json({ success: true, searchResult: searchResult });
    });
});


// 서가 페이지 api
router.get("/getDistrict", async (req, res) => {
  let arrayDong = ["연남동", "서교동", "망원동"];  // 가져올 동 하드코딩
  let arrayGu = ["성동구", "중랑구", "강서구"];  // 묶어서 가져올 구 하드코딩
  let arrayRes = [];
  for (let i=0; i<arrayDong.length; i++) {
    Bookstore.find({ dong: arrayDong[i] })
    .exec((err, bookstore) => {
        arrayRes.push(bookstore);
        console.log(arrayRes);  // 여기서 보면 배열이 push되긴 함
        

        /* 하려다 만 것
        const arr = (Bookstore.find({ dong: arrayDong[i] }));  // cursor를 받아옴
        let arrayTemp = [];  // cursor -> list 변환용 임시 배열
        await arr.forEach(doc => arrayTemp.push(doc));  // cursor의 참조를 순회하며 임시 배열에 집어넣음
        await arrayRes.push(arr);  // 임시 배열을 arrayRes에 배열 형태 그대로 푸시
        */
    }) 
  }
  console.log(arrayRes);  // 여기서 보면 빈 배열 찍힘 비동기 처리 문제인 듯
  res.status(200).json({ success: true, bookstore: arrayRes })
});

module.exports = router;
