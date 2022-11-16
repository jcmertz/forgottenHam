fs = require('fs');
const {
  database
} = require('../config.json');
module.exports = {
  name: 'rocks',
  description: 'Increases the score of the last cube gimmed',
  async execute(Discord, message, args) {
    if (typeof cubes != 'undefined') {
      index = cubes.lastCubeIndex;
      cubes[index].score = cubes[index].score>9?10:cubes[index].score+1;
      const cubeEmbed = new Discord.EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("Cube Number: " + index.toString())
        .setDescription('Slurped By: '+ cubes[index].slurper + " on "+ cubes[index].slurpTime)
        .addFields({
          name: 'Quote:',
          value: cubes[index].quote
        }, {
          name: 'New Score:',
          value: cubes[index].score.toString()
        }, );
      // convert JSON object to a string
      const data = JSON.stringify(cubes)

      // write JSON string to a file
      fs.writeFile(database, data, err => {
        if (err) {
          throw err
        }
        console.log('Cubes File Updated.')
      })
      message.channel.send({
        embeds: [cubeEmbed]
      });
    }
  }
};