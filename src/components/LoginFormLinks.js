import React, { Component } from 'react';
import PageLink from './PageLink';

class LoginFormLinks extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		let links = null;

			if (this.props.value == "login") {
				document.title = "Login";
				links = (
					<div className="row">
						<div className="col-xs-6">
							<PageLink to="login" className="active">Login</PageLink>
						</div>
						<div className="col-xs-6">
							<PageLink to="register">Register</PageLink>
						</div>
					</div>
				);
			}
			else {
				document.title = "Register";
				links = (
					<div className="row">
						<div className="col-xs-6">
							<PageLink to="login">Login</PageLink>
						</div>
						<div className="col-xs-6">
							<PageLink to="register" className="active">Register</PageLink>
						</div>
					</div>
				);
			}

		return (
			<div>
				{links}
			</div>
		);
	}
}

export default LoginFormLinks;