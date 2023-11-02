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

    // again, this should be its own utility function or file in utilities
    const returnEmbed = new EmbedBuilder()
      .setColor(0xdeffe7)
      .setDescription(`<@${existingReminder.user_id}> Reminder! ${existingReminder.message}`);

    // Hard-coded the guild id from our server, refactor to represent any guild id from the
    // retrieved reminder
    client.channels.fetch('1147987485469724733').then((channel) => {
      channel.send({ embeds: [returnEmbed] });
    });

    console.log(`Reminder delivered: ${reminderData}`);

    await existingReminder.destroy();
  }
};

module.exports = checkForReminders;
