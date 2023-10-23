const { EmbedBuilder } = require('discord.js');

// HAVENT TESTED THESE YET
const reminderEmbedBuilder = (reminderObject) => {
  new EmbedBuilder()
    .setColor(0xdeffe7)
    .setDescription(`${reminderObject.message} on ${reminderObject.dateToRemind}`);
};

const deliveryEmbedBuilder = (reminderObject) => {
  new EmbedBuilder()
    .setColor(0xdeffe7)
    .setDescription(`Hey, ${reminderObject.message}!`);
};

module.exports = { reminderEmbedBuilder, deliveryEmbedBuilder };
