import React, { Component } from 'react';

import Nav from './Nav';
import { browserHistory } from 'react-router';
import Loading from './Loading';

class Video extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			loaded: false,
			volumeLevel: 1,
			mousedown: false,
			fullscreen: false
		}
	}

	componentWillMount() {
		if (this.props.params.type == undefined || this.props.params.id == undefined)
			browserHistory.push('/browse');
		else {
			fetch('/api/isLoggedIn')
				.then((response) => response.json())
				.then((result) => this.setState({ user: result.user, loaded: true }));
		}
	}

	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyPresses);
    document.addEventListener("keyup", this.togglePlayOnSpace);
    document.addEventListener('webkitfullscreenchange', this.exitHandler.bind(this));
		document.addEventListener('mozfullscreenchange', this.exitHandler.bind(this));
		document.addEventListener('fullscreenchange', this.exitHandler.bind(this));
		document.addEventListener('MSFullscreenChange', this.exitHandler.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPresses);
    document.removeEventListener("keyup", this.togglePlayOnSpace);
    document.removeEventListener('webkitfullscreenchange', this.exitHandler.bind(this));
		document.removeEventListener('mozfullscreenchange', this.exitHandler.bind(this));
		document.removeEventListener('fullscreenchange', this.exitHandler.bind(this));
		document.removeEventListener('MSFullscreenChange', this.exitHandler.bind(this));
  }

  handleKeyPresses(e) {
  	// Stops spacebar press from scrolling down
  	if (e.keyCode == 32 && e.target == document.body) {
			e.preventDefault();
		}
		// Sets video forward or backward 10 seconds based on arrow key press
		if (e.keyCode == 37 || e.keyCode == 39) {
			let video = document.querySelector('.html-video');
			if (e.keyCode == 37)
				video.currentTime += parseFloat(-10);
			else
				video.currentTime += parseFloat(10);
		}
  }

	togglePlay() {
		let video = document.querySelector('.html-video');
		video.paused ? video.play() : video.pause();
	}

	// togglePlay currently copy/pasted into this 
	// because it doesn't recognize togglePlay function for some reason
	togglePlayOnSpace(e) {
		if (e.keyCode == 32) {
			e.preventDefault();
			let video = document.querySelector('.html-video');
			video.paused ? video.play() : video.pause();
		}
	}

	updateButton() {
		let toggle = document.querySelector('.toggle');
		let video = document.querySelector('.html-video');
		toggle.innerHTML = video.paused ? '<i class="icon-play"></i>' : '<i class="icon-pause"></i>';
	}

	skip(i) {
		let video = document.querySelector('.html-video');
		video.currentTime += parseFloat(i);
	}

	handleVolumeUpdate(e) {
		let video = document.querySelector('.html-video');
		video['volume'] = e.target.value;
		this.setState({ volumeLevel: video['volume'] });
		this.changeVolumeIcon(video['volume']);
	}

	volumeToggle() {
		let video = document.querySelector('.html-video');
		let volume = document.querySelector('.player-slider');
		let volumeButton = document.querySelector('.volume-toggle');
		if (video['volume'] > 0) {
			video['volume'] = 0;
			volume.value = 0;
			volumeButton.innerHTML = "<i class='icon-volume-off'></i>";
		}
		else {
			video['volume'] = this.state.volumeLevel;
			volume.value = video['volume'];
			this.changeVolumeIcon(video['volume']);
		}
	}

	changeVolumeIcon(vol) {
		let volume = document.querySelector('.player-slider');
		let volumeButton = document.querySelector('.volume-toggle');
		if (vol == 0)
			volumeButton.innerHTML = "<i class='icon-volume-off'></i>";
		else if (vol < 0.8)
			volumeButton.innerHTML = "<i class='icon-volume-down'></i>";
		else
			volumeButton.innerHTML = "<i class='icon-volume-up'></i>";
	}

	handleProgress() {
		let video = document.querySelector('.html-video');
		let progressBar = document.querySelector('.progress-filled');
		let current = document.querySelector('.current');
		let end = document.querySelector('.end');
		const percent = (video.currentTime / video.duration) * 100;
		progressBar.style.flexBasis = `${percent}%`;

		let currentMinutes = Math.floor(video.currentTime / 60);
		let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
		let durationMinutes = Math.floor(video.duration / 60);
		let durationSeconds = Math.ceil(video.duration - durationMinutes * 60);
		if (currentSeconds < 10)
			currentSeconds = "0" + currentSeconds;
		if (durationSeconds < 10)
			durationSeconds = "0" + durationSeconds;
		current.innerHTML = currentMinutes + ":" + currentSeconds;
		end.innerHTML = durationMinutes + ":" + durationSeconds;
	}

	scrub(e) {
		let video = document.querySelector('.html-video');
		let progress = document.querySelector('.progress-bar');
		const scrubTime = (e.nativeEvent.offsetX / progress.offsetWidth) * video.duration;
		video.currentTime = scrubTime;
	}

	scrubCheck(e) {
		if (this.state.mousedown)
			this.scrub(e);
	}

	scrubSet() {
		this.setState({ mousedown: true });
	}

	scrubUnset() {
		this.setState({ mousedown: false });
	}

	screenSizeToggle(e) {
		let video = document.querySelector('.html-video');
		let screenSizeButton = document.querySelector('.screen-toggle');
		if (e && e.nativeEvent.offsetX == 0 && e.nativeEvent.offsetY == 0)
			return;

		// Remove fullscreen
		if (this.state.fullscreen) {
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

	exitHandler() {
		let screenSizeButton = document.querySelector('.screen-toggle');
		if (this.state.fullscreen) {
			screenSizeButton.innerHTML = '<i class="icon-resize-full"></i>';
			this.setState({ fullscreen: false });
	  }
	  else
	  	this.setState({ fullscreen: true });
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
							onLoadedData={this.handleProgress}
							onClick={this.togglePlay}
							onPlay={this.updateButton}
							onPause={this.updateButton}
							onTimeUpdate={this.handleProgress}></video>

						<div className="player-controls">
							<div className="progress-bar"
								onClick={this.scrub}
								onMouseMove={this.scrubCheck.bind(this)}
								onMouseDown={this.scrubSet.bind(this)}
								onMouseUp={this.scrubUnset.bind(this)}>
								<div className="progress-filled"></div>
							</div>
							<button className="player-button toggle" 
								title="Toggle Play"
								onClick={this.togglePlay}>
								<i className="icon-play"></i>
							</button>
							<span className="time current"></span>
							<span className="slash">/</span>
							<span className="time end"></span>
							<button className="player-button volume-toggle"
								onClick={this.volumeToggle.bind(this)}>
								<i className="icon-volume-up"></i>
							</button>
							<input type="range" name="volume" className="player-slider" min="0" max="1" step="0.05" defaultValue="1" 
								onChange={this.handleVolumeUpdate.bind(this)} />
							<button className="player-button"
								onClick={this.skip.bind(null, -10)}>
								<i className="icon-step-backward"></i>
							</button>
							<button className="player-button"
								onClick={this.skip.bind(null, 10)}>
								<i className="icon-step-forward"></i>
							</button>
							<button className="player-button screen-toggle"
								onClick={this.screenSizeToggle.bind(this)}>
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