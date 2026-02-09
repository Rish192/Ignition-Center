// import React, { useEffect, useRef } from "react";
// import { createFastboard, mount } from "@netless/fastboard";

// const APP_IDENTIFIER = "9LKW0HzNEfCwKrcQj8VaJw/sE2AINp4OAjMWQ";
// const ROOM_UUID = "e14003307e4411f080bf0347da764a96";
// const ROOM_TOKEN = "NETLESSROOM_YWs9MjY3STBIZU96elloSlhHMiZleHBpcmVBdD0xNzU2MzU0Mjc1OTYzJm5vbmNlPTE3NTU3NDk0NzU5NjMwMCZyb2xlPTAmc2lnPWU1NTc3NDIyNDdmZjUyM2E1ZDdmZjgxOGVmODk5YWY0ZDNkZmU1Nzk4NTQ2N2M1MWU2MWEzMTc3ZTZmZDIzM2QmdXVpZD1lMTQwMDMzMDdlNDQxMWYwODBiZjAzNDdkYTc2NGE5Ng";
// const REGION = "us-sv";

// export default function Whiteboard() {
//     const containerRef = useRef(null);

//     useEffect(() => {
//         let fastboard;
//         (async () => {
//         fastboard = await createFastboard({
//             sdkConfig: { appIdentifier: APP_IDENTIFIER, region: REGION },
//             joinRoom: { uuid: ROOM_UUID, roomToken: ROOM_TOKEN, uid: String(Date.now()) },
//             container: containerRef.current,
//             useUI: true,
//         });
//         mount(fastboard, containerRef.current);
//         window.fastboard = fastboard; // optional debug
//         })();
//         return () => {
//         try { fastboard?.destroy?.(); } catch {}
//         };
//     }, []);

//     return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
// }

import React, { useEffect, useRef } from 'react';
import { createFastboard, mount } from '@netless/fastboard';

const APP_IDENTIFIER = "9LKW0HzNEfCwKrcQj8VaJw/UpF3UHQNue6Ztw";
const REGION = "us-sv";

export default function Whiteboard({roomUUID, roomToken}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!roomUUID || !token) return;

    let fastboard;

    (async () => {
        fastboard = await createFastboard({
            sdkConfig: { appIdentifier: APP_IDENTIFIER, region: REGION },
            joinRoom: { uuid: roomUUID, roomToken, uid: String(Date.now()) },
            container: containerRef.current,
            useUI: true,
        });
      
      mount(fastboard, containerRef.current);
      window.fastboard = fastboard;
    })();

    return () => {
      try { fastboard?.destroy?.(); } catch {}
    };
  }, [roomUUID, roomToken]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};
