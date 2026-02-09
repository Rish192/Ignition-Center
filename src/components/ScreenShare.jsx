import React, { useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const APP_ID = "53cb0bf2c9fe4e1196cd97b456f57122";
const TOKEN = "007eJxTYLgrVDDLLfaYzfmYdCndGM7S93tk9Nl4a8TZWVNbrq28qKLAYGqcnGSQlGaUbJmWapJqaGhplpxiaZ5kYmqWZmpuaGTEcGJZRkMgI0NwphwLIwMEgvgsDLmJmXkMDAA6jRtj";
const CHANNEL = "main";

export default function ScreenShare({ onClose }) {
    const screenRef = useRef(null);
  useEffect(() => {
    const initScreenShare = async () => {
      const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

      await client.join(APP_ID, CHANNEL, TOKEN, 'screenshare-' + Date.now());

      const screenTrack = await AgoraRTC.createScreenVideoTrack({ encoderConfig: '1080p' }, 'auto');
    
      screenTrack.play(screenRef.current);
      await client.publish(screenTrack);

      screenTrack.on('track-ended', async () => {
        try { await client.unpublish(screenTrack); } catch {}
        try { screenTrack.stop(); screenTrack.close(); } catch {}
        try { await client.leave(); } catch {}
        // Prefer controlled close for popup overlay
        if (onClose) onClose();
        else try { window.close(); } catch {}
      });
    };

    initScreenShare();

    return () => {
      //Cleanup on component unmount if needed
    };
  }, []);

  return (
    <div style={{
      background: 'black',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div
        ref={screenRef}
        style={{
          width: '90vw',
          height: '90vh',
        //   border: '1px solid white',
        }}
      />
    </div>
  );
}
