const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { LinkRegExp } = require('../utils/constants');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().hex().length(24),
  }),
}), deleteMovie);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(30),
    director: Joi.string().min(2).max(30),
    duration: Joi.number(),
    year: Joi.string().min(2).max(10),
    image: Joi.string().pattern(LinkRegExp),
    trailerLink: Joi.string().pattern(LinkRegExp),
    thumbnail: Joi.string().pattern(LinkRegExp),
    movieId: Joi.string().alphanum().hex().length(24),
    nameRU: Joi.string().min(2).max(30),
    nameEN: Joi.string().min(2).max(30),
  }),
}), createMovie);

module.exports = router;
