///////////////////////////////////////////////////////////////
//                 Bot created by Sso_A !                    //
//                Mon discord : Sso_A#8588                   //
///////////////////////////////////////////////////////////////
const Discord = require('discord.js')
const botconfig = require('./botconfig.json')
const ytdl = require("ytdl-core");
const fs = require('fs');
const active = new Map();
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) =>{
  if(err) console.log(err);
  var jsFiles = files.filter(f => f.split('.').pop() === 'js');
  if(jsFiles.length <= 0){
    console.log('Aucune commande a chargée(s)')
    return;
  }
  jsFiles.forEach((f, i) =>{
    var fileGet = require(`./commands/${f}`);
    console.log(`La commande ${f} est chargée`);
    bot.commands.set(fileGet.help.name, fileGet)
  })
})

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));

  var option = {

   active: active

  }

  if(commandfile) commandfile.run(bot,message,args, option);
});

bot.login("NjA0NzUwMTUwNTIyNTAzMTY4.XUNPyQ.lqdaFokyzQH_V7GISehiCqILrM4");
