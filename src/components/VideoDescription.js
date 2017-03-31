import React from 'react';

const VideoDescription = (props) => {
	let numGenres = props.video.genres.length;
	let count = 0;
	let genres = props.video.genres.map((genre) => {
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
			<div className="container well description-title">
				<h1>{props.video.title}</h1>
				<p>{props.video.year}</p>
			</div>
			<div className="container well description">
				<span>Genres: {genres}</span>
			</div>
		</div>
	);
}

export default VideoDescription;