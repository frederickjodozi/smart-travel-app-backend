const express = require('express');
const mongoose = require('mongoose');
const { registerUser, userLogin } = require('./controllers/users');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000, HOST = 'localhost' } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/smart-travel-app');

app.use(express.json());

app.post('/users/register', registerUser);

app.post('/users/login', userLogin);

app.use(routes);

app.use(errorHandler);

app.listen(PORT, HOST, () => console.log(`Listening on ${HOST}:${PORT}!`));
