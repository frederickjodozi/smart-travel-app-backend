const User = require('../models/user');

const getCurrentUser = (req, res, next) => {
  const { user } = req;

  User.findById(user)
    .orFail(() => {
      throw new Error('No user found with the specified id');
    })
    .then((user) => res.send(user))
    .catch((err) => next(new Error(err)));
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(new Error(err)));
};

module.exports = {
  getCurrentUser,
  getUsers
};
