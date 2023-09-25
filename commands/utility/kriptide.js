const { SlashCommandBuilder } = require('discord.js');

module.exports = {  ////// Unnecessary command. You can remove it if you want. 
    cooldown: 2,
    data: new SlashCommandBuilder()
        .setName('kriptide')
        .setDescription('Pings the bot creator'),
    async execute(interaction) {
        await interaction.reply('<@417786138401439769>');
    },
};
