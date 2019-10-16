import React, { Component } from 'react'
import styled from 'styled-components'

import {Link} from 'react-router-dom';
import Logo from './Logo';
import Links from './Links';
import api from '../api';
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";


class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const currentUser = this.props.currentUser;

        return (
            <Navbar bg="dark" variant="dark" expand="lg" style={{marginBottom: "10px"}}>
                <Navbar.Brand href="#home">JobEeT</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Links currentUser={currentUser} refreshUser={this.props.refreshUser}/>
                    </Nav>
                    {
                        currentUser ?
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                            <Link to={{ pathname: '/user/' +currentUser._id, state: { user_type: currentUser.user_type }}}>
                                {currentUser.firstname}
                            </Link>
                        </Form>
                        : null
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBar
