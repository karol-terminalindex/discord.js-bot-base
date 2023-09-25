const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('userban')
        .setDescription('Banhammer the damn user from the server') /// You can change the description of this command.
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to splat?') /// You can change the description of the user selection.
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason to splat the user with da BANhammer?')), /// You can change the description here.

    async execute(interaction) {
        // Check if the user has administrator permissions
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: ':no_entry_sign:  no permissions, dumbass.', ephemeral: true }); //// You can change it, too.
        }

        // Get the user to kick and the reason
        const userToBan = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || ':sob: for no reason lol'; /// You can change it here even!

        // Check if the user to kick is a valid target
        if (!userToBan) {
            return interaction.reply({ content: ':face_with_raised_eyebrow:  Yo bro which one to kick?', ephemeral: true }); /// Customize the way you like it :~DDDDD
        }

        // Kick the user
        try {
            await interaction.guild.members.ban(userToBan, { reason });
            interaction.reply({ content: `:white_check_mark: :hammer: Successfully banned ${userToBan.tag}.\nReason: ${reason}` });  //// You can change the ban output.
        } catch (error) {
            console.error(error);
            interaction.reply({ content: ':face_with_raised_eyebrow: An error occurred while trying to ban the user lol :question: :question: :question: ', ephemeral: true }); //// Yes, here too.
        }
    },
};
