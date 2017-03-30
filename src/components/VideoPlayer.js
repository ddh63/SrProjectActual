import React from 'react';

import VideoControls from './VideoControls';

const VideoPlayer = (props) => {
	return (
		<div className="player">
			<video className="video-player html-video" 
				src="https://media.w3.org/2010/05/sintel/trailer.mp4"
				onLoadedData={props.handleProgress}
				onClick={props.togglePlay}
				onPlay={props.updateButton}
				onPause={props.updateButton}
				onTimeUpdate={props.handleProgress}></video>

			<VideoControls 
				scrub={props.scrub}
				scrubCheck={props.scrubCheck}
				scrubSet={props.scrubSet}
				scrubUnset={props.scrubUnset}
				togglePlay={props.togglePlay}
				volumeToggle={props.volumeToggle}
				handleVolumeUpdate={props.handleVolumeUpdate}
				skip={props.skip}
				screenSizeToggle={props.screenSizeToggle} />
		</div>
	);
}

export default VideoPlayer;