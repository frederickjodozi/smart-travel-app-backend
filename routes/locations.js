const router = require('express').Router();

const { validateNewLocation, validateLocationId } = require('../middleware/validation');
const {
  getLocations,
  createLocation,
  deleteLocation
} = require('../controllers/locations');

router.route('/mylocations').get(getLocations).post(validateNewLocation, createLocation);

router.delete('/mylocations/:id', validateLocationId, deleteLocation);

module.exports = router;
