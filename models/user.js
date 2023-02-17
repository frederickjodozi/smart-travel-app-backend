const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: 'A valid email address is required'
      },
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    name: {
      type: String,
      minLength: 2,
      maxLength: 30
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

userSchema.set('toJSON', {
  transform (doc, ret, options) {
    delete ret.__v;
  }
});

module.exports = mongoose.model('User', userSchema);
