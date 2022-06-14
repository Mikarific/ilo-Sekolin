const axios = require('axios').default;
const cheerio = require('cheerio');
const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');

function isURL(string) {
	try {
		const url = new URL(string);
		return url.protocol ? ['http:', 'https:'].includes(url.protocol) : false;
	} catch (err) {
		return false;
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pxls')
		.setDescription('o pana e nimi sina pi lipu linluwi Pxls tawa mi! Verify your Pxls account!')
		.addStringOption(
			new SlashCommandStringOption()
				.setName('profile')
				.setDescription('lipu sina pi lipu linluwi Pxls. The link to your Pxls profile.')
				.setRequired(true),
		),
	cooldown: 1,
	async execute(interaction, client) {
		const profile = interaction.options.getString('profile');

		if (!isURL(profile)) {
			const error = new EmbedBuilder()
				.setColor(process.env.BOT_COLOR)
				.setTitle('❌ sina pakala!')
				.setDescription('ni li lipu linluwi ala! o pana e lipu linluwi tawa mi.\n||This is not a profile link! Please provide a valid profile link.||\n(Ex: [https://pxls.space/profile/Mikarific](https://pxls.space/profile/Mikarific))');
			return await interaction.reply({ embeds: [error], ephemeral: true });
		}

		if (new URL(profile).host !== 'pxls.space' || !new URL(profile).pathname.startsWith('/profile/')) {
			const error = new EmbedBuilder()
				.setColor(process.env.BOT_COLOR)
				.setTitle('❌ sina pakala!')
				.setDescription('ni li lipu linluwi ala! o pana e lipu linluwi tawa mi.\n||This is not a profile link! Please provide a valid profile link.||\n(Ex: [https://pxls.space/profile/Mikarific](https://pxls.space/profile/Mikarific))');
			return await interaction.reply({ embeds: [error], ephemeral: true });
		}

		await axios.get(new URL(profile).href, { headers: {
			Cookie: `pxls-token=${process.env.PXLS}`,
		} }).then(async (response) => {
			const $ = cheerio.load(response.data);
			const discordTag = $('#tab-details>table>tbody>tr:nth-child(4)>td').text();
			const pxlsUsername = $('title').text().substring(0, $('title').text().length - 7);
			if (discordTag.trim().toLowerCase() === `${interaction.user.username}#${interaction.user.discriminator}`.trim().toLowerCase() && discordTag !== '') {
				client.guilds.fetch(interaction.guildId).then(guild => {
					guild.roles.fetch(process.env.VERIFIED).then(async role => {
						interaction.member.roles.add(role);
						client.channels.fetch(process.env.NOTIFY_CHANNEL).then(channel => {
							channel.send(`<@${interaction.user.id}> li jan \`${pxlsUsername}\` lon lipu linluwi Pxls.`);
						});
						const embed = new EmbedBuilder()
							.setColor(process.env.BOT_COLOR)
							.setTitle('mi sona e nimi sina pi lipu linluwi Pxls!')
							.setDescription(`nimi sina pi lipu linluwi Pxls li nimi \`${pxlsUsername}\`!\n||Your Pxls name has been set to \`${pxlsUsername}\`!||`);
						await interaction.reply({ embeds: [embed], ephemeral: true });
					}).catch(e => {
						console.log(e);
					});
				}).catch(e => {
					console.log(e);
				});
			} else {
				const error = new EmbedBuilder()
					.setColor(process.env.BOT_COLOR)
					.setTitle('❌ sina pakala!')
					.setDescription('nimi Discord sina pi lipu linluwi Pxls li nimi Discord sina ala.\n||The Discord tag on your profile does not match your discord tag!||');
				return await interaction.reply({ embeds: [error], ephemeral: true });
			}
		}).catch(async () => {
			const error = new EmbedBuilder()
				.setColor(process.env.BOT_COLOR)
				.setTitle('❌ mi pakala!')
				.setDescription('mi ken ala kama jo e lipu ni! o pana e lipu sina sin.\n||I couldn\'t reach that profile! Try again.||\n(Ex: [https://pxls.space/profile/Mikarific](https://pxls.space/profile/Mikarific))');
			return await interaction.reply({ embeds: [error], ephemeral: true });
		});
	},
};