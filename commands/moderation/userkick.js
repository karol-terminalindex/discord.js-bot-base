const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server') /// You can change that.
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to kick') // You can change that.
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for the kick')), // You can change that.

    async execute(interaction) {
        // Check if the user has administrator permissions
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: ':no_entry_sign:  no permissions, dumbass.', ephemeral: true }); // You can change that.
        }

        // Get the user to kick and the reason
        const userToKick = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || ':sob: for no reason lol'; // You can change that.

        // Check if the user to kick is a valid target
        if (!userToKick) {
            return interaction.reply({ content: ':face_with_raised_eyebrow:  Yo bro which one to kick?', ephemeral: true }); // You can change that.
        }

        // Kick the user
        try {
            await interaction.guild.members.kick(userToKick, { reason });
            interaction.reply({ content: `:white_check_mark: :hammer: Successfully kicked ${userToKick.tag}.\nReason: ${reason}` }); // You can change that.
        } catch (error) {
            console.error(error);
            interaction.reply({ content: ':face_with_raised_eyebrow: An error occurred while trying to kick the user lol :question: :question: :question: ', ephemeral: true }); // You can change that.
        }
    },
};
 //// Like it? Star the repo.
