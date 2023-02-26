const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

const { JWT_SECRET = 'secret' } = process.env;

const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });

// USER REGISTRATION AND LOGIN //
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    throw new BadRequestError('Please enter an email, a password and a name');
  }

  const userExists = await User.findOne({ $or: [{ email }, { name }] });

  if (userExists) {
    if (userExists.email === email) {
      throw new ConflictError('A user with this email already exists');
    } else if (userExists.name === name) {
      throw new ConflictError('A user with this name already exists');
    }
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  let registeredUser;

  try {
    registeredUser = await User.create({
      email,
      password: hash,
      name
    });
  } catch (err) {
    throw new Error("Couldn't register user");
  }

  const returnedUser = await User.findById(registeredUser._id, '-updated_at');
  res.status(201).json(returnedUser);
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Invalid email or password');
  }

  const user = await User.findOne({ email }, '+password');

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = await generateToken(user._id.toString());

    if (!token) {
      throw new Error("Couldn't generate token");
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      token
    });
  } else {
    throw new BadRequestError('Invalid email or password');
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { userId } = req;

  const currentUser = await User.findById(userId).orFail(() => {
    throw new UnauthorizedError('Invalid Json Web Token');
  });

  res.status(200).json(currentUser);
});

// READ, UPDATE AND DELETE USER DATA //
const updateCurrentUser = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { name } = req.body;

  if (!name) {
    throw new BadRequestError('Please fill the name field');
  }

  let updatedUser;

  try {
    updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { name } },
      { runValidators: true, new: true }
    );
  } catch (err) {
    throw new Error("Couldn't update user");
  }

  res.status(200).json(updatedUser);
});

const deleteCurrentUser = asyncHandler(async (req, res) => {
  const { userId } = req;

  const userToDelete = await User.findByIdAndDelete(userId);

  if (!userToDelete) {
    throw new Error("Couldn't delete user");
  }

  res.status(204).json('');
});

module.exports = {
  registerUser,
  userLogin,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser
};
