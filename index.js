const fs = require(`node:fs`);
const { Client, Events, IntentsBitField, SlashCommandBuilder, Message, Collection } = require(`discord.js`);
const Reminder = require('./models/reminder');
require('dotenv').config();
//const utils = require(`./utilities/utilityFunctions`);

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.commands = getCommands(`./commands`);

client.once('ready', (c) => {
    //load up the db
    Reminder.sync();

    console.log(`${c.user.tag} is online.`);
});

client.on(Events.InteractionCreate, interaction => {
    // If its not a chat command input
    if (!interaction.isChatInputCommand()) return;

    // -------------------------------
    let currentCommand = client.commands.get(interaction.commandName);

    try {
        currentCommand.execute(interaction);
    } catch (error) {
        console.log(error);
    }

    //logs information about the interaction, printed to terminal
    console.log(interaction);
});

client.login(process.env.TOKEN);


// SHOULD CONSIDER CREATING UTILITY FOLDER / FUNCTION FILE -------------------------------------------------
function getFiles(dir) {
    const files = fs.readdirSync(dir, {
        withFileTypes: true
    });
    let commandFiles = [];

    for (const file of files) {
        if (file.isDirectory()) {
            commandFiles = [
                ...commandFiles,
                ...getFiles(`${dir}/${file.name}`)
            ]
        } else if (file.name.endsWith('.js')) {
            commandFiles.push(`${dir}/${file.name}`);
        }
    }

    return commandFiles;
};

function getCommands(dir) {
    //Discord collection - like a hashmap
    let commands = new Collection();
    const commandFiles = getFiles(dir);

    for (const file of commandFiles) {
        const command = require(file);
        //Add command to discord collection
        commands.set(command.data.toJSON().name, command)
    }
    return commands;
}