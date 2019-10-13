import React, { Component } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Avatar from 'react-avatar';
import {Link} from "react-router-dom";
import Badge from "react-bootstrap/Badge";


class RecruiterProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            recruiter: this.props.user
        };
    }

    render() {
        const company = (!this.state.recruiter.company) ?
            <Link to={{ pathname: '/company/create', state: { user: this.state.recruiter }}}
                  className="btn btn-dark" variant="dark"
            > Create a Company </Link>
            : <Link to={{
                pathname: '/company/' + this.state.recruiter.company._id,
                state: { user: this.state.recruiter }
            }}
                className="btn btn-dark" variant="dark"
            > <Badge>{this.state.recruiter.company.name}</Badge> </Link>;
        return (
            <Container>
                <Row style={{background:'#aaa4a3', borderRadius: '10px'}}>
                    <Avatar name={this.state.recruiter.firstname + ' ' + this.state.recruiter.lastname} round={true} style={{ margin:'10px'}}/>
                    <Col lg={2} style={{textAlign: 'left', paddingTop:'10px'}}>
                        <div>{this.state.recruiter.firstname} {this.state.recruiter.lastname}</div>
                        <div>{this.state.recruiter.phone}</div>
                    </Col>
                    <Col lg={6}>
                        <div style={{background:'#fff8f6', borderRadius: '10px', margin:"20px", padding:"10px", height:150}}>
                            <h5>Description</h5>
                            {this.state.recruiter.description}
                        </div>
                    </Col>
                    <Col>
                        <div style={{background:'#fff8f6', borderRadius: '10px', margin:"20px", padding:"10px"}}>
                            <Link to={{
                                pathname: '/recruiter/update/'+ this.state.recruiter._id,
                                state: { user: this.state.recruiter }
                            }}
                                  className="btn btn-dark" variant="dark"
                            > Update your profile </Link>
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop: '10px'}}>
                    <Col lg={3} style={{background:'#aaa4a3', borderRadius: '10px'}}>
                        <div style={{fontSize: '20px', textAlign: 'center', backgroundColor: '#fff8f6', margin: '10px'}}>
                            Company
                        </div>
                        <div style={{fontSize: '20px', textAlign: 'center', margin: '10px'}}>
                            {company}
                        </div>
                    </Col>
                    <Col style={{backgroundColor:'#aaa4a3', borderRadius: '10px', marginLeft: '10px', padding:'10px'}}>
                        <Link to={{ pathname: '/jobs/create', state: { user: this.state.recruiter }}}
                              className="btn btn-dark" variant="dark"
                        > Create a job </Link>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default RecruiterProfile
