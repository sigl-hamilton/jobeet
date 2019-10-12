import React, { Component } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


class CandidateLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    render() {
        let firstname = this.props.firstname;
        let lastname = this.props.lastname;
        let phone = this.props.phone;
        let description = this.props.description;
        let user_type = this.props.user_type;
        let id = this.props.id;
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
                <Col>
                    <h3>User Type</h3>
                    <p>{user_type}</p>
                </Col>
                <Col>
                    <h3>ID</h3>
                    <p>{id}</p>
                </Col>
            </Row>
        )
    }
}

export default CandidateLine
