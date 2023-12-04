const { Op } = require('sequelize');
const { EmbedBuilder } = require('discord.js');
const client = require('../utilities/discordClientConfig');
const Reminder = require('../models/reminder');

const checkForReminders = async () => {
  const reminders = await Reminder.findAll({
    where: {
      remind_time: {
        // Op.lte is sequelize for operation - less than or equal to
        [Op.lte]: Date.now(),
      },
    },
  });

  for (const existingReminder of reminders) {
    // parse reminder model
    const reminderData = JSON.stringify(existingReminder);
    
    // retrieved reminder
    client.channels.fetch('1147987485469724733').then((channel) => {
      channel.send(`<@${existingReminder.user_id}> Reminder: \`${existingReminder.message}\``);
    });

    console.log(`Reminder delivered: ${reminderData}`);
    

    await existingReminder.destroy();
  }
};

module.exports = checkForReminders;
