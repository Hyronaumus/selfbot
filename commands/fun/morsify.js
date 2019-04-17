const morse = {
    "A" : ".- ",
    "B" : "-... ",
    "C" : "-.-. ",
    "D" : "-.. ",
    "E" : ". ",
    "F" : "..-. ",
    "G" : "--. ",
    "H" : ".... ",
    "I" : ".. ",
    "J" : ".--- ",
    "K" : "-.- ",
    "L" : ".-.. ",
    "M" : "-- ",
    "N" : "-. ",
    "O" : "--- ",
    "P" : ".--. ",
    "Q" : "--.- ",
    "R" : ".-. ",
    "S" : "... ",
    "T" : "- ",
    "U" : "..- ",
    "V" : "...- ",
    "W" : ".-- ",
    "X" : "-..- ",
    "Y" : "-.-- ",
    "Z" : "--.. ",
    " " : "/ ",
    "0" : "----- ",
    "1" : ".---- ",
    "2" : "..--- ",
    "3" : "...-- ",
    "4" : "....- ",
    "5" : "..... ",
    "6" : "-.... ",
    "7" : "--... ",
    "8" : "---.. ",
    "9" : "----. ",
    "." : ".-.-.- ",
    "," : "--..-- ",
    ":" : "---... ",
    "?" : "..--.. ",
    "'" : ".----. ",
    "-" : "-....- ",
    "/" : "-..-. ",
    "\"\"" : ".-..-. ",
    "@" : ".--.-. ",
    "=" : "-...- ",
    "!" : "---. "
};

const reverseMorse = {
    ".- " : "a",
    "-... " : "b",
    "-.-. " : "c",
    "-.. " : "d",
    ". " : "e",
    "..-. " : "f",
    "--. " : "g",
    ".... " : "h",
    ".. " : "i",
    ".--- " : "j",
    "-.- " : "k",
    ".-.. " : "l",
    "-- " : "m",
    "-." : "n",
    "--- " : "o",
    ".--. " : "p",
    "--.- " : "q",
    ".-. " : "r",
    "... " : "s",
    "- " : "t",
    "..- " : "u",
    "...- " : "v",
    ".-- " : "w",
    "-..- " : "x",
    "-.-- " : "y",
    "--.. " : "z",
    "/ " : " ",
    "----- " : "0",
    ".---- " : "1",
    "..--- " : "2",
    "...-- " : "3",
    "....- " : "4",
    "..... " : "5",
    "-.... " : "6",
    "--... " : "7",
    "---.. " : "8",
    "----. " : "9",
    ".-.-.- " : ".",
    "--..-- " : ",",
    "---... " : ":",
    "..--.. " : "?",
    ".----. " : "'",
    "-....- " : "-",
    "-..-. " : "/",
    ".-..-. " : "\"\"",
    ".--.-. " : "@",
    "-...- " : "=",
    "---. " : "!"
}

exports.main = function (Client, message, args) {
    if (args[0] == "to") {
      args.shift();
      let words = args.join(" ").toUpperCase();
      console.log(words);
      let returnString = "";
      for (let i = 0; i < words.length; i++) {
          returnString = `${returnString}${morse[words[i]]}`
      }
      message.delete().catch();
      message.channel.send(returnString);
  } else if (args[0] == "from") {
    args.shift();
    let words = args.join(" ").toUpperCase();
    let returnString = "";
    for (let i = 0; i < args.length; i++) {
      console.log(args[i]);
          returnString = `${returnString}${reverseMorse[args[i]+" "]}`;
    }
    message.delete().catch();
    message.channel.send(returnString);
}
}

exports.help = {
    args: true,
    category: "fun",
    name: "morsify",
    description: "Converts text to morse code in text form and vice versa.",
    expected: "<prefix>fun <alias> <to:1||from:2>?output=<1:morse-code>||<2:text>",
    example: ",fun morsify to knives are cool || ,fun morsify from -.- -. .. ...- . ... / .- .-. . / -.-. --- --- .-.."
}