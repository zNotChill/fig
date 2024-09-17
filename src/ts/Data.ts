
import { invoke } from '@tauri-apps/api/tauri'
import { API } from './api/Core';

interface SaveData {
  token: string;
  clientID: string;
}

export let sharedState = {
  token: '',
  clientID: ''
}

setInterval(() => {
  saveData();
}, 60000)

export function saveData() {
  invoke('save_data', {
    data: JSON.stringify({ 
      token: sharedState.token,
      clientID: sharedState.clientID
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
        clientID: parsedData.clientID
      }
      console.log(`loaded data`);
      resolve(sharedState);
    })
  })
}

export function setLocalToken(token: string) {
  sharedState.token = token;
}

export let api: API;
export let dataLoaded = false;

// TODO: make this work better
loadData().then(() => {
  dataLoaded = true;
  api = new API(sharedState.token, sharedState.clientID);
}).catch((error) => {
  console.error(error);
})