const ENV = process.env.NODE_ENV || 'development';

const development = require('./development-data/index');
const test = require('./test-data/index');

const data = {
  production: development,
  development,
  test
};

module.exports = data[ENV];
