const { REST } = require('@discordjs/rest');
const { Routes, Client, Message } = require('discord.js');
const utils = require(`./utilities/utilityFunctions`);
require('dotenv/config');

let commands = [];
const commandFiles = utils.getFiles(`./commands`);

for (const file of commandFiles) {
    const command = require(file);
    commands.push(command.data.toJSON())
}

console.log(commands);

const rest = new REST().setToken(process.env.TOKEN);

(async () => {

    console.log(`Refreshing ${commands.length} slash commands...`);

    try {
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body : commands},
        );

        console.log(data);

        console.log(`Successfully refreshed ${commands.length} slash commands!`);
    } catch (error) {
        console.log(error);
    }
})();