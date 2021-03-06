import React, { Component } from "react";
import api from "../api";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class CompanyInsert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.location.state.user,
            name: '',
            description:'',
            logo: '',
            recruiters: [],
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const payload = {name: this.state.name, description:this.state.description, recruiters: [this.state.user]};
        api.insertCompany(payload).then(res => {
            window.alert(`Company Created`);
            this.props.history.push('/company/list');
        })
    };

    render() {
        const { errors } = this.state;
        return (
            <Container>
                <h1>Create Company</h1>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Company Name"
                                onChange={this.onChange}
                                value={this.state.name}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                placeholder="Description of the company"
                                onChange={this.onChange}
                                value={this.state.description}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="logo">
                            <Form.Label>Logo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Logo path"
                                onChange={this.onChange}
                                value={this.state.logo}
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
export default CompanyInsert;