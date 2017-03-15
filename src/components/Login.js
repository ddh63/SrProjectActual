import React, { Component } from 'react';
import Nav from './Nav';
import FormContainer from './FormContainer';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div>
				<Nav />
				<FormContainer value={this.props.route.path} />
			</div>
		);
	}
}

export default Login;