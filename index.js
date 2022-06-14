require('dotenv').config();

const fs = require('fs');
const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();
client.cooldowns = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
	if (message.channelId === process.env.VERIFY_CHANNEL || message.channelId === process.env.CHECKPOINT_CHANNEL) {
		message.delete();
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	const { cooldowns } = client;

	if (!cooldowns.has(command.data.name)) {
		cooldowns.set(command.data.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.data.name);
	const cooldownAmount = (command.cooldown || 1) * 1000;

	if (timestamps.has(interaction.user.id)) {
		const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			const embed = new EmbedBuilder()
				.setColor(process.env.BOT_COLOR)
				.setDescription(`⚠️ Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`/${command.data.name}\` command.`);
			return await interaction.reply({ embeds: [embed] });
		}
	}

	timestamps.set(interaction.user.id, now);
	setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		const embed = new EmbedBuilder()
			.setColor(process.env.BOT_COLOR)
			.setTitle('❌ mi pakala!')
			.setDescription('sina pali e ijo la ijo li ike!\n||Something went wrong while executing the command.||');
		if (interaction.replied || interaction.deferred) {
			await interaction.editReply({ embeds: [embed], ephemeral: true });
		} else {
			await interaction.reply({ embeds: [embed], ephemeral: true });
		}
	}
});

client.login(process.env.TOKEN);