import socketio from "socket.io-client";
import { APITrack } from "../../interfaces/Tracks";

export class API {
  private token: string
  private clientID: string
  private socket: any

  constructor(token: string, clientID: string) {
    this.token = token
    this.clientID = clientID

    // Connect to socket.io server
    this.socket = socketio("http://localhost:12305")

    this.socket.on("connect", () => {
      console.log("Connected to socket.io server")
    })

    console.log("API initialized");
  }

  async getMe() {
    this.socket.emit("getMe", JSON.stringify({
      token: this.token
    }))

    return new Promise((resolve, reject) => {
      this.socket.on("getMe", (data: any) => {
        if(data.error) {
          reject(data.error)
        } else {
          resolve(data)
        }
      })
    })

  }

  async getRecentlyPlayed(limit = 10, offset = 0) {
    this.socket.emit("getRecentlyPlayed", JSON.stringify({
      token: this.token,
      limit: limit,
      offset: offset
    }))

    return new Promise((resolve, reject) => {
      this.socket.on("getRecentlyPlayed", (data: any) => {
        if(data.error) {
          reject(data.error)
        } else {
          resolve(data)
        }
      })
    })
  }

  // TODO: Fix?
  async addToRecentlyPlayed(track_urn: string) {
    this.socket.emit("addToRecentlyPlayed", JSON.stringify({
      token: this.token,
      track_urn
    }))
  }

  async getTrackStreamURL(url: string) {
    this.socket.emit("getTrackStreamURL", JSON.stringify({
      token: this.token,
      url: url,
      clientId: this.clientID
    }))

    return new Promise((resolve, reject) => {
      this.socket.on("getTrackStreamURL", (data: any) => {
        if(data.error) {
          reject(data.error)
        } else {
          resolve(data)
        }
      })
    })
  }

  async setDiscordActivity(track: APITrack) {
    this.socket.emit("setDiscordActivity", JSON.stringify({
      token: this.token,
      track: track
    }))
  }
}
