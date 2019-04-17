exports.main = function (Client, message, args) {
    args = args.join("+");
    message.delete().catch();
    message.channel.send(`http://lmgtfy.com/?q=${args}`);
}

exports.help = {
    args: true,
    category: "fun",
    name: "lg",
    description: "Asks Google a question for you",
    expected: "<prefix>fun <alias> <question>?output=(URL)<link>",
    example: ",fun lg what are common symptoms of manic-depressant disorder",
    aliases: ["lmgtfy", "google"]
}