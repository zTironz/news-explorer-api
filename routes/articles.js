const articleRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const BadRequest = require('../errors/bad-request');

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const regUrl = require('../regex/urlReg');

articleRouter.get('/', getArticles);

articleRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.string().required().min(2),
    source: Joi.string().required().min(2),
    link: Joi.string().required().custom(regUrl),
    image: Joi.string().required().custom(regUrl),
  }),
}), createArticle);

articleRouter.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().length(24).hex().error(() => new BadRequest('Неверный Id')),
  }),
}), deleteArticle);

module.exports = articleRouter;
