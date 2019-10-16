import React, { Component } from 'react'
import api from '../api'
import {Link} from 'react-router-dom';

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import Button from "react-bootstrap/Button";

class JobsInsert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.location.state.user,
            name: '',
            description: '',
            labels: '',
            selectedLabels: [],
            optionLabels: {},
            isLoading: true
        };
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
        this.setState({isLoading: true});
        await api.getLabels().then( labels=> {
            const allOptionLabels = this.formatOptionLabels(labels.data.data);
            this.setState({
                isLoading: false,
                optionLabels : allOptionLabels
            });
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const { name, description, user } = this.state;
        const jobLabels = this.state.selectedLabels.map(label => { return label.data });
        const payload = { name: name, description: description, labels: jobLabels, author: user };

        api.insertJob(payload).then(res => {
            window.alert(`Job inserted successfully`);
            this.props.history.push({
                pathname: '/user/' + this.state.user._id,
                state: {user: this.state.user.user_type}
            });
        });
    };

    handleSelectChange = selectedLabels => {
        this.setState({ selectedLabels });
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        if(this.state.isLoading)
            return <Container />
        return (
            <Container>
                <h1>Create Job</h1>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Job name"
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
                                placeholder="Description of the job"
                                onChange={this.onChange}
                                value={this.state.description}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="labels">
                        <Form.Label>Skills</Form.Label>
                        {
                            this.state.optionLabels && this.state.optionLabels.length !== 0 ?
                            <Select
                                closeMenuOnSelect={false}
                                isMulti
                                options={this.state.optionLabels}
                                onChange={this.handleSelectChange}
                                value={this.state.selectedLabels}
                            /> : null
                        }
                    </Form.Group>
                    <Link to={{ pathname: '/label/create'}}
                        className="btn btn-light" variant="light">
                        Add skill
                    </Link>
                    <Button variant="dark" onClick={this.onSubmit}>
                        Add a job
                    </Button>
                    <Link to={{ pathname: '/user/' + this.state.user._id, state: { user_type: this.state.user.user_type }}}
                        className="btn btn-light" variant="light">
                        Cancel
                    </Link>
                </Form>
            </Container>
        )
    }
}

export default JobsInsert
