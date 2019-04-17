const [Str, fs] = [require("../../modules/string"), require("fs")];

exports.main = function (Client, message, args) {
    let [Settings, r] = [JSON.parse(fs.readFileSync("settings.json", "utf8"))];

    if (args[0] != null) { 
        r = Str.parseBoolean(args[0]);
    } else if (args[0] == null) {
        r = !Settings.LogMessages;
    };

    Settings.LogMessages = r;
    fs.writeFile("settings.json", JSON.stringify(Settings), function (e) {
        console.log(e); return;
    });
}

exports.help = {
    args: false,
    category: "util",
    name: "log",
    description: "Toggles/Sets internal logging service",
    expected: "<prefix>util log <boolean>",
    example: ",util log || ,util log <boolean>"
}