import React from 'react';

import PageLink from './PageLink';

const NewReleases = (props) => {
	let videos = null;

	videos = props.videos.map((video) => {
		return (
			<div className="col-md-3 col-sm-6" key={video.id}>
				<div className="video">
					<PageLink to={"movie/"+video.id}><img src="img/posterplaceholder.png" /></PageLink>
					<PageLink to={"movie/"+video.id}><h4 className="text-center video-title"><strong>{video.title}</strong> ({video.year})</h4></PageLink>
				</div>
			</div>
		);
	});

	return (
		<div className="new-release-banner">
			<h1 className="text-center site">Newest Releases</h1>
			<div className="container">
				<div className="row">
					{videos}
				</div>
			</div>
		</div>
	);
}

export default NewReleases;