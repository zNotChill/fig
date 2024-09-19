import * as rpc from 'discord-rpc';

const clientId = "1285682357407580243"

const client = new rpc.Client({
  transport: "ipc"
});

client.login({
  clientId: clientId
}).catch(console.error);

client.on("ready", () => {
  console.log("Discord RPC ready");
});

client.on("disconnected", () => {
  console.error("Discord RPC disconnected");
});

client.on("error", (error) => {
  console.error("Discord RPC error:", error);
});

export function setSongActivity(track: any) {
  if (!client) {
    console.error('Discord RPC client is not initialized');
    return;
  }

  const activity = {
    details: track.title,
    state: `by ${track.user.username}`,
    startTimestamp: Date.now(),
    largeImageKey: track.artwork_url || "",
    largeImageText: `Fig is a custom SoundCloud client for PC`,
    instance: false
  };

  console.log('Setting activity:', activity);

  client.setActivity(activity).catch(console.error);
}

export function clearActivity() {
  if (!client) {
    console.error('Discord RPC client is not initialized');
    return;
  }

  client.clearActivity().catch(console.error);
}