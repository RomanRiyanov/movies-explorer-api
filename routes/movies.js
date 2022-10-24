const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { LinkRegExp } = require('../utils/constants');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies

// # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image,
// trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies

// # удаляет сохранённый фильм по id
// DELETE /movies/_id

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

// router.get('/:userId', celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().alphanum().hex().length(24),
//   }),
// }), getUserById);

// router.patch('/me', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//   }),
// }), updateUser);
// router.patch('/me/avatar', celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().pattern(LinkRegExp),
//   }),
// }), updateAvatar);

module.exports = router;
