const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');  // neccessary discord.js classes
const { token } = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds]});
d
client.cooldowns = new Collection();
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
client.on("ready", () => {
    client.user.setActivity("my code", { type: "WATCHING"})
})

client.once(Events.ClientReady, c => {
    console.log(`karolBot | Deployed! Running instance name: ${c.user.tag}`)
    client.user.setActivity("servers :3", { type: "WATCHING"});
});

client.on('guildMemberAdd', async (member) => {
    console.log(`User ${member.user.tag} has joined the server.`);
    try {
        await member.send('Welcome to the server!'); // Customize this message as needed
    } catch (error) {
        console.error(`Failed to send a welcome DM to ${member.user.tag}: ${error}`);
    }

    // Specify the welcome channel by its ID
    const welcomeChannelId = '1154857814821449873'; // Replace with the actual channel ID
    const guild = member.guild;
    const welcomeChannel = guild.channels.cache.get(welcomeChannelId);
    
    console.log(`Attempting to send a welcome message to channel ID ${welcomeChannelId}`);
    
    if (welcomeChannel) {
        try {
            await welcomeChannel.send(`Welcome ${member.user.tag} to the server!`); // Customize this message as needed
            console.log(`Welcome message sent to channel ID ${welcomeChannelId}`);
        } catch (error) {
            console.error(`Failed to send a welcome message to channel ID ${welcomeChannelId}: ${error}`);
        }
    } else {
        console.error(`Could not find a channel with ID ${welcomeChannelId} in the server.`);
    }
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	const { cooldowns } = client;

	if (!cooldowns.has(command.data.name)) {
		cooldowns.set(command.data.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.data.name);
	const defaultCooldownDuration = 3;
	const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

	if (timestamps.has(interaction.user.id)) {
		const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

		if (now < expirationTime) {
			const expiredTimestamp = Math.round(expirationTime / 1000);
			return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
		}
	}

	timestamps.set(interaction.user.id, now);
	setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command or you do not have permissions to perform it!', ephemeral: true });
	}
});

client.login(token);