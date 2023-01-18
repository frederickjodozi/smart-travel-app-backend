const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');

const { PORT = 3000, HOST = 'localhost' } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/smart-travel-app');

app.use(routes);

app.listen(PORT, HOST, () => console.log(`Listening on ${HOST}:${PORT}!`));