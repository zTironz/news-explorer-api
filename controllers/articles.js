const Article = require('../models/article');
const BadRequest = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found-err');
const RightsErr = require('../errors/rightsErr');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ articles }))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const id = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner: id,
  })
    .then((article) => res.send({ data: article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest({ message: err.message });
      }
      return err;
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Нет статьи');
      }
      if (article.owner.toString() !== req.user._id) {
        throw new RightsErr('Недостаточно прав');
      }
      res.send({ data: article });
      return article.remove();
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
