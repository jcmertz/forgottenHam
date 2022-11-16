fs = require('fs');
const {
  database
} = require('../config.json');

//OPEN AI Configuration

const {
  Configuration,
  OpenAIApi
} = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


//END OF OPEN AI BIT
async function drawAlbumCover(string, Discord, message, args) {
  try {
    query = string + " album cover"
    const response = await openai.createImage({
      prompt: query,
      n: 1,
      size: "512x512",
    });

    console.log(response.data.data[0].url);
    afterArt(response.data.data[0].url,Discord, message, args)

  } catch (error) {
    console.error(`Could not get art: ${error}`);
  }
}
//drawAlbumCover("The Long Lost Enchilada of the Soul");

function afterArt(url,Discord, message, args) {
  newAlbum.artUrl = url;
  hamData["albums"].push(newAlbum);
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

module.exports = {
  name: 'release',
  description: 'Ingest new album titles',
  args: true,
  execute(Discord, message, args) {
    if (typeof hamData != 'undefined') {
      newAlbum = {};
      newAlbum.title = args[0];
      newAlbum.playCount = 0;
      newAlbum.producer = message.author.username;
      newAlbum.timestamp = message.createdAt.toString();
      drawAlbumCover(newAlbum.title, Discord, message, args);
    }
  },
};