const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder, SlashCommandStringOption, SlashCommandSubcommandBuilder } = require('@discordjs/builders');

const words = ['a', 'akesi', 'ala', 'alasa', 'ale', 'ali', 'anpa', 'ante', 'anu', 'awen', 'en', 'esun', 'ijo', 'ike', 'ilo', 'insa', 'jaki', 'jan', 'jelo', 'jo', 'kala', 'kalama', 'kama', 'kasi', 'ken', 'kepeken', 'kili', 'kin', 'kiwen', 'ko', 'kon', 'kule', 'kulupu', 'kute', 'la', 'lape', 'laso', 'lawa', 'len', 'lete', 'lili', 'linja', 'lipu', 'loje', 'lon', 'luka', 'lukin', 'lupa', 'ma', 'mama', 'mani', 'meli', 'mi', 'mije', 'moku', 'moli', 'monsi', 'mu', 'mun', 'musi', 'mute', 'namako', 'nanpa', 'nasa', 'nasin', 'nena', 'ni', 'nimi', 'noka', 'o', 'oko', 'olin', 'ona', 'open', 'pakala', 'pali', 'palisa', 'pan', 'pana', 'pi', 'pilin', 'pimeja', 'pini', 'pipi', 'poka', 'poki', 'pona', 'pu', 'sama', 'seli', 'selo', 'seme', 'sewi', 'sijelo', 'sike', 'sin', 'sina', 'sinpin', 'sitelen', 'sona', 'soweli', 'suli', 'suno', 'supa', 'suwi', 'tan', 'taso', 'tawa', 'telo', 'tenpo', 'toki', 'tomo', 'tu', 'unpa', 'uta', 'utala', 'walo', 'wan', 'waso', 'wawa', 'weka', 'wile', 'namako', 'kin', 'oko', 'kipisi', 'leko', 'monsuta', 'tonsi', 'jasima', 'kijetesantakalu', 'soko', 'meso', 'epiku', 'yupekosi', 'kokosila', 'lanpan', 'n', 'misikeke', 'samu', 'apeja', 'mulapisu', 'majuna', 'powe', 'misa suli', 'isipin', 'unu', 'pake', 'linluwi', 'kapesi', 'wa', 'kiki', 'sutopatikuna', 'misa', 'kan', 'waleja', 'kuntu', 'ete', 'loka', 'po', 'taki', 'oke', 'ke', 'teje', 'soto', 'pata', 'kamalawala', 'likujo', 'peto', 'pomotolo', 'te', 'to', 'usawi', 'Pingo', 'kese', 'san', 'ewe'];
const nouns = ['akesi', 'alasa', 'ale', 'ali', 'esun', 'ijo', 'ilo', 'jaki', 'jan', 'kala', 'kalama', 'kasi', 'kili', 'kiwen', 'ko', 'kon', 'kule', 'kulupu', 'lawa', 'len', 'linja', 'lipu', 'luka', 'lupa', 'ma', 'mama', 'mani', 'meli', 'mije', 'moku', 'monsi', 'mun', 'musi', 'namako', 'nanpa', 'nasin', 'nena', 'noka', 'oko', 'palisa', 'pan', 'pipi', 'poki', 'seli', 'selo', 'sewi', 'sijelo', 'sike', 'sinpin', 'sitelen', 'sona', 'soweli', 'suno', 'supa', 'suwi', 'telo', 'toki', 'tomo', 'uta', 'waso', 'namako', 'leko', 'monsuta', 'tonsi', 'kijetesantakalu', 'soko', 'misikeke', 'mulapisu', 'majuna', 'linluwi', 'sutopatikuna', 'loka', 'pata', 'pomotolo', 'usawi', 'ewe'];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nimi')
		.setDescription('o pana e nimi sina pi toki pona tawa mi! Set your toki pona name!')
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName('mi')
				.setDescription('o pana e nimi sina pi toki pona tawa mi! Set your toki pona name!')
				.addStringOption(
					new SlashCommandStringOption()
						.setName('nimi')
						.setDescription('nimi sina pi toki pona. The name you would like to go by in toki pona.')
						.setRequired(true),
				),
		),
	cooldown: 1,
	async execute(interaction, client) {
		let nimi = interaction.options.getString('nimi');

		if (nimi.match(/[^aeijklmnopstuwAEIJKLNMOPSTUW ]/)) {
			const error = new EmbedBuilder()
				.setColor(process.env.BOT_COLOR)
				.setTitle('❌ sina pakala!')
				.setDescription('nimi sina li jo e sitelen pi toki pona ala! o pana e nimi sina ante tawa mi.\n||The name you provided contains an invalid character! Please try again with a different name.\n(toki pona can only contain the letters a, e, i, j, k, l, m, n, o, p, s, t, u, and w.)||');
			return await interaction.reply({ embeds: [error], ephemeral: true });
		}

		nimi = nimi.split(' ');
		let noun = false;

		for (let i = 0; i < nouns.length; i++) {
			if (nimi[0].toLowerCase() === nouns[i]) {
				nimi[0] = nouns[i];
				noun = true;
			}
		}

		if (!noun) {
			const error = new EmbedBuilder()
				.setColor(process.env.BOT_COLOR)
				.setTitle('❌ sina pakala!')
				.setDescription('o open e nimi sina kepeken e nimi pi toki pona!\n||Your name must begin with a noun!\n(toki pona names are adjectives and must describe a noun.)\n(Most people will choose to use the noun "jan", meaning "person". Ex: "jan Mika")||');
			return await interaction.reply({ embeds: [error], ephemeral: true });
		}

		let foriegnWordUsed = false;
		let validName = true;
		for (let i = 1; i < nimi.length; i++) {
			let word = false;
			for (let j = 0; j < words.length; j++) {
				if (nimi[i].toLowerCase() === words[j]) {
					nimi[i] = words[j];
					word = true;
				}
			}
			if (!word && !foriegnWordUsed) {
				const phonemes = [];

				let currentPhoneme = '';

				const letters = nimi[i].split('');
				for (let j = 0; j < letters.length; j++) {
					if (j === 0 && letters[j].match(/[aeiouAEIOU]/)) {
						currentPhoneme += letters[j];
						phonemes.push(currentPhoneme);
						currentPhoneme = '';
						continue;
					}
					if (currentPhoneme.length === 2 && letters[j].match(/[nN]/)) {
						if (letters[j + 1] && letters[j + 1].match(/[jklmnpstwJKLMNPSTW]/)) {
							currentPhoneme += letters[j];
							phonemes.push(currentPhoneme);
							currentPhoneme = '';
							continue;
						} else {
							phonemes.push(currentPhoneme);
							currentPhoneme = '';
						}
					} else if (currentPhoneme.length === 2) {
						phonemes.push(currentPhoneme);
						currentPhoneme = '';
					}
					if (currentPhoneme.length === 1 && letters[j].match(/[aeiouAEIOU]/)) {
						currentPhoneme += letters[j];
					} else if (currentPhoneme.length === 1) {
						validName = false;
						break;
					}
					if (currentPhoneme.length === 0 && letters[j].match(/[jklmnpstwJKLMNPSTW]/)) {
						currentPhoneme += letters[j];
					} else if (currentPhoneme.length === 0) {
						validName = false;
						break;
					}
					if (j === letters.length - 1) {
						if (currentPhoneme.length === 1) {
							validName = false;
							break;
						}
						if (currentPhoneme.length === 2) {
							phonemes.push(currentPhoneme);
							currentPhoneme = '';
							continue;
						}
					}
				}

				for (let j = 0; j < phonemes.length; j++) {
					if (phonemes[j].toLowerCase().includes('ji') || phonemes[j].toLowerCase().includes('ti') || phonemes[j].toLowerCase().includes('wo') || phonemes[j].toLowerCase().includes('wu')) {
						validName = false;
						break;
					}
				}

				if (!validName) break;

				nimi[i] = phonemes.join('').charAt(0).toUpperCase() + phonemes.join('').toLowerCase().slice(1);
				foriegnWordUsed = true;
			} else {
				validName = false;
				break;
			}
		}
		if (!validName) {
			if (!client.application?.owner) await client.application?.fetch();
			const error = new EmbedBuilder()
				.setColor(process.env.BOT_COLOR)
				.setTitle('❌ sina pakala!')
				.setDescription(`jan pi toki pona li ken toki ala e nimi sina! o pana e nimi sina ante tawa mi.\n||Your name does not adhere to the phonetic system of toki pona! Please try a different name!\n(If you're having trouble with tokiponizing your name, check out [this video](https://youtu.be/oZpA_XA5FmU?t=128) or contact <@${client.application?.owner.id}>.)||`);
			return await interaction.reply({ embeds: [error], ephemeral: true });
		}

		nimi = nimi.join(' ');

		client.guilds.fetch(interaction.guildId).then(guild => {
			if (interaction.member.roles.cache.get(process.env.VERIFIED)) {
				guild.roles.fetch(process.env.VERIFIED).then(async role => {
					interaction.member.roles.remove(role);
				}).catch(e => {
					console.log(e);
				});
			}
			guild.roles.fetch(process.env.MEMBER).then(async role => {
				interaction.member.roles.add(role);
			}).catch(e => {
				console.log(e);
			});
		}).catch(e => {
			console.log(e);
		});

		interaction.member.setNickname(nimi, 'jan li pana e nimi tawa mi.').catch(e => {
			console.log(e);
		});

		client.channels.fetch(process.env.JOIN_CHANNEL).then(async channel => {
			await channel.send(process.env.MESSAGE.replaceAll('%user%', `<@${interaction.user.id}>`));
		}).catch(e => {
			console.log(e);
		});

		const embed = new EmbedBuilder()
			.setColor(process.env.BOT_COLOR)
			.setTitle('mi sona e sina!')
			.setDescription(`nimi sina pi toki pona li **${nimi}**!\n||Your toki pona name has been set to **${nimi}**!||`);
		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};