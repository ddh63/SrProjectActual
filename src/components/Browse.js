import React, { Component } from 'react';

import Loading from './Loading';
import Nav from './Nav';
import BrowseSearch from './BrowseSearch';
import BrowseMovies from './BrowseMovies';

class Browse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			loaded: false,
			search: '',
			videos: []
		};

		document.title = "Browse";

		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => this.setState({ user: result.user, loaded: true }));

		fetch('/api/getAllMovies')
      .then((response) => response.json())
      .then(result => this.setState({ videos: result }));

    this.handleSearch = this.handleSearch.bind(this);
		this.searchSubmit = this.searchSubmit.bind(this);
	}

	handleSearch(e) {
		this.setState({ search: e.target.value });
	}

	searchSubmit(e) {
		e.preventDefault();

		var data = {
			'search': this.state.search
		}

		$.ajax({
			type: 'POST',
			url: '/api/getSearch',
			data: data
		})
		.done((data) => {
			this.setState({ videos: data });
		})
		.fail((jqXhr) => {
			console.log("AJAX failure");
		})
	}

	render() {
		if (!this.state.loaded) return <Loading />;
		return (
			<div>
				<Nav user={this.state.user} />
				<div className="container">
					<BrowseSearch 
					handleSearch={this.handleSearch}
					handleSubmit={this.searchSubmit} />

					<BrowseMovies videos={this.state.videos} />
				</div>
			</div>
		);
	}

}

export default Browse;