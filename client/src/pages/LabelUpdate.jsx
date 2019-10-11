import React, { Component } from "react";
import api from "../api";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class LabelUpdate extends Component {
    constructor(props) {
        super(props);
        const labelProps = this.props.location.state.label;

        this.state = {
            id: labelProps._id,
            name: labelProps.name,
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const payload = {name : this.state.name};
        api.updateLabelById(this.state.id, payload).then(res => {
            window.alert(`Label Updated`);
            this.props.history.push('/label/list');
        })
    };

    render() {
        const { errors } = this.state;
        return (
            <Container>
                <h1>Update Label</h1>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Technical skills, Softskills"
                                onChange={this.onChange}
                                value={this.state.name}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Button variant="dark" onClick={this.onSubmit}>
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    };
};
export default LabelUpdate;