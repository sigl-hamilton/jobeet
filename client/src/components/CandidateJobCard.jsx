import React, { Component } from 'react'

import {Badge, Card, Col, Row} from "react-bootstrap";
import api from '../api'
import {Link} from "react-router-dom";


class CandidateJobCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: this.props.job.job,
            candidate : this.props.candidate,
            chat: null
        };
    }

    componentDidMount = async () => {
        const payload = { job: this.state.job, userFrom: this.state.candidate, userTo: this.state.job.author };
        await api.getChatByJob(payload).then(chat => { this.setState( {chat: chat.data} ) });
    };

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
                    <Row>
                        <Col lg={8}/>
                        <Col lg={4} >
                            <Link
                                to={{
                                    pathname: '/user/chat/'+ this.state.job.author._id  + '/' + this.state.candidate._id,
                                    state: { job: this.state.job }
                                }}
                                className="btn btn-light" variant="light"
                                style={{marginBottom: '10px'}}
                            > Start chatting
                            </Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}

export default CandidateJobCard

