const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookstoreSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  address: {
    // 주소
    type: String,
    required: true,
  },
  gu: {
    // 주소-행정구
    type: String,
    maxlength: 50,
  },
  dong: {
    // 주소-행정동
    type: String,
    maxlength: 50,
  },
  lat: {
    // 위도
    type: Number,
  },
  lng: {
    // 경도
    type: Number,
  },
  operation: {
    // 운영시간
    type: String,
  },
  holiday: {
    // 휴무일
    type: String,
  },
  tags: [
    // 분위기 태그
    {type: String}
  ],
  introduction: {
    // 소개
    type: String,
  },
  website: String, // 웹사이트
  defaultImage: {  
    // 대표 이미지
    type: String, 
    //default: "https://beabook-server.herokuapp.com/public/bookstore/bookstore-default-image"
  }
});

const Bookstore = mongoose.model("Bookstore", bookstoreSchema);

module.exports = { Bookstore };
