fs = require('fs');
const {
  database
} = require('../config.json');
module.exports = {
  name: 'info',
  description: 'Gives out information about the last cube gimmed',
  async execute(Discord, message, args) {
    if (typeof cubes != 'undefined') {
      index = cubes.lastCubeIndex;
      const cubeEmbed = new Discord.EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle("Cube Number: " + index.toString())
      .setDescription('Slurped By: '+ cubes[index].slurper + " on "+ cubes[index].slurpTime)
      .addFields({
        name: 'Quote:',
        value: cubes[index].quote
      }, {
        name: 'Current Score:',
        value: cubes[index].score.toString()
      }, );

      message.channel.send({
        embeds: [cubeEmbed]
      });
    }
  }
};