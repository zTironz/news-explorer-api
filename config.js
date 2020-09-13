require('dotenv').config();

const {
  NODE_ENV, JWT_SECRET, SERVER, PORT,
} = process.env;

module.exports.PORT = PORT || 3000;
module.exports.SERVER = NODE_ENV === 'production' ? SERVER : 'mongodb://localhost:27017/diplomapi';
module.exports.JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';
