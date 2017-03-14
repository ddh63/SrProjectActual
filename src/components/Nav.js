import React, { Component } from 'react';

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
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
						<a className="navbar-brand" href="index.html">Brand Name</a>
					</div>

					<div className="collapse navbar-collapse" id="collapse-items">
						<ul className="nav navbar-nav navbar-right">
							<li><a href="browse.html">Browse</a></li>
							<li><a href="#">Link 2</a></li>
							<li><a href="#">Link 3</a></li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}

export default Nav;