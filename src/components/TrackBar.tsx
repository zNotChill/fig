import React from 'react';
import { APITrack, AudioState } from '../interfaces/Tracks';
import SmallSongCard from './SmallSongCard';
import { updateTrackBar } from './Player';
import { getDurationString } from '../ts/Utils';
import { FaPause } from "react-icons/fa6"
import { togglePlayback } from '../ts/Track';

interface TrackBarProps {
  track: APITrack;
  data: AudioState;
}

setInterval(() => {
  updateTrackBar();
}, 100);

const TrackBar: React.FC<TrackBarProps> = ({ track, data }) => {

  const { currentTime, duration } = data;
  const percentage = (currentTime / duration) * 100;
  const progressString = getDurationString(currentTime) + " / " + getDurationString(duration);

  return (
    <div className="trackbar">
      <div className="main">
        <div className="control-bar">
          <div className="play-pause button" onClick={() => togglePlayback()}>
            <FaPause />
          </div>
        </div>
        <div className="progress-time">{progressString}</div>
        <div className="progress-bar" style={
          {
            width: "200px",
          }
        }>
          <div className="progress" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
      <SmallSongCard track={track} />
    </div>
  );
};

export default TrackBar;