const Discord = require("discord.js");

exports.main = function (Client, message, args) {
    const commands = Client.commands;

    if (!args[0]) {
        console.log("a")

        let allCommands = {
            title: "Commands",
            description: "Here's a brief list of my commands",
            fields: [],
            footer: { text: "Help" },
            color: 3447003
        };

        commands.map(function (c) {
            let toPush = {};
            toPush.name = `**${c.help.category}:** ${c.help.name}`;
            toPush.value = c.help.description;
            toPush.inline = true;
            allCommands.fields.push(toPush);
        })
        console.log(allCommands);
        message.channel.send({ embed: allCommands });
    } else if (args[0]) {
        const mod = Client.commands.get(args[0]) || Client.commands.find(c => c.help && c.help.aliases && c.help.aliases.includes(args[0]));
        if (!mod) return;

        let embed = new Discord.RichEmbed()
            .setTitle(`${mod.help.category}: ${mod.help.name}`)
            .addField("Description:", mod.help.description, true)
            .addField("Expected use:", mod.help.expected, true)
            .addField("Example use:", mod.help.example, true)
            .addField("Aliases:", mod.help.aliases && mod.help.aliases.join(", ") || "No aliases", true)
            .setColor("BLUE");

        message.channel.send({embed});
    }
}

exports.help = {
    args: false,
    category: "util",
    name: "help",
    description: "Provides information about commands",
    expected: "<prefix>util help <command>?output=commands help||command help",
    example: ",util help || ,util help run"
}