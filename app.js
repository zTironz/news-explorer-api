const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const articlesRoute = require('./routes/articles');
const usersRoute = require('./routes/users');
const { login, createUser } = require('./controllers/users');
require('dotenv').config();
const { auth } = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { errorsCenter } = require('./errors/globErr');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/diplomapi', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', createUser);
app.post('/signin', login);
app.use('/articles', auth, articlesRoute);
app.use('/users', auth, usersRoute);
app.all('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorsCenter);

app.listen(PORT);
