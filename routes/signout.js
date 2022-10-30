const router = require('express').Router();

router.post('/signout', (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Выход из профиля' });
  next();
});

module.exports = router;
