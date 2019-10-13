import React, { Component } from 'react'
import api from '../api'

import 'react-table/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Avatar from "react-avatar";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import Badge from "react-bootstrap/Badge";

class CompanyProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idCompany: this.props.match.params.id,
            isLoading: true,
            company: null,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true });
        await api.getCompanyById(this.state.idCompany).then(company => {
            this.setState({
                company: company.data.data,
                isLoading: false,
            });
        });
    };

    render() {
        if (this.state.isLoading) {
            return (<Container>Loading</Container>)
        }
        const company  = this.state.company;

        const recruiters = this.state.company.recruiters.map( recruiter => {
            return <Link
                key={ recruiter._id }
                to={{ pathname: '/user/'+ recruiter._id, state: { user_type: recruiter.user_type }}}
                className="btn btn-dark" variant="dark"
                style={{marginBottom: '10px'}}
            ><Avatar name={recruiter.firstname + ' ' + recruiter.lastname} size={30} round={false} style={{ margin:'5px'}}/>
            <Badge>{recruiter.firstname + ' ' + recruiter.lastname}</Badge>
            </Link>;
        });
        return (
            <Container>
                <Row style={{background:'#aaa4a3', borderRadius: '10px'}}>
                    <Col lg={2} style={{textAlign: 'left', paddingTop:'10px'}}>
                        <div>{company.name}</div>
                    </Col>
                    <Col lg={6}>
                        <div style={{background:'#fff8f6', borderRadius: '10px', margin:"20px", padding:"10px", height:150}}>
                            <h5>Description</h5>
                            {company.description}
                        </div>
                    </Col>
                    <Col>
                        <div style={{background:'#fff8f6', borderRadius: '10px', margin:"20px", padding:"10px"}}>
                            <Link to={{
                                pathname: '/company/update/'+ company._id,
                                state: { user: company }
                            }}
                                  className="btn btn-dark" variant="dark"
                            > Update your company </Link>
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop: '10px'}}>
                    <Col lg={3} style={{background:'#aaa4a3', borderRadius: '10px'}}>
                        <div style={{fontSize: '20px', textAlign: 'center', backgroundColor: '#fff8f6', margin: '10px'}}>
                            Recruiters
                        </div>
                        <div style={{fontSize: '20px', textAlign: 'center', margin: '10px'}}>
                            {recruiters}
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default CompanyProfile
