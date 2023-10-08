const { addMinutes, addHours, addDays } = require('date-fns');

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Reminder = require('../models/reminder');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remind')
    .setDescription('Set a reminder for yourself or others!')
    .addUserOption((option) => option
      .setName('user')
      .setDescription('person to remind')
      .setRequired(true))
    .addStringOption((option) => option
      .setName('reminder')
      .setDescription('what is the reminder?')
      .setRequired(true))
    .addStringOption((option) => option
      .setName('date')
      .setDescription('X minutes/hours/days')
      .setRequired(false))
    .addIntegerOption((option) => option
      .setName('minutes')
      .setDescription('how many minutes from now?')
      .setRequired(false))
    .addIntegerOption((option) => option
      .setName('hours')
      .setDescription('how many hours from now?')
      .setRequired(false))
    .addIntegerOption((option) => option
      .setName('days')
      .setDescription('how many days from now?')
      .setRequired(false)),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reminder = interaction.options.getString('reminder');

    if (interaction.options.getString('date') != null) {
      // PARSE STRING INPUT, STILL NOT DONE YET

      interaction.reply('User inputted string, testing db');
      return;
    }

    const minutes = interaction.options.getInteger('minutes');
    const hours = interaction.options.getInteger('hours');
    const days = interaction.options.getInteger('days');

    const userId = user.id;
    const guildId = interaction.guild.id;
    const message = reminder;
    const dateToRemind = String(addMinutes(
      addHours(
        addDays(Date.now(), Number(days)),
        Number(hours),
      ),
      Number(minutes),
    ));

    try {
      await Reminder.create({
        message,
        remind_time: dateToRemind,
        user_id: userId,
        guild_id: guildId,
      });
    } catch (error) {
      console.log(error);
    }

    // CAN MOVE THIS TO ITS OWN CLASS TO BE USED FOR OTHER COMMANDS?
    const reminderEmbed = new EmbedBuilder()
      .setColor(0xdeffe7)
      .setDescription(`${message} on ${dateToRemind}`);

    await interaction.channel.send({ embeds: [reminderEmbed] });
  },
};
