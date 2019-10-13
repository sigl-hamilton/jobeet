
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { NavBar } from '../components'
import { UserProfile, SignUp, LogIn, UserList } from '../pages'
import { JobsList, JobsInsert, JobsUpdate} from '../pages'
import { CandidateList, CandidateUpdate } from '../pages'
import { LabelList, LabelInsert, LabelUpdate} from '../pages'
import { CompanyList, CompanyInsert, CompanyUpdate, CompanyProfile} from '../pages'


import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faPen);

class App extends Component {
    render() {
        return (
            <Router>
                <NavBar />
                <Switch>
                    <Route path="/signup" exact component={SignUp} />
                    <Route path="/login" exact component={LogIn} />
                    <Route path="/jobs/list" exact component={JobsList} />
                    <Route path="/jobs/create" exact component={JobsInsert} />
                    <Route path="/jobs/update/:id" exact component={JobsUpdate} />
                    <Route path="/candidate/list/" exact component={CandidateList} />
                    <Route path="/candidate/update/:id" exact component={CandidateUpdate} />
                    <Route path="/user/list" exact component={UserList} />
                    <Route path="/user/:id" exact component={UserProfile} />
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
