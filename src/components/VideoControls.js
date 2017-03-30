import React from 'react';

const VideoControls = (props) => {
	return (
		<div className="player-controls">
			<div className="progress-bar"
				onClick={props.scrub}
				onMouseMove={props.scrubCheck}
				onMouseDown={props.scrubSet}
				onMouseUp={props.scrubUnset}>
				<div className="progress-filled"></div>
			</div>
			<button className="player-button toggle" 
				title="Toggle Play"
				onClick={props.togglePlay}>
				<i className="icon-play"></i>
			</button>
			<span className="time current"></span>
			<span className="slash">/</span>
			<span className="time end"></span>
			<button className="player-button volume-toggle"
				onClick={props.volumeToggle}>
				<i className="icon-volume-up"></i>
			</button>
			<input type="range" name="volume" className="player-slider" min="0" max="1" step="0.05" defaultValue="1" 
				onChange={props.handleVolumeUpdate} />
			<button className="player-button"
				onClick={props.skip.bind(null, -10)}>
				<i className="icon-step-backward"></i>
			</button>
			<button className="player-button"
				onClick={props.skip.bind(null, 10)}>
				<i className="icon-step-forward"></i>
			</button>
			<button className="player-button screen-toggle"
				onClick={props.screenSizeToggle}>
				<i className="icon-resize-full"></i>
			</button>
		</div>
	);
}

export default VideoControls;