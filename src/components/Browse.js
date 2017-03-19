import React, { Component } from 'react';

import Loading from './Loading';
import Nav from './Nav';
import BrowseMovies from './BrowseMovies';

class Browse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			loaded: false
		};

		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => this.setState({ user: result.user, loaded: true }));
	}

	render() {
		if (!this.state.loaded) return <Loading />;
		return (
			<div>
				<Nav user={this.state.user} />
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-md-offset-3 well">
							<form className="search-form">
								<input name="search" autocomplete="off" type="search" placeholder="Search..." />
								<button className="btn btn-success button" type="submit">Search</button>
							</form>
						</div>
					</div>

					<BrowseMovies />
				</div>
			</div>
		);
	}

}

export default Browse;