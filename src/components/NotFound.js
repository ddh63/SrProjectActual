import React, { Component } from 'react';
import Nav from './Nav';
import PageLink from './PageLink';

class NotFound extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null
		}

		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => this.setState({ user: result.user }));
	}

 	render() {
 		document.title = "Page Not Found";
	 	return (
			<div>
				<Nav user={this.state.user} />
				<div className="container-fluid site">
					<div className="container flex-container">
						<div className="col-md-6">
							<h1 className="text-center logo-header">Page Not Found</h1>
							<div className="buttons text-center">
								<PageLink to="/" className="btn btn-success" role="button">Home</PageLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
 	}
}

export default NotFound;