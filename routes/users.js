const router = require('express').Router();

const {
  registerUser,
  userLogin,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser
} = require('../controllers/users');

router.post('/register', registerUser);
router.post('/login', userLogin);
router.route('/me').get(getCurrentUser).patch(updateCurrentUser).delete(deleteCurrentUser);

module.exports = router;
