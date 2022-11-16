module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(openai, Discord, message, args) {
		message.channel.send('Pong.');
	},
};
