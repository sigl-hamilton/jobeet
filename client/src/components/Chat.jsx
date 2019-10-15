import React, { Component } from "react";
import api from "../api";
import Container from "react-bootstrap/Container";
import io from "socket.io-client";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userFrom: this.props.userFrom,
            userTo: this.props.userTo,
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { name, description, user } = this.state;
        const jobLabels = this.state.selectedLabels.map(label => { return label.data });
        const payload = { name: name, description: description, labels: jobLabels, author: user };

        api.addMessage(payload).then(res => {});
    };

    render() {
        return (
            <Container>

            </Container>
        );
    };
}
export default Chat;