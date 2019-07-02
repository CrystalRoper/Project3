const env = require("dotenv").config();
const chatbot = require("./client/src/components/chatbot")
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./client/src/App")
const app = express();
const PORT = process.env.PORT || 8080;

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://heroku_32vt9091:ju29dgf3cektb01lom1ma316vg@ds241977.mlab.com:41977/heroku_32vt9091");

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
    console.log("Starting chatbot");
    var bot = chatbot();
    bot.connect();
});