const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("remind")
        .setDescription("Set a reminder for yourself or others!")
        .addUserOption(option => 
            option
                .setName('user')
                .setDescription('Person to remind')
                .setRequired(false)
        ),

    callback: (Message, args) => {
        console.log(args);
        Message.reply('testing commandHandler.js');
    },

        // async execute(interaction) {
        //     // If its not a chat command input or if null
        //     if (!interaction.isChatInputCommand()) return;

        //     if (interaction.commandName === "remind") {
        //     let user = interaction.options.getUser('user') || interaction.user;
        //     if (!user) user = interaction.user;

        //     interaction.reply("handle logic before this line, should reply with confirmation");
        //     }
        // }
}