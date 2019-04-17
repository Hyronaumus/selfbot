exports.main = function (Client, message, args) {
    message.channel.send(`API Latency is ${Math.round(Client.ping)}ms.`)
    message.delete().catch();
}

exports.help = {
    args: false,
    category: "util",
    name: "ping",
    description: "Pings Discord API and returns ping in miliseconds",
    expected: "<prefix>util ping?output=API latency is <ms>ms.",
    example: ",util ping"
}