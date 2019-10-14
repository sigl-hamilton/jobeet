import React, { Component } from 'react'

import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import Avatar from "react-avatar";
import Badge from "react-bootstrap/Badge";


class CandidateProfileBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recruiters: this.props.recruiters
        };
    }

    render() {


        return (
            <Tabs defaultActiveKey="recruiters" id="uncontrolled-tab-example">
                <Tab eventKey="recruiters" title="Recruiters">
                    <Table striped bordered hover variant="dark" style={{marginTop: '10px'}}>
                        <tbody>
                        { this.state.recruiters.map(recruiter => {
                            return (
                                <tr>
                                    <td>{recruiter.lastname + ' ' + recruiter.firstname}</td>
                                    <td>{recruiter.email}</td>
                                    <td>{recruiter.phone ? recruiter.phone : "phone not register"}</td>
                                    <td>
                                        <Link
                                            key={ recruiter._id }
                                            to={{ pathname: '/user/'+ recruiter._id, state: { user_type: recruiter.user_type }}}
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
                <Tab eventKey="jobs" title="Jobs">
                </Tab>
            </Tabs>
        )
    }
}

export default CandidateProfileBody
