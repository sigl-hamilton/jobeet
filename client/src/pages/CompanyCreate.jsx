import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class CompanyCreate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            description: '',
            labels: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputDescription = async event => {
        const description = event.target.value
        this.setState({ description })
    }

    handleChangeInputLabels = async event => {
        const labels = event.target.value
        this.setState({ labels })
    }

    handleCreateCompany = async () => {
        const { name, description, labels } = this.state
        const arrayLabels = labels.split(',')
        const payload = { name, description, labels: arrayLabels }

        await api.createCompany(payload).then(res => {
            window.alert(`Company inserted successfully`)
            this.setState({
                name: '',
                description: '',
                labels: '',
            })
        })
    }

    render() {
        const { name, description, labels } = this.state
        return (
            <Wrapper>
                <Title>Create Company</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

                <Label>Description: </Label>
                <InputText
                    type="text"
                    value={description}
                    onChange={this.handleChangeInputDescription}
                />

                <Label>Labels: </Label>
                <InputText
                    type="text"
                    value={labels}
                    onChange={this.handleChangeInputLabels}
                />

                <Button onClick={this.handleCreateCompany}>Add Company</Button>
                <CancelButton href={'/company/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default CompanyCreate
