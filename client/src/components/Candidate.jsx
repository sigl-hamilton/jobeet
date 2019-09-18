import React, { Component } from 'react'
import styled from 'styled-components'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const BOX_STYLE = {
    border: "2px solid black",
    display: "block",
    margin: "15px auto",
    //width: "70%",
    borderRadius: "15px",
    //padding: "4px"
}

class Candidate extends Component {
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
            </Row>
        )
    }
}

export default Candidate
