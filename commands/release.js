fs = require('fs');
const {
  database
} = require('../config.json');
module.exports = {
  name: 'release',
  description: 'Ingest new album titles',
  args: true,
  execute(Discord, message, args) {
    if (typeof hamData != 'undefined') {
      console.log(args);
      newAlbum = {};
      newAlbum.title = args[0];
      newAlbum.playCount = 0;
      newAlbum.producer = message.author.username;
      newAlbum.timestamp = message.createdAt.toString();
      hamData["album"].push(newAlbum);
      // convert JSON object to a string
      const data = JSON.stringify(hamData)

      // write JSON string to a file
      fs.writeFile(database, data, err => {
        if (err) {
          throw err
        }
        console.log('hamData File Updated.')
      })
      console.log('New Album Released');
      index = hamData.length-1
      message.channel.send('Album number '+index+ ' has been saved.');
    }
  },
};