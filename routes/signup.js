const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { LinkRegExp } = require('../utils/constants');

const {
  createUser,
} = require('../controllers/auth');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(LinkRegExp),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

module.exports = router;
