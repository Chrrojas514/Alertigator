const fs = require(`node:fs`);
const { Collection } = require(`discord.js`);
const schedule = require(`node-schedule`);

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

// DOESNT SEEM TO WORK IN INDEX.JS
function getCommands(dir) {
    //Discord collection - like a hashmap
    let commands = new Collection();
    const commandFiles = getFiles(dir);
    for (const file of commandFiles) {
        console.log(file);
        const command = require(file);
        //Add command to discord collection
        commands.set(command.data.toJSON().name, command)
    }
    return commands;
}

function scheduleReminderLookUp(whenToRemind, reminderModel) {
    const triggerReminder = schedule.scheduleJob(dateToRemind, function(){
        client.on()
    });
}

module.exports = {
    getFiles,
    getCommands
}