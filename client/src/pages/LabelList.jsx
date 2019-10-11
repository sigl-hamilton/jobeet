import React, { Component } from 'react'
import api from '../api'

import 'react-table/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

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
                    <Link to={{ pathname: '/label/create'}} className="btn btn-dark" variant="dark">
                        Add a new Label
                    </Link>
                </div>
                <div>
                {
                    labels.map(label => {
                        return <Badge style={{fontSize: "20px", margin: '5px'}} variant="dark">
                            {label.name}
                            <Link to={{
                                pathname: '/label/update/'+ label._id,
                                state: { label: label }
                            }} style={{ color: "white" }}
                            > <FontAwesomeIcon icon="pen" size="xs"/></Link>
                        </Badge>;
                    })
                }
                </div>
            </Container>
        )
    }
}

export default LabelList
