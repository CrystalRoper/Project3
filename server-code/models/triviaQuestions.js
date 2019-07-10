var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const mongoURI = process.env.MONGODB_URI || "mongodb://heroku_32vt9091:ju29dgf3cektb01lom1ma316vg@ds241977.mlab.com:41977/heroku_32vt9091";

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var QuestionsSchema = new Schema({
    questionNum: {
        type: Number,
    },
    question: {
        type: String,
    },
    a1: {
        type: String
    },
    a2: {
        type: String
    },
    a3: {
        type: String
    },
    a4: {
        type: String
    }
});

var Questions = mongoose.model("Questions", QuestionsSchema);

mongoose.connect(mongoURI, { useNewUrlParser: true });

module.exports = Questions;