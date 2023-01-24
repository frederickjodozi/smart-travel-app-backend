const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const generateToken = (id) => {
  return jwt.sign({ id }, 'JWT_SECRET', { expiresIn: '7d' });
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error('Please enter an email and a password');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('A user with this email already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const registeredUser = await User.create({
    email: email,
    password: hash
  });

  if (!registeredUser) {
    throw new Error("Couldn't register user");
  }

  const returnedUser = await User.findById(registeredUser._id, '-updated_at');
  res.status(201).json(returnedUser);
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error('Invalid email or password');
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
      token: token
    });
  } else {
    throw new Error('Invalid email or password');
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const currentUser = await User.findById(userId);
  if (!currentUser) {
    throw new Error('Current user not found');
  }

  res.status(200).json(currentUser);
});

const updateCurrentUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { name } = req.body;

  if (!name) {
    throw new Error('Please fill the name field');
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: { name } },
    { runValidators: true, new: true }
  )

  if (!updatedUser) {
    throw new Error("Couldn't update user");
  }

  res.status(200).json(updatedUser);
});

const deleteCurrentUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const userToDelete = await User.findByIdAndDelete(userId);

  if (!userToDelete) {
    throw new Error('Couldn\'t delete user');
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
