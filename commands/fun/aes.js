const [Discord, crypto] = [require("discord.js"), require("crypto")];

const def_enc_key = "5c1e8df8d745ca20161792a53e5a57fa";
const iv = process.env.SECRET;
const inv_key_len = new Discord.RichEmbed()
  .setTitle("Invalid Key Length")
  .setDescription("Key must be 32 bytes!")
  .setColor("RED")
  .setFooter("AES256-CBC");

exports.main = function (Client, message, args) {
  if (args[0] == "to") {
    let [enc_key, to_con] = [null, null];

    if (args[1] == "key") {
      if (Buffer.byteLength(args[2], "utf-8") == 32) {
        enc_key = args[2];
        to_con = args.slice(3).join(" ");
      } else {
        message.channel.send({ embed: inv_key_len });
        return;
      };
    } else {
      enc_key = def_enc_key;
      to_con = args.slice(1).join(" ");
    };

    let cipher = crypto.createCipheriv("aes-256-cbc", enc_key, iv);
    let encrypted = cipher.update(to_con, "utf-8", "base64");
    encrypted += cipher.final("base64");

    if (encrypted.length < 1000) {
      let embed = new Discord.RichEmbed()
        .setTitle("Text")
        .setDescription(encrypted)
        .setColor("BLUE")
        .setFooter("AES256-CBC");

      message.channel.send({ embed });
    } else {
      console.log(encrypted);
      let embed = new Discord.RichEmbed()
        .setTitle("Cipher too long!")
        .setDescription("The cipher was too long to send through Discord. See logs for text.")
        .setColor("RED")
        .setFooter("AES256-CBC");

      message.channel.send({ embed });
    }
    message.delete().then();
  } else if (args[0] == "from") {
    let [enc_key, to_con] = [null, null];

    if (args[1] == "key") {
      if (Buffer.byteLength(args[2], "utf-8") == 32) {
        enc_key = args[2];
        to_con = args.slice(3).join(" ");
      } else {
        message.channel.send({ embed: inv_key_len });
        return;
      };
    } else {
      enc_key = def_enc_key;
      to_con = args.slice(1).join(" ");
    };

    let text = crypto.createDecipheriv("aes-256-cbc", enc_key, iv);
    let decrypted = text.update(to_con, "base64", "utf-8");
    decrypted += text.final("utf-8");

    if (decrypted.length < 1000) {
      let embed = new Discord.RichEmbed()
        .setTitle("Text")
        .setDescription(decrypted)
        .setColor("BLUE")
        .setFooter("AES256-CBC");

      message.channel.send({ embed });
    } else {
      console.log(decrypted);
      let embed = new Discord.RichEmbed()
        .setTitle("Text too long!")
        .setDescription("The output text was too long to send through Discord. See logs for text.")
        .setColor("RED")
        .setFooter("AES256-CBC");

      message.channel.send({ embed });
    }
    message.delete().then();


  }
}

exports.help = {
  args: false,
  category: "misc",
  name: "aes",
  description: "Encrypts text with key or decrypts cipher in AES-256-CBC",
  expected: "<prefix>misc aes <to|from><arg1:isKey><!32bytes?arg1:stringKey><text|cipher>?output=<text|cipher>",
  example: ",misc aes to key 5c1e8df8d745ca20161792a53e5a57fa this is an encryption | ,misc aes to this is an encryption | ,misc aes from key 5c1e8df8d745ca20161792a53e5a57fa vq8adAdwP/bcNqVZUbY2oH6wrfyZ5nLbE5TMf5w0/KY= | ,misc aes from vq8adAdwP/bcNqVZUbY2oH6wrfyZ5nLbE5TMf5w0/KY="
}