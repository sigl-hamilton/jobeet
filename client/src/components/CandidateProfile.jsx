import React, { Component } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Avatar from 'react-avatar';
import Badge from "react-bootstrap/Badge";


class CandidateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    render() {
        const candidate = this.props.user;
        let job_status;
        if (candidate.job_status === 'ACTIVE') {
            job_status = <Badge variant="dark">A la recherche d'un job</Badge>;
        } else {
            job_status = <Badge variant="light">Ne recherche pas de job</Badge>;
        }

        return (
            <Container style={{background:'#aaa4a3', borderRadius: '10px'}}>
                <Row>
                    <Avatar name="Brandon Quinne" round={true} style={{ margin:'10px'}}/>
                    <Col lg={2} style={{textAlign: 'left', paddingTop:'10px'}}>
                        <div>{candidate.firstname} {candidate.lastname}</div>
                        <div>{candidate.phone}</div>
                        {job_status}
                    </Col>
                    <Col lg={6}>

                        <div style={{background:'#fff8f6', borderRadius: '10px', margin:"20px", padding:"10px", height:150}}>
                            <h5>Description</h5>
                            {candidate.description}
                        </div>
                    </Col>
                </Row>
                <Row>
                </Row>
            </Container>
        )
    }
}

export default CandidateProfile
