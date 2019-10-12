import React, { Component } from "react";
import api from "../api";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

class CandidateUpdate extends Component {
    constructor(props) {
        super(props);
        const userProps = this.props.location.state.user;
        const userPropsLabels = userProps.labels ? this.formatOptionLabels(userProps.labels) : null;

        this.state = {
            user: userProps,
            email: userProps.email,
            firstname: userProps.firstname,
            lastname: userProps.lastname,
            phone: userProps.phone,
            description: userProps.description,
            job_status: userProps.job_status,
            user_type: userProps.user_type,
            errors: {},
            selectedLabels: userPropsLabels,
            optionLabels: {},
        };
    };

    customPlaceholder = (placeholderType) => {
        if (!this.state.user[placeholderType])
            return "Enter " + placeholderType;
    };

    formatOptionLabels = labels => {
        return labels.map(
            label => {
                const skill = {};
                skill.label = label.name;
                skill.value = label._id;
                skill.data = label;
                return skill;
            }
        );
    };

    componentDidMount = async () => {
        await api.getLabels().then( labels=> {
            const allOptionLabels = this.formatOptionLabels(labels.data.data);
            this.setState({optionLabels : allOptionLabels});
        });
    };

    handleChange = selectedLabels => {
        this.setState({ selectedLabels });
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const userDataLabels = this.state.selectedLabels.map(label => { return label.data });
        const userData = {
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone,
            description: this.state.description,
            job_status: this.state.job_status,
            user_type: this.state.user_type,
            labels: userDataLabels,
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
                        <Form.Group as={Col} controlId="job_status">
                            <Form.Label>Your current status</Form.Label>
                            <Form.Control as="select" onChange={this.onChange}>
                                <option value="ACTIVE">Actively looking for a job</option>
                                <option value="PASSIVE">Looking for a job</option>
                                <option value="INACTIVE">Don't looking for a job</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="phone">
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
                        <Form.Label>Skills</Form.Label>
                        <Select
                            closeMenuOnSelect={false}
                            isMulti
                            options={this.state.optionLabels}
                            onChange={this.handleChange}
                            value={this.state.selectedLabels}
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
export default CandidateUpdate;