import "./app/global.css";
import Navbar from "./components/Navbar.tsx";
import RecentlyPlayed from "./components/RecentlyPlayed.tsx";
import TrackBar from "./components/TrackBar.tsx";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="body-content">
        <RecentlyPlayed />

        <TrackBar />
      </div>
    </div>
  );
}

export default App;
