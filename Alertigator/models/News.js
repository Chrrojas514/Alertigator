const Sequelize = require('sequelize');
const sequelize = require('../db/database');

const DailyNews = sequelize.define('dailynews', {
  news_id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  user_id: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  guild_id: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  article_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  news_timestamp: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = DailyNews;
