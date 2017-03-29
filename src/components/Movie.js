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
			id: this.props.params.id,
			movie: []
		}
	}

	componentWillMount() {
		if (this.state.id == undefined) {
			this.setState({ id: 1 });
			this.fetchMovie(1);
		}
		else
			this.fetchMovie(this.state.id);

		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => this.setState({ user: result.user }));	
	}

	fetchMovie(id) {
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

					<div className="row">
						<div className="col-xs-12 buttons text-center">
							<a href={"/video/1/"+this.state.id} className="btn btn-success">Watch</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Movie;