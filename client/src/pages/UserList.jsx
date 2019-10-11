import React, { Component } from 'react'
import api from '../api'
import {CandidateLine} from '../components'
import {RecruiterLine} from '../components'

import 'react-table/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true });

        await api.getUsers().then(users => {
            this.setState({
                users: users.data.data,
                isLoading: false,
            })
        })
    };

    render() {
        const { users, isLoading } = this.state;
        let showTable = true;
        if (!users.length) { showTable = false; }
        return (
            <Container>
                {users.map(user => {
                    return user.user_type === 'CANDIDATE' ?
                        <CandidateLine
                            firstname={user.firstname}
                            lastname={user.lastname}
                            phone={user.phone}
                            description={user.description}
                            user_type={user.user_type}
                            id = {user._id}
                        />
                        : <RecruiterLine
                            firstname={user.firstname}
                            lastname={user.lastname}
                            phone={user.phone}
                            description={user.description}
                            user_type={user.user_type}
                            id = {user._id}
                        />;
                    })
                }
            </Container>
        )
    }
}

export default UserList
