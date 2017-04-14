import React, { Component } from 'react';

import Nav from './Nav';
import BrowseMovies from './BrowseMovies';

class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: false,
			loaded: false,
			movies: []
		}

		// Nav didn't update on initial load of this page
		// So put the user check here
		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => { 
				this.setState({ user: result.user, loaded: true }) 
			});

	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.user != prevState.user) {
			var data = {
				user: this.state.user
			}

			$.ajax({
				type: "POST",
				url: "/api/getOwnedVideos",
				data: data
			})
			.done((data) => {
				this.setState({ movies: data });
			})
			.fail((jqXhr) => {
				console.log("AJAX failure");
			});
		}
	}

	render() {
		return (
			<div>
				<Nav />

				{this.state.user && this.state.loaded &&
					<div className="container">
						<h1 className="text-center site">Owned videos</h1>
						<BrowseMovies
							videos={this.state.movies} />
					</div>
				}

			</div>
		);
	}
}

export default Account;