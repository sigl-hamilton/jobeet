import React, { Component } from 'react'

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import NumberFormat from 'react-number-format';
import {Link} from "react-router-dom";
import api from "../api";
import Container from "react-bootstrap/Container";
import {Badge} from "react-bootstrap";

class JobCandidates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: this.props.job,
            potentials: []
        };
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true });
        const payload = { labels: this.state.job.labels, matchPercent: 75 };
        await api.getPotentialCandidates(payload).then( potentialCandidates => {
            this.setState({ potentials: potentialCandidates.data.data, isLoading: false });
        });
    };

    render() {
        return (
            <Tabs defaultActiveKey="suggestions" id="job-candidates-table">
                <Tab eventKey="suggestions" title="Suggestions">
                    <Table striped bordered hover variant="dark" style={{marginTop: '10px'}}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>email</th>
                                <th>Skills</th>
                                <th>Match</th>
                            </tr>
                        </thead>
                        <tbody>
                        { this.state.potentials.map((data) => {
                            return (
                                <tr>
                                    <td>{data.candidate.firstname + ' ' + data.candidate.lastname}</td>
                                    <td>{data.candidate.email}</td>
                                    <td>{data.candidate.labels.map(label => (
                                            <Badge variant="light" style={{margin: '2px'}} key={label._id}>{label.name}</Badge>
                                        ))}
                                    </td>
                                    <td> {data.matchPercent} </td>
                                    <td>
                                        <Link
                                            key={ data.candidate._id }
                                            to={{ pathname: '/user/'+ data.candidate._id, state: { user_type: data.candidate.user_type }}}
                                            className="btn btn-light" variant="light"
                                            style={{marginBottom: '10px'}}
                                        > See profile
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }) }
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="test" title="test">
                </Tab>
            </Tabs>
        )
    }
}

export default JobCandidates
