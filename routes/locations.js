const router = require('express').Router();

const {
  getLocations,
  createLocation,
  deleteLocation
} = require('../controllers/locations');

router.route('/mylocations')
  .get(getLocations)
  .post(createLocation)
  .delete(deleteLocation);

module.exports = router;
