exports.main = function (Client, message, args) {
    let amount = args[0] && Math.min(args[0], 100) || "1";
    amount++;
    message.channel.fetchMessages({ limit: amount })
        .then(function (messages) {
            messages.forEach(function(e) {
              if (e.author.id === Client.user.id) { 
                e.delete().catch(console.log);
              }
            })
        })
        .catch(console.error);
}

exports.help = {
  args: true,
  category: "util",
  name: "prune",
  description: "Deletes specified amount of messages",
  expected: "<prefix>util <alias> <amountToDelete>",
  example: ",util prune 5",
  aliases: ["bulkdelete", "delete"]
}