const [Discord, superagent, Numbers, Arrays] = [require("discord.js"), require("superagent"), require("../../modules/numbers.js"), require("../../modules/arrays.js")];

let [seen, def, after] = [[], `www.reddit.com/r/4chan.json?limit=100`, false];

let post_count = function (rsub) {
  let count = 100;
  const match = new RegExp(`(${rsub}*?_)`)
  for (let i in seen) {
    if (match.exec(seen[i])) {
      count++;
    }
  }
  return count;
}

exports.main = function (Client, message, args) {
  let rsub = args[0] && args[0] || "4chan";
  let saget;
  
  if (post_count(rsub) < 100) {
      saget = def;
  } else if (post_count(rsub) >= 100) {
      try {
            superagent.get(def).query().end(function (e, r) {
            saget = `${def}?after=${r.body.data.after}`;
            def = saget;
            console.log(def);
              console.log(r.body.data.after);
            after = true
          })
      } catch (e) { console.log(e) }
  }
  try {
    superagent.get(`www.reddit.com/r/${rsub}.json?limit=100`).query().end(function (error, result) {
      if (error) { console.log(error) }
      let post = result.body.data.children[Numbers.returnRandomInteger(0, result.body.data.children.length)].data;
      if ((!error || result.status == 200) && (!Arrays.findInArray(seen, `${rsub}_${post.name}`))) {
        seen.push(`${rsub}_${post.name}`);
        console.log(seen);
        console.log(post_count(rsub));
        message.delete().catch();
        message.channel.send(result.body.data.children[Numbers.returnRandomInteger(0, result.body.data.children.length)].data.url);
        console.log(post.url);

      }
    })
  } catch (e) { console.log(e) }
};