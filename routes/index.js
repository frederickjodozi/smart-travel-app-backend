const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const auth = require('../middleware/auth');
const userRouter = require('./users');
const locationRouter = require('./locations');
const NotFoundError = require('../errors/NotFoundError');

// AUTH MIDDLEWARE //
router.use(auth);

// ROUTES //
router.use('/users', userRouter);
router.use('/locations', locationRouter);

// HANDLER FOR NONEXISTING ROUTES //
router.use(
  asyncHandler(async (req, res) => {
    throw new NotFoundError('Requested resource not found');
  })
);

module.exports = router;
