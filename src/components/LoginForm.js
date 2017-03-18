import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
					browserHistory.push('/');
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
					browserHistory.push('/');
				else
					$('#fail-message').html(data);
		})
		.fail((jqXhr) => {
			console.log("AJAX failure");
		})
	}

	render() {
		let form = null;

		if (this.props.value == "login") {
			form = (
				<div>
					<div id="fail-message" className="text-center text-danger"></div>
					<form id="login-form" role="form" onSubmit={this.loginSubmit}>
						<div className="form-group">
							<input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" onChange={this.handleUsername} />
						</div>
						<div className="form-group">
							<input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" onChange={this.handlePassword} />
						</div>
						<div className="form-group">
							<div className="row">
								<div className="col-sm-6 col-sm-offset-3">
									<input type="submit" name="login-submit" id="login-submit" tabIndex="3" className="form-control btn btn-success btn-logreg" value="Log In" />
								</div>
							</div>
						</div>
					</form>
				</div>
			);
		}
		else {
			form = (
				<div>
					<div id="fail-message" className="text-center text-danger"></div>
					<form id="register-form" role="form" onSubmit={this.registerSubmit}>
						<div className="form-group">
							<input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" onChange={this.handleUsername} />
						</div>
						<div className="form-group">
							<input type="email" name="email" id="email" tabIndex="1" className="form-control" placeholder="Email Address" onChange={this.handleEmail} />
						</div>
						<div className="form-group">
							<input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" onChange={this.handlePassword} />
						</div>
						<div className="form-group">
							<input type="password" name="confirmpassword" id="confirm-password" tabIndex="2" className="form-control" placeholder="Confirm Password" onChange={this.handleConfirmPass} />
						</div>
						<div className="form-group">
							<div className="row">
								<div className="col-sm-6 col-sm-offset-3">
									<input type="submit" name="register-submit" id="register-submit" tabIndex="3" className="form-control btn btn-success btn-logreg" value="Register" />
								</div>
							</div>
						</div>
					</form>
				</div>
			);
		}

		return (
			<div>{form}</div>
		);
	}
}

export default LoginForm;