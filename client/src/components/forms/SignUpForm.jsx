import React, { Component } from 'react'
import { Link } from "react-router-dom";
import api from "../../api";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {Button} from "react-bootstrap";
import LabeledInputNormal12 from "../atomic/LabeledInputNormal12";
import LabeledInputEmail12 from "../atomic/LabeledInputEmail12";
import LabeledInputPassword12 from "../atomic/LabeledInputPassword12";

class SignUpForm extends Component {
    constructor(props) {
        super(props);
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
        const loginLinkAvailable = this.props.loginLinkAvailable ? this.props.loginLinkAvailable : false;
        return (
            <div className="row">
                <div className="col s8 offset-s2">
                    <div className="col s12">
                        <h4>
                            <b>SignUp</b> below
                        </h4>
                        {loginLinkAvailable ?
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Log in</Link>
                            </p>
                            : null
                        }
                    </div>
                    <form noValidate onSubmit={this.onSubmit} className="mt-3">
                        <LabeledInputNormal12 className="mt-3"
                            onChange={this.onChange}
                            value={this.state.lastname}
                            error={errors.lastname}
                            id="lastname"
                            label="Lastname"
                        />
                        <LabeledInputNormal12 className="mt-3"
                            onChange={this.onChange}
                            value={this.state.firstname}
                            error={errors.firstname}
                            id="firstname"
                            label="Firstname"
                        />
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
                        <LabeledInputPassword12 className="mt-3"
                            onChange={this.onChange}
                            value={this.state.password2}
                            error={errors.password2}
                            id="password2"
                            label="Confirm password"
                        />
                        <div className="input-field col-12 mt-3">
                            <Form.Group controlId="user_type">
                                <label htmlFor="user_type">Type of user</label>
                                <Form.Control as="select" onChange={this.onChange}>
                                    <option value="CANDIDATE">Candidate</option>
                                    <option value="RECRUITER">Recruiter</option>
                                </Form.Control>
                            </Form.Group>

                        </div>
                        <Button className="mt-3 ml-3" variant="primary" type="submit" onClick={this.registerUser}>
                            Sign up
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}
export default SignUpForm;
