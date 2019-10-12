import React, { Component } from 'react'
import api from '../api'
import {CandidateLine} from '../components'

import 'react-table/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container";

class CandidateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true });

        await api.getCandidates().then(candidates => {
            this.setState({
                candidates: candidates.data.data,
                isLoading: false,
            })
        })
    };

    render() {
        const { candidates, isLoading } = this.state;
        let showTable = true;
        if (!candidates.length) { showTable = false; }

        return (
            <Container>
                {candidates.map(x =>
                    <CandidateLine
                        firstname={x.firstname}
                        lastname={x.lastname}
                        phone={x.phone}
                        description={x.description}
                        user_type={x.user_type}
                        id = {x._id}
                    />
                    )}
            </Container>
        )
    }
}

export default CandidateList
