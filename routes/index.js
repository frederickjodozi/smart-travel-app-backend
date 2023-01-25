const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const auth = require('../middlewares/auth');
const userRouter = require('./users');
const locationRouter = require('./locations');
const NotFoundError = require('../errors/NotFoundError');

router.use(auth);
router.use('/users', userRouter);
router.use('/locations', locationRouter);

router.use(
  asyncHandler(async (req, res) => {
    throw new NotFoundError('Requested resource not found');
  })
);

module.exports = router;
