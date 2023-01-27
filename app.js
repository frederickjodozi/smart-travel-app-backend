const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const limiter = require('./middleware/limiter');
const cors = require('cors');
const { registerUser, userLogin } = require('./controllers/users');
const {
  validateUserRegistry,
  validateUserLogin,
} = require('./middleware/validation');
const routes = require('./routes/index');
const { errors } = require('celebrate');
const errorHandler = require('./middleware/errorHandler');

const { PORT = 3000, HOST = 'localhost' } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/smart-travel-app');

// SECURITY //
app.use(helmet());

app.use(limiter);

app.use(cors());

app.options('*', cors());

// PARSING //
app.use(express.json());

// ROUTES //
app.post('/users/register', validateUserRegistry, registerUser);

app.post('/users/login', validateUserLogin, userLogin);

app.use(routes);

//ERROR HANDLING //
app.use(errors());

app.use(errorHandler);

// APP.LISTEN //
app.listen(PORT, HOST, () => console.log(`Listening on ${HOST}:${PORT}!`));
