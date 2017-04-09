import React, { Component } from 'react';

import Nav from './Nav';

class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
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

		return (
			<div>
				<Nav />
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
							<a href={"/video/1/"+this.state.id} className="btn btn-success">Watch</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Movie;