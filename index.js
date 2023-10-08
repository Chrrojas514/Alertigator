const { Events, Collection } = require('discord.js');

const client = require('./utilities/discordClientConfig');
const Reminder = require('./models/reminder');

const utils = require('./utilities/utilityFunctions');
const checkForReminders = require('./db/triggers');
require('dotenv').config();

client.commands = getCommands('./commands');

client.once('ready', (c) => {
  // load up the db
  Reminder.sync();
  console.log(`${c.user.tag} is online.`);
});

setInterval(checkForReminders, 60000);

client.on(Events.InteractionCreate, (interaction) => {
  // If its not a chat command input
  if (!interaction.isChatInputCommand()) return;

  // -------------------------------
  const currentCommand = client.commands.get(interaction.commandName);

  try {
    currentCommand.execute(interaction);
  } catch (error) {
    console.log(error);
  }
  // information about the interaction
  // console.log(interaction);
});

client.login(process.env.TOKEN);

// SHOULD CONSIDER CREATING UTILITY FOLDER / FUNCTION FILE -----------------------------------------
function getCommands(dir) {
  // Discord collection - like a hashmap
  const commands = new Collection();
  const commandFiles = utils.getFiles(dir);

  for (const file of commandFiles) {
    const command = require(file);
    // Add command to discord collection
    commands.set(command.data.toJSON().name, command);
  }
  return commands;
}
