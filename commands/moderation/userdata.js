const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('userdata')
        .setDescription('All user data.'),
    async execute(interaction) {
        await interaction.reply(`Invoked by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
    },
};