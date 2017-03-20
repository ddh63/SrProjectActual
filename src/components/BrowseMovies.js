import React, { Component } from 'react';

class BrowseMovies extends Component {
	constructor(props) {
		super(props);
		// TODO: Make a video type state to know to link to movie/tv/other
		this.state = {
			videos: []
		}
		
		// TODO: Move this up to the browse component and make this a stateless component
		fetch('/api/getAllMovies')
      .then((response) => response.json())
      .then(result => this.setState({ videos: result }));
	}

	render() {
		let videos = this.state.videos.map((video) => {
			return (
				<div className="col-md-3 col-sm-6" key={video.id}>
					<div className="well video">
						<img src="img/posterplaceholder.png" />
						<h4 className="text-center video-title"><strong>{video.title}</strong> ({video.year})</h4>
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
}

export default BrowseMovies;