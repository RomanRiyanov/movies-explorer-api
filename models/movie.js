const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => { isURL(value); },
      message: 'Неправльный формат ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => { isURL(value); },
      message: 'Неправльный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => { isURL(value); },
      message: 'Неправльный формат ссылки',
    },
  },
  owner: {
    ref: 'user',
    type: mongoose.ObjectId,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('movie', movieSchema);
