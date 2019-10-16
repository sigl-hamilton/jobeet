import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

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
                        <div className="input-field col s12">
                            <input
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="email"
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                type="password"
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
};
export default LogInForm;
