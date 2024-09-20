
import { invoke } from '@tauri-apps/api/tauri'
import { API } from './api/Core';
import { APITrack } from '../interfaces/Tracks';

interface SaveData {
  token: string;
  clientID: string;
  volume: number;
}

export let sharedState = {
  token: '',
  clientID: '',
  volume: 0.5,
}

export let sessionStorage = {
  loadedRecents: [] as any[],
  currentTrack: {} as APITrack,
  currentTrackTime: 0,
  isPaused: false,
}

setInterval(() => {
  saveData();
}, 60000)

export function saveData() {
  invoke('save_data', {
    data: JSON.stringify({ 
      token: sharedState.token,
      clientID: sharedState.clientID,
      volume: sharedState.volume
    } as SaveData)
  })

  console.log(`saved data`);
}

export function loadData() {
  return new Promise((resolve) => {
    invoke('load_data', {}).then((data: any) => {
      const parsedData = JSON.parse(data)
      sharedState = {
        token: parsedData.token,
        clientID: parsedData.clientID,
        volume: parsedData.volume
      }
      console.log(`loaded data`);
      resolve(sharedState);
    })
  })
}

export function setLocalToken(token: string) {
  sharedState.token = token;
}
export function setVolume(volume: number) {
  sharedState.volume = volume;
}

export let api: API;
export let dataLoaded = false;

// TODO: make this work better
loadData().then(() => {
  setVolume(0.02);
  dataLoaded = true;
  api = new API(sharedState.token, sharedState.clientID);
}).catch((error) => {
  console.error(error);
})
