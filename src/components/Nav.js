import React, { Component } from 'react';
import PageLink from './PageLink';

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		let navlinks = null;

		if (this.props.user == null) {
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
					<li><PageLink to="browse">Browse</PageLink></li>
					<li><a href="#">{this.props.user}</a></li>
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

export default Nav;