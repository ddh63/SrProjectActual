import React from 'react';

import PageLink from './PageLink';

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
				<h1 className="text-center site"><PageLink to={"/movie/"+props.video.id}>{props.video.title} ({props.video.year})</PageLink></h1>
				<p className="text-center site">{genres}</p>
				<p className="site video-plot">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</div>
		</div>
	);
}

export default VideoDescription;