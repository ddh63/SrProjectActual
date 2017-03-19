import React, { Component } from 'react';

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

		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => this.setState({ user: result.user }));

		fetch('/api/getSingleMovie?id='+this.props.params.id)
			.then((response) => response.json())
			.then((result) => this.setState({ movie: result, loaded: true }));

	}

	render() {
		if (!this.state.loaded) return <Loading />;
		return (
			<div>
				<Nav user={this.state.user} />
				<div className="container">
					<div className="row">
						<div className="col-sm-4 poster well">
							<img src="/img/posterplaceholder.png" />
						</div>
						<div className="col-sm-8 well">
							<h1 className="text-center site"><strong>{this.state.movie[0].title}</strong> ({this.state.movie[0].year})</h1>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Movie;