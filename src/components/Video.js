import React, { Component } from 'react';

import Nav from './Nav';
import Loading from './Loading';

class Video extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			loaded: false
		}

		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => this.setState({ user: result.user, loaded: true }));

		this.togglePlay = this.togglePlay.bind(this);
	}

	togglePlay() {
		let video = document.querySelector('.html-video');
		video.paused ? video.play() : video.pause();
	}

	screenSizeToggle(e) {
		if (e && e.offsetX == 0 && e.offsetY == 0)
			return;

		// Remove fullscreen
		if (fullscreen) {
			if (document.exitFullscreen)
				document.exitFullscreen();
			else if (document.webkitExitFullscreen)
				document.webkitExitFullscreen();
			else if (document.mozCancelFullScreen)
				document.mozCancelFullScreen();
			else if (document.msExitFullscreen)
				document.msExitFullscreen();

			screenSizeButton.innerHTML = '<i class="icon-resize-full"></i>';
		}
		// Become fullscreen
	  else {
		  if (video.requestFullscreen)
				video.requestFullscreen();
			else if (video.webkitRequestFullscreen)
				video.webkitRequestFullscreen();
			else if (player.mozRequestFullScreen)
				player.mozRequestFullScreen();
			else if (video.msRequestFullscreen)
				video.msRequestFullscreen();

			screenSizeButton.innerHTML = '<i class="icon-resize-small"></i>';
		}
	}

	render() {
		if (!this.state.loaded) return <Loading />;
		return (
			<div>
				<Nav user={this.state.user} />
				<div className="player-container">
					<div className="player">
						<video className="video-player html-video" 
							src="https://media.w3.org/2010/05/sintel/trailer.mp4"
							onClick={this.togglePlay}></video>

						<div className="player-controls">
							<div className="progress-bar">
								<div className="progress-filled"></div>
							</div>
							<button className="player-button toggle" title="Toggle Play">
								<i className="icon-play"></i>
							</button>
							<button className="player-button volume-toggle">
								<i className="icon-volume-up"></i>
							</button>
							<input type="range" name="volume" className="player-slider" min="0" max="1" step="0.05" defaultValue="1" />
							<button data-skip="-10" className="player-button">
								<i className="icon-step-backward"></i>
							</button>
							<button data-skip="10" className="player-button">
								<i className="icon-step-forward"></i>
							</button>
							<button className="player-button screen-toggle">
								<i className="icon-resize-full"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Video;