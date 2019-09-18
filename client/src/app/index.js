
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { JobsList, JobsInsert, JobsUpdate, CandidateList} from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/jobs/list" exact component={JobsList} />
                <Route path="/jobs/create" exact component={JobsInsert} />
                <Route path="/jobs/update/:id" exact component={JobsUpdate} />
                <Route path="/candidate/list/" exact component={CandidateList} />
            </Switch>
        </Router>
    )
}

export default App
