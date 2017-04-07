import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import Nav from './Nav';
import Loading from './Loading'
import VideoPlayer from './VideoPlayer';
import VideoDescription from './VideoDescription';

class Video extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			loaded: false,
			volumeLevel: 1,
			mousedown: false,
			fullscreen: false,
			type: this.props.params.type,
			id: this.props.params.id,
			video: []
		}
	}

	componentWillMount() {
		if (this.props.params.type == undefined || this.props.params.id == undefined)
			browserHistory.push('/browse');
		else {
			var data = {
				type: this.state.type,
				id: this.state.id
			};

			$.ajax({
				type: 'POST',
				url: '/api/getSingleVideo',
				data: data
			})
			.done((data) => {
				if (data == '')
					browserHistory.push('/browse');
				else {
					this.setState({ video: data });
					fetch('/api/isLoggedIn')
						.then((response) => response.json())
						.then((result) => this.setState({ user: result.user, loaded: true }));
				}
			})
			.fail((jqXhr) => {
				console.log("AJAX failure");
			});
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
		toggle.innerHTML = video.paused ? '<i class="fa fa-play"></i>' : '<i class="fa fa-pause"></i>';
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
			volumeButton.innerHTML = "<i class='fa fa-volume-off'></i>";
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
			volumeButton.innerHTML = "<i class='fa fa-volume-off'></i>";
		else if (vol < 0.8)
			volumeButton.innerHTML = "<i class='fa fa-volume-down'></i>";
		else
			volumeButton.innerHTML = "<i class='fa fa-volume-up'></i>";
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

			screenSizeButton.innerHTML = '<i class="fa fa-expand"></i>';
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

			screenSizeButton.innerHTML = '<i class="fa fa-compress"></i>';
		}
	}

	exitHandler() {
		let screenSizeButton = document.querySelector('.screen-toggle');
		if (this.state.fullscreen) {
			screenSizeButton.innerHTML = '<i class="fa fa-expand"></i>';
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
				<div className="container well video-container">
					<div className="player-container">
						<VideoPlayer 
							handleProgress={this.handleProgress}
							togglePlay={this.togglePlay}
							updateButton={this.updateButton}
							scrub={this.scrub}
							scrubCheck={this.scrubCheck.bind(this)}
							scrubSet={this.scrubSet.bind(this)}
							scrubUnset={this.scrubUnset.bind(this)}
							volumeToggle={this.volumeToggle.bind(this)}
							handleVolumeUpdate={this.handleVolumeUpdate.bind(this)}
							skip={this.skip}
							screenSizeToggle={this.screenSizeToggle.bind(this)} />
					</div>
				</div>
				<VideoDescription
					video={this.state.video[0]} />
			</div>
		);
	}
}

export default Video;