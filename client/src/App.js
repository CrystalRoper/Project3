import React from 'react';
import './App.css';
import Home from "./pages/Home";
import ChatStats from "./pages/ChatStats";
import Trivia from "./pages/Trivia";

function App() {
  return (
    <div>Test</div>
    <Router>
      <div>
        <Navbar />
        <Wrapper>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/stats" component={ChatStats} />
          <Route exact path="/trivia" component={Trivia} />
        </Wrapper>
        <Footer />
      </div>
    </Router>

  );
}

export default App;