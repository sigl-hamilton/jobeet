import React, { Component } from 'react'
import api from "../api";
import SignUpForm from "../components/forms/SignUpForm";

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            user_type: "CANDIDATE",
            errors: {}
        };
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    registerUser = async () => {
        const newUser = {
            lastname: this.state.lastname,
            firstname: this.state.firstname,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            user_type: this.state.user_type
        };
        await api.register(newUser).then(res => {
            window.alert(`User created`);
            this.setState({
                lastname: '',
                firstname: '',
                email: '',
                password: '',
                password2:'',
                user_type:''
            })
        })
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <SignUpForm loginLinkAvailable />
            </div>
        );
    }
}
export default SignUp;
