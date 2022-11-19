const { doesContain } = require('../util/doesContain');
const { requestBlend } = require('../util/sendBlend');

module.exports = {
	name: 'messageCreate',
	execute(message) {
		if (message.author.bot) {
			return;
		}

		if ((doesContain(message.content, 'thank') || doesContain(message.content, 'thanks')) && doesContain(message.content, 'craiyonbot')) {
			message.reply('You\'re welcome :relieved:');
		}

		requestBlend(message);
	},
};