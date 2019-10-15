import React, { Component } from 'react'
import { Link } from "react-router-dom";
import api from "../api";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {Button} from "react-bootstrap";

class Home extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-5 ml-5">
                        <h1>
                            Boost your job search. Right now.
                        </h1>
                    </div>
                    <div className="col-6 mt-5">
                        <h1 style={{fontSize: 100}}>
                            Jobeet
                        </h1>
                    </div>
                    <div className="col-6 mt-5">
                        <div className="col-12 mt-4">
                            <Button href="/signup" variant="primary" block>
                                Sign up
                            </Button>
                        </div>
                        <div className="col-12 mt-3">
                            <Button href="/login" variant="outline-primary" block>
                                Log in
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;
