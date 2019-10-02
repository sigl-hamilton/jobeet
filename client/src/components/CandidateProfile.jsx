import React, { Component } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class CandidateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    render() {
        const candidate = this.props.user;
        return (
            <Row>
                <Col>
                    <h3>Nom</h3>
                    <p>{candidate.lastname}</p>
                </Col>
                <Col>
                    <h3>Prénom</h3>
                    <p>{candidate.firstname}</p>
                </Col>
                <Col>
                    <h3>Description</h3>
                    <p>{candidate.description}</p>
                </Col>
                <Col>
                    <h3>Numéro</h3>
                    <p>{candidate.phone}</p>
                </Col>
                <Col>
                    <h3>Job Status</h3>
                    <p>{candidate.job_status}</p>
                </Col>
            </Row>
        )
    }
}

export default CandidateProfile
