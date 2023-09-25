const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('userban')
        .setDescription('Banhammer the damn user from the server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to splat?')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason to splat the user with da BANhammer?')),

    async execute(interaction) {
        // Check if the user has administrator permissions
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: ':no_entry_sign:  no permissions, dumbass.', ephemeral: true });
        }

        // Get the user to kick and the reason
        const userToBan = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || ':sob: for no reason lol';

        // Check if the user to kick is a valid target
        if (!userToBan) {
            return interaction.reply({ content: ':face_with_raised_eyebrow:  Yo bro which one to kick?', ephemeral: true });
        }

        // Kick the user
        try {
            await interaction.guild.members.ban(userToBan, { reason });
            interaction.reply({ content: `:white_check_mark: :hammer: Successfully banned ${userToBan.tag}.\nReason: ${reason}` });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: ':face_with_raised_eyebrow: An error occurred while trying to ban the user lol :question: :question: :question: ', ephemeral: true });
        }
    },
};
