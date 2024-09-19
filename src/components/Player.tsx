import { useState } from 'react';
import TrackBar from './TrackBar';
import { APISong, APITrack, TrackInfo } from '../interfaces/Tracks';
import { sessionStorage } from '../ts/Data';

export let setTrackBar: (track: APITrack) => void;

const Player = () => {
  const [currentTrack, setCurrentTrack] = useState<APITrack>({
    ...sessionStorage.loadedRecents[0]
  });

  setTrackBar = (track: APITrack) => {
    setCurrentTrack(track);
  };

  return (
    <div>
      <TrackBar track={currentTrack} />
    </div>
  );
};

export default Player;