import fetch from "node-fetch";

const SDK_TOKEN = "NETLESSSDK_YWs9MjY3STBIZU96elloSlhHMiZub25jZT03NTk4NmUyMC03ZGIyLTExZjAtYjAyYS1iNzEwOGZjNTVhMjcmcm9sZT0wJnNpZz1lZTY5M2VmMWY1YTc5NWU3MTA0OWJiZTEzYWJmNmIyOTk5ZTM4YzRiMjgxZDE4YzAwYjk2ZTFjODFjYjdkYzJj";
const REGION = "us-sv";

async function createRoom() {
  const roomRes = await fetch("https://api.netless.link/v5/rooms", {
    method: "POST",
    headers: {
      token: SDK_TOKEN,
      "Content-Type": "application/json",
      region: REGION,
    },
    body: JSON.stringify({ isRecord: false }),
  });

  const { uuid } = await roomRes.json();
  console.log("Room UUID:", uuid);

  const tokenRes = await fetch(`https://api.netless.link/v5/tokens/rooms/${uuid}`, {
    method: "POST",
    headers: {
      token: SDK_TOKEN,
      "Content-Type": "application/json",
      region: REGION,
    },
    body: JSON.stringify({
      lifespan: 3600000,
      role: "admin",
    }),
  });

  const roomToken = await tokenRes.text();
  console.log("Room Token:", roomToken);
}

createRoom().catch(console.error);
