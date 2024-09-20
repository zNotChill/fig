import { APITrack } from "../interfaces/Tracks";
import { playTrack } from "../ts/Track";

export default function SmallSongCard(props: { track: APITrack }) {
  const { track } = props;

  if (!track) {
    return null;
  }

  if (!track["artwork_url"]) {
    return null;
  }

  return (
    <div key={track["permalink"]} className="track small-card" onClick={() => playTrack(track)}>
      <div className="row" style={
          {
            gap: "10px"
          }
        }>
        <div className="card-image track-image">
          <img src={track["artwork_url"]} width={40} height={40} />
        </div>
        <div className="column">
          <div className="card-title track-title">{track["title"]}</div>
          <div className="card-subtitle track-artist">{track["user"]["username"]}</div>
        </div>
      </div>
    </div>
  )
}