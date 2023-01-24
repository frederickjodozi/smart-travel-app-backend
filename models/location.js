const mongoose = require('mongoose');
const validator = require('validator');

const locationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 3,
      maxLength: 30,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    image: {
      type: String,
      validator: {
        validator(imageUrl) {
          return validator.isURL(imageUrl);
        },
        message: 'The location image must be a valid URL'
      },
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

locationSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.__v;
    delete ret.text;
  }
});

module.exports = mongoose.model('Location', locationSchema);
