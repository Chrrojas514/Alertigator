const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes, Client, Message } = require('discord.js');
const { error } = require('node:console');
require('dotenv/config');

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

let commands = [];
const commandFiles = getFiles(`./commands`);

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