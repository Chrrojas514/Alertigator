const { Op } = require('sequelize');
const client = require('../utilities/discordClientConfig');
const Reminder = require('../models/reminder');

const checkForReminders = async () => {
  const reminders = await Reminder.findAll({
    where: {
      remind_time: {
        [Op.lte]: Date.now(),
      },
    },
  });

  for (const existingReminder of reminders) {
    client.channels.fetch('1147987485469724733').then((channel) => {
      channel.send('reminder fetch works!');
    });

    console.log(`Reminder delivered: ${existingReminder}`);

    await existingReminder.destroy();
  }
};

module.exports = checkForReminders;
