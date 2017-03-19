import React, { Component } from 'react';

import Loading from './Loading';
import Nav from './Nav';

class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			loaded: false
		}

		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => this.setState({ user: result.user, loaded: true }));
	}

	render() {
		if (!this.state.loaded) return <Loading />;
		return (
			<div>
				<Nav user={this.state.user} />
				<h1 className="video-title">{this.props.params.id}</h1>
			</div>
		);
	}
}

export default Movie;