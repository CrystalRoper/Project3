var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    username: String,
    message: String
});

var Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;