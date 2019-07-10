const tmi = require('tmi.js');


var bot = {
    client: null,

    connect: function (chatMessages) {
        bot.chat = chatMessages;
        bot.client = new tmi.client({
            identity: { username: process.env.BOT_USERNAME, password: process.env.OAUTH_TOKEN },
            channels: [process.env.CHANNEL_NAME, "goodlilsquee"]
        });

        bot.client.on('connected', bot.onConnected);
        bot.client.on('message', bot.onMessage);
        return bot.client.connect();
    },

    onConnected: function (addr, port) {
        console.log(`* Chatbot connected to ${addr}:${port}`);
    },

    onMessage: function (channelName, context, msg, isBot) {
        var isBroadcaster = context.badges && context.badges.broadcaster || false;

        var newRecord={
            username: context["display-name"],
            message: msg
        };

        bot.chat.create(newRecord, function(errors, insertedQuestion){
            if (errors) {
                return console.error(errors);
            } else {
                console.log(insertedQuestion);
            }
        });

        //console.log(channelName + "|" + context["display-name"] + "|" + msg);

        // db.twitchChatMessage.create({
        //     channelName: channelName,
        //     userId: context["user-id"],
        //     roomId: context["room-id"],
        //     posterDisplayName: context["display-name"],
        //     isDbdToolBot: isBot,
        //     isBroadcaster: isBroadcaster,
        //     isSubscriber: context.subscriber,
        //     isModerator: context.mod,
        //     message: msg
        // });
    }
};

module.exports = bot; 