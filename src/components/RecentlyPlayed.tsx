import { useEffect, useState } from "react";
import Section from "./Section";
import { api, dataLoaded, sessionStorage } from "../ts/Data";
import SongCard from "./SongCard";
import { APISong } from "../interfaces/Tracks";

export default function RecentlyPlayed() {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]) as [any, any];
  const [loaded, setLoaded] = useState(false) as [boolean, any];

  useEffect(() => {

    // continuously check if data is loaded
    let interval = setInterval(() => {
      if (!loaded && dataLoaded) {
        api.getRecentlyPlayed().then((data: any) => {
          setRecentlyPlayed(data);
          setLoaded(true);
          sessionStorage.loadedRecents = data;

          clearInterval(interval);
        })
      }
    }, 1000)
  }, [])

  const collection = recentlyPlayed["collection"] || [];

  return (
    <Section title="Recently Played" children={
      <div className="card-grid">
        {collection.map((item: APISong) => {
          return (
            <SongCard song={item} />
          )
        })}
      </div>
    }/>
  )
}