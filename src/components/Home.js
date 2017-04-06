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

		this.makeAjaxCall(this.state.releasetype);

		this.handleButtonClick = this.handleButtonClick.bind(this);

		$.ajax({
			type: 'POST',
			url: '/api/check',
		})
		.done((data) => {
			// Count
			console.log(data[0]);
			// Videos
			console.log(data[1]);
		})
		.fail((jqXhr) => {
			console.log("AJAX failure");
		});
	}

	makeAjaxCall(releasetype) {
		$.ajax({
			type: 'POST',
			url: '/api/getNewestReleases',
			data: { releasetype: releasetype }
		})
		.done((data) => {
			this.setState({ videos: data });
		})
		.fail((jqXhr) => {
			console.log("AJAX failure");
		});
	}

	addRemoveClass(buttonList, targetItem) {
		buttonList.forEach((button) => {
			if (button.classList.contains('btn-success')) {
				button.classList.remove('btn-success');
				button.classList.add('btn.default');
			}
		});

		targetItem.classList.remove('btn-default');
		targetItem.classList.add('btn-success');
	}

	handleButtonClick(e) {
		var nextState;
		var nextStateSet = false;
		var buttons = document.querySelectorAll('#release-button-container button');
		
		if (e.target.id == 'movie-button' && this.state.releasetype != 'movies') {
			nextState = 'movies';
			nextStateSet = true;
			this.addRemoveClass(buttons, e.target);			
		}
		else if (e.target.id == 'tv-button' && this.state.releasetype != 'tv') {
			nextState = 'tv';
			nextStateSet = true;
			this.addRemoveClass(buttons, e.target);
		}

		if (nextStateSet) {
			this.makeAjaxCall(nextState);
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
