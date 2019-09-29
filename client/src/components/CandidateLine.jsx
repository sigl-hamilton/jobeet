import React, { Component } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {JobsUpdate} from "../pages";
import { BrowserRouter as Route } from 'react-router-dom'


class CandidateLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: false,
        }
    }

    render() {
        let firstname = this.props.firstname;
        let lastname = this.props.lastname;
        let phone = this.props.phone;
        let description = this.props.description;
        let job_status = this.props.job_status;
        let id = this.props.id;
        return (
            <Row>
                <Col>
                    <h3>Nom</h3>
                    <p>{lastname}</p>
                </Col>
                <Col>
                    <h3>Prénom</h3>
                    <p>{firstname}</p>
                </Col>
                <Col>
                    <h3>Description</h3>
                    <p>{description}</p>
                </Col>
                <Col>
                    <h3>Numéro</h3>
                    <p>{phone}</p>
                </Col>
                <Col>
                    <h3>Job Status</h3>
                    <p>{job_status}</p>
                </Col>
                <Col>
                    <Route path="/jobs/update/:id" exact component={JobsUpdate} />
                        <h3>ID</h3>
                    <p>{id}</p>
                </Col>
            </Row>
        )
    }
}

export default CandidateLine
