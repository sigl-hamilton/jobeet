import React, { Component } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Link} from "react-router-dom";


class UserLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: false,
        }
    }

    render() {
        const firstname = this.props.firstname;
        const lastname = this.props.lastname;
        const phone = this.props.phone;
        const description = this.props.description;
        const user_type = this.props.user_type;
        const id = this.props.id;
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
                    <Link to={{ pathname: '/user/' +id, state: { user_type: user_type }}}
                    >Id
                    </Link>
                </Col>
            </Row>
        )
    }
}

export default UserLine
