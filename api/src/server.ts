// socket.io server
import { createServer } from 'http';
import { Server } from 'socket.io';
import { clearActivity, setSongActivity } from './DiscordRPC.js';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {

  socket.on("getMe", async (data) => {
    let parsedData;
    try { parsedData = JSON.parse(data); } catch(e) { return; }
  
    const { token } = parsedData;
    if(!token) {
      return socket.emit("getMe", {
        error: "No token provided"
      })
    }

    const response = await fetch("https://api-v2.soundcloud.com/me", {
      headers: {
        Authorization: `OAuth ${token}`
      }
    })

    console.log(`getMe: ${response.status}`);
    socket.emit("getMe", await response.json())
  })


  socket.on("getRecentlyPlayed", async (data) => {
    let parsedData;
    try { parsedData = JSON.parse(data); } catch(e) { return; }
  
    const { token, limit, offset } = parsedData;
    if(!token) {
      return socket.emit("getRecentlyPlayed", {
        error: "No token provided"
      })
    }

    const response = await fetch(`https://api-v2.soundcloud.com/me/play-history/tracks?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `OAuth ${token}`
      }
    })

    console.log(`getRecentlyPlayed: ${response.status}`);
    socket.emit("getRecentlyPlayed", await response.json())
  });


  socket.on("addToRecentlyPlayed", async (data) => {
    let parsedData;
    try { parsedData = JSON.parse(data); } catch(e) { return; }
  
    const { token, track_urn } = parsedData;
    if(!token) {
      return socket.emit("addToRecentlyPlayed", {
        error: "No token provided"
      })
    }

    const response = await fetch(`https://api-v2.soundcloud.com/me/play-history`, {
      method: "POST",
      headers: {
        Authorization: `OAuth ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        track_urn: track_urn
      })
    })

    console.log(`addToRecentlyPlayed: ${response.status}`);
    socket.emit("addToRecentlyPlayed", {
      status: response.status
    })
  });


  socket.on("getTrackStreamURL", async (data) => {
    try {
      let parsedData;
      try { parsedData = JSON.parse(data); } catch(e) { return; }
    
      const { token, clientId, url } = parsedData;
      if(!token || !clientId) {
        return socket.emit("getTrackStreamURL", {
          error: "No token provided"
        })
      }
  
      const response = await fetch(`${url}?client_id=${clientId}`, {
        method: "GET",
        headers: {
          Authorization: `OAuth ${token}`
        },
      })
  
      console.log(`getTrackStreamURL: ${response.status}`);
      socket.emit("getTrackStreamURL", await response.json())
    } catch (error) {
      console.error(error);
      socket.emit("getTrackStreamURL", {
        error: error
      })
    }
  });

  socket.on("setDiscordActivity", async (data) => {
    try {
      let parsedData;
      try { parsedData = JSON.parse(data); } catch(e) { return; }
    
      const { token, track } = parsedData;
      if(!token) {
        return socket.emit("setDiscordActivity", {
          error: "No token provided"
        })
      }
  
      setSongActivity(track);
      socket.emit("setDiscordActivity", track)
    } catch (error) {
      console.error(error);
      socket.emit("setDiscordActivity", {
        error: error
      })
    }
  });

  socket.on("clearDiscordActivity", async (data) => {
    try {
      clearActivity();
    } catch (error) {
      console.error(error);
      socket.emit("clearDiscordActivity", {
        error: error
      })
    }
  });

});


httpServer.listen(12305, () => {
  console.log('listening on *:12305');
});