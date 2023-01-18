const router = require('express').Router();

const {
  getLocations,
  createLocation,
  deleteLocation
} = require('../controllers/locations');

router.get('/', getLocations);
router.post('/', createLocation);
router.delete('/:id', deleteLocation);

module.exports = router;
