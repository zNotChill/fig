import { useState } from 'react';
import TrackBar from './TrackBar';
import { APITrack } from '../interfaces/Tracks';
import { sessionStorage } from '../ts/Data';
import { getAudio } from '../ts/Track';

export let setTrackBar: (track: APITrack) => void;
export let updateTrackBar: () => void;

const Player = () => {
  const [currentTrack, setCurrentTrack] = useState<APITrack>({
    ...sessionStorage.loadedRecents[0]
  });

  updateTrackBar = () => {
    setCurrentTrack({ ...sessionStorage.currentTrack });
  }

  setTrackBar = (track: APITrack) => {
    setCurrentTrack(track);
  };

  const audio = getAudio()
  return (
    <div>
      <TrackBar track={currentTrack} data={
        {
          currentTime: audio.currentTime,
          duration: audio.duration,
          isPlaying: !audio.paused
        }
      } />
    </div>
  );
};

export default Player;