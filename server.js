const env = require("dotenv").config();
const chatbot = require("./controllers/chatbot")
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
    console.log("Starting chatbot");
    var bot = chatbot();
    bot.connect();
});