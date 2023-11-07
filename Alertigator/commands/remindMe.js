const { addMinutes, addHours, addDays } = require('date-fns');

const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
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

  // this runs when someone uses the slash command
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    // the reminder the user typed in for themselves
    const reminder = interaction.options.getString('reminder');

    // if user put in date (ie 'in five minutes', 'tomrrow', etc), parse and return from
    // execute here
    if (interaction.options.getString('date') != null) {
      // PARSE STRING INPUT, STILL NOT DONE YET

      interaction.reply('User inputted string, testing db');
      return;
    }

    // User did not inpute date, calculate time until reminder in dateToRemind
    const minutes = interaction.options.getInteger('minutes');
    const hours = interaction.options.getInteger('hours');
    const days = interaction.options.getInteger('days');

    const userId = user.id;
    const guildId = interaction.guild.id;
    const message = reminder;
    const dateToRemind = addMinutes(
      addHours(
        addDays(Date.now(), Number(days)),
        Number(hours),
      ),
      Number(minutes),
    ).getTime();

    // Create the reminder in the database
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
    // The embed that the bot responds with as confirmation that its received the user's
    // request.

    const reminderEmbed = new EmbedBuilder()
      .setColor(0xdeffe7)
      .setDescription(`${user} ${message} <t:${Math.floor(dateToRemind / 1000)}:R>`);

    console.log(dateToRemind);

    interaction.channel.send({ embeds: [reminderEmbed] });
  },
};
