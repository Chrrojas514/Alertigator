const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('count')
      .setDescription('Count up till the user reacts to the stop sign or till it reaches the specified # of seconds.')
      .addIntegerOption((option) => option
          .setName('seconds')
          .setDescription('Seconds to count up to.')
          .setRequired(false),
      ),

  async execute(interaction) {
    const secondsOption = interaction.options.getInteger('seconds');
    const user = interaction.user;
    let count = 0;
    let stopCounting = false;

    // Message with STOP button
    const initialMessage = await interaction.reply({
      content: `Count: \`${count}\``,
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 4, // Danger button style
              custom_id: 'stop_button',
              label: 'STOP',
            },
          ],
        },
      ],
    });

    // Update count
    const updateCount = async () => {
      if (stopCounting) return;

      count++;

      // New count update
      await initialMessage.edit({
        content: `Count: \`${count}\``,
      });

      // Check if the specified seconds option is provided
      if (secondsOption && count >= secondsOption) {
        stopCounting = true;
        await interaction.editReply(`${user.toString()}, Counting stopped at \`${count}\``);
        return;
      }

      // Recursive call for updating every second
      setTimeout(updateCount, 1000);
    };

    // Count
    updateCount();

    // STOP button click
    const filter = (i) => i.customId === 'stop_button' && i.user.id === interaction.user.id;
    const collector = initialMessage.createMessageComponentCollector({ filter, time: secondsOption ? secondsOption * 1000 : 86400000});

    collector.on('collect', () => {
      stopCounting = true;
      collector.stop();
      interaction.editReply(`${user.toString()}, Counting stopped at \`${count}\``);
    });

    collector.on('end', () => {
      // Remove the "STOP" button after ending count
      initialMessage.edit({ components: [] });
    });
  },
};