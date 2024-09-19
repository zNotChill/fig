import React from 'react';
import { APITrack } from '../interfaces/Tracks';
import SmallSongCard from './SmallSongCard';

interface TrackBarProps {
  track: APITrack;
}

const TrackBar: React.FC<TrackBarProps> = ({ track }) => {
  return (
    <div className="trackbar">
      <SmallSongCard track={track} />
    </div>
  );
};

export default TrackBar;