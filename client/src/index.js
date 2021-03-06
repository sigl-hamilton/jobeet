import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './app'


ReactDOM.render(
	<Router>
		<Switch>
			<Route path="/" component={App} />
		</Switch>
	</Router>,
	document.getElementById("root")
);
