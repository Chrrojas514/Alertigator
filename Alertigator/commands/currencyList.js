const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('currencylist')
    .setDescription('Get a list of active currency codes'),
  async execute(interaction) {
    try {
      const currencyCodes = await getListOfCurrencyCodes();
      interaction.reply(`Available currency codes: ${currencyCodes.join(', ')}`);
    } catch (error) {
      console.error('Error fetching currency codes:', error);
      interaction.reply('An error occurred while fetching the list of currency codes.');
    }
  },
};

// Helper function to get a list of currency codes
async function getListOfCurrencyCodes() {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    const currencyCodes = Object.keys(response.data.rates);
    return currencyCodes;
  } catch (error) {
    console.error('Error fetching currency codes:', error);
    throw error;
  }
}
