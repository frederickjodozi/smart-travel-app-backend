const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { validateUserRegistry, validateUserLogin } = require('../middleware/validation');
const { registerUser, userLogin } = require('../controllers/users');
const auth = require('../middleware/auth');
const userRouter = require('./users');
const locationRouter = require('./locations');
const NotFoundError = require('../errors/NotFoundError');

// REGISTRATION AND LOGIN //
router.post('/users/register', validateUserRegistry, registerUser);
router.post('/users/login', validateUserLogin, userLogin);

// ROUTES REQUIRING AUTHORIZATION //
router.use(auth);
router.use('/users', userRouter);
router.use('/locations', locationRouter);

// HANDLER FOR NONEXISTING ROUTES //
router.use(
  asyncHandler(async (req, res) => {
    throw new NotFoundError('Requested resource not found');
  })
);

module.exports = router;
