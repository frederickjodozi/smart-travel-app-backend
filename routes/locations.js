const router = require('express').Router();

const { getLocations, createLocation, deleteLocation } = require('../controllers/locations');

router.route('/mylocations').get(getLocations).post(createLocation);

router.delete('/mylocations/:id', deleteLocation);

module.exports = router;
