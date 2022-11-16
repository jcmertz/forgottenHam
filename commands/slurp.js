fs = require('fs');
const {
  database
} = require('../config.json');
module.exports = {
  name: 'slurp',
  description: 'ingest new quotes',
  args: true,
  execute(Discord, message, args) {
    if (typeof cubes != 'undefined') {
      newCube = {};
      newCube.quote = args[0];
      newCube.score = 5;
      newCube.slurper = message.author.username;
      newCube.slurpTime = message.createdAt.toString();
      cubes.push(newCube);
      // convert JSON object to a string
      const data = JSON.stringify(cubes)

      // write JSON string to a file
      fs.writeFile(database, data, err => {
        if (err) {
          throw err
        }
        console.log('Cubes File Updated.')
      })
      console.log('Slurped!');
      index = cubes.length-1
      message.channel.send('Slurp. You are cube number '+index);
    }
  },
};