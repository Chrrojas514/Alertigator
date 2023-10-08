const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
  dialect: 'sqlite',
  host: 'localhost',
  storage: 'reminders.sqlite',
  logging: false, // DEPRECIATED
});

module.exports = sequelize;
