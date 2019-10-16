import React, { Component } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Avatar from 'react-avatar';
import Badge from "react-bootstrap/Badge";
import {Link} from "react-router-dom";
import CandidateProfileBody from "./CandidateProfileBody";


class CandidateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    render() {
        const candidate = this.props.user;
        const currentUser = this.props.currentUser;
        console.log("RTYUI" + currentUser)

        let job_status;
        if (candidate.job_status === 'ACTIVE') {
            job_status = <Badge variant="dark">Actively looking for a job</Badge>;
        } else {
            job_status = <Badge variant="light">Don't looking for a job</Badge>;
        }

        return (
            <Container>
                <Row style={{background:'#aaa4a3', borderRadius: '10px'}}>
                    <Avatar name={candidate.firstname + ' ' + candidate.lastname} round={true} style={{ margin:'10px'}}/>
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
                    <Col>
                    {
                        currentUser && currentUser._id === candidate._id ?
                        <div  style={{background:'#fff8f6', borderRadius: '10px', margin:"20px", padding:"10px"}}>
                            <Link to={{
                                pathname: '/candidate/update/'+ candidate._id,
                                state: { user: candidate }
                            }}
                                  className="btn btn-dark" variant="dark"
                            > Update your profile </Link>
                        </div> : null
                    }
                    </Col>
                </Row>
                <Row style={{marginTop: '10px'}}>
                    <Col lg={3}>
                        <div style={{fontSize: '20px', textAlign: 'center', backgroundColor: '#fff8f6', margin: '10px'}}>
                            Skills
                        </div>
                        <div style={{margin: '10px'}}>
                            { candidate.labels.map( label => (<Badge variant="dark" style={{margin: '2px'}}>{label.name}</Badge>)) }
                        </div>
                    </Col>
                    <Col  style={{ borderRadius: '10px'}}>
                        <div style={{margin: '10px'}}>
                            <CandidateProfileBody candidate={candidate} currentUser={currentUser}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default CandidateProfile
