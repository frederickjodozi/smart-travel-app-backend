const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const auth = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error('Authorization header required');
  }

  const token = await authorization.replace('Bearer ', '');

  const payload = await jwt.verify(token, 'JWT_SECRET');

  if (!payload) {
    throw new Error('Authorization required');
  }

  req.userId = payload.id;

  next();
});

module.exports = auth;
