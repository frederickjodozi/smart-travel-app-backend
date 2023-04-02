const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const validateId = (value, helpers) => {
  if (ObjectId.isValid(value)) {
    return value;
  }
  return helpers.error('string.objectId');
};

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.url');
};

const validateUserRegistry = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'string.email': 'A valid email address is required',
      'any.required': 'A valid email address is required'
    }),
    password: Joi.string().required().messages({
      'any.required': 'A valid password is required'
    }),
    name: Joi.string().min(2).max(30).required().messages({
      'string.min': 'The minimum length of the name field is 2',
      'string.max': 'The maximum length of the name field is 30',
      'any.required': 'The name field is required'
    })
  })
});

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email or password',
      'any.required': 'Invalid email or password'
    }),
    password: Joi.string().required().messages({
      'any.required': 'Invalid email or password'
    })
  })
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      'string.min': 'The minimum length of the name field is 2',
      'string.max': 'The maximum length of the name field is 30',
      'any.required': 'The name field is required'
    })
  })
});

const validateNewLocation = celebrate({
  body: Joi.object().keys({
    title: Joi.string().min(2).max(60).required().messages({
      'string.base': 'The title field must be a string',
      'string.min': 'The minimum length of the title field is 2',
      'string.max': 'The maximum length of the title field is 60',
      'any.required': 'The title field is required'
    }),
    text: Joi.string().required().messages({
      'string.base': 'The text field must be a string',
      'any.required': 'The text field is required'
    }),
    image: Joi.string().custom(validateURL).required().messages({
      'string.base': 'The image field must be a string',
      'string.url': 'The image field must be a valid URL',
      'any.required': 'The image field is required'
    }),
    country: Joi.string().min(2).max(60).required().messages({
      'string.base': 'The country field must be a string',
      'string.min': 'The minimum length of the country field is 2',
      'string.max': 'The maximum length of the country field is 60',
      'any.required': 'The country field is required'
    })
  })
});

const validateLocationId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().custom(validateId).required().messages({
      'string.objectId': 'Invalid ObjectId for location',
      'any.required': 'Location ObjectId is required'
    })
  })
});

module.exports = {
  validateUserRegistry,
  validateUserLogin,
  validateUserUpdate,
  validateNewLocation,
  validateLocationId
};
