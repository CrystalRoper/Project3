import axios from "axios";

export default {  
  getAllChat: function() {
    console.log("got here");
    return axios.get("/api/chat");
  },
  getAllQuestions: function() {
    console.log("got here");
    return axios.get("/api/questions");
  }
};
