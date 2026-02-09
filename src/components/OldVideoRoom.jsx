import React, {useState, useMemo, useEffect, useRef} from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng'
import {VideoPlayer} from './VideoPlayer';
import Whiteboard from './Whiteboard';

import {Box, Typography, Button, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, IconButton} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import DesktopAccessDisabledOutlinedIcon from '@mui/icons-material/DesktopAccessDisabledOutlined';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ContentPasteOffIcon from '@mui/icons-material/ContentPasteOff';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EmailIcon from '@mui/icons-material/Email';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import bgImage from '../assets/background.jpg';
import CloseIcon from '@mui/icons-material/Close';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import engagement_room_menu_bar from '../assets/engagement_room_menu_bar.png';

import { createFastboard, mount } from '@netless/fastboard';

const APP_IDENTIFIER = "9LKW0HzNEfCwKrcQj8VaJw/sE2AINp4OAjMWQ";   // From Agora Console
const SDK_TOKEN = "NETLESSSDK_YWs9MjY3STBIZU96elloSlhHMiZub25jZT03NTk4NmUyMC03ZGIyLTExZjAtYjAyYS1iNzEwOGZjNTVhMjcmcm9sZT0wJnNpZz1lZTY5M2VmMWY1YTc5NWU3MTA0OWJiZTEzYWJmNmIyOTk5ZTM4YzRiMjgxZDE4YzAwYjk2ZTFjODFjYjdkYzJj";
const REGION = "us-sv";

const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
})
const screenClient = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
})
const API_BASE = "https://insightcenter-server.onrender.com"; //https://insightcenter-server.onrender.com   http://localhost:5000

function ScreenVideo({ track, fit = 'contain' }) {
    const ref = React.useRef(null);
    React.useEffect(() => {
        const el = ref.current;
        if (!track || !el) return;
        // Clear any previous <video> the SDK may have appended
        try { el.innerHTML = ''; } catch {}
        // Play exactly once per update
        track.play(el, { fit });
        return () => {
        try { track.stop(); } catch {}
        try { el.innerHTML = ''; } catch {}
        };
    }, [track, fit]);
    return <div ref={ref} style={{ position: 'absolute', inset: 0 }} />;
}

