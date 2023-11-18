const { addMinutes, addHours, addDays } = require('date-fns');

const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Reminder = require('../models/reminder');
const moment = require('moment');

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
            .setDescription('Reminder Date & Time Format: MM/DD/YYYY HH:MM (24 Hours)')
            .setRequired(false))
        .addIntegerOption((option) => option
            .setName('days')
            .setDescription('How many days from now?')
            .setRequired(false))
        .addIntegerOption((option) => option
            .setName('hours')
            .setDescription('How many hours from now?')
            .setRequired(false))
        .addIntegerOption((option) => option
            .setName('minutes')
            .setDescription('How many minutes from now?')
            .setRequired(false)),

    // this runs when someone uses the slash command
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        // the reminder the user typed in for themselves
        const reminder = interaction.options.getString('reminder');

        const message = reminder;

        // execute here
        if (interaction.options.getString('date') != null) {

            const date = interaction.options.getString('date');

            const reminderDate = moment(date, 'MM/DD/YYYY HH:mm', true);

            // Check if the date is valid
            if (reminderDate.isValid() && reminderDate.isAfter(moment())) {
                try {
                    await Reminder.create({
                        message,
                        remind_time: reminderDate,
                        user_id: user.id,
                        guild_id: interaction.guild.id,
                    });
                } catch (error) {
                    console.log(error);
                }

                const reminderEmbed = new EmbedBuilder()
                    .setColor(0xdeffe7)
                    .setDescription(`Reminder set for ${reminderDate.format('LLL')} for ${user} about [${message}]`);

                console.log(reminderDate);

                interaction.reply({ embeds: [reminderEmbed] });
            }
            else {
                interaction.reply('Invalid date format. Please use MM/DD/YYYY HH:MM');
            }
            return;
        }

        // User did not inpute date, calculate time until reminder in dateToRemind
        const days = interaction.options.getInteger('days');
        const hours = interaction.options.getInteger('hours');
        const minutes = interaction.options.getInteger('minutes');

        const userId = user.id;
        const guildId = interaction.guild.id;
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

        // The embed that the bot responds with as confirmation that its received the user's
        // request.

        const reminderEmbed = new EmbedBuilder()
            .setColor(0xdeffe7)
            .setDescription(`${user} will be reminded <t:${Math.floor(dateToRemind / 1000)}:R> about [${message}]`);

        console.log(dateToRemind);

        interaction.reply({ embeds: [reminderEmbed] }); // Send the response to the interaction
    },
};
