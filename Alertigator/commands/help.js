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
        .setDescription("Commands:")
        .addFields({name: "Page 1", value: "Help Page"})
        .addFields({name: "Page 2", value: "Reminder"})
        .addFields({name: "Page 3", value: "Countdown"})
        .addFields({name: "Page 4", value: "Daily News"})
        .addFields({name: "Page 5", value: "Currency Convert"})
        .addFields({name: "Page 6", value: "Currency Convert List"})

        const embed2 = new EmbedBuilder()
        .setColor(0xdeffe7)
        .setTitle("Reminder Command")
        .setDescription("Command Features:")
        .addFields({name: "/remind", value: "Brings up remind parameters"})
        .addFields({name: "user", value: "Add the person you want to remind"})
        .addFields({name: "reminder", value: "Write your reminder"})
        .addFields({name: "hidden", value: "Y/Yes to hide your reminder"})
        .addFields({name: "date", value: "Use the format in the description to be reminded on that day and time"})
        .addFields({name: "days/hours/minutes", value: "Put down a value for days/hours/minutes to be reminded days/hours/minutes later"})
        .setFooter({text: "Reminder Command"})
        .setTimestamp()

        const embed3 = new EmbedBuilder()
        .setColor(0xdeffe7)
        .setTitle("Countdown Command")
        .setDescription("Command Features:")
        .addFields({name: "/countdown", value: "Insert the number of seconds to countdown from"})
        .addFields({name: "seconds", value: "Number of seconds to count down from"})
        .setFooter({text: "Countdown Command"})
        .setTimestamp()

        const embed4 = new EmbedBuilder()
        .setColor(0xdeffe7)
        .setTitle("Daily News Command")
        .setDescription("Command Features:")
        .addFields({name: "/dailynews", value: "Brings up dailynews parameters"})
        .addFields({name: "count", value: "Input number of news articles to display (max 4)"})
        .setFooter({text: "Daily News Command"})
        .setTimestamp()

        const embed5 = new EmbedBuilder()
        .setColor(0xdeffe7)
        .setTitle("Currency Convert Command")
        .setDescription("Command Features:")
        .addFields({name: "/convert", value: "Brings up currency conversion parameters"})
        .addFields({name: "amount", value: "Currency amount to convert"})
        .addFields({name: "from", value: "Initial currency you want to convert the inputed amount from"})
        .addFields({name: "to", value: "Desired currency you want to convert the inputed amount to"})
        .setFooter({text: "Currency Convert Command"})
        .setTimestamp()

        const embed6 = new EmbedBuilder()
        .setColor(0xdeffe7)
        .setTitle("Currency Convert List Command")
        .setDescription("Command Features:")
        .addFields({name: "/currencylist", value: "Brings up a list of all active currency codes that can be used to convert an amount from/to"})
        .setFooter({text: "Currency List Command"})
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
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`page3`)
            .setLabel(`Page 3`)
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`page4`)
            .setLabel(`Page 4`)
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`page5`)
            .setLabel(`Page 5`)
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`page6`)
            .setLabel(`Page 6`)
            .setStyle(ButtonStyle.Success),
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

            if (i.customId === 'page3') {
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({ embeds: [embed3], components: [button]})
            }

            if (i.customId === 'page4') {
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({ embeds: [embed4], components: [button]})
            }

            if (i.customId === 'page5') {
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({ embeds: [embed5], components: [button]})
            }

            if (i.customId === 'page6') {
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({ embeds: [embed6], components: [button]})
            }
        })
    }
}
