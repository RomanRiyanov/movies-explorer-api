const allowedCors = [
  'http://mesto.romanriyanov.nomoredomains.icu',
  'https://mesto.romanriyanov.nomoredomains.icu',
  'http://api.mesto.romanriyanov.nomoredomains.icu',
  'https://api.mesto.romanriyanov.nomoredomains.icu',
  'http://www.mesto.romanriyanov.nomoredomains.icu',
  'https://www.mesto.romanriyanov.nomoredomains.icu',
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
