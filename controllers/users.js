const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const UniqueError = require('../errors/unique-error');
const BadRequest = require('../errors/bad-request');
const Unauthorized = require('../errors/unauthorized');

const regPass = require('../regex/passReg');

const { NODE_ENV, JWT_SECRET } = require('../config');

module.exports.getUser = (req, res, next) => {
  User
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя нет');
      } else {
        res.send({ user });
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!password) {
    throw new BadRequest('Пароль не задан');
  }
  if (!regPass.test(password)) {
    throw new BadRequest('Пароль должен быть не менее 8 символов и содержать цифры и латинские буквы');
  }
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name, about: user.about, avatar: user.avatar, email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new UniqueError(`Данные некорректны: ${err.message}`));
      } else {
        next(new UniqueError(`Данный Email уже используется: ${err.message}`));
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (password) {
    return User
      .findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
        res.send({ token });
      })
      .catch(() => next(new Unauthorized('Неправильная почта или пароль')));
  }
  throw new BadRequest('Необходимо ввести пароль');
};
