import { TrackInfo } from "../interfaces/Tracks";

function TrackBar() {
  // const [recentlyPlayed, setRecentlyPlayed] = useState([]) as [any, any];
  // const [loaded, setLoaded] = useState(false) as [boolean, any];

  // useEffect(() => {

  //   // continuously check if data is loaded
  //   let interval = setInterval(() => {
  //     if (!loaded && dataLoaded) {
  //       api.getRecentlyPlayed().then((data) => {
  //         setRecentlyPlayed(data);
  //         setLoaded(true);

  //         clearInterval(interval);
  //       })
  //     }
  //   }, 100)
  // }, [])

  const track: TrackInfo = {
    id: 0,
    title: "Test Track",
    artist: "Test Artist",
    cover: "https://via.placeholder.com/70",
    duration: 100,
    volume: 100,
    album: "Test Album"
  }

  return (
    <div className="trackbar">
      <div className="trackbar-image">
        <img src={track.cover} width={70} height={70} />
      </div>
      <div className="trackbar-title">{track.title}</div>
      <div className="trackbar-artist">{track.artist}</div>
      <div className="trackbar-album">{track.album}</div>
    </div>
  );
}

export default TrackBar;