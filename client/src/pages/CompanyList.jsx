import React, { Component } from 'react'
import enterprise from '../img/enterprise.png';
import api from '../api'

import 'react-table/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Truncate from "react-truncate";
import CardColumns from "react-bootstrap/CardColumns";

class CompanyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true });
        await api.getCompanies().then(companies => {
            this.setState({
                companies: companies.data.data,
                isLoading: false,
            })
        })
    };

    render() {
        const { companies, isLoading } = this.state;
        let showTable = true;
        if (!companies.length) { showTable = false; }
        return (
            <Container>
                <h1>List of companies</h1>
                <div>
                    <CardColumns>
                        {companies.map(company => {
                            return <Card bg="dark" text="white" style={{width: '20rem'}} key={company._id}>
                                <Card.Img style={{backgroundColor: 'white'}} variant="top" src={enterprise}/>
                                <Card.Body>
                                    <Card.Title>{company.name}</Card.Title>
                                    <Card.Text>
                                        <Truncate lines={3} ellipsis={"..."}>
                                            { company.description }
                                        </Truncate>
                                    </Card.Text>
                                    <Link to={{
                                        pathname: '/company/'+ company._id,
                                        state: { company: company }
                                    }}
                                          className="btn btn-light"
                                          variant="light"
                                    >See more</Link>
                                </Card.Body>
                            </Card>
                            })
                        }
                    </CardColumns>
                </div>
            </Container>
        )
    }
}

export default CompanyList
