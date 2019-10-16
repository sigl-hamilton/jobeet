import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import api from '../api';


const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    constructor(props) {
        super(props);
    }

    logout = async () => {
        await api.logout().then(res => {
            window.alert(`User logged`);
            this.props.refreshUser(null);
        });
    }

    render() {
        const currentUser = this.props.currentUser;

        return (
        <List>
        {
            !currentUser ?
            <Item>
                <Link to="/signup" className="nav-link">
                    Sign Up
                </Link>
                <Link to="/login" className="nav-link">
                    Log In
                </Link>
            </Item> : null
        }
        {
            currentUser ?
            <Item>
                <Link to="/" className="nav-link">
                    <span onClick={this.logout}>Log Out</span>
                </Link>
                <Link to="/jobs/list" className="nav-link">
                    Jobs
                </Link>
                {
                    currentUser.user_type != "CANDIDATE" ?
                    <Item>
                        <Link to="/user/list" className="nav-link">
                            User list
                        </Link>
                        <Link to="/candidate/list" className="nav-link">
                            Candidate List
                        </Link>
                        <Link to="/label/create" className="nav-link">
                            Label Create
                        </Link>
                        <Link to="/label/list" className="nav-link">
                            Label List
                        </Link>
                        <Link to="/company/list" className="nav-link">
                            Company List
                        </Link>
                    </Item>: null
                }
            </Item> : null
        }
        </List>
        )
    }
}

export default Links
