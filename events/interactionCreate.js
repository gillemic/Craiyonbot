const banned_channels = ['358699161551634442', '662145481908158513'];

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		const client = interaction.client;

		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (banned_channels.includes(interaction.channel.id)) {
			// stink chat
			interaction.reply({ content: 'Not in this channel', ephemeral: true });
			return;
		}

		if (!command) return;

		try {
			command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		console.log(`${new Date().toLocaleTimeString()} - ${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};