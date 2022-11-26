const Movie = require('../models/movie');

const NotFoundError = require('../errors/not_found_err');
const InputError = require('../errors/input_err');
const ForbiddenError = require('../errors/forbidden_err');

const getMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({})
    .then((movies) => {
      const result = movies.filter((movie) => userId === movie.owner.toString());
      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    description,
    year,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InputError('Переданы некорректные данные при создании карточки фильма'));
      } else next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  const { movieId } = req.params;

  // Movie.findById(movieId)
  Movie.findOne({ movieId })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      // const owner = card.owner._id.toString();
      const owner = movie.owner.toString();

      if (owner !== userId) {
        throw new ForbiddenError('Нельзя удалять чужую карточку');
      }
      Movie.findByIdAndDelete(movie._id)
        .then((movieSelected) => res.send(movieSelected))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InputError('Переданы некорректные данные удалении карточки'));
      } else next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
