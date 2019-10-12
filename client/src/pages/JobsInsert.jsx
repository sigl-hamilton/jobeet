import React, { Component } from 'react'
import api from '../api'

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
            optionLabels: {}
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
        await api.getLabels().then( labels=> {
            const allOptionLabels = this.formatOptionLabels(labels.data.data);
            this.setState({optionLabels : allOptionLabels});
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const { name, description, user } = this.state;
        const jobLabels = this.state.selectedLabels.map(label => { return label.data });

        const payload = { name, description, labels: jobLabels, author: user };

        api.insertJob(payload).then(res => {
            window.alert(`Job inserted successfully`);
            this.props.history.push('/user/' + this.state.user._id);
        })
    };

    handleSelectChange = selectedLabels => {
        this.setState({ selectedLabels });
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
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
                        <Select
                            closeMenuOnSelect={false}
                            isMulti
                            options={this.state.optionLabels}
                            onChange={this.handleSelectChange}
                            value={this.state.selectedLabels}
                        />
                    </Form.Group>
                    <Button variant="dark" onClick={this.onSubmit}>
                        Add a job
                    </Button>
                    <Button style={{marginLeft:'10px'}} variant="light" href={'/user/' + this.state}>Cancel</Button>
                </Form>
            </Container>
        )
    }
}

export default JobsInsert
