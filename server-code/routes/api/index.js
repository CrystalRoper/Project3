module.exports = function (app, chatDatabaseModel, questionsDatabaseModel) {
    app.use("/api/chat", function (req, res) {
        chatDatabaseModel.find({}, function (error, messages) { 
            if (error) console.error(error);
            res.json(messages);
        });
    });

    app.use("/api/questions", function (req, res) {
        questionsDatabaseModel.find({}, function (error, messages) { 
            if (error) console.error(error);
            res.json(messages);
        });
    });
};