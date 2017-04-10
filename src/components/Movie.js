import React, { Component } from 'react';

import PageLink from './PageLink';
import Nav from './Nav';

class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: false,
			id: this.props.params.id,
			movie: []
		}

		var data = {
			type: 1,
			id: this.state.id || 1
		};

		$.ajax({
			type: 'POST',
			url: '/api/getSingleVideo',
			data: data
		})
		.done((data) => {
			this.setState({ movie: data });
		})
		.fail((jqXhr) => {
			console.log("AJAX failure");
		});	

		this.getUser = this.getUser.bind(this);
	}

	getUser(username) {
		this.setState({ user: username });
	}

	render() {
		if (typeof this.state.movie[0] === 'undefined') {
			document.title = "Loading";
			return (
				<div>
					<Nav />
				</div>
			);
		}

		document.title = this.state.movie[0].title + " (" + this.state.movie[0].year + ")";

		let numGenres = this.state.movie[0].genres.length;
		let count = 0;
		let genres = this.state.movie[0].genres.map((genre) => {
			count++;
			if (count != numGenres) {
				return (
					<span key={genre.id}>{genre.genre}, </span>
				);
			}
			else {
				return (
					<span key={genre.id}>{genre.genre}</span>
				);
			}
		});

		let button = null;

		if (!this.state.user) {
			button = <PageLink to="/login" className="btn btn-success">Login to Watch/Purchase</PageLink>;
		}
		else {
			button = <PageLink to={"/video/1/"+this.state.id} className="btn btn-success">Watch</PageLink>
		}

		return (
			<div>
				<Nav 
					getUser={this.getUser} />
				<div className="container well">
					<div className="row">
						<div className="col-sm-4 poster">
							<img src="/img/posterplaceholder.png" />
						</div>
						<div className="col-sm-8">
							<h1 className="site"><strong>{this.state.movie[0].title}</strong> ({this.state.movie[0].year})</h1>
							<span className="site">Genres: {genres}</span>
						</div>
					</div>

					<div className="row">
						<div className="col-xs-12 buttons text-center">
							{button}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Movie;