import React, { Component } from 'react'
import {Row, Col, Card, Badge} from 'react-bootstrap'

const CARD_STYLE = {
  margin: "4px"
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
        let labels = [];
        for (let i = 0; i < this.props.labels.length; i++) {
          labels.push(<Badge pill variant="secondary">{
            this.props.labels[i]
          }</Badge>)
        }
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
                          <Card.Text>
                            <h3>Labels</h3>
                            {labels}
                          </Card.Text>
                        </Col>
                    </Row>
                  </Card.Body>
            </Card>
        )
    }
}

export default Job
