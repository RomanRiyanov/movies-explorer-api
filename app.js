require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const routerSignin = require('./routes/signin');
const routerSignup = require('./routes/signup');
const routerSignout = require('./routes/signout');
const routerUsers = require('./routes/users');
const routerMovies = require('./routes/movies');

const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/error_handle');
const NotFoundError = require('./errors/not_found_err');

const app = express();

app.use(requestLogger);
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routerSignup);
app.use(routerSignin);

app.use(auth);

app.use(routerSignout);
app.use(routerUsers);
app.use(routerMovies);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

// mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.MOVIES_DB : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Сервер запущен');
});
