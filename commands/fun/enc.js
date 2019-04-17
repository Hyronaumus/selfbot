/* TODO
    + Add string checking of literals and escape them somehow
*/

let returnUTFArray = function (s) {
    let UTFArray = [];

    for (let c of s) {
        UTFArray.push(c.charCodeAt(0));
    }

    return UTFArray;
};

let returnStringFromUTFArray = function (a) {
    let string = "";

    for (let c of a) {

        string = `${string}${c}`
    }

    return string;
};

// STRING function Encode ([STRING s], [STRING key])
let Encode = function (s, key) {
    let [stringArray, keyArray, newArray] = [returnUTFArray(s), returnUTFArray(key), []];

    for (let i = 0; i < stringArray.length; i++) {
        //writeln(`${i}: ${stringArray[i]} + ${keyArray[i%keyArray.length]} = ${stringArray[i] + keyArray[i%keyArray.length]}`);
        newArray.push(String.fromCharCode(`${stringArray[i] + keyArray[i % keyArray.length]}`));
    }

    return newArray.join('');
};

// STRING function Decode ([ARRAY cipher], [STRING key])
let Decode = function (cipher, key) {
    let [keyArray, newArray] = [returnUTFArray(key), []];
    cipher = cipher.split('');

    for (let i = 0; i < cipher.length; i++) {
        cipher[i] = cipher[i].charCodeAt(0);
    }

    for (let i = 0; i < cipher.length; i++) {
        //writeln(`${i}: ${cipher[i]} - ${keyArray[i%keyArray.length]} = ${cipher[i] - keyArray[i%keyArray.length]}`)
        newArray.push(`${cipher[i] - keyArray[i % keyArray.length]}`);
    }

    for (let i = 0; i < newArray.length; i++) {
        newArray[i] = String.fromCharCode(newArray[i]);
    }

    return newArray.join('');
}
let enc = Encode("this is a test cipher", "grey five nine");
let dec = Decode(enc, "grey five nine");

exports.main = function(Client, message, args) {
    if (args[0] == "to") {
        args.shift();
        let [key, text] = [args.shift(), args.join(" ")];
        message.channel.send(Encode(text, key));
        message.delete().catch();
    } else if (args[0] == "from") {
        args.shift();
        let [key, cipher] = [args.shift(), args.join(" ")];
        message.channel.send(Decode(cipher, key));
        message.delete().catch();
    }
}

exports.help = {
    args: true,
    category: "fun",
    name: "enc",
    description: "Ciphers or deciphers text with a key.",
    expected: "<prefix>fun enc <to:1||from:2>?output=<1:cipher text>||<2:text>",
    example: ",fun enc to KEY i like catalina a lot || ,fun enc KEY ´eÅ´°¾k¨º¿¦Å´³º"
}