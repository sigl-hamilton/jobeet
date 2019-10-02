import { Link } from 'react-router-dom'
import React, { Component } from 'react'

import logo from '../logo.svg'

class Logo extends Component {
    render() {
        return (
            <Link to="/" className="navbar-brand">
                <img src={logo} width="50" height="50" alt="sambarros.com" />
            </Link>
        )
    }
}

export default Logo
