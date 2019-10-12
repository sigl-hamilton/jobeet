import React, { Component } from 'react'
import api from '../api'

import 'react-table/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";

class LabelList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true });
        await api.getLabels().then(labels => {
            this.setState({
                labels: labels.data.data,
                isLoading: false,
            })
        })
    };

    render() {
        const { labels, isLoading } = this.state;
        let showTable = true;
        if (!labels.length) { showTable = false; }
        return (
            <Container>
                <h1>List of labels</h1>
                <div>
                {
                    labels.map(label => {
                        return <Badge style={{fontSize: "20px", margin: '5px'}} variant="dark">{label.name}</Badge>;
                    })
                }
                </div>
            </Container>
        )
    }
}

export default LabelList
