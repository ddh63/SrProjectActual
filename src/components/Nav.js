import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PageLink from './PageLink';

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: false,
			loaded: false
		}

		if (typeof this.props.usercheck === 'undefined') {
			fetch('/api/isLoggedIn')
				.then((response) => response.json())
				.then((result) => { 
					this.setState({ user: result.user, loaded: true })
					// When user is needed on page other than nav
					if (typeof this.props.getUser !== 'undefined')
						this.props.getUser(result.user);
				});
		}
		// Used to redirect when logged in on login/register page
		else {
			fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => { 
				this.setState({ user: result.user, loaded: true });
				if (this.state.user)
					browserHistory.goBack();
			});
		}

	}

	render() {
		if (this.props.getUser !== 'undefined')


		if (!this.state.loaded) {
			return (
				<nav className="navbar navbar-inverse">
					<div className="container-fluid">
						<div className="navbar-header">
							<PageLink to="/" className="navbar-brand">Brand Name</PageLink>
						</div>
					</div>
				</nav>
			);
		}
		else {
			let navlinks = null;

			if (!this.state.user) {
				navlinks = (
					<ul className="nav navbar-nav navbar-right">
						<li><PageLink to="/browse">Browse</PageLink></li>
						<li><PageLink to="/register">Register</PageLink></li>
						<li><PageLink to="/login">Login</PageLink></li>
					</ul>
				);
			}
			else {
				navlinks = (
					<ul className="nav navbar-nav navbar-right">
						<li><PageLink to="/browse">Browse</PageLink></li>
						<li><PageLink to="/cart">Cart</PageLink></li>
						<li><PageLink to="/account">{this.state.user}</PageLink></li>
					</ul>
				);
			}

			return (
				<nav className="navbar navbar-inverse">
					<div className="container-fluid">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#collapse-items" aria-expanded="false">
								<span className="sr-only">Toggle Navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<PageLink to="/" className="navbar-brand">Brand Name</PageLink>
						</div>

						<div className="collapse navbar-collapse" id="collapse-items">
							{navlinks}
						</div>
					</div>
				</nav>
			)
		}

	}
}

export default Nav;