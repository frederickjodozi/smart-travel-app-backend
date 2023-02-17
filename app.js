const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const limiter = require('./middleware/limiter');
const { requestLogger, errorLogger } = require('./middleware/logger');
const routes = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();

// INITIALIZE APP //
const { PORT = 3000, NODE_ENV = 'development' } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/smart-travel-app');

// SECURITY //
app.use(helmet());

app.use(limiter);

app.use(cors());

app.options('*', cors());

// REQUEST LOGGING //
app.use(requestLogger);

// PARSING //
app.use(express.json());

// ROUTES //
app.get('/crash-test', () => {
  if (NODE_ENV !== 'production') {
    setTimeout(() => {
      throw new Error('Server will crash now');
    }, 0);
  }
});

app.use(routes);

// ERROR LOGGING //
app.use(errorLogger);

// ERROR HANDLING //
app.use(errors());

app.use(errorHandler);

// APP.LISTEN //
app.listen(PORT, () => console.log(`In ${NODE_ENV} mode and listening on port ${PORT}!`));
