import React, { Component } from 'react'
import api from '../api'

import 'react-table/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container";
import {Badge, Card, Col, Row} from "react-bootstrap";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import JobCandidates from "../components/JobCandidates";

class JobInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job_id: this.props.match.params.id,
            job: {},
            isLoading: true,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true });
        await api.getJobById(this.state.job_id).then(job => {
            this.setState({ job: job.data.data, isLoading: false});
        });
    };

    render() {
        if (this.state.isLoading) {return <Container/>}
        const job = this.state.job;
        const labels = job.labels.map(label => (
                <Badge variant="dark" style={{margin: '2px'}} key={label._id}>{label.name}</Badge>
            )
        );
        return (
            <Container  style={{ marginTop: '100px' }}>
                <Card border="dark">
                    <Card.Header>
                        <Row>
                            <Col>{job.name}</Col>
                            <Col style={{ textAlign: 'right', fontSize: '12px' }}>
                                <Moment format="DD/MM/YYYY">
                                    {job.createdAt}
                                </Moment>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col style={{ textAlign: 'right' }}>
                                <Link to={{
                                    pathname: '/job/update/' + job._id,
                                    state: { user: this.state.job.author, job: this.state.job }
                                }}
                                      className="btn btn-dark" variant="dark"
                                      style={{ marginTop: '10px' }}
                                > Update the job</Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={9}>
                                <h4>Description</h4>
                                <p>{job.description}</p>
                            </Col>
                            <Col xs={3}>
                                <h3>Labels</h3>
                                <p>{labels}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <JobCandidates job={this.state.job}/>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default JobInfo
