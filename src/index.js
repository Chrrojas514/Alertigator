require('dotenv').config();
const { Client, Events, IntentsBitField, SlashCommandBuilder, Message, messageLink } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.once('ready', (c) => {
    console.log(`${c.user.tag} is online.`);

    // load commands
    // let handler = require('../commandsHandler');
    // if (handler.default) handler = handler.default;

    // handler(client);
});

client.on(Events.InteractionCreate, interaction => {
    // If its not a chat command input or if null
    if (!interaction.isChatInputCommand()) return;

    // -------------------------------

    if (interaction.commandName === "remind") {
        let user = interaction.options.getUser('user') || interaction.user;
        if (!user) user = interaction.user;

        interaction.reply("handle logic before this line, should reply with confirmation");
    }

    console.log(interaction);
});

client.login(process.env.TOKEN);
