import React from 'react';

import PageLink from './PageLink';

const NewReleases = (props) => {
	let videos = null;

	videos = props.videos.map((video) => {
		return (
			<div className="col-md-3 col-xs-6" key={video.id}>
				<div className="video">
					<PageLink to={"movie/"+video.id}>
						<img src="img/posterplaceholder.png" alt={video.title+" Poster"} />
						<h4 className="text-center video-title">{video.title}</h4>
					</PageLink>
					<div className="text-center video-year">{video.year}</div>
				</div>
			</div>
		);
	});

	return (
		<div className="new-release-banner">
			<h1 className="text-center site">Newest Releases</h1>
			<div className="buttons text-center" id="release-button-container">
				<button className="btn btn-success" id="movie-button" role="button" onClick={props.handleButtonClick}>Movies</button>
				<button className="btn btn-default" id="tv-button" role="button" onClick={props.handleButtonClick}>TV</button>
			</div>
			<div className="container">
				<div className="row">
					{videos}
				</div>
			</div>
		</div>
	);
}

export default NewReleases;