const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const limiter = require('./middleware/limiter');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middleware/logger');
const routes = require('./routes/index');
const { errors } = require('celebrate');
const errorHandler = require('./middleware/errorHandler');

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
NODE_ENV === 'development'
  ? app.get('/crash-test', () => {
      setTimeout(() => {
        throw new Error('Server will crash now');
      }, 0);
    })
  : '';

app.use(routes);

// ERROR LOGGING //
app.use(errorLogger);

//ERROR HANDLING //
app.use(errors());

app.use(errorHandler);

// APP.LISTEN //
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
