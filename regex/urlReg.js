const { isURL } = require('validator');

const regUrl = (value) => {
  if (!isURL(value)) {
    throw new Error('введите URL в формате: http://site.ru/...');
  }
  return value;
};

module.exports = regUrl;
