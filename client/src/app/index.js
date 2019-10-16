import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import api from '../api';

import { NavBar } from '../components'
import { UserProfile, SignUp, LogIn, UserList } from '../pages'
import { JobsList, JobsInsert, JobsUpdate, JobInfo} from '../pages'
import { CandidateList, CandidateUpdate } from '../pages'
import { RecruiterUpdate } from '../pages'
import { LabelList, LabelInsert, LabelUpdate} from '../pages'
import { CompanyList, CompanyInsert, CompanyUpdate, CompanyProfile} from '../pages'
import { ChatPage } from "../pages";

import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import Home from "../pages/Home";

library.add(fab, faPen);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
        }
    }

    refreshUser = (currentUser) => {
        console.log("here")
        this.setState({
            currentUser
        });
    }

    componentDidMount = async () => {
        await api.getCurrentUser().then(currentUser => {
            this.setState({
                currentUser: currentUser.data.data
            });
        });
    }

    render() {
        return (
            <Router>
                <NavBar currentUser={this.state.currentUser} refreshUser={this.refreshUser}/>
                <Switch>
                    <Route path="/" exact render={(props) => <Home {...props} refreshUser={this.refreshUser} />} />
                    <Route path="/signup" exact component={SignUp} />
                    <Route path="/login" exact render={(props) => <LogIn {...props} refreshUser={this.refreshUser} />}/>
                    <Route path="/jobs/list" exact component={JobsList} />
                    <Route path="/jobs/create" exact component={JobsInsert} />
                    <Route path="/job/update/:id" exact component={JobsUpdate} />
                    <Route path="/job/:id" exact component={JobInfo} />
                    <Route path="/candidate/list/" exact component={CandidateList} />
                    <Route path="/candidate/update/:id" exact component={CandidateUpdate} />
                    <Route path="/recruiter/update/:id" exact component={RecruiterUpdate} />
                    <Route path="/user/list" exact component={UserList} />
                    <Route path="/user/chat/:idFrom/:idTo" exact component={ChatPage} />
                    <Route path="/user/:id" exact render={(props) => <UserProfile {...props} currentUser={this.state.currentUser} />}/>
                    <Route path="/label/create" exact component={LabelInsert} />
                    <Route path="/label/list" exact component={LabelList} />
                    <Route path="/label/update/:id" exact component={LabelUpdate} />
                    <Route path="/company/create" exact component={CompanyInsert} />
                    <Route path="/company/list" exact component={CompanyList} />
                    <Route path="/company/update/:id" exact component={CompanyUpdate} />
                    <Route path="/company/:id" exact component={CompanyProfile} />
                </Switch>
            </Router>
        )
    }
}

export default App;
