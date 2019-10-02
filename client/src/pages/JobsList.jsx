
import React, { Component } from 'react'
import api from '../api'
import {Job} from '../components'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`
/*
const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`
/*
class UpdateJob extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/jobs/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteJob extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the job ${this.props.id} permanently?`,
            )
        ) {
            api.deleteJobById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}
*/
class JobsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobs: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllJobs().then(jobs => {
            this.setState({
                jobs: jobs.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { jobs, isLoading } = this.state
        jobs.map(x => console.log(x.name));
        console.log('TCL: JobsList -> render -> jobs', jobs)

        let showTable = true;
        if (!jobs.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {jobs.map(x =>
                    <Job
                    name={x.name}
                    description={x.description}
                    labels={x.labels}
                />)}
            </Wrapper>
        )
    }
}

export default JobsList
