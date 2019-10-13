import React, { Component } from 'react'
import api from '../api'

import 'react-table/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container";
import CandidateProfile from "../components/CandidateProfile";
import RecruiterProfile from "../components/RecruiterProfile";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            idUser: this.props.match.params.id,
            isLoading: false,
            user: null,
            userType: this.props.location.state.user_type
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true });
        if (this.state.userType === "CANDIDATE") {
            await api.getCandidateById(this.state.idUser).then(user => {
                this.setState({
                    user: user.data.data,
                    isLoading: false,
                });
            });
        } else {
            await api.getRecruiterById(this.state.idUser).then(user => {
                this.setState({
                    user: user.data.data,
                    isLoading: false,
                });
            });
        }

    };

    render() {
        const { user, isLoading } = this.state;
        let showTable = true;
        if (!user) { showTable = false; };
        let profile;
        if (showTable && user.user_type === 'CANDIDATE') {
            profile = <CandidateProfile user={user}/>
        } else if (showTable && user.user_type === 'RECRUITER') {
            profile = <RecruiterProfile user={user}/>
        }

        return (
            <Container>
               {profile}
            </Container>
        )
    }
}

export default UserProfile
