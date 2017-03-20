import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		let form = null;

		if (this.props.value == "login") {
			form = (
				<div>
					<div id="fail-message" className="text-center text-danger"></div>
					<form id="login-form" role="form" onSubmit={this.props.loginSubmit}>
						<div className="form-group">
							<input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" onChange={this.props.userField} />
						</div>
						<div className="form-group">
							<input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" onChange={this.props.passField} />
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
					<form id="register-form" role="form" onSubmit={this.props.registerSubmit}>
						<div className="form-group">
							<input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" onChange={this.props.userField} />
						</div>
						<div className="form-group">
							<input type="email" name="email" id="email" tabIndex="1" className="form-control" placeholder="Email Address" onChange={this.props.emailField} />
						</div>
						<div className="form-group">
							<input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" onChange={this.props.passField} />
						</div>
						<div className="form-group">
							<input type="password" name="confirmpassword" id="confirm-password" tabIndex="2" className="form-control" placeholder="Confirm Password" onChange={this.props.confirmpassField} />
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