module.exports = {
  name: 'index',
  description: 'returns index of last quote',
  async execute(Discord, message, args) {
    if (typeof cubes != 'undefined') {
      message.channel.send(cubes.lastCubeIndex);
    }
  }
};