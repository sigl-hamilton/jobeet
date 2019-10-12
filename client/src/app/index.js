
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { JobsList, JobsInsert, JobsUpdate, CandidateList, CandidateUpdate, UserProfile, UserList, CompanyCreate, CompaniesList, CompanyProfile, SignUp, LogIn} from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
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
                <Route path="/company/create" exact component={CompanyCreate}/>
                <Route path="/company/list" exact component={CompaniesList}/>
                <Route path="/company/:id" exact component={CompanyProfile}/>
            </Switch>
        </Router>
    )
}

export default App
