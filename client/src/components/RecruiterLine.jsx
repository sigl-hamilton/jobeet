import React, { Component } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


class RecruiterLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: false,
        }
    }

    render() {
        console.log(this.props);
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
                    <h3>User status</h3>
                    <p>{user_type}</p>
                </Col>
                <Col>
                    <h3>ID</h3>
                    <a href={'/user/' + id}>id</a>
                </Col>
            </Row>
        )
    }
}

export default RecruiterLine
