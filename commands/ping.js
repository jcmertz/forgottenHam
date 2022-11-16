module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(Discord, message, args) {
		message.channel.send('Pong.');
	},
};
