const Sequelize = require('sequelize');
const sequelize = require('../db/database');

const CurrencyConversion = sequelize.define('currencyconversion', {
  conversion_id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  user_id: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  from_currency: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  to_currency: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  converted_amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  conversion_timestamp: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = CurrencyConversion;
