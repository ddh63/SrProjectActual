import React, { Component } from 'react';
import PageLink from './PageLink';

class HomeLanding extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div className="container-fluid site">
				<div className="container flex-container">
					<div className="col-md-6">
						<h1 className="text-center logo-header">Streaming Site</h1>
						<p className="text-center main-description">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
							tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
							quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
							consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
							proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
						<div className="buttons text-center">
							<PageLink to="login" className="btn btn-success" role="button">Login</PageLink>
							<PageLink to="register" className="btn btn-default" role="button">Register</PageLink>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default HomeLanding;