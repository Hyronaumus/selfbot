const [Discord, superagent] = [require("discord.js"), require("superagent")];

exports.main = function (Client, message, args) {
  let [category_u] = [args[0] && args[0] || "Any"]
  
  let category = category_u.substring(0, 1).toUpperCase() + category_u.substring(1);
  superagent.get(`https://sv443.net/jokeapi/category/${category}`).query().end(function(error, result) {
    if (error) { console.log(error) }
    if (!error || result.status == 200) {
      let joke = result.body.type == "twopart" && `${result.body.setup} ${result.body.delivery}` || `${result.body.joke}`;
      let embed = new Discord.RichEmbed()
      .addField(result.body.type == "twopart" && result.body.setup || "Joke", result.body.type == "twopart" && result.body.delivery || result.body.joke, true)
      .setColor("BLUE");
      
      message.channel.send({embed});
      message.delete().catch();
      console.log(result.body);
    }
  })
  

};