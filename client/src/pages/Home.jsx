import React, { Component } from 'react'
import { Link } from "react-router-dom";
import api from "../api";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";
import SignUpForm from "../components/forms/SignUpForm";
import LogInForm from "../components/forms/LogInForm";

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
                        <h1 style={{fontFamily: "lucida console", fontSize: 100}}>
                            Jobeet.
                        </h1>
                    </div>
                    <div className="col-6 mt-5">
                        <Row>
                            <div className="col-6 mt-3">
                                <LogInForm />
                            </div>
                            <div className="col-6 mt-3">
                                <SignUpForm />
                            </div>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;
