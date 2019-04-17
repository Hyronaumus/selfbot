const [fs, request, Numbers] = [require("fs"), require("request"), require("../../modules/numbers.js")];

exports.main = function (Client, message, args) {
    if (!message.member) { return };

    try {
        if (message.channel.nsfw == false) { return };
        
        request.get(`http://api.obutts.ru/butts/get/${Numbers.returnRandomInteger(7, 5999)}`, (error, response, body) => {
            if (error) { console.log (error); return };
            message.channel.send(`http://media.obutts.ru/butts_preview/${body.match(/\d+.jpg/g)}`);
        });
    } catch (e) { console.log(e) };
}

exports.help = {
    args: false,
    category: "nsfw",
    name: "ass",
    description: "Attempts to retrieve an image from obutts.ru",
    expected: "<prefix>nsfw ass?output=(image)",
    example: ",nsfw ass"
}