const [Discord, urban] = [require("discord.js"), require("urban-dictionary")];

exports.main = function (Client, message, args) {

    if (args[0] == "random" || !args[0]) {
        urban.random(function (error, entry) {
            if (error) {
                console.log(error);
            } else {
                message.delete().catch();
                let embed = new Discord.RichEmbed()
                    .addField("Word:", entry.word, true)
                    .addField("Word definition:", entry.definition.substring(0, 800), true)
                    .addField("Word example:", entry.example.substring(0, 800), true)
                    .setColor("BLUE");
                
                    message.channel.send({ embed });
            }
        })
    } else if (args[0] == "term") {
        args.shift();
        args = args.join(" ");

        urban.term(args, function (error, entries) {
            if (error) {
                console.log(error);
            } else {
                message.delete().catch();
                
                let embed = new Discord.RichEmbed()
                .addField("Word:", entries[0].word, true)
                .addField("Word definition:", entries[0].definition.substring(0, 800), true)
                .addField("Word example:", entries[0].example.substring(0, 800), true)
                .setColor("BLUE");
            
                message.channel.send({ embed });
            }
        })
    }
}

exports.help = {
    args: false,
    category: "fun",
    name: "urban",
    description: "Attempts to retrieve a definition from urban-dictionary.",
    expected: "<prefix>fun <alias> <arg0:random||term> <term>?output=(EMBED)<definition>",
    example: ",fun urban random || ,fun urban term post nut",
    aliases: ["ud"]
  }