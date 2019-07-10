import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/api";
import { List, ListItem } from "../components/List";

class Home extends Component {
    state = {
        chatMessages: [],
        triviaQuestions: []
    };

    componentDidMount() {
        this.refreshChatMessages();
        this.refreshTriviaQuestions();
    }

    refreshChatMessages = () => {
        API.getAllChat()
            .then(res => this.setState({ chatMessages: res.data }))
            .catch(err => console.log(err));
    };

    refreshTriviaQuestions = () => {
        API.getAllQuestions()
            .then(res => this.setState({ triviaQuestions: res.data }))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>Trivia</h1>
                            <div>
                                {this.state.triviaQuestions.length ? (
                                    <div>
                                        {this.state.triviaQuestions.map(triviaQuestion => (
                                            <div>
                                                <strong>{triviaQuestion.questionNum}</strong><br/>{triviaQuestion.question}<br/>{triviaQuestion.a1}<br/>{triviaQuestion.a2}<br/>{triviaQuestion.a3}<br/>{triviaQuestion.a4}
                                            </div>
                                        ))}
                                    </div>
                                ) : (<h3>No Results to Display</h3>)}
                            </div>
                        </Jumbotron>
                    </Col>
                    <Col size="md-6 sm-12">
                        <Jumbotron>
                            <h1>Chat</h1>
                            <List>
                                {this.state.chatMessages.length ? (
                                    <ListItem>
                                        {this.state.chatMessages.map(chatMessage => (
                                            <div>
                                                <strong>{chatMessage.username}</strong>: {chatMessage.message}
                                            </div>
                                        ))}
                                    </ListItem>
                                ) : (<h3>No Results to Display</h3>)}
                            </List>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        )
    }
}

// function Home() {
//     return (
//         <Container fluid>
//             <Row>
//                 <Col size="md-6">
//                     <Jumbotron>
//                         <h1>Simpsons Trivia</h1>
//                     </Jumbotron>
//                 </Col>
//                 <Col size="md-6 sm-12">
//                     <Jumbotron>
//                         <h1>Chat from channel {}</h1>
//                     </Jumbotron>
//                 </Col>
//             </Row>
//         </Container>
//     )
// }

export default Home;