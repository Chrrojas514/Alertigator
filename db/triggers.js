const TextChannel = require(`discord.js`);
const client = require(`../utilities/discordClientConfig`);
const Reminder = require(`../models/reminder`);
const { Op } = require("sequelize");

const checkForReminders = async () => {
    const reminders = await Reminder.findAll({
        where: {
            remind_time: {
                [Op.lte]: Date.now()
            }
        }
    });


    for (existingReminder of reminders) {
        client.channels.fetch('1147987485469724733').then( (channel) => {
            channel.send('reminder fetch works!');
        }).catch(console.error);

        console.log(`Reminder delivered: ${existingReminder}`);

        console.log(existingReminder);

        await existingReminder.destroy();
    }
}

module.exports = checkForReminders;