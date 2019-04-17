exports.main = function (Client, message, args) {
    try {
        if (message.mentions.members.first()) {
            message.channel.send(message.mentions.members.first().user.avatarURL);
            message.delete().catch();
        } else if (args[0] == "guild") {
            message.channel.send(message.channel.guild.iconURL);
            message.delete().catch();
        }

    } catch (e) { console.log(e) }
}

exports.help = {
    args: true,
    category: "chat",
    name: "avatar",
    description: "Returns the avatar of mentioned user.",
    expected: "<prefix>chat <alias> <arg0:mention>?output=(IMAGE)<avatar>",
    example: ",chat avatar @myliverwillhandlewhatmyheartcant",
    aliases: ["pfp", "pic"]
}