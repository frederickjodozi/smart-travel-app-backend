const asyncHandler = require('express-async-handler');
const Location = require('../models/location');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getLocations = asyncHandler(async (req, res) => {
  const { userId } = req;

  const userLocations = await Location.find({ owner: userId })
    .populate('owner', 'name email')
    .orFail(() => {
      throw new NotFoundError(`Couldn't find any saved locations for this user`);
    });

  res.status(200).json(userLocations);
});

const createLocation = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { title, text, image } = req.body;

  if (!title || !text || !image) {
    throw new BadRequestError('The location needs a title, a text and an image');
  }

  const createdLocation = await Location.create({ title, text, image, owner: userId });

  if (!createdLocation) {
    throw new Error(`Couldn't create location`);
  }

  const returnedLocation = await Location.findById(
    createdLocation._id,
    '-updated_at'
  ).orFail(() => {
    throw new Error(`Created location but couldn't retrieve it`);
  });

  res.status(201).json(returnedLocation);
});

const deleteLocation = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  const locationToDelete = await Location.findById(id).orFail(() => {
    throw new NotFoundError(`Couldn't find location to delete`);
  });

  if (!locationToDelete.owner.equals(userId)) {
    throw new ForbiddenError(`Cannot delete other user's locations`);
  }

  try {
    await Location.findByIdAndDelete(locationToDelete._id);
  } catch (err) {
    throw new Error("Couldn't delete location");
  }

  res.status(204).json();
});

module.exports = { getLocations, createLocation, deleteLocation };
