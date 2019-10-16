import React, { Component } from 'react'
import api from '../api'

import 'react-table/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container";
import Chat from "../components/Chat";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import io from "socket.io-client";

class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: this.props.location.state.job,
            userFrom: null,
            userTo: null,
            chat: null,
            isLoading: true,
            message: '',
        };

        this.socket = io('localhost:3000');

        this.socket.on('RECEIVE_MESSAGE', (payload) => {
            this.setState( {chat: payload, isLoading: false, message: ''});
        });

        this.sendMessage = e => {
            e.preventDefault();
            this.setState({ isLoading: true });

            const { chat, userFrom, message } = this.state;
            const payload = { user: userFrom, message: message };
            api.addMessage(chat._id, payload).then(res => {
                const payload = { job: this.state.job, userFrom: this.state.userFrom, userTo: this.state.userTo };
                api.getChatByJob(payload).then( chat => {
                    this.socket.emit('SEND_MESSAGE', chat.data.data);
                }).catch(error => {});
            });
        };
    }


    componentDidMount = async () => {
        this.setState({ isLoading: true });
        await api.getUserById(this.props.match.params.idFrom).then( userFrom => {
            this.setState({ userFrom: userFrom.data.data });
        }).catch(error => { console.log('Cannot get UserFrom : ' + error) });

        await api.getUserById(this.props.match.params.idTo).then( userTo => {
            this.setState({ userTo: userTo.data.data });
        }).catch(error => { console.log('Cannot get UserTo : ' + error) });


        const payload = { job: this.state.job, userFrom: this.state.userFrom, userTo: this.state.userTo };
        await api.getChatByJob(payload).then( chat => {
            this.setState({ chat : chat.data.data });
        }).catch(error => {});

        if (!this.state.chat) {
            await api.insertChat(payload).then( chat => {
               this.setState({ chat : chat.data.data })
            });
        }
        this.setState({ isLoading: false });
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    ChatLine = () => {}

    render() {
        if (this.state.isLoading) {
            return (<Container/>)
        }
        const discussion = this.state.chat ?
            this.state.chat.messages.map(mes => {
                if (this.state.userFrom._id === mes.user) {
                    return <div style={{textAlign:'right'}}><Badge variant="dark">{mes.message}</Badge></div>
                } else {
                    return <div style={{textAlign:'left'}}><Badge variant="light">{mes.message}</Badge></div>
                }
            })
            : '';

        return (
            <Container>
                <h1>Chatting with {this.state.userTo.firstname}</h1>
                <Row style={{height: '280px'}}>
                </Row>
                    {discussion}
                <Row>
                    <Col>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="message">
                                    <Form.Control
                                        as="textarea" rows="3"
                                        placeholder="Type your text"
                                        onChange={this.onChange}
                                        value={this.state.message}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Button variant="dark" onClick={this.sendMessage}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ChatPage
