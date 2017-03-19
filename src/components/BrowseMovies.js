import React, { Component } from 'react';

class BrowseMovies extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div className="row">
				<div className="col-md-3 col-sm-6">
					<div className="well video">
						<img src="img/posterplaceholder.png" />
						<h4 className="text-center">Video Title</h4>
					</div>
				</div>
			</div>
		);
	}
}

export default BrowseMovies;