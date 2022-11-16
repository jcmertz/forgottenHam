#!/usr/bin/env node
const fs = require('fs');
const Discord = require('discord.js');

var CronJob = require('cron').CronJob;
const {
  prefix,
  token,
  database,
  backupDatabase
} = require('./config.json');
rawData = fs.readFileSync(database);
hamData=JSON.parse(rawData);
const client = new Discord.Client({
	intents: [
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.MessageContent,
	],
});
client.commands = new Discord.Collection();


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Ready!');

  var backup = new CronJob('0,15,30,45 * * * *', function(){
    // convert JSON object to a string
    const data = JSON.stringify(hamData)

    // write JSON string to a file
    fs.writeFile(backupDatabase, data, err => {
      if (err) {
        throw err
      }
      console.log('Data File Backed Up.')
    })
  }, null, true, 'America/Chicago');
  backup.start();
});

client.on('messageCreate', message => {
  //console.log(message.content);
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ (.+)/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  }
  try {
    command.execute(Discord, message, args);
    success = true;
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }

});

client.login(process.env.BOT_TOKEN);