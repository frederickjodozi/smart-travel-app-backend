const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const limiter = require('./middleware/limiter');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { validateUserRegistry, validateUserLogin } = require('./middleware/validation');
const { registerUser, userLogin } = require('./controllers/users');
const routes = require('./routes/index');
const { errors } = require('celebrate');
const errorHandler = require('./middleware/errorHandler');

// INITIALIZE APP //
const { PORT = 3000, HOST = 'localhost' } = process.env;
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
app.post('/users/register', validateUserRegistry, registerUser);

app.post('/users/login', validateUserLogin, userLogin);

app.use(routes);

// ERROR LOGGING //
app.use(errorLogger);

//ERROR HANDLING //
app.use(errors());

app.use(errorHandler);

// APP.LISTEN //
app.listen(PORT, HOST, () => console.log(`Listening on ${HOST}:${PORT}!`));
