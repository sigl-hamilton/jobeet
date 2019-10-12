import React, { Component } from 'react'
import {Row, Col, Card, Badge} from 'react-bootstrap'

const CARD_STYLE = {
  margin: "4px"
};

class Job extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            isLoading: false,
        }
    }

    render() {
        let name = this.props.name;
        let description = this.props.description;
        const labels = this.props.labels.map(label => (
            <Badge variant="dark" style={{margin: '2px'}} key={label._id}>{label.name}</Badge>
            )
        );

        return (
            <Card style={CARD_STYLE} border="dark">
                  <Card.Header><h3>Nom</h3><p>{name}</p></Card.Header>
                  <Card.Body>
                      <Row>
                        <Col xs={8}>
                          <h3>Description</h3>
                          <p>{description}</p>
                        </Col>
                        <Col xs={2}>
                            <h3>Labels</h3>
                            <p>{labels}</p>
                        </Col>
                      </Row>
                  </Card.Body>
            </Card>
        )
    }
}

export default Job
