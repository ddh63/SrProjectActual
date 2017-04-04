import React from 'react';
import PageLink from './PageLink';

const BrowseMovies = (props) => {
	let videos = null;
	// TODO: Get rid of count once more items added to database
	let count = 0;

	if (props.videos.length == 0) {
		videos = <h3 className="text-center site">No results found</h3>;
	}
	else {
		videos = props.videos.map((video) => {
			count++;
			return (
				<div className="col-md-3 col-xs-6" key={count}>
					<div className="well video">
						<PageLink to={"movie/"+video.id}>
							<img src="/img/posterplaceholder.png" />
							<h4 className="text-center video-title">{video.title}</h4>
						</PageLink>
						<div className="text-center video-year">{video.year}</div>
					</div>
				</div>
			);
		});
	}

	return (
		<div>
		<div className="row">
			{videos}
		</div>
		<div className="row">
			{videos}
		</div>
		<div className="row">
			{videos}
		</div>
		</div>
	);
}

export default BrowseMovies;