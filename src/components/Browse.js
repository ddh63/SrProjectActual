import React, { Component } from 'react';

import Loading from './Loading';
import Nav from './Nav';
import BrowseMovies from './BrowseMovies';

class Browse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			loaded: false,
			videos: []
		};

		document.title = "Browse";

		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => this.setState({ user: result.user, loaded: true }));

		fetch('/api/getAllMovies')
      .then((response) => response.json())
      .then(result => this.setState({ videos: result }));
	}

	// TODO: Make the search into a stateless component controlled by this component
	render() {
		if (!this.state.loaded) return <Loading />;
		return (
			<div>
				<Nav user={this.state.user} />
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-md-offset-3 well">
							<form className="search-form">
								<input name="search" autoComplete="off" type="search" placeholder="Search..." />
								<button className="btn btn-success button" type="submit">Search</button>
							</form>
						</div>
					</div>

					<BrowseMovies videos={this.state.videos} />
				</div>
			</div>
		);
	}

}

export default Browse;