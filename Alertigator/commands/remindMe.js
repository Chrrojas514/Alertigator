const { addMinutes, addHours, addDays } = require('date-fns');

const { SlashCommandBuilder } = require('discord.js');
const buildReminderEmbed = require('../utilities/buildReminderEmbed');
const Reminder = require('../models/reminder');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remind')
    .setDescription('Set a reminder for yourself or others!')
    .addUserOption((option) => option
      .setName('user')
      .setDescription('Person to remind')
      .setRequired(true))
    .addStringOption((option) => option
      .setName('reminder')
      .setDescription('What is the reminder?')
      .setRequired(true))
    .addStringOption((option) => option
      .setName('date')
      .setDescription('X minutes/hours/days')
      .setRequired(false))
    .addIntegerOption((option) => option
      .setName('minutes')
      .setDescription('How many minutes from now?')
      .setRequired(false))
    .addIntegerOption((option) => option
      .setName('hours')
      .setDescription('How many hours from now?')
      .setRequired(false))
    .addIntegerOption((option) => option
      .setName('days')
      .setDescription('How many days from now?')
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
      const reminderObj = await Reminder.create({
        message,
        remind_time: dateToRemind,
        user_id: userId,
        guild_id: guildId,
      });

      const builtReminderEmbed = buildReminderEmbed.reminderEmbedBuilder(reminderObj);
      await interaction.channel.send({ embeds: [builtReminderEmbed] });
    } catch (error) {
      console.log(error);
      await interaction.reply('Something went wrong!');
    }

    // CAN MOVE THIS TO ITS OWN CLASS TO BE USED FOR OTHER COMMANDS?
    // const reminderEmbed = buildReminderEmbed(reminderObj);

    // await interaction.channel.send({ embeds: [reminderEmbed] });
  },
};
