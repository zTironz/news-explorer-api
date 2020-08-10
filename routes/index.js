const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const articlesRoute = require('./articles.js');
const usersRoute = require('./users.js');
const regPass = require('../regex/passReg');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).error(() => new BadRequest('Имя обязательно')),
    email: Joi.string().required().email().error(() => new BadRequest('Введите правильный email')),
    password: Joi.string().required().pattern(regPass).error(() => new BadRequest('Пароль должен быть не менее 8 символов и содержать цифры и латинские буквы')),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().error(() => new BadRequest('Имя обязательно')),
    password: Joi.string().required().pattern(regPass).error(() => new BadRequest('Пароль должен быть не менее 8 символов и содержать цифры и латинские буквы')),
  }),
}), login);
router.use('/articles', auth, articlesRoute);
router.use('/users', auth, usersRoute);
router.all('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
