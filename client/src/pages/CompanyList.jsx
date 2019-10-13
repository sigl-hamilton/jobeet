import React, { Component } from 'react'
import api from '../api'

import 'react-table/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

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
                    <Link to={{ pathname: '/company/create'}} className="btn btn-dark" variant="dark">
                        Add a new Company
                    </Link>
                </div>
                <div>
                {
                    companies.map(company => {
                        return <Badge style={{fontSize: "20px", margin: '5px'}} variant="dark">
                            {company.name}
                            <Link to={{
                                pathname: '/company/update/'+ company._id,
                                state: { company: company }
                            }} style={{ color: "white" }}
                            > <FontAwesomeIcon icon="pen" size="xs"/></Link>
                        </Badge>;
                    })
                }
                </div>
            </Container>
        )
    }
}

export default CompanyList
