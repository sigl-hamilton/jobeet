import React, { Component } from 'react'

import {Badge, Card, Col, Row} from "react-bootstrap";

class CandidateJobCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: this.props.job.job,
        };
    }


    render() {
        const labels = this.state.job.labels.map(label => (
                <Badge variant="dark" style={{margin: '2px'}} key={label._id}>{label.name}</Badge>
            ));
        return (
            <Card border="dark">
                <Card.Header>{this.state.job.name}</Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={8}>
                            <h4>Description</h4>
                            <p>{this.state.job.description}</p>
                        </Col>
                        <Col xs={4}>
                            <h4>Labels</h4>
                            <p>{labels}</p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}

export default CandidateJobCard

