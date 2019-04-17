const Discord = require("discord.js");

exports.main = function (Client, message, args) {
    let quiz = require('../../databases/trivia.json');
    let item = quiz[Math.floor(Math.random() * quiz.length)];
    let filter = response => {
        return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
    };
    let init = Date.now();

    let embed = new Discord.RichEmbed()
        .setTitle(item.question)
        .setFooter("Trivia")
        .setColor("GREEN");

    message.channel.send({ embed }).then(() => {
        message.channel.awaitMessages(filter, { maxMatches: 1, time: item.time * 1000, errors: ['time'] })
            .then(collected => {

                let reward = Math.floor(item.points * ((item.time - ((Date.now() - init) / 1000)) / item.time));
                let embed = new Discord.RichEmbed()
                    .setTitle(`${collected.first().author.username}#${collected.first().author.discriminator} got the correct answer! ${reward} points!`)
                    .setFooter("Trivia")
                    .setColor("GREEN");
                message.channel.send({ embed });
            })
            .catch(collected => {
                let embed = new Discord.RichEmbed()
                    .setTitle("Looks like nobody got the answer this time.")
                    .setFooter("Trivia")
                    .setColor("GREEN");
                message.channel.send({ embed });
            });
    });
}

exports.help = {
    args: false,
    category: "fun",
    name: "triva",
    description: "Asks a trivia question and rewards points",
    expected: "<prefix>fun <alias>?output=<trivia question>?THENresponse=<user> answered correctly! <points>points!?TIMEOUToutput=Looks like nobody got the answer this time.",
    example: ",fun trivia",
    aliases: ["quiz"]
  }