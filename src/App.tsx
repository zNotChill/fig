import "./app/global.css";
import Navbar from "./components/Navbar.tsx";
import Player from "./components/Player.tsx";
import RecentlyPlayed from "./components/RecentlyPlayed.tsx";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="body-content">
        <RecentlyPlayed />

        <Player />
      </div>
    </div>
  );
}

export default App;
