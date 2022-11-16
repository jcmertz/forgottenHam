fs = require('fs');
const {
  database
} = require('../config.json');
module.exports = {
  name: 'record',
  description: 'Ingest new song titles',
  args: true,
  execute(Discord, message, args) {
    if (typeof hamData != 'undefined') {
      newTrack = {};
      newTrack.title = args[0];
      newTrack.playCount = 0;
      newTrack.producer = message.author.username;
      newTrack.timestamp = message.createdAt.toString();
      hamData["tracks"].push(newTrack);
      // convert JSON object to a string
      const data = JSON.stringify(hamData)

      // write JSON string to a file
      fs.writeFile(database, data, err => {
        if (err) {
          throw err
        }
        console.log('hamData File Updated.')
      })
      console.log('New Track Recorded');
      index = hamData["tracks"].length-1
      message.channel.send('Saved that! Track number '+index+ ' has been saved.');
    }
  },
};
