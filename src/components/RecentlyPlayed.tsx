import { useEffect, useState } from "react";
import Section from "./Section";
import { api, dataLoaded } from "../ts/Data";
import SongCard from "./SongCard";

export default function RecentlyPlayed() {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]) as [any, any];
  const [loaded, setLoaded] = useState(false) as [boolean, any];

  useEffect(() => {

    // continuously check if data is loaded
    let interval = setInterval(() => {
      if (!loaded && dataLoaded) {
        api.getRecentlyPlayed().then((data) => {
          setRecentlyPlayed(data);
          setLoaded(true);

          clearInterval(interval);
        })
      }
    }, 1000)
  }, [])

  const collection = recentlyPlayed["collection"] || [];

  return (
    <Section title="Recently Played" children={
      <div className="card-grid">
        {collection.map((item: any) => {
          return (
            <SongCard song={item} />
          )
        })}
      </div>
    }/>
  )
}