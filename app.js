require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, errors, Joi } = require('celebrate');
const routerUsers = require('./routes/users');
const routerMovies = require('./routes/movies');
// const routerCards = require('./routes/cards_routes');

const { login, createUser } = require('./controllers/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const { LinkRegExp } = require('./utils/constants');
const NotFoundError = require('./errors/not_found_err');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors);
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(LinkRegExp),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.post('/signout', (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Выход из профиля' });
  next();
});

app.use('/users', routerUsers);
app.use('/movies', routerMovies);
// app.use('/cards', routerCards);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

// mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });

  next();
});

app.listen(3000, () => {
  console.log('Сервер запущен');
});
