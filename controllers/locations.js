const asyncHandler = require('express-async-handler');
const Location = require('../models/location');

const getLocations = asyncHandler(async (req, res) => {
  const { userId } = req;

  const userLocations = await Location.find({ owner: userId });

  if (!userLocations) {
    throw new Error(`Couldn't find any saved locations for this user`);
  }

  res.status(200).json(userLocations);
});

const createLocation = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { title, text, image } = req.body;

  if (!title || !text || !image) {
    throw new Error('The location needs a title, a text and an image');
  }

  const createdLocation = await Location.create({ title, text, image, owner: userId });

  if (!createdLocation) {
    throw new Error(`Couldn't create location`);
  }

  const returnedLocation = await Location.findById(createdLocation._id, '-updated_at');
  res.status(200).json(returnedLocation);
});

const deleteLocation = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  const locationToDelete = await Location.findById(id);

  if (!locationToDelete) {
    throw new Error(`Couldn't find location to delete`);
  } else if (!locationToDelete.owner.equals(userId)) {
    throw new Error(`Cannot delete other user's locations`);
  }

  const deletedLocation = await Location.findByIdAndDelete(locationToDelete._id);

  if (!deletedLocation) {
    throw new Error(`Couldn't delete location`);
  }

  res.status(204).json('');
});

module.exports = { getLocations, createLocation, deleteLocation };
