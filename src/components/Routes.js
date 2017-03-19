import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Home from './Home';
import Login from './Login';
import Browse from './Browse';
import Movie from './Movie';
import NotFound from './NotFound';

const Routes = (
	<Router history={browserHistory} >
		<Route path="/" component={Home} />
		<Route path="login" component={Login} />
		<Route path="register" component={Login} />
		<Route path="browse" component={Browse} />
		<Route path="movie(/:id)" component={Movie} />
		<Route path="*" component={NotFound} />
	</Router>
);

export default Routes;