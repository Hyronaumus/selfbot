// TODO: Research regular expression to match title, desc. and color terms accurately and neatly.
// Command is, until then, useless and broken.

let [Discord] = [require("discord.js")];

exports.main = function (Client, message, args) {
  args.join(" ");
  console.log(args);
  let [title, description, color] =
     [new RegExp(`t:"(.*?)"`).exec(args)[1].replace(/(,)/g, ' ')  || "Title", 
      new RegExp(`d:"(.*?)"`).exec(args)[1].replace(/(,)/g, ' ') || "Description", 
      new RegExp(`c:"(.*?)"`).exec(args)[1].replace(/(,)/g, ' ') || "BLACK"];
  console.log(title)
  console.log(description);
  console.log(color);
  let embed = new Discord.RichEmbed()
    .setTitle(title)
    .setDescription(description)
    .setColor(color);
  //todo: delete let [title, ... and put into SET fields directly
  
  message.channel.send({embed});
  
  message.delete().catch();
}

exports.help = {
  args: true,
  category: "chat",
  name: "embed",
  description: "Creates and sends a simple embed message.",
  expected: "<prefix>chat embed <arg0:t:\"title\"><arg1:d:\"description\"><arg2:c:\"color\">?output=(EMBED)<embed>",
  example: ",chat embed t:\"Title\" d:\"Description\" c:\"Color\""
}