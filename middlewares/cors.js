const allowedCors = [
  'http://roman.diploma.nomoredomains.icu',
  'https://roman.diploma.nomoredomains.icu',
  'http://api.roman.diploma.nomoredomains.icu',
  'https://api.roman.diploma.nomoredomains.icu',
  'http://www.mesto.romanriyanov.nomoredomains.icu',
  'https://www.mesto.romanriyanov.nomoredomains.icu',
  'http://api.nomoreparties.co/beatfilm-movies',
  'https://api.nomoreparties.co/beatfilm-movies',
  'http://localhost:3000',
  'https://localhost:3000',
  'https://localhost:3001',
  'http://localhost:3001',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};
