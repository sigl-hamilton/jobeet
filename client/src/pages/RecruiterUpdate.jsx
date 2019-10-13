import React, { Component } from "react";
import api from "../api";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

class RecruiterUpdate extends Component {
    constructor(props) {
        super(props);
        const userProps = this.props.location.state.user;

        const companyProp = userProps.company ?
            { label: userProps.company.name, value: userProps.company._id, data: userProps.company }
            : null;

        this.state = {
            user: userProps,
            email: userProps.email,
            firstname: userProps.firstname,
            lastname: userProps.lastname,
            phone: userProps.phone,
            description: userProps.description,
            user_type: userProps.user_type,
            company: companyProp,
            errors: {},
            optionCompanies: {},
        };
    };

    customPlaceholder = (placeholderType) => {
        if (!this.state.user[placeholderType])
            return "Enter " + placeholderType;
    };

    formatOptionCompanies = companies => {
        return companies.map(
            company => {
                const companyFormated = {};
                companyFormated.label = company.name;
                companyFormated.value = company._id;
                companyFormated.data = company;
                return companyFormated;
            }
        );
    };

    componentDidMount = async () => {
        await api.getCompanies().then(companies => {
            const optionCompanies = this.formatOptionCompanies(companies.data.data);
            this.setState({optionCompanies : optionCompanies});
        });
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleSelectChange = company => {
        this.setState({ company });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone,
            description: this.state.description,
            user_type: this.state.user_type,
            company: this.state.company ? this.state.company.data : null,
        };
        api.updateUserById(this.state.user._id, userData).then(res => {
            window.alert(`Recruiter Updated`);
            this.props.history.push({
                pathname: '/user/' + this.state.user._id,
                state: {'user_type': this.state.user_type}
            });
        })
    };

    render() {
        const { errors } = this.state;
        return (
            <Container>
                <h1>Update Recruiter</h1>
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
                        <Form.Group as={Col} controlId="password">
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

                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <PhoneInput
                                placeholder="Enter phone number"
                                value={ this.state.phone }
                                onChange={ phone => this.setState({ phone })  } />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={this.onChange} value={this.state.description}/>
                    </Form.Group>

                    <Form.Group controlId="labels">
                        <Form.Label>Company</Form.Label>
                        <Select
                            closeMenuOnSelect={false}
                            options={this.state.optionCompanies}
                            onChange={this.handleSelectChange}
                            value={this.state.company}
                        />
                    </Form.Group>
                    <Button variant="dark" onClick={this.onSubmit}>
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    };
};
export default RecruiterUpdate;