import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {


    render() {
        return (
        <List>
            <Item>
                <Link to="/signup" className="nav-link">
                    Sign Up
                </Link>
                <Link to="/login" className="nav-link">
                    Log In
                </Link>
            </Item>
            <Item>
                <Link to="/jobs/list" className="nav-link">
                    Jobs
                </Link>
            </Item>
            <Item>
                <Link to="/user/list" className="nav-link">
                    User list
                </Link>
            </Item>
            <Item>
                <Link to="/candidate/list" className="nav-link">
                    Candidate List
                </Link>
            </Item>
            <Item>
                <Link to="/label/create" className="nav-link">
                    Label Create
                </Link>
            </Item>
            <Item>
                <Link to="/label/list" className="nav-link">
                    Label List
                </Link>
            </Item>
            <Item>
                <Link to="/company/create" className="nav-link">
                    Company Create
                </Link>
            </Item>
            <Item>
                <Link to="/company/list" className="nav-link">
                    Company List
                </Link>
            </Item>
        </List>
        )
    }
}

export default Links
