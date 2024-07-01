
import { invoke } from '@tauri-apps/api/tauri'

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
  return new Promise((resolve, reject) => {
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