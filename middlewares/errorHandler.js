const errorHandler = (err, req, res, next) => {
  const {
    statusCode = 500,
    name = 'Error',
    message = 'An error has occurred on the server'
  } = err;

  res.status(statusCode).json(`${name}: ${message}`);
};

module.exports = errorHandler;
