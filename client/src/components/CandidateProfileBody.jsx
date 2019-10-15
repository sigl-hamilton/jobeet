import React, { Component } from 'react'

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import api from "../api";
import CandidateJobCard from "./CandidateJobCard";
import Container from "react-bootstrap/Container";

class CandidateProfileBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidate: this.props.candidate,
            possibleJobs: [],
            isLoading: true
        };
    }

    componentDidMount = async () => {
        const payload = { labels: this.state.candidate.labels, matchPercent: 75 };
        await api.getPossibleJobs(payload).then( possibleJob => {
            this.setState({ possibleJobs: possibleJob.data.data, isLoading: false });
        });
    };

    render() {
        if (this.state.isLoading) return <Container/>;
        return (
            <Tabs defaultActiveKey="jobs" id="candidate-job-table">
                <Tab eventKey="jobs" title="Job">
                    <h4>Jobs that can match with your profile</h4>
                    <div style={{paddingTop: '10px'}}>
                        {this.state.possibleJobs ? this.state.possibleJobs.map(job => {return <CandidateJobCard job={job} />}) : 'No jobs for the moment'}
                    </div>
                </Tab>
                <Tab eventKey="test" title="test">
                </Tab>
            </Tabs>
        )
    }
}

export default CandidateProfileBody
