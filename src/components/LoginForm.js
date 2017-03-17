import React, { Component } from 'react';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		let form = null;

		if (this.props.value == "login") {
			form = (
				<form id="login-form" action="/api/login" method="post" role="form">
					<div className="form-group">
						<input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" />
					</div>
					<div className="form-group">
						<input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" />
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-sm-6 col-sm-offset-3">
								<input type="submit" name="login-submit" id="login-submit" tabIndex="3" className="form-control btn btn-success btn-logreg" value="Log In" />
							</div>
						</div>
					</div>
				</form>
			);
		}
		else {
			form = (
				<form id="register-form" action="/api/register" method="post" role="form">
					<div className="form-group">
						<input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" />
					</div>
					<div className="form-group">
						<input type="email" name="email" id="email" tabIndex="1" className="form-control" placeholder="Email Address" />
					</div>
					<div className="form-group">
						<input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" />
					</div>
					<div className="form-group">
						<input type="password" name="confirmpassword" id="confirm-password" tabIndex="2" className="form-control" placeholder="Confirm Password" />
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-sm-6 col-sm-offset-3">
								<input type="submit" name="register-submit" id="register-submit" tabIndex="3" className="form-control btn btn-success btn-logreg" value="Register" />
							</div>
						</div>
					</div>
				</form>
			);
		}

		return (
			<div>{form}</div>
		);
	}
}

export default LoginForm;