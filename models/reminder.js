const Sequelize = require(`sequelize`);
const sequelize = require(`../db/database`);

const Reminder = sequelize.define('reminder', {
    reminder_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    remind_time: {
        type: Sequelize.DATE,
        allowNull: false
    },
    user_id: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    guild_id: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = Reminder;