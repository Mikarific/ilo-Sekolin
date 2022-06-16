const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder, SlashCommandStringOption, SlashCommandSubcommandBuilder } = require('@discordjs/builders');

const words = ['a', 'akesi', 'ala', 'alasa', 'ale', 'ali', 'anpa', 'ante', 'anu', 'awen', 'en', 'esun', 'ijo', 'ike', 'ilo', 'insa', 'jaki', 'jan', 'jelo', 'jo', 'kala', 'kalama', 'kama', 'kasi', 'ken', 'kepeken', 'kili', 'kin', 'kiwen', 'ko', 'kon', 'kule', 'kulupu', 'kute', 'la', 'lape', 'laso', 'lawa', 'len', 'lete', 'lili', 'linja', 'lipu', 'loje', 'lon', 'luka', 'lukin', 'lupa', 'ma', 'mama', 'mani', 'meli', 'mi', 'mije', 'moku', 'moli', 'monsi', 'mu', 'mun', 'musi', 'mute', 'namako', 'nanpa', 'nasa', 'nasin', 'nena', 'ni', 'nimi', 'noka', 'o', 'oko', 'olin', 'ona', 'open', 'pakala', 'pali', 'palisa', 'pan', 'pana', 'pi', 'pilin', 'pimeja', 'pini', 'pipi', 'poka', 'poki', 'pona', 'pu', 'sama', 'seli', 'selo', 'seme', 'sewi', 'sijelo', 'sike', 'sin', 'sina', 'sinpin', 'sitelen', 'sona', 'soweli', 'suli', 'suno', 'supa', 'suwi', 'tan', 'taso', 'tawa', 'telo', 'tenpo', 'toki', 'tomo', 'tu', 'unpa', 'uta', 'utala', 'walo', 'wan', 'waso', 'wawa', 'weka', 'wile', 'namako', 'kin', 'oko', 'kipisi', 'leko', 'monsuta', 'tonsi', 'jasima', 'kijetesantakalu', 'soko', 'meso', 'epiku', 'yupekosi', 'kokosila', 'lanpan', 'n', 'misikeke', 'samu', 'apeja', 'mulapisu', 'majuna', 'powe', 'misa suli', 'isipin', 'unu', 'pake', 'linluwi', 'kapesi', 'wa', 'kiki', 'sutopatikuna', 'misa', 'kan', 'waleja', 'kuntu', 'ete', 'loka', 'po', 'taki', 'oke', 'ke', 'teje', 'soto', 'pata', 'kamalawala', 'likujo', 'peto', 'pomotolo', 'te', 'to', 'usawi', 'Pingo', 'kese', 'san', 'ewe'];
const nouns = ['akesi', 'alasa', 'ale', 'ali', 'esun', 'ijo', 'ilo', 'jaki', 'jan', 'kala', 'kalama', 'kasi', 'kili', 'kiwen', 'ko', 'kon', 'kule', 'kulupu', 'lawa', 'len', 'linja', 'lipu', 'luka', 'lupa', 'ma', 'mama', 'mani', 'meli', 'mije', 'moku', 'monsi', 'mun', 'musi', 'namako', 'nanpa', 'nasin', 'nena', 'noka', 'oko', 'palisa', 'pan', 'pipi', 'poki', 'seli', 'selo', 'sewi', 'sijelo', 'sike', 'sinpin', 'sitelen', 'sona', 'soweli', 'suno', 'supa', 'suwi', 'telo', 'toki', 'tomo', 'uta', 'waso', 'namako', 'leko', 'monsuta', 'tonsi', 'kijetesantakalu', 'soko', 'misikeke', 'mulapisu', 'majuna', 'linluwi', 'sutopatikuna', 'loka', 'pata', 'pomotolo', 'usawi', 'ewe', 'misa'];

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

		if (nimi.length > 32) {
			const error = new EmbedBuilder()
				.setColor(process.env.BOT_COLOR)
				.setTitle('❌ sina pakala!')
				.setDescription('nimi sina li suli a! o pana e nimi sina lili tawa mi.\n||The name you provided is too long! Please try again with a shorter name.||');
			return await interaction.reply({ embeds: [error], ephemeral: true });
		}

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
		const invalidName = [];
		for (let i = 1; i < nimi.length; i++) {
			let word = false;
			for (let j = 0; j < words.length; j++) {
				if (nimi[i].toLowerCase() === words[j]) {
					nimi[i] = words[j];
					word = true;
				}
			}
			if (!word && !foriegnWordUsed) {
				const syllables = [];

				let currentSyllable = '';

				const letters = nimi[i].split('');
				for (let j = 0; j < letters.length; j++) {
					if (j === 0 && letters[j].match(/[aeiouAEIOU]/)) {
						currentSyllable += letters[j];
						syllables.push(currentSyllable);
						currentSyllable = '';
						continue;
					}
					if (currentSyllable.length === 2 && letters[j].match(/[nN]/)) {
						if ((letters[j + 1] && letters[j + 1].match(/[jklmnpstwJKLMNPSTW]/)) || !letters[j + 1]) {
							currentSyllable += letters[j];
							syllables.push(currentSyllable);
							currentSyllable = '';
							continue;
						} else {
							syllables.push(currentSyllable);
							currentSyllable = '';
						}
					} else if (currentSyllable.length === 2) {
						syllables.push(currentSyllable);
						currentSyllable = '';
					}
					if (currentSyllable.length === 1 && letters[j].match(/[aeiouAEIOU]/)) {
						currentSyllable += letters[j];
					} else if (currentSyllable.length === 1) {
						invalidName.push('double consonant');
						invalidName.push(i);
						invalidName.push(j - 1);
						invalidName.push(j);
						break;
					}
					if (currentSyllable.length === 0 && letters[j].match(/[jklmnpstwJKLMNPSTW]/)) {
						currentSyllable += letters[j];
					} else if (currentSyllable.length === 0) {
						invalidName.push('starts with vowel');
						invalidName.push(i);
						invalidName.push(j - 1);
						invalidName.push(j);
						break;
					}
					if (j === letters.length - 1) {
						if (currentSyllable.length === 1) {
							invalidName.push('last syllable invalid');
							invalidName.push(i);
							invalidName.push(j);
							invalidName.push(j);
							break;
						}
						if (currentSyllable.length === 2) {
							syllables.push(currentSyllable);
							currentSyllable = '';
							continue;
						}
					}
				}

				for (let j = 0; j < syllables.length; j++) {
					if (syllables[j].toLowerCase().includes('ji') || syllables[j].toLowerCase().includes('ti') || syllables[j].toLowerCase().includes('wo') || syllables[j].toLowerCase().includes('wu')) {
						invalidName.push('invalid syllable');
						invalidName.push(i);
						for (let k = 0; k < letters.length; k++) {
							if (letters[k] === syllables[j][0] && letters[k + 1] === syllables[j][1]) {
								invalidName.push(k);
								invalidName.push(k + 1);
							}
						}
						break;
					}
				}

				if (invalidName.length > 0) break;

				nimi[i] = syllables.join('').charAt(0).toUpperCase() + syllables.join('').toLowerCase().slice(1);
				foriegnWordUsed = true;
			} else if (foriegnWordUsed && !word) {
				invalidName.push('foriegn word');
				invalidName.push(i);
				invalidName.push(nimi[i].toLowerCase());
				break;
			}
		}
		if (invalidName.length > 0) {
			if (!client.application?.owner) await client.application?.fetch();
			let reason = '';
			if (invalidName[0] === 'double consonant') {
				reason += 'Your toki pona name cannot contain two consonants in a row in a single syllable!\n';
			}
			if (invalidName[0] === 'starts with vowel') {
				reason += 'Your toki pona name cannot start a syllable with a vowel unless it is at the start of the name! This can happen if you have two vowels next to each other.\n';
			}
			if (invalidName[0] === 'last syllable invalid') {
				reason += 'Your toki pona name\'s last syllable is too short! This can be caused by attempting to end the previous syllable with a non-n consonant. This is not allowed.\n';
			}
			if (invalidName[0] === 'invalid syllable') {
				reason += 'Your toki pona name contains an invalid syllable! ji, ti, wo, and wu are not allowed.\n';
			}
			if (invalidName[0] === 'foriegn word') {
				reason += 'Your toki pona name contains two seperate foreign words! Names with two words are combined into one.\n(Ex: **Papua New Guinea** becomes **ma Papuwanijukini**)';
			}
			if (invalidName[0] !== 'foriegn word') {
				let problemWord = '';
				for (let i = 0; i < nimi.length; i++) {
					if (i === invalidName[1]) {
						const problemLetters = nimi[invalidName[1]].split('');
						for (let j = 0; j < problemLetters.length; j++) {
							const letter = j === 0 ? problemLetters[j].toUpperCase() : problemLetters[j].toLowerCase();
							if (j === invalidName[2]) {
								if (j === invalidName[3]) {
									problemWord += `**${letter}**`;
								} else {
									problemWord += `**${letter}`;
								}
							} else if (j === invalidName[3]) {
								problemWord += `${letter}**`;
							} else {
								problemWord += letter;
							}
						}
					} else if (words.includes(nimi[i])) {
						problemWord += nimi[i];
					} else {
						problemWord += nimi[i].charAt(0).toUpperCase() + nimi[i].toLowerCase().slice(1);
					}
					problemWord += ' ';
				}
				reason += `The problem with your toki pona name is highlighted here:\n\n${problemWord.trim()}`;
			}
			const error = new EmbedBuilder()
				.setColor(process.env.BOT_COLOR)
				.setTitle('❌ sina pakala!')
				.setDescription(`jan pi toki pona li ken toki ala e nimi sina! o pana e nimi sina ante tawa mi.\n||Your name does not adhere to the phonetic system of toki pona! Please try a different name!\n\n${reason}\n\n(If you're having trouble with tokiponizing your name, check out [this video](https://youtu.be/oZpA_XA5FmU?t=128) or contact <@${client.application?.owner.id}>.)||`);
			return await interaction.reply({ embeds: [error], ephemeral: true });
		}

		nimi = nimi.join(' ');

		if (interaction.channelId === process.env.CHECKPOINT_CHANNEL) {
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

			client.channels.fetch(process.env.JOIN_CHANNEL).then(async channel => {
				await channel.send(process.env.MESSAGE.replaceAll('%user%', `<@${interaction.user.id}>`));
			}).catch(e => {
				console.log(e);
			});
		}

		interaction.member.setNickname(nimi, 'jan li pana e nimi tawa mi.').catch(e => {
			console.log(e);
		});

		const embed = new EmbedBuilder()
			.setColor(process.env.BOT_COLOR)
			.setTitle('mi sona e sina!')
			.setDescription(`nimi sina pi toki pona li **${nimi}**!\n||Your toki pona name has been set to **${nimi}**!||`);
		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};