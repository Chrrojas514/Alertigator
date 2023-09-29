const fs = require(`node:fs`);
const path = require(`node:path`);
const { REST } = require('@discordjs/rest');
const { Routes, Client, Message, Collection } = require(`discord.js`);

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
}

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

module.exports = {
    getFiles,
    getCommands
}