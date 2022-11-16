fs = require('fs');
const {
  database
} = require('../config.json');

async function drawAlbumCover(string) {
  try {
    query = string+" album cover"
    const response = await openai.createImage({
      prompt: query,
      n: 1,
      size: "512x512",
    });

    console.log(response.data.data[0].url);
    return response.data.data[0].url;

  } catch (error) {
    console.error(`Could not get art: ${error}`);
  }
}

module.exports = {
  name: 'release',
  description: 'Ingest new album titles',
  args: true,
  execute(openai, Discord, message, args) {
    if (typeof hamData != 'undefined') {
      newAlbum = {};
      newAlbum.title = args[0];
      newAlbum.playCount = 0;
      newAlbum.producer = message.author.username;
      newAlbum.timestamp = message.createdAt.toString();
      newAlbum.artUrl = drawAlbumCover(newAlbum.title);
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
      index = hamData.length - 1

      message.channel.send('Album number ' + index + ' has been saved.', {
        files: [newAlbum.artUrl]
      });

    }
  },
};