// socket.io server
import { createServer } from 'http';
import { Server } from 'socket.io';

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
    let parsedData;
    try { parsedData = JSON.parse(data); } catch(e) { return; }
  
    const { token, clientId, url } = parsedData;
    if(!token || !clientId) {
      return socket.emit("getTrackStreamURL", {
        error: "No token provided"
      })
    }

    const response = await fetch(`${url}?client_id=${clientId}`, {
      method: "POST",
      headers: {
        Authorization: `OAuth ${token}`
      },
      body: JSON.stringify({
        useURL: true
      })
    })

    console.log(`getTrackStreamURL: ${response.status}`);
    socket.emit("getTrackStreamURL", await response.json())
  });




});


httpServer.listen(12305, () => {
  console.log('listening on *:12305');
});