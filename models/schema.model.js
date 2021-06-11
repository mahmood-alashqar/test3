const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  headline: String,
  summery: String,
  article: String,
  img: String,
  suggested_link_text: String
})
const ModelTheMovie = new mongoose.model('movie', movieSchema);
module.exports = ModelTheMovie;