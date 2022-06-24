const mongoose = require('mongoose');

const bookstoreSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    address: {  // 주소
        type: String,
        required: true
    },
    district: {  // 주소-행정동
        type: String,
        maxlength: 50
    },
    lat: {  // 위도
        type: Number,
    },
    lng: {  // 경도
        type: Number,
    },
    operation: {  // 운영시간
        type: String,
    },
    holiday: {  // 휴무일
        type: Number,
    },
    tags: {  // 분위기 태그
        type: Array,
    },
    introduction: {  // 소개
        type: String,
    },
    webSite: String,  // 웹사이트
    defaultImage: String,  // 대표 이미지
})

const Bookstore = mongoose.model('Bookmark', bookstoreSchema)

module.exports = { Bookstore }