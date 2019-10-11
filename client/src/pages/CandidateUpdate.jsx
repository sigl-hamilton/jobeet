import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class CandidateUpdate extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        const userProps = this.props.location.state.user;
        this.state = {
            user: userProps,
            email: userProps.email,
            firstname: userProps.firstname,
            lastname: userProps.lastname,
            description: userProps.description,
            job_status: userProps.job_status,
            user_type: userProps.user_type,
            errors: {}
        };
    }
    customPlaceholder = (placeholderType) => {
        if (!this.state.user[placeholderType])
            return "Enter " + placeholderType;
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            description: this.state.description,
            job_status: this.state.job_status,
            user_type: this.state.user_type
        };
        api.updateUserById(this.state.user._id, userData).then(res => {
            window.alert(`Candidate Updated`);
            this.props.history.push('/user/' + this.state.user._id);
        })
    };

    render() {
        const { errors } = this.state;
        return (
            <Container>
                <h1>Update Candidate</h1>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder={this.customPlaceholder("email")}
                                onChange={this.onChange}
                                value={this.state.email}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="firstname">
                            <Form.Label>Firstname</Form.Label>
                            <Form.Control
                                placeholder={this.customPlaceholder("firstname")}
                                onChange={this.onChange}
                                value={this.state.firstname}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="lastname">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control
                                placeholder={this.customPlaceholder("lastname")}
                                onChange={this.onChange}
                                value={this.state.lastname}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="address1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>

                    <Form.Group controlId="address2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor" />
                    </Form.Group>

                    <Form.Group controlId="job_status">
                        <Form.Label>Your current status</Form.Label>
                        <Form.Control as="select">
                            <option value="ACTIVE">Actively looking for a job</option>
                            <option value="PASSIVE">Looking for a job</option>
                            <option value="INACTIVE">Don't looking for a job</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={this.onChange} value={this.state.description}/>
                    </Form.Group>

                    <Button variant="dark" onClick={this.onSubmit}>
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    };
};
export default CandidateUpdate;