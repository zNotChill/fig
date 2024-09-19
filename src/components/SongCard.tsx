import { APISong } from "../interfaces/Tracks";
import { playTrack } from "../ts/Track";

export default function SongCard(props: { song: APISong }) {
  const { song } = props;
  const track = song["track"];

  return (
    <div key={track["permalink"]} className="track card" onClick={() => playTrack(track)}>
      <div className="card-image track-image">
        <img src={track["artwork_url"]} width={70} height={70} />
      </div>
      <div className="card-title track-title">{track["title"]}</div>
      <div className="card-subtitle track-artist">{track["user"]["username"]}</div>
      {/* TODO: Make this a "... minutes ago" thing */}
      <div className="card-subtitle track-last-played">Last Played: {new Date(song['played_at']).toLocaleString()}</div>
    </div>
  )
}