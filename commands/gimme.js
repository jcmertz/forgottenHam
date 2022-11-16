const weightedRandom = require('../helperModules/weightedRandom');
module.exports = {
  name: 'gimme',
  description: 'return a specific quote',
  async execute(Discord, message, args) {
    if (typeof cubes != 'undefined') {
      if (!args.length) {
        temp = weightedRandom.get(cubes);
        index = temp.index;
        cubes.lastCubeIndex = index;
        message.channel.send(temp.cube.quote);
      } else {
        var index = parseInt(args[0]);
        if (index < cubes.length) {
          cubes.lastCubeIndex = index;
          message.channel.send(cubes[index].quote);
        } else{
          message.channel.send("Cube number out of bounds")
        }
      }
    }
  },
};