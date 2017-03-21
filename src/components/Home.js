import React, { Component } from 'react';
import Nav from './Nav';
import HomeLanding from './HomeLanding';
import Loading from './Loading';
import NewReleases from './NewReleases';

class Home extends Component {
	constructor(props) {
		super(props);
    	document.title = "Streaming Site";
		this.state = {
			user: null,
			loaded: false,
			videos: []
		}

		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => this.setState({ user: result.user, loaded: true }));

		$.ajax({
			type: 'POST',
			url: '/api/getNewestReleases',
		})
		.done((data) => {
			this.setState({ videos: data });
			console.log(this.state.videos);
		})
		.fail((jqXhr) => {
			console.log("AJAX failure");
		})

	}

  render() {
  	if (!this.state.loaded) return <Loading />;
    return (
      <div>
      	<Nav user={this.state.user} />
      	<HomeLanding user={this.state.user} />
      	<NewReleases videos={this.state.videos} />
      </div>
    );
  }
}

export default Home;
