const locations = require('../models/location');

const getUserLocations = (req, res, next) => {
  const { user } = req;

  locations
    .find({ owner: user })
    .then((locations) => res.send(locations))
    .catch((err) => {
      next(err);
    });
};

module.exports = getUserLocations;
