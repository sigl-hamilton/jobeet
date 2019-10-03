import React, { Component } from 'react'
import styled from 'styled-components'

const BOX_STYLE = {
    border: "2px solid black",
    display: "block",
    margin: "15px auto",
    width: "70%",
    borderRadius: "15px",
    padding: "4px"
}

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

class Company extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companies: [],
            isLoading: false,
        }
    }
    
 

    render() {
        let name = this.props.name;
        let description = this.props.description;
        let labels = this.props.labels.join(", ");
        return (
            <div style={BOX_STYLE}>
                <h3>Nom</h3>
                <p>{name}</p>
                <h3>Description</h3>
                <p>{description}</p>
                <h3>Labels</h3>
                <p>{labels}</p>

                <Button href={'/company/list'}>Visit Profile</Button>

            </div>
        )
    }
}

export default Company
