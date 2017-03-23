import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import Loading from './Loading';
import Nav from './Nav';

class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			loaded: false,
			movie: []
		}

		let id = this.props.params.id;

		// if the id in the url is missing, just take user to movie with id 1
		if (id == undefined) {
			id = 1;
		}

		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => this.setState({ user: result.user }));

		fetch('/api/getSingleMovie?id='+id)
			.then((response) => response.json())
			.then((result) => this.setState({ movie: result, loaded: true }));
			
	}

	render() {
		if (!this.state.loaded) return <Loading />;
		document.title = this.state.movie[0].title + " (" + this.state.movie[0].year + ")";
		return (
			<div>
				<Nav user={this.state.user} />
				<div className="container well">
					<div className="row">
						<div className="col-sm-4 poster">
							<img src="/img/posterplaceholder.png" />
						</div>
						<div className="col-sm-8">
							<h1 className="text-center site"><strong>{this.state.movie[0].title}</strong> ({this.state.movie[0].year})</h1>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Movie;