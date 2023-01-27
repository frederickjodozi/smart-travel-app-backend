const router = require('express').Router();

const { validateUserUpdate } = require('../middleware/validation');
const {
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser
} = require('../controllers/users');

router
  .route('/me')
  .get(getCurrentUser)
  .patch(validateUserUpdate, updateCurrentUser)
  .delete(deleteCurrentUser);

module.exports = router;
