import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Home from "./pages/Home";
//import Home from "./pages/Home";
//import ChatStats from "./pages/ChatStats";
//import Trivia from "./pages/Trivia";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Home />
      </div>
    </Router>

  );
}

export default App;