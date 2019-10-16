import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import LogInForm from "../components/forms/LogInForm";

class LogIn extends Component {
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
    onSubmit = async e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        await api.login(userData).then(res => {
            window.alert(`User logged`);
            this.props.refreshUser(res.data.data);
        });
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <LogInForm signUpLinkAvailable />
            </div>
        );
    };
};
export default LogIn;
