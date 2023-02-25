const NODE_ENV = process.env;

const errorHandler = (err, req, res, next) => {
  const {
    statusCode = 500,
    name = 'Error',
    message = 'An error has occurred on the server'
  } = err;

  if (NODE_ENV !== 'production') {
    console.log(err.stack);
  }
  
  res.status(statusCode).json({ name, message });
};

module.exports = errorHandler;
