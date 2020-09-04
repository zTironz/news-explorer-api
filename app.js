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

app.use(cors());

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
