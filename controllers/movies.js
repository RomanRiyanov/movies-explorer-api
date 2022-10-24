const Movie = require('../models/movie');

const NotFoundError = require('../errors/not_found_err');
const InputError = require('../errors/input_err');
const ForbiddenError = require('../errors/forbidden_err');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((cards) => res.send(cards))
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

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      // const owner = card.owner._id.toString();
      const owner = movie.owner.toString();

      if (owner !== userId) {
        throw new ForbiddenError('Нельзя удалять чужую карточку');
      }
      Movie.findByIdAndDelete(movieId)
        .then((cardSelected) => res.send(cardSelected))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InputError('Переданы некорректные данные для постановки/снятии лайка'));
      } else next(err);
    });
};

// const likeCard = (req, res, next) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } },
//     { new: true },
//   )
//     .orFail(() => {
//       throw new NotFoundError('Передан несуществующий _id карточки');
//     })
//     .then((card) => res.send(card))
//     .catch((err) => {
//       if (err.name === 'ValidationError' || err.name === 'CastError') {
//         next(new InputError('Переданы некорректные данные для постановки/снятии лайка'));
//       } else next(err);
//     });
// };

// const dislikeCard = (req, res, next) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $pull: { likes: req.user._id } },
//     { new: true },
//   )
//     .orFail(() => {
//       throw new NotFoundError('Передан несуществующий _id карточки');
//     })
//     .then((card) => res.send(card))
//     .catch((err) => {
//       if (err.name === 'ValidationError' || err.name === 'CastError') {
//         next(new InputError('Переданы некорректные данные для постановки/снятии лайка'));
//       } else next(err);
//     });
// };

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
