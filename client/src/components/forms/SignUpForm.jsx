import React, { Component } from 'react'
import { Link } from "react-router-dom";
import api from "../../api";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

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
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="input-field col s12">
                            <input
                                onChange={this.onChange}
                                value={this.state.lastname}
                                error={errors.lastname}
                                id="lastname"
                                type="text"
                            />
                            <label htmlFor="name">Lastname</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={this.onChange}
                                value={this.state.firstname}
                                error={errors.firstname}
                                id="firstname"
                                type="text"
                            />
                            <label htmlFor="name">Firstname</label>
                        </div>
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
                        <div className="input-field col s12">
                            <input
                                onChange={this.onChange}
                                value={this.state.password2}
                                error={errors.password2}
                                id="password2"
                                type="password"
                            />
                            <label htmlFor="password2">Confirm Password</label>
                        </div>
                        <div className="input-field col s12">
                            <Form.Group as={Col} md="4" controlId="user_type">
                                <label htmlFor="user_type">Type of user</label>
                                <Form.Control as="select" onChange={this.onChange}>
                                    <option value="CANDIDATE">Candidate</option>
                                    <option value="RECRUITER">Recruiter</option>
                                </Form.Control>
                            </Form.Group>

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
                                onClick={this.registerUser}
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default SignUpForm;
