
import React, { Component } from 'react'
import api from '../api'
import {Job} from '../components'

import styled from 'styled-components'

import 'react-table/react-table.css'
import Container from "react-bootstrap/Container";

class JobsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true });

        await api.getAllJobs().then(jobs => {
            this.setState({
                jobs: jobs.data.data,
                isLoading: false,
            })
        })
    };

    render() {
        const { jobs, isLoading } = this.state;
        let showTable = true;
        if (!jobs.length) {
            showTable = false
        }

        return (
            <Container>
                {jobs.map(x =>
                    <Job
                        name={x.name}
                        description={x.description}
                        labels={x.labels}
                        key={x._id}
                    />)}
            </Container>
        )
    }
}

export default JobsList
