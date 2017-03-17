import React, { Component } from 'react';
import Nav from './Nav';
import FormContainer from './FormContainer';
import { browserHistory } from 'react-router';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null
		}

		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => { 
				this.setState({ user: result.user }); 
				if (this.state.user != null)
					browserHistory.push('/'); 
			});
	
		
	}

	render() {
		return (
			<div>
				<Nav user={this.state.user} />
				<FormContainer value={this.props.route.path} />
			</div>
		);
	}
}

export default Login;