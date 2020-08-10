const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const articlesRoute = require('./articles.js');
const usersRoute = require('./users.js');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

router.post('/signup', createUser);
router.post('/signin', login);
router.use('/articles', auth, articlesRoute);
router.use('/users', auth, usersRoute);
router.all('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
