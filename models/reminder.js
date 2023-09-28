const Sequelize = require('sequelize');
const sequelize = require('../db/database');

const Reminder = sequelize.define('reminder', {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    guild_id: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    remind_time: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = Reminder;