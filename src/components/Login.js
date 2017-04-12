import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import Nav from './Nav';
import FormContainer from './FormContainer';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usercheck: true,
			user: '',
			email: '',
			pass: '',
			confirmpass: ''
		}

		this.handleUsername = this.handleUsername.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleConfirmPass = this.handleConfirmPass.bind(this);

		this.loginSubmit = this.loginSubmit.bind(this);
		this.registerSubmit = this.registerSubmit.bind(this);
	}

	componentDidUpdate() {
		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => { 
				if (result.user)
					browserHistory.goBack(); 
			});
	}

	handleUsername(e) {
		this.setState({ user: e.target.value });
	}

	handleEmail(e) {
		this.setState({ email: e.target.value });
	}

	handlePassword(e) {
		this.setState({ pass: e.target.value });
	}
	handleConfirmPass(e) {
		this.setState({ confirmpass: e.target.value });
	}

	loginSubmit(e) {
		e.preventDefault();

		var data = {
			user: this.state.user,
			pass: this.state.pass
		};

		$.ajax({
			type: 'POST',
			url: '/api/login',
			data: data
		})
		.done((data) => {
			if (data == '')
				browserHistory.goBack();
			else
				$('#fail-message').html(data);
		})
		.fail((jqXhr) => {
			console.log("AJAX failure");
		})
	}

	registerSubmit(e) {
		e.preventDefault();

		var data = {
			user: this.state.user,
			email: this.state.email,
			pass: this.state.pass,
			confirmpass: this.state.confirmpass
		};

		$.ajax({
			type: 'POST',
			url: '/api/register',
			data: data
		})
		.done((data) => {
				if (data == '')
					browserHistory.goBack();
				else
					$('#fail-message').html(data);
		})
		.fail((jqXhr) => {
			console.log("AJAX failure");
		})
	}

	render() {
		return (
			<div>
				<Nav usercheck={this.state.usercheck} />
				<FormContainer 
					value={this.props.route.path} 
					userField={this.handleUsername}
					emailField={this.handleEmail}
					passField={this.handlePassword}
					confirmpassField={this.handleConfirmPass}
					loginSubmit={this.loginSubmit}
					registerSubmit={this.registerSubmit} />
			</div>
		);
	}
}

export default Login;