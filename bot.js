const tmi = require('tmi.js');
const express = require('express');
const router = express.Router()

var count = 0
var mediaRequests = []
//const hostname = 'https://software-engineering-devops-case.azurewebsites.net';


app = express();



//Everytime you change the value, send it to all the clients connected using:


app.use('/', router);

app.use(express.static('public'));

app.get("/requests", function(req,res) {
  res.send(mediaRequests)
})

app.listen(process.env.PORT)

const opts = {
    identity: {
      username: process.env.BOT_USERNAME,
      password: process.env.OAUTH_TOKEN
    },
    channels: [
      process.env.CHANNEL_NAME
    ]
  };


  
 

 const client = new tmi.client(opts);

  // Register our event handlers (defined below)
  client.on('message', onMessageHandler);

  // Connect to Twitch:
  client.connect();
 
  // Called every time a message comes in
  function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot
    // Remove whitespace from chat message
   console.log(context)
    const commandName = msg.trim();
    if(commandName == "#sus"){
      var random = Math.floor(Math.random()*101)
        if(context.username == "mrjiroxd" || context.username == "itstraptor") {
          client.say(target, `@${context.username} ` + `You are 100% SUS`)
        } else {
          client.say(target, `@${context.username} ` + `You are ${random}% SUS`)
        }
    } 
    if(commandName == "#gd") {
      count ++
      client.say(target, `Vinny said goddamit ${count} times`);
    }

    if(context["custom-reward-id"] === "1") {
      var link = commandName.substring(4)
      if(link.startsWith("https://www.youtube.com/watch?v=") || link.startsWith("https://m.youtube.com/watch?v=") ||  link.startsWith("https://youtu.be/")) {
        var exists = linkAlreadyExists(link)
        if(exists) {
          client.say(target, `@${context.username} ` + `your video is already in the queue`)
        } else {
          mediaRequests.push(link)
          client.say(target, `@${context.username} ` + `your video has been added to the queue`)
        }
      } else {
        client.say(target, `@${context.username} ` + `your video link is not in youtube format you naughty boy`)
      }
    
    }
   
    if(commandName.startsWith("#") && !commandName.startsWith("#mr") && commandName != "#gd" && commandName != "#sus"){
      client.say(
      target,`@${context.username} ` +  `Unknown command: ` + commandName + ` => Please use a different command. available commands: #gd , !discord , #sus`);
    } 
  }

  function linkAlreadyExists(link) {
    if(link.startsWith("https://www.youtube.com/watch?v=")) {
      var watchV = link.substring(link.indexOf("/watch?v=") + 9)
      for(ytLink of mediaRequests) {
        if(ytLink.startsWith("https://www.youtube.com/watch?v=")){
          var existingWatchV = ytLink.substring(ytLink.indexOf("/watch?v=") + 9)
          if (watchV == existingWatchV) {
            return true
          }
        }
        if(ytLink.startsWith("https://m.youtube.com/watch?v=")) {
          var existingWatchV = ytLink.substring(ytLink.indexOf("/watch?v=") + 9)
          if (watchV == existingWatchV) {
            return true
          }
        }
        if(ytLink.startsWith("https://youtu.be/")) {
          var existingWatchV = ytLink.substring(ytLink.indexOf("youtu.be/") + 9)
          if (watchV == existingWatchV) {
            return true
          }
        }
      }
    }
    if(link.startsWith("https://m.youtube.com/watch?v=")) {
      var watchV = link.substring(link.indexOf("/watch?v=") + 9)
      for(ytLink of mediaRequests) {
        if(ytLink.startsWith("https://www.youtube.com/watch?v=")){
          var existingWatchV = ytLink.substring(ytLink.indexOf("/watch?v=") + 9)
          if (watchV == existingWatchV) {
            return true
          }
        }
        if(ytLink.startsWith("https://m.youtube.com/watch?v=")) {
          var existingWatchV = ytLink.substring(ytLink.indexOf("/watch?v=") + 9)
          if (watchV == existingWatchV) {
            return true
          }
        }
        if(ytLink.startsWith("https://youtu.be/")) {
          var existingWatchV = ytLink.substring(ytLink.indexOf("youtu.be/") + 9)
          if (watchV == existingWatchV) {
            return true
          }
        }
      }
    }
    if(link.startsWith("https://youtu.be/")) {
      var watchV = link.substring(link.indexOf("youtu.be/") + 9)
      for(ytLink of mediaRequests) {
        if(ytLink.startsWith("https://www.youtube.com/watch?v=")){
          var existingWatchV = ytLink.substring(ytLink.indexOf("/watch?v=") + 9)
          if (watchV == existingWatchV) {
            return true
          }
        }
        if(ytLink.startsWith("https://m.youtube.com/watch?v=")) {
          var existingWatchV = ytLink.substring(ytLink.indexOf("/watch?v=") + 9)
          if (watchV == existingWatchV) {
            return true
          }
        }
        if(ytLink.startsWith("https://youtu.be/")) {
          var existingWatchV = ytLink.substring(ytLink.indexOf("youtu.be/") + 9)
          if (watchV == existingWatchV) {
            return true
          }
        }
      }
    }
    return false
  }



