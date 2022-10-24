const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Роман Дипломат',
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'Неправильно введен email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByEmailAndPass = function (email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(() => {
      const error = new Error('Неправильные почта или пароль');
      error.statusCode = 401;
      throw error;
    })
    .then((user) => bcrypt.compare(password, user.password)
      .then((isMatched) => {
        if (!isMatched) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }
        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
