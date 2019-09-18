
import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'
import {Candidate} from '../components'

import styled from 'styled-components'
import 'react-table/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container";



const Wrapper = styled.div`padding: 0 40px 40px 40px;`;

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
        candidates.map(x => console.log(x.firstname));
        console.log('TCL: CandidateList -> render -> candidates', candidates);

        let showTable = true;
        if (!candidates.length) { showTable = false; }

        return (
            <Container>
                {candidates.map(x =>
                    <Candidate
                        firstname={x.firstname}
                        lastname={x.lastname}
                        phone={x.phone}
                        description={x.description}
                        job_status={x.job_status}
                        //               labels={x.labels}
                    />
                    )}
            </Container>
        )
    }
}

export default CandidateList
