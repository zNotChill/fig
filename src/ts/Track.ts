
import { setTrackBar } from "../components/Player";
import { APITrack } from "../interfaces/Tracks";
import { api, sessionStorage, sharedState } from "./Data";

export function playTrack(track: APITrack) {
  console.log("Playing track: ", track.permalink_url);

  const media = track["media"]["transcodings"].find((transcoding) => transcoding["format"]["protocol"] === "progressive");
  if(!media) {
    console.error("No progressive media found for track: ", track);
    return;
  }

  setTrackBar(track);
  sessionStorage.currentTrack = track;

  api.setDiscordActivity(track);
  // Begin playing the track
  api.getTrackStreamURL(media["url"]).then((data: any) => {
    playAudio(data.url);
  }).catch((error: any) => {
    console.error("Error fetching track stream URL:", error);
  });

}

let audio = new Audio();


export function getAudio() {
  return audio;
}

export function playAudio(url: string) {
  audio.src = url;
  console.log(sharedState);
  
  audio.volume = sharedState.volume;
  audio.play();
}

export function pauseAudio() {
  audio.pause();
}

export function moveTo(time: number) {
  audio.currentTime = time;
}

export function togglePlayback() {
  if (audio.paused) {
    audio.play();
    api.clearDiscordActivity();
  } else {
    audio.pause();
    api.setDiscordActivity(sessionStorage.currentTrack);
  }
}