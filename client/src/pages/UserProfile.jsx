import React, { Component } from 'react'
import api from '../api'

import 'react-table/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container";
import CandidateProfile from "../components/CandidateProfile";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: props._id,
            isLoading: false,
            user: null
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true });
        await api.getUserById(this.state.idUser).then(user => {
            this.setState({
                user: user.data.data,
                isLoading: false,
            })
        })

    };

    render() {
        const { user, isLoading } = this.state;
        let showTable = true;
        if (!user) { showTable = false; };
        let profile;
        console.log(user);
        if (showTable && user.user_type === 'CANDIDATE') {
            profile = <CandidateProfile user = {user}/>
        }
        return (
            <Container>
               {profile}
            </Container>
        )
    }
}

export default UserProfile
