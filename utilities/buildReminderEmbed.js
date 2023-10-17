const { EmbedBuilder } = require('discord.js');

const reminderEmbedBuilder = (reminderObject) => {
  const reminderEmbed = new EmbedBuilder()
    .setColor(0xdeffe7)
    .setDescription(`${reminderObject.message} on ${reminderObject.dateToRemind}`);
};

const deliveryEmbedBuilder = (reminderObject) => {
  const deliveryEmbed = new EmbedBuilder()
    .setColor(0xdeffe7)
    .setDescription(`Hey, ${reminderObject.message}!`);
};

module.exports = { reminderEmbedBuilder, deliveryEmbedBuilder };
