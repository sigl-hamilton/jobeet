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

class Job extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobs: [],
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
            </div>
        )
    }
}

export default Job
