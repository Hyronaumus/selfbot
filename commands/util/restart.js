const [Discord, Settings] = [require("discord.js"), require("../../settings.json")];

exports.main = function (Client, message, args) {
  let pre = Date.now();
  let embed = new Discord.RichEmbed()
    .setTitle("Restarting")
    .setDescription("Restarting")
    .setColor("RED");
  message.channel.send({ embed });
    Client.destroy().then(function(){
        Client.login(Settings.Token);
        
      setTimeout(function() {
        embed = new Discord.RichEmbed()
          .setTitle("Restarted")
          .setDescription(`Restarted in ${2000 + (Date.now() - pre)}ms.`)
          .setColor("GREEN")
      
        message.channel.send({ embed });
      }, 2000);
    })
}