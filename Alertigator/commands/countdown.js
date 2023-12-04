const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('countdown')
    .setDescription('Add a number to countdown from')
    .addIntegerOption((option) => option
        .setName('seconds')
        .setDescription('Number of seconds to countdown from')
        .setRequired(true),
    ),

  async execute(interaction) {
    const seconds = interaction.options.getInteger('seconds');

    if (isNaN(seconds) || seconds <= 0) {
      return interaction.reply('Please provide a valid positive number of seconds.');
    }

    // Gives the bot time to process the command, good for long running tasks
    await interaction.deferReply();

    // Start the countdown
    await startCountdown(interaction.user.id, seconds, interaction);
  },
};

async function startCountdown(userId, seconds, interaction) {
  let currentCount = seconds;

  const countdownInterval = setInterval(async () => {
    if (currentCount === 0) {
      clearInterval(countdownInterval);
      await interaction.editReply(`<@${userId}> Countdown from \`${seconds}\` seconds finished!`);
    } else {
      // Edit the original message with the updated countdown
      await interaction.editReply(`Countdown: \`${currentCount} seconds\``);
      currentCount--;
    }
  }, 1000);
}
