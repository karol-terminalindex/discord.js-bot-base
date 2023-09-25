const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 2,
    data: new SlashCommandBuilder()
        .setName('riptide')
        .setDescription('Carefully wakes up admin.'),
    async execute(interaction) {
        await interaction.reply('<@417786138401439769>');
    },
};