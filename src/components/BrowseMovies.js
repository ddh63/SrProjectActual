import React from 'react';
import PageLink from './PageLink';

const BrowseMovies = (props) => {
	let videos = props.videos.map((video) => {
		return (
			<div className="col-md-3 col-sm-6" key={video.id}>
				<div className="well video">
					<PageLink to={"movie/"+video.id}><img src="img/posterplaceholder.png" /></PageLink>
					<PageLink to={"movie/"+video.id}><h4 className="text-center video-title"><strong>{video.title}</strong> ({video.year})</h4></PageLink>
				</div>
			</div>
		);
	});

	return (
		<div className="row">
			{videos}
		</div>
	);
}

export default BrowseMovies;