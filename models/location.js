const mongoose = require('mongoose');
const validator = require('validator');

const locationSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 3,
    maxLength: 30,
    required: true
  },
  text: {
    type: String
  },
  image: {
    type: String,
    validator: {
      validator(imageUrl) {
        return validator.isURL(imageUrl);
      },
      message: 'The location image must be a valid URL'
    }
  },
  owner: {
    type: String,
    required: true,
    select: false
  }
});

module.exports = new mongoose.model('Location', locationSchema);
