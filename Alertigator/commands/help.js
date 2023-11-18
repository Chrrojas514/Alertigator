const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('help page'),
    async execute (interaction) {
        const embed = new EmbedBuilder()
        .setColor(0xdeffe7)
        .setTitle("Help Page")
        .setDescription("Help Guide:")
        .addFields({name: "Page 1", value: "Help Commands"})
        .addFields({name: "Page 2", value: "Slash Commands"})

        const embed2 = new EmbedBuilder()
        .setColor(0xdeffe7)
        .setTitle("Help Commands")
        .setDescription("Command Guide:")
        .addFields({name: "/remind", value: "Brings up remind parameters"})
        .addFields({name: "user", value: "Add the person you want to remind"})
        .addFields({name: "reminder", value: "Write your reminder"})
        .addFields({name: "date", value: "Use the format in the description to be reminded on that day and time"})
        .addFields({name: "days/hours/minutes", value: "Put down a value for days/hours/minutes to be reminded days/hours/minutes later"})
        .setFooter({text: "Help Commands"})
        .setTimestamp()

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`page1`)
            .setLabel(`Page 1`)
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`page2`)
            .setLabel(`Page 2`)
            .setStyle(ButtonStyle.Success)
        )

        const message = await interaction.reply({ embeds: [embed],components: [button] });
        const collector = await message.createMessageComponentCollector();

        collector.on('collect', async i => {
            if (i.customId === 'page1') {
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({ embeds: [embed], components: [button]})
            }

            if (i.customId === 'page2') {
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({ embeds: [embed2], components: [button]})
            }
        })
    }

    
}