export const VideoRoom = ({onLeaveAll, onParticipantCountChange, onParticipantsChange}) => {
    const { roomName } = useParams();
    const [session, setSession] = useState(() => {
        const saved = localStorage.getItem("session");
        return saved ? JSON.parse(saved) : null;
    });
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [nameMap, setNameMap] = useState({});
    const [localTracks, setLocalTracks] = useState([]);
    const [cameraOn, setCameraOn] = useState(true);
    const [micOn, setMicOn] = useState(true);
    const [screenTrack, setScreenTrack] = useState(null);
    const [screenshareOn, setScreenshareOn] = useState(false);
    const [whiteboardOn, setWhiteboardOn] = useState(false);
    const [joined, setJoined] = useState(true);
    //const [roomData, setRoomData] = useState({ roomUUID: '', roomToken: '' });
    const localTracksRef = useRef({audio: null, video: null, screen: null});

    const [pendingRequests, setPendingRequests] = useState([]);
    const [currentRequest, setCurrentRequest] = useState(null);
    const [screenUid, setScreenUid] = useState(null);
    const [whiteboardData, setWhiteboardData] = useState(null);
    const [pinnedUser, setPinnedUser] = useState(null);
    const [activeContent, setActiveContent] = useState(null); //pin, whiteboard or null
    const [whiteboardFullScreen, setWhiteboardFullScreen] = useState(false);
    const [videoOpacity, setVideoOpacity] = useState(1);
    const [isResized, setIsResized] = useState(false);
    const [shouldRePinScreen, setShouldRePinScreen] = useState(false);

    const [shareAspect, setShareAspect] = useState(() =>
        (window.innerHeight > window.innerWidth ? '9 / 16' : '16 / 9')
    );
    useEffect(() => {
        const onResize = () => {
            setShareAspect(window.innerHeight > window.innerWidth ? '9 / 16' : '16 / 9');
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);


    const handleResizeToggle = () => {
        setIsResized(prev => !prev);
    };
    const [screenshareUsers, setScreenshareUsers] = useState([]);

    const looksLikeScreen = (u) => {
        const nm = nameMap[u?.uid];
        return (nm && String(nm).startsWith("Screen-")) || u?.isScreen === true;
    };

    const endPreviousScreenShare = async (prevUid) => {
        if (!prevUid) return;
        removeScreenshareUser(prevUid);
        if (screenUid === prevUid) {
            setScreenTrack(null);
            setScreenshareOn(false);
            setScreenUid(null);
        }
        try {
            if (session?.role === "employee") {
                await fetch(`${API_BASE}/api/moderate/kick`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ roomName: session.roomName, targetUid: prevUid }),
                });
            }
        } catch (e) {
            console.warn("Failed to kick previous screen sharer:", e);
        }
    };

    const addScreenshareUser = (user) => {
        setScreenshareUsers(prev => {
            if (prev.some(u => u.uid === user.uid)) return prev;
            return [...prev, user];
        });
    };
    const removeScreenshareUser = (uid) => {
        setScreenshareUsers(prev => prev.filter(u => u.uid !== uid));
    };

    const screenshareUids = useMemo(
        () => screenshareUsers.map((u) => u.uid),
        [screenshareUsers]
    );

    const stopScreenShareLocally = async (reason = "unknown") => {
        try {
        const st = localTracksRef.current.screen;
        if (st) {
            try { await screenClient.unpublish([st]); } catch {}
            try { st.stop(); } catch {}
            try { st.close(); } catch {}
        }
        localTracksRef.current.screen = null;
        } catch {}

        try {
        document.querySelectorAll("video").forEach((el) => {
            if (el.srcObject instanceof MediaStream) {
            el.srcObject.getTracks().forEach((t) => { try { t.stop(); } catch {} });
            el.srcObject = null;
            }
        });
        } catch {}

        // Update UI state
        setScreenshareUsers((prev) => prev.filter((u) => u.uid !== screenUid));
        setScreenTrack(null);
        setScreenshareOn(false);            // <-- ensures the icon toggles back
        setActiveContent((prev) => (prev === "screen" ? null : prev));
        setShouldRePinScreen(false);
        const leavingUid = screenUid;
        setScreenUid(null);

        // Inform backend this screen-uid left 
        try {
        if (leavingUid && session?.roomName) {
            await fetch(`${API_BASE}/api/leave`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomName: session.roomName, uid: leavingUid }),
            });
        }
        } catch {}

        // Try leaving the screen client transport
        try { await screenClient.leave(); } catch {}
        screenClient.removeAllListeners?.();
        console.log("[SS] cleaned up locally due to:", reason);
    };

    useEffect(() => {
        if (isResized && whiteboardFullScreen) {
            setWhiteboardFullScreen(false);
        }
    }, [isResized, whiteboardFullScreen]);

    useEffect(() => {
        if (isResized) {
            // Entering 3D: auto-open whiteboard
            if (!whiteboardOn) setWhiteboardOn(true);
            setActiveContent(null);
        } else {
            // In 2D: only auto-close if NOT currently showing whiteboard
            if (activeContent !== "whiteboard") {
                try {
                    if (window.fastboard) {
                        window.fastboard.destroy();
                        window.fastboard = null;
                    }
                } catch (_) {}
                if (whiteboardOn) setWhiteboardOn(false);
                setWhiteboardFullScreen(false);
                setActiveContent(screenshareUsers.length > 0 ? "screen" : null);
            }
        }
    }, [isResized, whiteboardOn, screenshareUsers.length, activeContent]);

    const handlePin = (uid) => {
        setPinnedUser((prev) => {
            const newPinned = prev === uid ? null : uid;
            if (newPinned) {
                if (activeContent === "screen" && screenshareUsers.length > 0) {
                    setShouldRePinScreen(true);
                }
                if (window.fastboard) {
                    window.fastboard.destroy();
                    window.fastboard = null;
                }
                setActiveContent("pin");
                setWhiteboardOn(false);
            } else {
                setActiveContent(null);
            }
            return newPinned;
        });
    };

    useEffect(() => {
        if (!session || session.role !== "employee") return;

        const interval = setInterval(async () => {
            try {
                const res = await fetch(`${API_BASE}/api/waiting/${session.roomName}`);
                if (!res.ok) return;
                const data = await res.json(); // [{uid, userName, role}]
                if (data.length > 0) {
                    // show first waiting request (FIFO)
                    const normalized = data.map(u => ({ ...u, userName: u.name }));
                    setPendingRequests(normalized);
                    setCurrentRequest(normalized[0]);
                } else {
                    setPendingRequests([]);
                    setCurrentRequest(null);
                }
            } catch (err) {
                console.error("Pending requests fetch error", err);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [session]);

    const handleAdmit = async (uid) => {
        try {
            await fetch(`${API_BASE}/api/approve`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ roomName: session.roomName, uid })
            });
            setCurrentRequest(null);
            setPendingRequests([]);
        } catch (err) {
            console.error("Admit error", err);
        }
    };

    const handleDecline = async (uid) => {
        try {
            await fetch(`${API_BASE}/api/decline`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ roomName: session.roomName, uid })
            });
            setCurrentRequest(null);
            setPendingRequests([]);
        } catch (err) {
            console.error("Decline error", err);
        }
    };
    
    const fetchAndSetName = async (uid) => {
        const tryFetch = async () => {
            const res = await fetch(`${API_BASE}/api/username?uid=${uid}&roomName=${encodeURIComponent(session.roomName)}`);
            if (!res.ok) return null;
            const data = await res.json();
            return data.username || null;
        };
        let name = await tryFetch();
        if (!name) {
            await new Promise(r => setTimeout(r, 300));
            name = await tryFetch();
        }
        if (name) setNameMap(prev => ({ ...prev, [uid]: name }));
        return name;
    }

    const handleUserJoined = (user) => {
        fetchAndSetName(user.uid);

        setUsers(prev => (prev.some(u => u.uid === user.uid) ? prev : [...prev, user]));
    }

    const handleUserPublished = async (user, mediaType) => {

        await client.subscribe(user, mediaType);

        // Handle camera video
        if (mediaType === "video") {
            let nm = nameMap[user.uid];
            if (!nm) {
                nm = await fetchAndSetName(user.uid);
            }
            const isScreenShare = (nm && String(nm).startsWith("Screen-")) || user?.isScreen === true;
            if (isScreenShare) {
                if (screenUid && screenUid !== user.uid) {
                    await endPreviousScreenShare(screenUid);
                }
                // Keep ONLY this screensharer in state
                setUsers((prev) => prev.filter((u) => u.uid !== user.uid));
                setScreenshareUsers([{ uid: user.uid, videoTrack: user.videoTrack, isScreen: true }]);
                if (window.fastboard) {
                    try { window.fastboard.destroy(); } catch (_) {}
                    window.fastboard = null;
                }
                // Clear any pinned camera
                setPinnedUser(null);
                setActiveContent("screen");
                setScreenUid(user.uid);
                console.log("Screen share started (auto-pinned): ", nm || user.uid);
            } else {
                setUsers((previousUsers) => {
                    const existingUser = previousUsers.find((u) => u.uid === user.uid);
                    if (existingUser) {
                        return previousUsers.map((u) =>
                            u.uid === user.uid ? { ...u, videoTrack: user.videoTrack } : u
                        );
                    } else {
                        return [...previousUsers, user];
                    }
                });
            }
        }
         

        // Handle audio
        if (mediaType === "audio") {
            user.audioTrack?.play();
            setUsers((previousUsers) => {
                const existingUser = previousUsers.find((u) => u.uid === user.uid);
                if (existingUser) {
                    return previousUsers.map((u) =>
                        u.uid === user.uid ? { ...u, audioTrack: user.audioTrack, micOn: true } : u
                    );
                } else {
                    return [...previousUsers, user];
                }
            });
        }
    };
    
    const handleUserLeft = (user) => {
        setUsers((previousUsers) =>
            previousUsers.filter((u) => u.uid !== user.uid)
        );
        removeScreenshareUser(user.uid);
        if (screenUid === user.uid) {
            console.log("Screen sharer left: ", user.uid);
            setScreenTrack(null);
            setScreenshareOn(false);
            setScreenUid(null);
            setActiveContent((prev) => (prev === "screen" ? null : prev));
            setShouldRePinScreen(false);
        }
    };

    const toggleCamera = async() => {
        const video = localTracksRef.current.video;
        if (!video) return;
        const newCameraState = !cameraOn;
        if (newCameraState) {
            await video.setEnabled(true);
            try {
                await client.publish([video]);
            } catch (err) {
                console.warn("Video publish error", err);
            }

            setUsers((prevUsers) => 
            prevUsers.map((user) => 
            user.uid === client.uid ? {...user, videoTrack: video} : user));
        } else {
            try {
                await client.unpublish([video]);
            } catch(err) {
                console.warn("Video unpublish error", err);
            }

            await video.setEnabled(false);

            setUsers((prevUsers) =>
            prevUsers.map((user) =>
            user.uid === client.uid ? {...user, videoTrack: null} : user));
        }

        setCameraOn(newCameraState);
        
    };

    const toggleMic = async () => {
        const audio = localTracksRef.current.audio;
        if (!audio) return;
        if (micOn) {
            // Mic currently ON → mute
            try {
            await audio.setMuted(true); // this disables audio input
            await client.unpublish(audio);
            } catch (err) {
            console.error("Mute mic error", err);
            }
        } else {
            // Mic currently OFF → unmute
            try {
            await audio.setMuted(false);
            // republish if needed
            if (!client.remoteUsers.find(u => u.uid === client.uid)) {
                await client.publish(audio);
            } else {
                await client.publish(audio);
            }
            } catch (err) {
            console.error("Unmute mic error", err);
            }
        }
        setUsers(prev => prev.map(u => u.uid === client.uid ? { ...u, micOn: !micOn } : u));
        setMicOn(!micOn);
    };
    
    const toggleScreenShare = async() => {
        if (screenshareOn) {
        await stopScreenShareLocally("manual-stop");
        } else {
            try {
                if (screenUid) await endPreviousScreenShare(screenUid);
                console.log("[SS] starting picker…");
                const screenTracks = await AgoraRTC.createScreenVideoTrack({ encoderConfig: "1080p" }, "auto");
                const tracksArr = Array.isArray(screenTracks) ? screenTracks : [screenTracks];
                const screenTrack = tracksArr[0];

                if (!screenTrack) {
                    console.warn("[SS] no screen track (picker cancelled?)");
                    setScreenshareOn(false);
                    return;
                }
                
                // const screenUid = Date.now();
                const tokenRes = await fetch(`${API_BASE}/api/token`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        roomName: session.roomName,
                        uid: null,
                        userName: `Screen-${session.userName}`,
                        role: 'employee',
                        isScreen: true
                    })
                });
                const tokenData = await tokenRes.json();
                const newScreenUid = tokenData.uid; // avoid shadowing state `screenUid`
                if (!newScreenUid) throw new Error("No screen uid from token API");
                setNameMap(prev => ({ ...prev, [newScreenUid]: `Screen-${session.userName}` }));
                
                await screenClient.join(tokenData.appId, tokenData.roomName, tokenData.token, newScreenUid);
                await screenClient.publish(tracksArr);
                localTracksRef.current.screen = screenTrack;
                setScreenTrack(screenTrack);
                setScreenUid(newScreenUid);
                setScreenshareOn(true);
                setActiveContent("screen");
                setPinnedUser(null);
                setScreenshareUsers([{ uid: newScreenUid, videoTrack: screenTrack, isScreen: true }]);

                screenClient.on("client-banned", async () => {
                    await stopScreenShareLocally("client-banned");
                });
                screenClient.on("connection-state-change", async (cur) => {
                    if (cur === "DISCONNECTED") {
                    await stopScreenShareLocally("screenClient-disconnected");
                    }
                });

                // const currentScreenUid = screenUid;
                screenTrack.on("track-ended", async () => {
                    console.log("Screen share track ended by browser UI");
                    await stopScreenShareLocally("track-ended");
                });
                console.log("Screen share started with UID:", newScreenUid);
            } catch (err) {
                console.error("[SS] start failed:", err);
                setScreenshareOn(false);
                setScreenTrack(null);
                setScreenUid(null);
            }
        }
    };

    const toggleWhiteboard = () => {
        if (activeContent === "whiteboard") {
            if (window.fastboard) {
                window.fastboard.destroy();
                window.fastboard = null;
            }
            setActiveContent(null);
            setWhiteboardOn(false);
            return;
        }
        if (activeContent === "screen" && screenshareUsers.length > 0) {
            setShouldRePinScreen(true);
        }
        setPinnedUser(null);
        setActiveContent("whiteboard");
        setWhiteboardOn(true);
        //setScreenshareOn(false);
    };

    useEffect(() => {
        if(!whiteboardOn) return;
        initWhiteboard();
    }, [whiteboardOn, whiteboardData]);

    useEffect(() => {
        const fetchWhiteboard = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/rooms/${session.roomName}/whiteboard`);
                if (!res.ok) throw new Error("Failed to fetch Whiteboard");
                const data = await res.json();
                setWhiteboardData(data);
            } catch (err) {
                console.error("Whiteboard fetch error", err);
            }
        };
        fetchWhiteboard();
    }, [roomName]);

    const initWhiteboard = async () => {
        if (!whiteboardData) return;
        const container = document.getElementById("whiteboard-container");
        if (!container) return;

        try {
            const fastboard = await createFastboard({
                sdkConfig: { appIdentifier: APP_IDENTIFIER, region: REGION },
                joinRoom: {
                uuid: whiteboardData.uuid,
                roomToken: whiteboardData.token,
                uid: `${Date.now()}`,
                },
                container,
                useUI: true,
            });
            mount(fastboard, container);
            window.fastboard = fastboard;
        } catch (err) {
            console.error("Whiteboard mount error", err);
            alert("Failed to open whiteboard");
            setWhiteboardOn(false);
        }
    };

    useEffect(() => {
        const handleUnload = () => {
            if (session?.roomName && session?.uid) {
            navigator.sendBeacon(
                `${API_BASE}/api/leave`,
                JSON.stringify({
                roomName: session.roomName,
                uid: session.uid
                })
            );
            }
        };
        window.addEventListener("beforeunload", handleUnload);
        return () => {
            window.removeEventListener("beforeunload", handleUnload);
        };
    }, [session]);

    const leaveCall = async () => {
        try {
            // screenTrack (if created) stored maybe in ref; if you created it, put it into ref.screen
            
            if (localTracksRef.current.screen) {
                const currentScreenUid = screenUid;
                try { 
                    await client.unpublish([localTracksRef.current.screen]); 
                } catch(_) {}
                try { 
                    localTracksRef.current.screen.stop(); 
                    localTracksRef.current.screen.close(); 
                } catch(_) {}

                document.querySelectorAll("video").forEach((el) => {
                    if (el.srcObject instanceof MediaStream) {
                        el.srcObject.getTracks().forEach((t) => {
                            if (t.kind === "video" && t.label.includes("Screen")) {
                                try { t.stop(); } catch {}
                            }
                        });
                        el.srcObject = null;
                    }
                });
                
                localTracksRef.current.screen = null;

                setScreenTrack(null);
                setScreenshareOn(false);
                setScreenUid(null);

                if (currentScreenUid && session?.roomName) {
                    await fetch(`${API_BASE}/api/leave`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({roomName: session.roomName, uid: currentScreenUid}),
                    });
                }
            }

            try {
                await screenClient.leave();
                screenClient.removeAllListeners();
            } catch(err) {
                console.warn("screenClient leave error", err);
            }

            // unpublish & stop/close audio+video
            if (localTracksRef.current.audio || localTracksRef.current.video) {
                try { await client.unpublish([localTracksRef.current.audio, localTracksRef.current.video].filter(Boolean)); } catch(_) {}
                try { localTracksRef.current.audio && localTracksRef.current.audio.stop(); } catch(_) {}
                try { localTracksRef.current.audio && localTracksRef.current.audio.close(); } catch(_) {}
                try { localTracksRef.current.video && localTracksRef.current.video.stop(); } catch(_) {}
                try { localTracksRef.current.video && localTracksRef.current.video.close(); } catch(_) {}
                localTracksRef.current.audio = null;
                localTracksRef.current.video = null;
            }

            // clear page media elements too
            document.querySelectorAll('video, audio').forEach((el) => {
                const stream = el.srcObject;
                if (stream && stream.getTracks) stream.getTracks().forEach(t => { try{ t.stop(); }catch(_){} });
                try { el.pause?.(); el.srcObject = null; el.removeAttribute('src'); } catch(_) {}
            });

            //cleanup whiteboard if open
            if (window.fastboard) {
                try {
                    window.fastboard.destroy();
                } catch (err) {
                    console.warn("Error destroying whiteboard: ", err);
                }
                window.fastboard = null;
            }

            if(session?.roomName) {

                if (session?.uid) {
                    await fetch(`${API_BASE}/api/leave`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({roomName: session.roomName, uid: session.uid}),
                    });
                }
            }

            await client.leave();
            client.removeAllListeners();

            setUsers([]);
            setLocalTracks([]);
            setScreenTrack(null);
            setScreenshareOn(false);
            setScreenUid(null);
            setCameraOn(true);
            setMicOn(true);
            setJoined(false);
        } catch (err) {
            console.error("Error leaving", err);
        } finally {
            try { onParticipantCountChange?.(0); } catch (_) {}
            try { onLeaveAll && onLeaveAll(); } catch (_) {}
            navigate("/");
        }
    };

    // Fetch a fresh token for the same room + uid
    const renewToken = async () => {
        try {
        const res = await fetch(`${API_BASE}/api/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomName: session.roomName, uid: session.uid, userName: session.userName })
        });
        const data = await res.json();
        if (data.token) {
            await client.renewToken(data.token);
            // no state update needed; Agora handles it
            console.log("Token renewed");
        } else {
            console.warn("Failed to renew token", data);
        }
        } catch (e) {
        console.error("Renew token error:", e);
        }
    };

    const handleModerate = async (action, targetUid) => {
        try{
            const res = await fetch(`${API_BASE}/api/moderate/${action}`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ roomName: session.roomName, targetUid}),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed");
            if(action === "mute") {
                setUsers((prevUsers) => prevUsers.map(u => u.uid === targetUid ? { ...u, micOn: false } : u));
            }
            if(action === "kick") {
                await fetch(`${API_BASE}/api/leave`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        roomName: session.roomName,
                        uid: targetUid,
                    }),
                });
            }
        } catch(err) {
            alert(`Error: ${err.message}`);
        }
    };

    useEffect(() => {
    // helper to unpublish, stop, close and clear DOM streams
    const stopAndCloseAllLocalTracks = async () => {
        try {
        const { audio, video, screen } = localTracksRef.current;

        // unpublish if any
        try {
            const toUnpublish = [];
            if (audio) toUnpublish.push(audio);
            if (video) toUnpublish.push(video);
            if (screen) toUnpublish.push(screen);
            if (toUnpublish.length > 0) {
            await client.unpublish(toUnpublish);
            }
        } catch (e) {
            // ignore unpublish errors but log
            console.warn("unpublish error:", e);
        }

        // stop & close Agora track objects
        if (audio) {
            try { audio.stop(); } catch (e) {}
            try { audio.close(); } catch (e) {}
            localTracksRef.current.audio = null;
        }
        if (video) {
            try { video.stop(); } catch (e) {}
            try { video.close(); } catch (e) {}
            localTracksRef.current.video = null;
        }
        if (screen) {
            try { screen.stop(); } catch (e) {}
            try { screen.close(); } catch (e) {}
            localTracksRef.current.screen = null;
        }

        // **Aggressive DOM cleanup**: remove srcObject from any video/audio elements
        // This ensures no dangling MediaStream keeps the device active
        try {
            document.querySelectorAll('video, audio').forEach((el) => {
            const stream = el.srcObject;
            if (stream && stream.getTracks) {
                stream.getTracks().forEach((t) => {
                try { t.stop(); } catch (_) {}
                });
            }
            try {
                el.pause?.();
                el.srcObject = null;
                el.removeAttribute('src');
            } catch (_) {}
            });
        } catch (e) {
            console.warn("DOM cleanup failed:", e);
        }
        } catch (e) {
        console.error("stopAndCloseAllLocalTracks error:", e);
        }
    };

    async function init() {
        client.on('user-joined', handleUserJoined);
        client.on('user-published', handleUserPublished);
        client.on('user-left', handleUserLeft);

        client.on("user-unpublished", (user, mediaType) => {
        // If a screen sharer unpublishes video, clear all local screen-share state
        if (mediaType === "video" && (user.uid === screenUid || looksLikeScreen(user))) {
            console.log("Screen share stopped/unpublished:", user.uid);
            removeScreenshareUser(user.uid);   // <-- important: empty the list for viewers
            setScreenTrack(null);
            setScreenshareOn(false);
            setScreenUid(null);
            setActiveContent((prev) => (prev === "screen" ? null : prev));
            return;
            }
            // Regular camera/audio unpublish path
            setUsers((previousUsers) =>
            previousUsers.map((u) => {
                if (u.uid !== user.uid) return u;
                if (mediaType === "video") return { ...u, videoTrack: null };
                if (mediaType === "audio") return { ...u, audioTrack: null, micOn: false };
                return u;
            })
            );
        });

        client.on("client-banned", async (evt) => {
        console.warn("You were kicked from the channel:", evt);
        try {
            // ensure tracks are unpublished & closed AND DOM freed
            await stopAndCloseAllLocalTracks();

            // finally leave the Agora channel
            await client.leave();
        } catch (err) {
            console.error("Error leaving after kick:", err);
        }

        // clear session and redirect
        localStorage.removeItem("session");
        navigate("/");
        });

        client.on("connection-state-change", async (cur, prev) => {
        console.log("Connection state:", prev, "->", cur);
        if (cur === "DISCONNECTED") {
            await stopAndCloseAllLocalTracks();
            localStorage.removeItem("session");
            navigate("/");
        }
        });

        // Join and create local tracks: **store real objects in the ref**
        await client.join(session.appId, session.roomName, session.token, session.uid);
        setNameMap(previousUsers => ({ ...previousUsers, [session.uid]: session.userName }));

        const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
        // store the *actual* track objects for reliable cleanup later
        localTracksRef.current.audio = audioTrack;
        localTracksRef.current.video = videoTrack;

        // keep state for UI rendering
        setLocalTracks([audioTrack, videoTrack]);
        setUsers((previousUsers) => [...previousUsers, { uid: session.uid, videoTrack, audioTrack }]);

        if (!session.prefCameraOn) {
            await videoTrack.setEnabled(false);
            setCameraOn(false);
        }
        if (!session.prefMicOn) {
            await audioTrack.setMuted(true);
            setMicOn(false);
        }
        await client.publish([audioTrack, videoTrack]);

        // Auto renew
        client.on("token-privilege-will-expire", renewToken);
        client.on("token-privilege-did-expire", renewToken);
    }

    init();

    return () => {
        // component unmount: perform same safe cleanup
        (async () => {
        try {
            await stopAndCloseAllLocalTracks();
        } catch (e) {
            console.error("cleanup error:", e);
        }
        client.removeAllListeners();
        try { await client.unpublish(); await client.leave(); } catch(_) {}
        })();
    };
    }, []); // keep same deps (run once)

    useEffect(() => {
        if (pinnedUser && !users.find((u) => u.uid === pinnedUser)) {
            setPinnedUser(null);
        }
    }, [users, pinnedUser]);

    // Auto-restore screen share when overriding content (pin/whiteboard) is cleared
    useEffect(() => {
        if (!activeContent && shouldRePinScreen && screenshareUsers.length > 0) {
            setActiveContent("screen");
            setShouldRePinScreen(false);
        }
    }, [activeContent, shouldRePinScreen, screenshareUsers.length]);

    useEffect(() => {
        if (screenshareUsers.length === 0 || !screenshareOn) {
            setShouldRePinScreen(false);
        }
    }, [screenshareUsers.length, screenshareOn]);

    useEffect(() => {
        if (screenshareUsers.length === 0 && activeContent === "screen") {
            setActiveContent(null);
        }
    }, [screenshareUsers.length, activeContent]);

    useEffect(() => {
        if (pinnedUser && !users.find((u) => u.uid === pinnedUser)) {
            setPinnedUser(null);

            // Close right panel if it was showing pinned content
            setActiveContent((prev) => prev === "pin" ? null : prev);
        }
    }, [users, pinnedUser]);

    useEffect(() => {
        if (!session) return;
        const interval = setInterval(async () => {
            try {
            const res = await fetch(`${API_BASE}/api/checkMute/${session.roomName}/${session.uid}`);
            const data = await res.json();
            if (data.muted) {
                // force mute locally
                if (localTracks[0]) {
                await localTracks[0].setMuted(true);
                }
                setMicOn(false);
            }
            } catch (e) {
            console.error("Mute check error", e);
            }
        }, 3000); // check every 3s
        
        return () => clearInterval(interval);
    }, [session, localTracks]);

    const sharedContentActive = Boolean(activeContent);
    const participantCount = users.filter(
        (u) => !(typeof u.uid === "string" && u.uid.startsWith("screenshare-"))
    ).length;
    // Bubble participant count up to App (feeds Experience)
    useEffect(() => {
        if (typeof onParticipantCountChange === "function") {
            onParticipantCountChange(participantCount);
        }
    }, [participantCount, onParticipantCountChange]);
    // Bubble ordered participant names up to App (feeds Experience labels)
    useEffect(() => {
        if (typeof onParticipantsChange !== "function") return;
        const names =
            users
            .filter((u) => !(typeof u.uid === "string" && String(u.uid).startsWith("screenshare-")))
            .map((u, idx) => nameMap[u.uid] || `User ${idx + 1}`);
        onParticipantsChange(names);
    }, [users, nameMap, onParticipantsChange]);
    // Reset to 0 on unmount/leave
    useEffect(() => {
        return () => {
            if (typeof onParticipantCountChange === "function") {
                onParticipantCountChange(0);
            }
       };
    }, [onParticipantCountChange]);

    if (!joined) {
        return (
            <Box
                sx={{
                    height: '100vh',
                    width: '100vw',
                    bgcolor: '#042661ff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4">You left the meeting</Typography>
                <Typography variant="h6">Refresh the page to rejoin</Typography>
            </Box>
        );
    }

    return (
    <>
    {/*<Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh', 
        width: '90vw',
        border: '1px solid white',
        backgroundColor: '#04610914',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        p: 2, overflow: "hidden", boxSizing: "border-box",
    }}
    > */}
    <Box
    sx={{
        width: '85%',
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing :'border-box',
        position: 'absolute',
        top: '10%',
    }}>
        <Box sx={{
            width: isResized ? "100%" : '100%',
            height: isResized ? "40%" : '80%',
            borderRadius: 4,
            //boxShadow: 6,
            //backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            opacity: videoOpacity,
            pointerEvents: videoOpacity === 0 ? 'none' : 'auto',
            transition: 'all 0.3s ease',
            //transform: isResized ? 'translateX(-20%)' : 'translateX(0)',
        }}>
            {/* Main Content */}
            <Box sx={{flex: 1, display: "flex", p: '0.4167vw', gap: '0.4167vw', overflow: "hidden"}}>
                {/* Video Grid (left) */}
                <Box sx={{
                    flex: isResized ? 0.333 : (sharedContentActive ? 0.5 : 1),
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box
                    sx={{
                        flex: 1,
                        bgcolor: 'rgba(0,6,37,0.5)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid white',
                        borderRadius: 2,
                        boxShadow: 3,
                        p: '0.4167vw',
                        gap: '0.4167vw',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignContent: 'flex-start',
                        overflowY: 'auto',
                        height: '100%',
                        '&::-webkit-scrollbar': { 
                            width: '0.2083vw' 
                        },
                        '&::-webkit-scrollbar-track': { 
                            background: 'transparent'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: '3px',
                        },
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#5fb2e2ff transparent'
                    }}
                    >
                        {users
                        .filter((user) => !screenshareUids.includes(user.uid) && user.uid !== pinnedUser)
                        .map((user) => (
                            <Box
                            key={user.uid}
                            sx={{
                                flex: "1 1 calc(25% - 0.4167vw)",
                                maxWidth: "calc(25% - 0.4167vw)",
                                minWidth: '11.719vw',
                                display: 'flex',
                            }}>
                                <VideoPlayer 
                                //key={user.uid} 
                                user={user} 
                                name={nameMap[user.uid]}
                                session={session}
                                onModerate={handleModerate}
                                onPin={handlePin}
                                pinnedUser={pinnedUser}
                                sharedContentActive={sharedContentActive}
                                isResized={isResized}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Middle: Screen Share only in 3D*/}
                {isResized ? (
                    <Box sx={{
                        flex: 0.333,
                        bgcolor: "rgba(0,6,37,0.5)",
                        border: '1px solid white',
                        borderRadius: '8px',
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: "100%",
                        height: "100%",
                        gap: '0.4167vw',
                        position: 'relative'
                    }}>
                        {screenshareUsers.length > 0 ? (
                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'black',
                                borderRadius: '8px',
                                position: 'relative',
                                overflow: 'hidden',
                                p: '0.4167vw'
                            }}>
                                {screenshareUsers.map((user) => (
                                    <Box
                                        key={user.uid}
                                        sx={{
                                        position: 'relative',
                                        aspectRatio: shareAspect,
                                        width: '100%',
                                        maxHeight: '100%',
                                        }}
                                    >
                                        <ScreenVideo track={user.videoTrack} fit="contain" />
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <Typography sx={{ color: 'white', opacity: 0.8, p: 2 }}>No screen sharing</Typography>
                        )}
                    </Box>
                ) : null}

                {/* Right: Whiteboard*/}
                {isResized ? (
                    <Box sx={{
                        flex: 0.333,
                        bgcolor: "rgba(0,6,37,0.5)",
                        border: '1px solid white',
                        borderRadius: '8px',
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: "100%",
                        height: "100%",
                        gap: '0.4167vw',
                        position: 'relative'
                    }}>
                        {whiteboardOn ? (
                            <>
                                <div
                                    id="whiteboard-container"
                                    style={{
                                        width: '97%',
                                        height: '97%',
                                        position: 'relative',
                                        background: 'white',
                                        borderRadius: "8px",
                                        zIndex: 2000,
                                    }} />
                            </>
                        ) : (
                            <Typography sx={{ color: 'white', opacity: 0.8, p: 2 }}>Whiteboard closed</Typography>
                        )}
                    </Box>
                ) : (
                    /* Original single shared content panel in 2D mode */
                    (sharedContentActive || screenshareUsers.length > 0) && (
                        <Box sx={{
                            flex: 0.5,
                            bgcolor: "rgba(0,6,37,0.5)",
                            border: '1px solid white',
                            borderRadius: '8px',
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: "100%",
                            height: "100%",
                            gap: '0.4167vw',
                            position: 'relative'
                        }}>
                            {activeContent === "pin" && pinnedUser && (
                                <VideoPlayer
                                    user={users.find((u) => u.uid === pinnedUser)}
                                    name={nameMap[pinnedUser]}
                                    session={session}
                                    onModerate={handleModerate}
                                    onPin={handlePin}
                                    pinnedUser={pinnedUser}
                                    full
                                    sharedContentActive={sharedContentActive}
                                    isResized={isResized}
                                />
                            )}
                            {activeContent === "whiteboard" && (
                                <>
                                    <div
                                        id="whiteboard-container"
                                        style={{
                                            width: whiteboardFullScreen ? '83.8vw' : '97%',
                                            height: whiteboardFullScreen ? '100%' : '97%',
                                            position: whiteboardFullScreen ? 'absolute' : 'relative',
                                            top: 0,
                                            right: whiteboardFullScreen ? 0 : 'auto',
                                            background: 'white',
                                            borderRadius: "8px",
                                            zIndex: 2000,
                                        }} />
                                    {!isResized && (
                                        <IconButton
                                            size="small"
                                            onClick={() => setWhiteboardFullScreen(prev => !prev)}
                                            sx={{
                                                position: 'absolute',
                                                top: '0.8333vw',
                                                right: '0.8333vw',
                                                zIndex: 2100,
                                                width: '1.25vw',
                                                height: '1.25vw',
                                                color: 'black',
                                                '& .MuiSvgIcon-root': { fontSize: '0.8333vw' },
                                                backgroundColor: 'rgba(255,255,255,0.5)',
                                                '&:hover': { backgroundColor: 'rgba(93, 92, 92, 0.4)' },
                                            }}>
                                            {whiteboardFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                                        </IconButton>
                                    )}
                                </>
                            )}
                            {(activeContent === "screen" || (!activeContent && screenshareUsers.length > 0)) && (
                                <Box
                                    sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'black',
                                    borderRadius: '8px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    p: '0.4167vw'
                                    }}
                                >
                                    {screenshareUsers.map((user) => (
                                    <Box
                                        key={user.uid}
                                        sx={{
                                        position: 'relative',
                                        aspectRatio: shareAspect,
                                        width: '100%',
                                        maxHeight: '100%',
                                        }}
                                    >
                                        <ScreenVideo track={user.videoTrack} fit="contain" />
                                    </Box>
                                    ))}
                                </Box>
                                )}
                        </Box>
                    )
                )}
            </Box>
        </Box>

        {/* Controls Panel */}
        <Box
        sx={{
            height: '10%',
            // bgcolor: '#012f7fff',
            //bgcolor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box', pl: '6.5vw',
            gap: '1.4vw',
            width: '100vw',
            zIndex: 10,
            backgroundImage: `url(${engagement_room_menu_bar})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}>
            <Tooltip title= {cameraOn ? "Turn off Camera" : "Turn on Camera"} arrow>
                <Button
                    variant="outlined"
                    onClick={toggleCamera}
                    sx={{ minWidth: 0, width: '2.5vw', height: '2.5vw', border: 'none', borderRadius: '50%', color: 'white'}}
                >
                    {cameraOn ? <VideocamIcon sx={{fontSize: '1.25vw'}} /> : <VideocamOffIcon sx={{fontSize: '1.25vw'}} />}
                </Button>
            </Tooltip>
            <Tooltip title= {micOn ? "Turn off Mic" : "Turn on Mic"} arrow>
                <Button
                    variant="outlined"
                    onClick={toggleMic}
                    sx={{ minWidth: 0, width: '2.5vw', height: '2.5vw', border: 'none', borderRadius: '50%', color: 'white' }}
                >
                    {micOn ? <MicIcon sx={{fontSize: '1.25vw'}} /> : <MicOffIcon sx={{fontSize: '1.25vw'}} />}
                </Button>
            </Tooltip>
            <Tooltip title= {screenshareOn ? "Stop Sharing" : "Share Screen"} arrow>
                <Button
                    variant="outlined"
                    onClick={toggleScreenShare}
                    sx={{ minWidth: 0, width: '2.5vw', height: '2.5vw', border: 'none', borderRadius: '50%', color: 'white' }}
                >
                    {screenshareOn ? <DesktopAccessDisabledOutlinedIcon sx={{fontSize: '1.25vw'}} /> : <DesktopWindowsOutlinedIcon sx={{fontSize: '1.25vw'}} />}
                </Button>
            </Tooltip>
            <Tooltip title= {whiteboardOn ? "Close Whiteboard" : "Open Whiteboard"} arrow>
                <Button
                    variant="outlined"
                    sx={{ minWidth: 0, width: '2.5vw', height: '2.5vw', border: 'none', borderRadius: '50%', color: 'white',
                    }}
                >
                    {whiteboardOn ? <ContentPasteOffIcon sx={{fontSize: '1.25vw'}} /> : <ContentPasteIcon sx={{fontSize: '1.25vw'}} />}
                </Button>
            </Tooltip>
            <Tooltip title="Invite" arrow>
                <Button
                    variant="outlined"
                    sx={{ minWidth: 0, width: '2.5vw', height: '2.5vw', border: 'none', borderRadius: '50%', color: 'white' }}
                    onClick={() => {
                        const subject = encodeURIComponent("Invitation to Join Meeting");
                        
                        const currentUrl = window.location.href;
                        const url = new URL(currentUrl);
                        const baseUrl = `${url.origin}`;
                        const meetingId = url.pathname.replace("/", ""); // removes leading "/"

                        const body = encodeURIComponent(
                        `Join my meeting at ${baseUrl}\nMeeting ID: ${meetingId}`
                        );

                        window.open(`mailto:?subject=${subject}&body=${body}`);
                    }}>
                    <EmailIcon sx={{fontSize: '1.25vw'}} />
                </Button>
            </Tooltip>
            <Tooltip title={isResized ? "Switch to 2D" : "Switch to 3D"} arrow>
                <Button
                    variant="outlined"
                    sx={{minWidth: 0, width: '2.5vw', height: '2.5vw', border: 'none', borderRadius: '50%', color: 'white'}}
                    //onClick={() => setVideoOpacity((prev) => (prev === 1 ? 0 : 1))}
                    onClick={handleResizeToggle}
                >
                    <Box sx={{position: 'relative', display: 'inline-flex'}}>
                        <ThreeDRotationIcon sx={{fontSize: '1.25vw'}} />
                        {isResized && (
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: 0,
                                width: '100%',
                                height: '0.1042vw',
                                bgcolor: 'white',
                                transform: 'rotate(35deg)',
                                }}
                            />
                        )}
                    </Box>
                </Button>
            </Tooltip>
            <Tooltip title="Leave" arrow>
                <Button
                    variant="contained"
                    color="error"
                    onClick={leaveCall}
                    sx={{ minWidth: 0, width: '2.5vw', height: '2.5vw', borderRadius: '50%' }}
                >
                    <ExitToAppIcon sx={{fontSize: '1.25vw'}} />
                </Button>
            </Tooltip>
        </Box>
    </Box>
    {/* </Box> */}

    {/* Waiting room popup */}
    {currentRequest && (
        <Dialog open={true}>
            <DialogTitle>Join Request</DialogTitle>
            <DialogContent>
                <Typography>
                    {currentRequest.userName} ({currentRequest.role}) wants to join the meeting.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleDecline(currentRequest.uid)} color="error">
                    Decline
                </Button>
                <Button onClick={() => handleAdmit(currentRequest.uid)} color="primary" variant="contained">
                    Admit
                </Button>
            </DialogActions>
        </Dialog>
    )}
    </>
    )
}