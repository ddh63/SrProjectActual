import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Home from './Home';
import Login from './Login';
import NotFound from './NotFound';

const Routes = (
	<Router history={browserHistory} >
		<Route path="/" component={Home} />
		<Route path="login" component={Login} />
		<Route path="register" component={Login} />
		<Route path="*" component={NotFound} />
	</Router>
);

export default Routes;