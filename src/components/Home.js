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
			releasetype: 'movies',
			videos: []
		}

		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => this.setState({ user: result.user, loaded: true }));

		$.ajax({
			type: 'POST',
			url: '/api/getNewestReleases',
			data: { releasetype: this.state.releasetype }
		})
		.done((data) => {
			this.setState({ videos: data });
		})
		.fail((jqXhr) => {
			console.log("AJAX failure");
		});

		this.handleButtonClick = this.handleButtonClick.bind(this);
	}

	handleButtonClick(e) {
		var nextState;
		var nextStateSet = false;
		var buttons = document.querySelectorAll('#release-button-container button');
		
		if (e.target.id == 'movie-button' && this.state.releasetype != 'movies') {
			nextState = 'movies';
			nextStateSet = true;

			buttons.forEach((button) => {
				if (button.classList.contains('btn-success')) {
					button.classList.remove('btn-success');
					button.classList.add('btn.default');
				}
			});

			e.target.classList.remove('btn-default');
			e.target.classList.add('btn-success');
		}
		else if (e.target.id == 'tv-button' && this.state.releasetype != 'tv') {
			nextState = 'tv';
			nextStateSet = true;

			buttons.forEach((button) => {
				if (button.classList.contains('btn-success')) {
					button.classList.remove('btn-success');
					button.classList.add('btn.default');
				}
			});
			
			e.target.classList.remove('btn-default');
			e.target.classList.add('btn-success');
		}

		if (nextStateSet) {
			$.ajax({
				type: 'POST',
				url: '/api/getNewestReleases',
				data: { releasetype: nextState }
			})
			.done((data) => {
				this.setState({ videos: data });
			})
			.fail((jqXhr) => {
				console.log("AJAX failure");
			});
		}

		this.setState({ releasetype: nextState });
	}

  render() {
  	if (!this.state.loaded) return <Loading />;
    return (
      <div>
      	<Nav user={this.state.user} />
      	<HomeLanding user={this.state.user} />
      	<NewReleases 
      		videos={this.state.videos}
      		handleButtonClick={this.handleButtonClick} />
      </div>
    );
  }
}

export default Home;
