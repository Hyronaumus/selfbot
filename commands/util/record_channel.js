const [Discord, Settings, fs] = [require("discord.js"), require("../../settings.json"), require("fs")];

exports.main = function (Client, message, args) {
    if (!message.channel.type == "text") { return };
    let static_channels = JSON.parse(fs.readFileSync("databases/static_channels.json", "utf8"));
    if (!static_channels[message.member.guild.id]) {
        static_channels[message.member.guild.id] = {};
    }

    static_channels[message.member.guild.id][args[0]] = message.channel.id;
    fs.writeFile("databases/static_channels.json", JSON.stringify(static_channels), function (e) {
        console.log(e);
    });
    try {
        let embed = new Discord.RichEmbed()
            .setTitle("Type: Recorded Channel")
            .setDescription(`Recorded Channel: **${message.channel.name}** in guild **${message.member.guild.name}** as **${args[0]}**.`)
            .setFooter("Utility")
            .setTimestamp()
            .setColor("RED");

        Client.channels.find("id", static_channels[Settings.CommandCenter]["bot_feedback"]).send({ embed });
    } catch (e) { console.log(e) };

}

exports.help = {
    args: true,
    category: "util",
    name: "record_channel",
    description: "Records information about channel and stores it in a JSON file. For internal use only.",
    expected: "<prefix>util record_channel <name>?output=Successfully recorded channel as <name>.",
    example: ",util record_channel command_center"
}