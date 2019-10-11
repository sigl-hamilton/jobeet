import React, { Component } from "react";
import api from "../api";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class CandidateUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const payload = {name : this.state.name};
        api.insertLabel(payload).then(res => {
            window.alert(`Label Created`);
            this.props.history.push('/label/list');
        })
    };

    render() {
        const { errors } = this.state;
        return (
            <Container>
                <h1>Create Label</h1>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="email">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                placeholder="Technical skills, Softskills"
                                onChange={this.onChange}
                                value={this.state.name}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" onClick={this.onSubmit}>
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    };
};
export default CandidateUpdate;