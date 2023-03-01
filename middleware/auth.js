const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET = 'secret' } = process.env;

const auth = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Authorization header required');
  }

  const token = await authorization.replace('Bearer ', '');

  let payload = 'payload';

  try {
    payload = await jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Invalid JSON Web Token')
  }

  req.userId = payload.id;

  next();
});

module.exports = auth;
