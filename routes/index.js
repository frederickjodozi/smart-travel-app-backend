const router = require('express').Router();

const userRouter = require('./users');
const locationRouter = require('./locations');

router.use('/users', userRouter);
router.use('/locations', locationRouter);

router.use((req, res, next) => {
  next(new Error('Requested resource not found'));
});

module.exports = router;
