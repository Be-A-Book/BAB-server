const mongoose = require('mongoose');

const bookmarkSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    color: String,
    image: String,
})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

module.exports = { Bookmark }