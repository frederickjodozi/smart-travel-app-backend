const router = require('express').Router();

const {
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser
} = require('../controllers/users');

router.route('/me').get(getCurrentUser).patch(updateCurrentUser).delete(deleteCurrentUser);

module.exports = router;
