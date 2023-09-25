const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 60,
	data: new SlashCommandBuilder()
		.setName('serverdata')
		.setDescription('All of the server data.'),
	async execute(interaction) {
		await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	},
};