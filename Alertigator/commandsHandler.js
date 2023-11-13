const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const utils = require('./utilities/utilityFunctions');
require('dotenv/config');

const commands = [];
const commandFiles = utils.getFiles('./commands');

for (const file of commandFiles) {
  // eslint-disable-line global-require
  const command = require(file);
  commands.push(command.data.toJSON());
}

console.log(commands);

const rest = new REST().setToken(process.env.TOKEN);

const guildId = '1147984780370116638'; //guild ID
const applicationId = '1147989226852458556'; //application ID

(async () => {
  console.log(`Refreshing ${commands.length} slash commands...`);

  try {
    const data = await rest.put(
      Routes.applicationGuildCommands(applicationId, guildId), // Update the line with the correct IDs
      { body: commands },
    );

    console.log(data);

    console.log(`Successfully refreshed ${commands.length} slash commands!`);
  } catch (error) {
    console.log(error);
  }
})();
