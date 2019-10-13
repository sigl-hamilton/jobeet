import React, { Component } from 'react'

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";

class RecruiterProfileBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recruiter: this.props.recruiter
        };
    }

    render() {

        return (
            <Tabs defaultActiveKey="jobs" id="recruiter-job-table">
                <Tab eventKey="jobs" title="Jobs">
                    <Link to={{ pathname: '/jobs/create', state: { user: this.state.recruiter }}}
                          className="btn btn-dark" variant="dark"
                          style={{ marginTop: '10px' }}
                    > Create a job </Link>
                    <Table striped bordered hover variant="dark" style={{marginTop: '10px'}}>
                        <tbody>
                        { this.state.recruiter.jobs.map(job => {
                            return (
                                <tr>
                                    <td>{job.name}</td>
                                    <td>{job.description}</td>
                                    <td>
                                        <Link
                                            key={ job._id }
                                            to={{ pathname: '/job/'+ job._id, state: { user_type: job.user_type }}}
                                            className="btn btn-light" variant="light"
                                            style={{marginBottom: '10px'}}
                                        > See Job
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

export default RecruiterProfileBody
