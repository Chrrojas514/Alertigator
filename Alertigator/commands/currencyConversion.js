const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('convert')
    .setDescription('Convert currency')
    .addNumberOption((option) => option.setName('amount')
      .setDescription('Amount to convert')
      .setRequired(true))
    .addStringOption((option) => option.setName('from')
      .setDescription('Currency to convert from (e.g., USD)')
      .setRequired(true))
    .addStringOption((option) => option.setName('to')
      .setDescription('Currency to convert to (e.g., EUR)')
      .setRequired(true), // Make the 'to' parameter required
    ),
  async execute(interaction) {
    const amount = interaction.options.getNumber('amount');
    const fromCurrency = interaction.options.getString('from');
    const toCurrency = interaction.options.getString('to');

    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const exchangeRates = response.data.rates;

      if (toCurrency.toUpperCase() in exchangeRates) {
        const convertedAmount = amount * exchangeRates[toCurrency.toUpperCase()];

        interaction.reply(`Converted ${amount} ${fromCurrency.toUpperCase()} to ${convertedAmount.toFixed(2)} ${toCurrency.toUpperCase()}`);
      } else {
        interaction.reply('Invalid currency code for conversion.');
      }
    } catch (error) {
      console.error(error);
      interaction.reply('An error occurred while processing your request.');
    }
  },
};
