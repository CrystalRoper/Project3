const env = require("dotenv").config();
const chatbot = require("./server-code/chatbot")
const express = require("express");
const mongoose = require("mongoose");
const serverRoutes = require("./server-code/routes/api/index");
const app = express();
const PORT = process.env.PORT || 8080;
const Questions = require("./server-code/models/triviaQuestions");
const Chat = require("./server-code/models/chatMessages");
const data = require("./server-code/data/trivia-questions");

serverRoutes(app, Chat, Questions);

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
    console.log("Starting chatbot");
    chatbot.connect(Chat);
});

Questions.create(data, function(errors, insertedQuestion){
    if (errors) {
        return console.error(errors);
    } else {
        console.log(insertedQuestion);
    }
});





// Questions.insertMany(data)
//     .then(function (err, dbQuestions) {
//         // If saved successfully, print the new Questions document to the console
//         console.log(dbQuestions);
//     })
//     .catch(function (err) {
//         // If an error occurs, log the error message
//         console.log(err.message);
//     });