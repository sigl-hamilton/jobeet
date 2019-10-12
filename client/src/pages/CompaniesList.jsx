
import React, { Component } from 'react'
import api from '../api'
import {Company} from '../components'
import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateCompany extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/companies/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteCompany extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the Company ${this.props.id} permanently?`,
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

class CompaniesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companies: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllCompanies().then(companies => {
            this.setState({
                companies: companies.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { companies, isLoading } = this.state
        companies.map(x => console.log(x.name));
        console.log('TCL: CompaniesList -> render -> companies', companies)

        return (
            <Wrapper>
                {companies.map(x =>
                    <Company
                    name={x.name}
                    description={x.description}
                    labels={x.labels}
                />)}
            </Wrapper>
        )
    }
}

export default CompaniesList
