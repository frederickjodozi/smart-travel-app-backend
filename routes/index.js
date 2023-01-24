const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const userRouter = require('./users');
const locationRouter = require('./locations');

router.use('/users', userRouter);
router.use('/locations', locationRouter);

router.use(
  asyncHandler(async (req, res) => {
    throw new Error('Requested resource not found');
  })
);

module.exports = router;
