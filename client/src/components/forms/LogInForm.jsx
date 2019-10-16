import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import {Button} from "react-bootstrap";
import LabeledInputNormal12 from "../atomic/LabeledInputNormal12";
import LabeledInputEmail12 from "../atomic/LabeledInputEmail12";
import LabeledInputPassword12 from "../atomic/LabeledInputPassword12";

class LogInForm extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        api.login(userData).then(res => {
            window.alert(`User logged`);
        });
    };

    render() {
        const { errors } = this.state;
        const signUpLinkAvailable = this.props.signUpLinkAvailable ? this.props.signUpLinkAvailable : false;
        return (
            <div className="row">
                <div className="col s8 offset-s2">
                    <div className="col s12">
                        <h4>
                            <b>Login</b> below
                        </h4>
                        {signUpLinkAvailable ?
                            <p className="grey-text text-darken-1">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                            : null
                        }
                    </div>
                    <form noValidate onSubmit={this.onSubmit}>
                        <LabeledInputEmail12 className="mt-3"
                             onChange={this.onChange}
                             value={this.state.email}
                             error={errors.email}
                             id="email"
                             label="Email"
                        />
                        <LabeledInputPassword12 className="mt-3"
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            label="Password"
                        />
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <Button variant="outline-primary" type="submit" onClick={this.onSubmit}>
                                Login
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
};
export default LogInForm;
