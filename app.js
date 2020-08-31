const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { globErr } = require('./errors/globErr');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT, SERVER } = require('./config');

const corsOptions = {
  origin: [
    'http://localhost:8080',
    'https://ztironz.github.io',
    'https://ztironz.github.io/news-explorer-frontend',
    'https://api.ztironz.tk',
    'http://api.ztironz.tk',
    '84.201.140.38',
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(SERVER, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(globErr);

app.listen(PORT);
