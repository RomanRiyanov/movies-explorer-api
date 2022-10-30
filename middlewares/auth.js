const jwt = require('jsonwebtoken');

const AuthorizationError = require('../errors/auth_err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new AuthorizationError('Необходима авторизация'));
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret-crypto-bimba');
  } catch (err) {
    next(new AuthorizationError('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};
