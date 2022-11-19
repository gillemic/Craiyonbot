const { SlashCommandBuilder } = require('@discordjs/builders');
const { countImages } = require('../util/createBlend.js');
const { loadAndProcessMyLocalImage } = require('../util/generateImage');
// const { containsAtAll } = require('../util/doesContain');

// const banned_words = ['blackface', 'black face', 'darkface', 'dark face'];
// const banned_users = ['105884992055349248', '415407957371781123'];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('blend')
		.setDescription('Create an image from any prompt')
		.addStringOption(option =>
			option.setName('prompt')
				.setDescription('the prompt of your choice')
				.setRequired(true)),
	async execute(interaction) {
		const message = await interaction.deferReply({ fetchReply: true });

		const prompt = interaction.options.getString('prompt');

		// Check if query is too long
		if (prompt.length > 100) {
			await interaction.editReply({ content: 'DALL·E: Invalid query\nQuery is too long.', ephemeral: true });
			return;
		}

		// check if banned words
		/* const query = prompt.toLowerCase();
		if (containsAtAll(query, banned_words) && banned_users.includes(interaction.user.id)) {
			await interaction.editReply({ content: 'Blend prompt contains a banned word' });
			return;
		}*/

		const folder = await countImages(prompt, message.id);

		await loadAndProcessMyLocalImage(folder);

		await interaction.editReply({ files: [`${folder}/final.png`], content: prompt });
	},
};