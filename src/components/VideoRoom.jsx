import React, {useState, useMemo, useEffect, useRef} from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng'
import {VideoPlayer} from './VideoPlayer';

import {Box, Typography, Button, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Avatar, Divider, Chip, TextField} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import DesktopAccessDisabledOutlinedIcon from '@mui/icons-material/DesktopAccessDisabledOutlined';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ContentPasteOffIcon from '@mui/icons-material/ContentPasteOff';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CheckIcon from '@mui/icons-material/Check';
import EmailIcon from '@mui/icons-material/Email';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import bgImage from '../assets/background.jpg';
import SignatureExp from '../assets/SignatureExp.png';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import engagement_room_menu_bar from '../assets/engagement_room_menu_bar.png';
import headerline from '../assets/header-line.png';
import KPMGSS from '../assets/KPMGSS.jpg';
import step2 from '../assets/step2.png';
import step3 from '../assets/step3.mp4';
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import PeopleIcon from '@mui/icons-material/People';
import GridViewIcon from '@mui/icons-material/GridView';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Badge } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RemoveIcon from '@mui/icons-material/Remove';

import { createFastboard, createUI } from '@netless/fastboard';

const APP_IDENTIFIER = "bo1dsM5xEfCUPQFV4xFmrQ/VVeGCDqXYPxEvg";   // From Agora Console - Whiteboard 9LKW0HzNEfCwKrcQj8VaJw/sE2AINp4OAjMWQ
const SDK_TOKEN = "NETLESSSDK_YWs9b3ExZmtXa0xoTDhiRDdqSiZub25jZT05OGYxYjhkMC1jZTcxLTExZjAtOTQzZC0wMTU1ZTMxMTY2YWQmcm9sZT0wJnNpZz0wNjZjNTM0ZmRhMTFhZjQyYjczNTdjNzBhZTU3OTUxMTc3NDcyNzFmNThiY2M0ODExNGU4Y2Y5ZWU2NDEwZThj";
const REGION = "us-sv";

const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
})
const screenClient = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
})
const API_BASE = import.meta.env.VITE_APP_API_BASE;

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

export const VideoRoom = ({onLeavePopupStateChange, onBlockMiniHotspots, onLeaveAll, onCameraSwitch, onParticipantCountChange, onParticipantsChange,  onParticipantsGenderChange, cameraFlipState, onViewFlagChange, onScreenShareChange, onHideHotspots, onShowHotspots, minimizeBoxesTrigger}) => {
    const { roomName } = useParams();
    const [session, setSession] = useState(() => {
        const saved = localStorage.getItem("session");
        return saved ? JSON.parse(saved) : null;
    });
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [nameMap, setNameMap] = useState({});
    const [genderMap, setGenderMap] = useState({});  
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
    const [isResized, setIsResized] = useState(true); //isResized -> nothing maximized
    const [viewFlag, setViewFlag] = useState(3);
    const [shouldRePinScreen, setShouldRePinScreen] = useState(false);

    const [participantsOpen, setParticipantsOpen] = useState(true);
    const [rosterCollapsed, setRosterCollapsed] = useState(true); 
    const PARTICIPANTS_POS = { bottom: '9vh', left: '80vw' };
    const [rosterTab, setRosterTab] = useState('participants'); // 'participants' | 'chat' (chat disabled)
    const [unreadChatCount, setUnreadChatCount] = useState(0);
    const [unreadParticipantCount, setUnreadParticipantCount] = useState(0);
    const rosterTabRef = useRef('participants');
    const [tilesCollapsed, setTilesCollapsed] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [blockMiniHotspots, setBlockMiniHotspots] = useState(false); // to block mini_hotspots when participant/chat is opened
    const [blockMiniHotspots2, setBlockMiniHotspots2] = useState(false); // to block mini_hotspots when tiled screen is maximized

    useEffect(() => {
        rosterTabRef.current = rosterTab;
        if (rosterTab === 'chat') {
            setUnreadChatCount(0);
        }
    }, [rosterTab]);
    useEffect(() => {
        rosterTabRef.current = rosterTab;
        if (rosterTab === 'participants') {
            setUnreadParticipantCount(0);
        }
    }, [rosterTab]);

    const [screenShareSupported, setScreenShareSupported] = useState(false);
    const [screenShareReason, setScreenShareReason] = useState("");

    const [profileOpen, setProfileOpen] = useState(false);
    const [showLeavePopup, setShowLeavePopup] = useState(false);
    const [showKickPopup, setShowKickPopup] = useState(false);
    const [uidToKick, setUidToKick] = useState(null);

    const [tutorialOpen, setTutorialOpen] = useState(false);
    const [tutorialStep, setTutorialStep] = useState(1); // 1 to 4 for now as per Lokesh's meeting
    const [meetingTimeLabel, setMeetingTimeLabel] = useState('');

    const [screenshareUsers, setScreenshareUsers] = useState([]);
    const [is2DScreenShared, setIs2DScreenShared] = useState(0);
    const [screenShareFull, setScreenShareFull] = useState(false);

    const [shareAspect, setShareAspect] = useState(() =>
        (window.innerHeight > window.innerWidth ? '9 / 16' : '16 / 9')
    );
    const [waitingList, setWaitingList] = useState([]);
    const [pollIntervalId, setPollIntervalId] = useState(null);
    // --- WebSocket chat state ---
    const [chatStatus, setChatStatus] = useState("disconnected"); // "connecting" | "connected" | "error"
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const [chatConnected, setChatConnected] = useState(false);
    const chatSocketRef = useRef(null);
    const chatScrollRef = useRef(null);

    useEffect(() => {
        onLeavePopupStateChange?.(showLeavePopup || showKickPopup);
    }, [showLeavePopup, showKickPopup, onLeavePopupStateChange]);

    useEffect(() => {
        onBlockMiniHotspots?.(blockMiniHotspots || blockMiniHotspots2);
    }, [blockMiniHotspots, blockMiniHotspots2, onBlockMiniHotspots]);

    useEffect(() => {
        rosterTabRef.current = rosterTab;
        if (waitingList.length > 0) {
            if (rosterTabRef.current !== 'participants' || !participantsOpen) {
                setUnreadParticipantCount(waitingList.length);
            }
        } else if (waitingList.length === 0) {
            setUnreadParticipantCount(0);
        }
    }, [rosterTab, waitingList])

    useEffect(() => {
        if (session?.role !== "employee") return;
        const roomName = session?.roomName;
        const fetchWaiting = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/waiting/${roomName}`);
                if (!res.ok) return;
                const data = await res.json();
                setWaitingList(data || []);
            } catch (err) {
                console.error("Failed to fetch waiting list", err);
            }
        };
        fetchWaiting();
        const id = setInterval(fetchWaiting, 2000);
        setPollIntervalId(id);
        return () => clearInterval(id);
    }, [session?.role, session?.roomName]);
    const approveUser = async (uid) => {
        try {
            const res = await fetch(`${API_BASE}/api/approve`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    roomName: session.roomName,
                    uid,
                })
            });
            if (!res.ok) {
                console.warn("Failed to approve user");
                return;
            }
            setWaitingList(list => list.filter(u => u.uid !== uid));
        } catch (err) {
            console.error("Error approving user: ", err);
        }
    };
    const declineUser = async(uid) => {
        try {
            const res = await fetch(`${API_BASE}/api/decline`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    roomName: session.roomName,
                    uid
                })
            });
            if (!res.ok) {
                console.warn("Failed to decline user");
                return;
            }
            setWaitingList(list => list.filter(u => u.uid !== uid));
        } catch (err) {
            console.error("Error declining user: ", err);
        }
    };

    useEffect(() => {
        const onResize = () => {
            setShareAspect(window.innerHeight > window.innerWidth ? '9 / 16' : '16 / 9');
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        if (minimizeBoxesTrigger > 0) {
            setTilesCollapsed(true);
            setParticipantsOpen(false);
        }
    }, [minimizeBoxesTrigger]);
    useEffect(() => {
        if (screenshareUsers.length > 0) {
            onHideHotspots();
        } else {
            onShowHotspots();
        }
    }, [screenshareUsers]);

    useEffect(() => {
        if (typeof onScreenShareChange === 'function') {
            onScreenShareChange(screenshareUsers.length > 0);
        }
    }, [screenshareUsers.length, onScreenShareChange]);

    useEffect(() => {
        return () => {
            if (typeof onScreenShareChange === 'function') {
                onScreenShareChange(false);
            }
        };
    }, [onScreenShareChange]);

    useEffect(() => {
        onViewFlagChange?.(viewFlag);
    }, [viewFlag, onViewFlagChange]);

    useEffect(() => {
        if (!session?.roomName) return;
        (async () => {
            try {
                const res = await fetch(`${API_BASE}/api/rooms`);
                if (!res.ok) return;
                const rooms = await res.json();
                const room = rooms.find(r => r.roomName === session.roomName);
                if (!room || !room.startDateTime || !room.endDateTime) return;

                const start = new Date(room.startDateTime);
                const end = new Date(room.endDateTime);

                const opts = {
                    hour: 'numeric',
                    minute: '2-digit'
                };

                const startStr = start.toLocaleTimeString([], opts);
                const endStr = end.toLocaleTimeString([], opts);

                setMeetingTimeLabel(`Time: ${startStr} - ${endStr}`);
            } catch (e) {
                console.error("Failed to fetch meeting time", e);
            }
        })();
    }, [session?.roomName]);

    // Always scroll to bottom when new messages arrive
    useEffect(() => {
        if (!chatScrollRef.current) return;
        const el = chatScrollRef.current;
        el.scrollTop = el.scrollHeight;
    }, [chatMessages]);

    useEffect(() => {
        const prevHtml = document.documentElement.style.overflow;
        const prevBody = document.body.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        return () => {
            document.documentElement.style.overflow = prevHtml;
            document.body.style.overflow = prevBody;
        };
    }, []);

    useEffect(() => {
        const ua = navigator.userAgent || "";
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
        const hasAPI = !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia);
        if (!hasAPI) {
            setScreenShareSupported(false);
            setScreenShareReason("Screen sharing isn't available in this browser.");
            return;
        }
        if (isMobile) {
            setScreenShareSupported(false);
            setScreenShareReason("Mobile browsers generally don't allow web screen sharing. Use desktop or the native app.");
            return;
        }
        setScreenShareSupported(true);
        setScreenShareReason("");
    }, []);

    const tutorialShownRef = useRef(false);
    useEffect(() => {
        if (joined && !tutorialShownRef.current) {
            tutorialShownRef.current = true;
            setTutorialStep(1);
            setTutorialOpen(true);
            onHideHotspots();
        }
    }, [joined]);

    const handleResizeToggle = () => {
        setIsResized(prev => {
            const nextIsResized = !prev;
            const nextFlag = nextIsResized ? 3 : 2;
            setViewFlag(nextFlag);
            onViewFlagChange?.(nextFlag);
            return nextIsResized;
        });
    };
    const enter2D = () => {
        if (isResized) {
            setIsResized(false);
            setBlockMiniHotspots2(true);
            setViewFlag(2);
            onViewFlagChange?.(2);
        }
    };
    const backTo3D = () => {
        if (!isResized) {
            setIsResized(true);
            setBlockMiniHotspots2(false);
            setViewFlag(3);
            onViewFlagChange?.(3);
            if (screenshareUsers.length === 0) {
                onShowHotspots();
            }
        }
    };

    const triggerDoorClose = () => {
        try {
            window.dispatchEvent(new Event("ic:door"));
        } catch (e) {
            console.warn("Failed to dispatch ic:door event:", e);
        }
    };

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

        // try {
        // document.querySelectorAll("video").forEach((el) => {
        //     if (el.srcObject instanceof MediaStream) {
        //     el.srcObject.getTracks().forEach((t) => { try { t.stop(); } catch {} });
        //     el.srcObject = null;
        //     }
        // });
        // } catch {}

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
        if (!isResized && screenshareUsers.length > 0 && !activeContent) {
            setActiveContent("screen");
        }
    }, [isResized, screenshareUsers.length, activeContent]);

    const handlePin = (uid) => {
        setPinnedUser((prev) => {
            const newPinned = prev === uid ? null : uid;
            if (newPinned) {
                if (activeContent === "screen" && screenshareUsers.length > 0) {
                    setShouldRePinScreen(true);
                }
                setActiveContent("pin");
            } else {
                setActiveContent(null);
            }
            return newPinned;
        });
    };
    
    const fetchAndSetName = async (uid) => {
        if (!session?.roomName) return null;
        const tryFetch = async () => {
            const res = await fetch(`${API_BASE}/api/username?uid=${uid}&roomName=${encodeURIComponent(session.roomName)}`);
            if (!res.ok) return null;
            const data = await res.json();
            const cleanGender =
            data.gender != null && String(data.gender).trim() !== ""
                ? String(data.gender).toLowerCase()
                : null;
            return {
            name: data.username || null,
            gender: cleanGender,
        };
        };
        let profile = await tryFetch();
        if (!profile?.name) {
            await new Promise(r => setTimeout(r, 300));
            profile = await tryFetch();
        }
        if (profile?.name) {
            setNameMap((prev) => ({ ...prev, [uid]: profile.name }));
            }
            if (profile?.gender) {
            setGenderMap((prev) => ({ ...prev, [uid]: profile.gender }));
            }
            return profile?.name || null;
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
        if (!screenShareSupported) {
            alert(screenShareReason || "Screen sharing is not supported on this device/browser.");
            return;
        }
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
                if (/NotAllowedError|NotFoundError/.test(String(err && err.name))) {
                    alert("Your browser blocked screen capture. Try a desktop browser (Chrome/Edge) or a native app.");
                }
            }
        }
    };

    const toggleWhiteboard = () => {
        if (activeContent === "whiteboard") {
            if (window.fastboard) {
                window.fastboardUI.destroy();
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
        const container = document.getElementById("whiteboard-container");
        if (!container || !whiteboardData) return;

        try {
            const fastboard = await createFastboard({
                sdkConfig: { appIdentifier: APP_IDENTIFIER, region: REGION },
                joinRoom: {
                uuid: whiteboardData.uuid,
                roomToken: whiteboardData.token,
                uid: `${Date.now()}`,
                },
                managerConfig: {
                    cursor: true,
                }
            });
            const ui = createUI(fastboard, container);
            window.fastboard = fastboard;
            window.fastboardUI = ui;
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
        //triggerDoorClose();
        await new Promise((r) => setTimeout(r, 1200));
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
                setWhiteboardOn(false);
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
            if (chatSocketRef.current) {
                try { chatSocketRef.current.close(); } catch (_) {}
                chatSocketRef.current = null;
            }
            onLeaveAll(session?.userName, session?.role);
        } catch (err) {
            console.error("Error leaving", err);
        }
    };

    // Fetch a fresh token for the same room + uid
    const renewToken = async () => {
        try {
        const res = await fetch(`${API_BASE}/api/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomName: session.roomName, uid: session.uid, userName: session.userName, gender: session.gender, })
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
                const targetName = nameMap[targetUid] || `User ${targetUid}`;
                await fetch(`${API_BASE}/api/leave`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        roomName: session.roomName,
                        uid: targetUid,
                    }),
                });
                setShowKickPopup(false);
            }
        } catch(err) {
            alert(`Error: ${err.message}`);
        }
    };
    const handleShowKick = (uid) => {
        setUidToKick(uid);
        setShowKickPopup(true);
        onHideHotspots();
        handleTutorialSkip();
    };

    const handleChatKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
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
            console.log("You were kicked from the channel:", evt);
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

            client.on("connection-state-change", async (cur, prev, reason) => {
            console.log("Connection state:", prev, "->", cur, "Reason: ", reason);
            if (cur === "DISCONNECTED") {
                if (reason === "UID_BANNED") {
                    console.log("You have been kicked out of the meeting.");
                }
                await stopAndCloseAllLocalTracks();
                onLeaveAll(session.userName, session.role, true);
                localStorage.removeItem("session");
                navigate("/");
            }
            });
            
            await client.join(session.appId, session.roomName, session.token, session.uid);
            setNameMap(prev => ({ ...prev, [session.uid]: session.userName }));
            if (session?.gender) {
                setGenderMap(prev => ({
                    ...prev,
                    [session.uid]: String(session.gender).toLowerCase(),
                }));
            }

            const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();

            const wantCam = session?.prefCameraOn !== false;
            const wantMic = session?.prefMicOn !== false;

            if (!wantCam) { await videoTrack.setEnabled(false); }
            if (!wantMic) { await audioTrack.setMuted(true); }

            localTracksRef.current.audio = audioTrack;
            localTracksRef.current.video = videoTrack;
            setLocalTracks([audioTrack, videoTrack]);

            setUsers(prev => [
                ...prev,
                {
                    uid: session.uid,
                    videoTrack: wantCam ? videoTrack : null,
                    audioTrack: wantMic ? audioTrack : null,
                    micOn: wantMic
                }
            ]);

            const toPublish = [];
            if (wantMic) toPublish.push(audioTrack);
            if (wantCam) toPublish.push(videoTrack);
            if (toPublish.length) await client.publish(toPublish);

            setCameraOn(wantCam);
            setMicOn(wantMic);

            // Auto renew
            client.on("token-privilege-will-expire", renewToken);
            client.on("token-privilege-did-expire", renewToken);
            try {
                await fetchAndSetName(session.uid);
                } catch (e) {
                console.warn("Failed to refresh self profile from server:", e);
            }
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

    useEffect(() => {
        if (!session?.roomName || !session?.userName) return;

        // Build WS base from API_BASE (http://localhost:5000 → ws://localhost:5000)
        const base = (API_BASE || window.location.origin).replace(/\/$/, "");
        let wsUrl = "";
        try {
            const u = new URL(base);
            u.protocol = u.protocol === "https:" ? "wss:" : "ws:";
            wsUrl =
                `${u.origin}/ws` +
                `?roomName=${encodeURIComponent(session.roomName)}` +
                `&userName=${encodeURIComponent(session.userName)}`;
        } catch {
            wsUrl =
                base.replace(/^http/, "ws").replace(/\/$/, "") +
                `/ws?roomName=${encodeURIComponent(session.roomName)}` +
                `&userName=${encodeURIComponent(session.userName)}`;
        }

        console.log("[Chat] Connecting to", wsUrl);

        const socket = new WebSocket(wsUrl);
        chatSocketRef.current = socket;
        setChatStatus("connecting");

        socket.onopen = () => {
            console.log("[Chat] Connected");
            setChatStatus("connected");
            setChatConnected(true);
            setChatMessages((prev) => [
                ...prev,
                {
                    id: `system-joined-${Date.now()}`,
                    userName: "",
                    text: `You joined ${session.roomName}`,
                    ts: Date.now(),
                },
            ]);
        };

        socket.onmessage = (evt) => {
            try {
                const msg = JSON.parse(evt.data);
                if (msg.type !== "chat") return;
                setChatMessages((prev) => [
                    ...prev,
                    {
                        id: `${msg.ts}-${Math.random().toString(36).slice(2)}`,
                        userName: msg.userName || "Unknown",
                        text: msg.text || "",
                        ts: msg.ts || Date.now(),
                    },
                ]);

                const isSelf =
                    msg.userName &&
                    session?.userName &&
                    msg.userName === session.userName;

                if (!isSelf && rosterTabRef.current !== 'chat') {
                    setUnreadChatCount((prev) => prev + 1);
                }
            } catch (e) {
                console.warn("[Chat] Bad message", e);
            }
        };

        socket.onerror = (err) => {
            console.error("[Chat] WebSocket error", err);
            setChatStatus("error");
            setChatConnected(false);
        };

        socket.onclose = () => {
            console.log("[Chat] Disconnected");
            setChatStatus("disconnected");
            setChatConnected(false);
        };

        return () => {
            console.log("[Chat] Cleaning up socket");
            setChatStatus("disconnected");
            if (chatSocketRef.current === socket) {
                chatSocketRef.current = null;
            }
            try {
                socket.close();
            } catch {}
        };
    }, [session?.roomName, session?.userName, API_BASE]);


    const sharedContentActive = Boolean(activeContent) || (!isResized && screenshareUsers.length > 0);
    const is2DScreenShareActive = !isResized && (activeContent === "screen" || (!activeContent && screenshareUsers.length > 0));
    useEffect(() => {
        setIs2DScreenShared(is2DScreenShareActive ? 1 : 0);
        if (!is2DScreenShareActive || isResized) setScreenShareFull(false);
    }, [isResized, is2DScreenShareActive, activeContent, screenshareUsers.length]);

   const gridUsers = users.filter((u) => !looksLikeScreen(u));
    const participantCount = gridUsers.length;

    // Common visible (non-screen) users list for names & genders passed to Experience
    const visibleUsers = useMemo(
        () => users.filter((u) => !looksLikeScreen(u)),
        [users, nameMap]
    );
    const tiles2DVisibleUsers = useMemo(() => gridUsers.slice(0, 4), [gridUsers]);
    const gridDisplayCount = isResized
        ? Math.min(participantCount, 4)
        : (is2DScreenShareActive ? Math.min(participantCount, 4) : participantCount);
    const fullName = useMemo(() => (session?.userName || "Guest").trim(), [session]);
    const meetingDisplayName = useMemo(() => (session?.roomName || "Meeting"), [session]);
    const userInitial = useMemo(() => (fullName[0] || "?").toUpperCase(), [fullName]);
    const roleLabel = useMemo(() => (session?.role ? (session.role[0].toUpperCase() + session.role.slice(1)) : "Guest"), [session]);
    const designation = useMemo(() => (session?.designation || (session?.role === "employee" ? "KPMG Host" : "Participant")), [session]);

    const genderLabel = useMemo(() => {
        if (!session?.gender) return null;
        const g = String(session.gender).trim();
        if (!g) return null;
        return g.charAt(0).toUpperCase() + g.slice(1).toLowerCase();
    }, [session?.gender]);
    const getInitial = (n) => {
        const s = (n || "").trim();
        return s ? s[0].toUpperCase() : "?";
    };

    const formatChatTime = (ts) => {
        if (!ts) return "";
        const d = new Date(ts);
        return d.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // 24-hour format HH:MM
        });
    };

    // Map desired column counts up to 10 participants
    const computeCols = (n) => {
        switch (n) {
            case 1: return 1;
            case 2: return 2;
            case 3: return 3;
            case 4: return 2;          // 2x2
            case 5:
            case 6: return 3;          // 3x2
            case 7:
            case 8: return 4;          // 4x2
            case 9: return 3;          // 3x3
            case 10: return 5;         // 5x2
            default:
                // sensible fallback if you ever raise caps
                return Math.ceil(Math.sqrt(n || 1));
        }
    };
    const verticalStackIn2D = !isResized && is2DScreenShareActive;
    const cols = verticalStackIn2D
        ? 1
        : (isResized
            ? (gridDisplayCount <= 2 ? gridDisplayCount : 2)
            : computeCols(participantCount));
    const rows = verticalStackIn2D
        ? gridDisplayCount
        : Math.max(1, Math.ceil(gridDisplayCount / cols));

    const PANEL_BG =
    'linear-gradient(0deg, rgba(197,197,197,0.06), rgba(197,197,197,0.06)), rgba(0,45,103,0.50)';
    const PANEL_BORDER = '1px solid rgba(158,199,255,0.60)';
    const PANEL_BLUR = 'blur(24px)'; // Background blur
    const PANEL_SHADOW =
        'inset 0 3.69px 3.69px rgba(74,74,74,0.25), 0 10px 24px rgba(0,0,0,0.35)'; // inner + drop

    const [delayedFlip, setDelayedFlip] = useState(false);

    useEffect(() => {
        setDelayedFlip(false);
        if (cameraFlipState === 1) {
            setDelayedFlip(false);
            const timer = setTimeout(() => {
                setDelayedFlip(true);
            }, 720); // 1 seconds
            return () => clearTimeout(timer);
        }
    }, [cameraFlipState]);

    const isFinalFlip = delayedFlip;
    const signatureOpacity = isFinalFlip ? 1 : 0;

    const maxMiniTiles = isFinalFlip ? 4 : 4;                   // 3 tiles when flipped, 4 otherwise
    const miniTiles = Math.min(gridUsers.length, maxMiniTiles);
    const miniCols = 1;
    const miniRows = miniTiles;
    const TILE_H = '17.5vh';
    const TILES_PANEL_MAX_ROWS = isFinalFlip ? 4 : 4;           // 3 rows when flipped, 4 otherwise
    const TILES_PANEL_FIXED_H = `calc(${TILE_H} * ${TILES_PANEL_MAX_ROWS} + 2vh)`; // tile panel height
    const ROSTER_PANEL_FIXED_H = `calc(${TILE_H} * 4 + 2vh)`;   // roster stays at 4 rows
    const MINI_PANEL_W = '16vw';
    const MINI_PANEL_BOTTOM = isFinalFlip ? '27vh' : '9vh';
    const tiles2DCols = computeCols(tiles2DVisibleUsers.length);
    const tiles2DRows = Math.max(1, Math.ceil(tiles2DVisibleUsers.length / tiles2DCols));

    const hasScreenshare3D = isResized && isFinalFlip && screenshareUsers.length > 0;
    const isTiledMinimized = hasScreenshare3D && (tilesCollapsed || miniTiles === 0);
    const isParticipantsMinimized = hasScreenshare3D && !participantsOpen;

    let flipWidth = "135%";
    let flipLeft = "27.5vw";

    if (isTiledMinimized && !isParticipantsMinimized) {
        flipWidth = "180%";
        flipLeft = "27.5vw";
    } else if (!isTiledMinimized && isParticipantsMinimized) {
        flipWidth = "180%";
        flipLeft = "47.5vw";
    } else if (isTiledMinimized && isParticipantsMinimized) {
        flipWidth = "225%";
        flipLeft = "47.5vw";
    }

    const isPerfectSquareGrid = gridDisplayCount === 1 || gridDisplayCount === 4 || gridDisplayCount === 9;
    const noScreenshareIn2D = !isResized && screenshareUsers.length === 0;
    const is3DView = isResized;
    // scroll ONLY when we actually have more tiles than visible slots
    const gridNeedsScroll = !isResized && (participantCount > cols * rows);


    // Bubble participant count up to App (feeds Experience)
    useEffect(() => {
        if (typeof onParticipantCountChange === "function") {
            onParticipantCountChange(participantCount);
        }
    }, [participantCount, onParticipantCountChange]);
    useEffect(() => {
        if (typeof onParticipantsChange !== "function") return;
        const names = visibleUsers.map((u, idx) =>
            nameMap[u.uid] || `User ${idx + 1}`
        );
        onParticipantsChange(names);
    }, [visibleUsers, nameMap, onParticipantsChange]);

    useEffect(() => {
        if (typeof onParticipantsGenderChange !== "function") return;
        // Must align 1:1 with onParticipantsChange (same visibleUsers order)
        const genders = visibleUsers.map((u) => {
            const g = genderMap[u.uid];
            return g ? String(g).trim().toLowerCase() : null;
        });
        onParticipantsGenderChange(genders);
    }, [visibleUsers, genderMap, onParticipantsGenderChange]);
    // Reset to 0 on unmount/leave
    useEffect(() => {
        return () => {
            if (typeof onParticipantCountChange === "function") {
                onParticipantCountChange(0);
            }
    };
    }, [onParticipantCountChange]);

    const handleTutorialSkip = () => {
        setTutorialOpen(false);
        onShowHotspots();
    };

    // Bottom left: go back a step
    const handleTutorialPrev = () => {
        if (tutorialStep > 1) {
            setTutorialStep(tutorialStep - 1);
        }
    };

    // Bottom right: forward / finish
    const handleTutorialNext = () => {
        if (tutorialStep < 3) {
            setTutorialStep(tutorialStep + 1);
        } else {
            setTutorialOpen(false);
            onShowHotspots();
        }
    };
    
    const sendChatMessage = () => {
        const text = chatInput.trim();
        if (!text) return;
        const socket = chatSocketRef.current;
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            console.warn("[Chat] Cannot send, socket not open");
            return;
        }
        const payload = { type: "chat", text };
        try {
            socket.send(JSON.stringify(payload));
            setChatInput("");
        } catch (e) {
            console.error("[Chat] send error", e);
        }
    };

    const getTutorialBody = (step) => {
        switch (step) {
            case 1:
                return (
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: '0.9375vw',
                            fontWeight: 400,
                            textAlign: 'center',
                            lineHeight: 1.4,
                        }}
                    >
                        Welcome to the meeting. You are now visible to all participants. Click next to continue.
                    </Typography>
                );

            case 2:
                return (
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            gap: '0.8vw',
                        }}
                    >
                        <Box
                            sx={{
                                width: '12vw',
                                height: '7vw',
                                borderRadius: '0.5vw',
                                border: '1px solid rgba(0,247,255,0.45)',
                                bgcolor: 'rgba(0,247,255,0.08)',
                                boxShadow:
                                    '0 0 0 6px rgba(0,247,255,0.04), 0 24px 48px rgba(0,0,0,0.6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.8vw',
                                color: 'rgba(255,255,255,0.6)',
                                textAlign: 'center',
                                fontStyle: 'italic',
                                lineHeight: 1.2,
                                px: '0.5vw',
                            }}
                        >
                            <img
                            src={step2}
                            alt="Taskbar overview"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                        </Box>
                        <Typography
                            sx={{
                                color: 'white',
                                fontSize: '0.9vw',
                                fontWeight: 400,
                                textAlign: 'center',
                                opacity: 0.75,
                                lineHeight: 1.4,
                            }}
                        >
                            Use the taskbar at the bottom to access meeting controls (Mic, Camera, Screenshare and more).
                        </Typography>
                    </Box>
                );

            case 3:
                return (
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            gap: '0.8vw',
                        }}
                    >
                        <Box
                            sx={{
                                width: '12vw',
                                height: '7vw',
                                borderRadius: '0.5vw',
                                border: '1px solid rgba(0,247,255,0.45)',
                                bgcolor: 'rgba(0,247,255,0.08)',
                                boxShadow:
                                    '0 0 0 6px rgba(0,247,255,0.04), 0 24px 48px rgba(0,0,0,0.6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.8vw',
                                color: 'rgba(255,255,255,0.6)',
                                textAlign: 'center',
                                fontStyle: 'italic',
                                lineHeight: 1.2,
                                px: '0.5vw',
                            }}
                        >
                            <video
                            src={step3}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                borderRadius: '0.5vw',
                            }}
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls={false}
                        />
                        </Box>
                        <Typography
                            sx={{
                                color: 'white',
                                fontSize: '0.9vw',
                                fontWeight: 400,
                                textAlign: 'center',
                                opacity: 0.75,
                                lineHeight: 1.4,
                            }}
                        >
                            Click the display to maximize the meeting content.
                        </Typography>
                    </Box>
                );

            default:
                return null;
        }
    };

    const handleOpenTutorialFromButton = () => {
        setTutorialStep(1);
        setTutorialOpen(true);
        onHideHotspots();
        setShowLeavePopup(false);
        setShowKickPopup(false);
    };

    const RosterTabs = ({ compact = false, disableToggle = false }) => (
        <Box
            sx={{
            display: 'flex',
            alignItems: 'center',
            gap: compact ? '0.5vw' : '0.4vw',
            padding: compact ? '0.12vw' : '0.12vw',
            borderRadius: '999px',
            backgroundColor: PANEL_BG,
            flex: 1,
            
            }}
        >
            <Button
              onClick={() => {
                setRosterTab('participants');
                setParticipantsOpen((v) =>
                    disableToggle ? v : (compact ? !v : true)
                );
                setBlockMiniHotspots(true);
              }}
              sx={{
                textTransform: 'none',
                borderRadius: '999px',
                fontSize: '0.6vw',
                fontWeight: 700,
                boxSizing: 'border-box',
                width: '50%',
                px: compact ? '0.9vw' : '0.9vw',
                py: compact ? '0.35vw' : '0.35vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35vw',
                color: 
                  participantsOpen
                    ? rosterTab === 'participants'
                        ? '#FFFFFF'
                        : 'rgba(255,255,255,0.75)'
                    : 'rgba(255,255,255,0.75)',
                background:
                  participantsOpen 
                    ? rosterTab === 'participants'
                        ? 'linear-gradient(90deg,#1D7DEE,#209CD9)'
                        : 'rgba(255,255,255,0.06)'
                    : 'rgba(255,255,255,0.06)',
                border:
                  participantsOpen
                    ? rosterTab === 'participants'
                        ? '1px solid #00F7FF'
                        : '1px solid rgba(255,255,255,0.22)'
                    : '1px solid rgba(255,255,255,0.22)',
                boxShadow:
                  participantsOpen
                    ? rosterTab === 'participants'
                        ? '0 4px 14px rgba(0,0,0,0.25)'
                        : 'none'
                    : 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                    transform: 'scale(1.05)',
                    background:
                      participantsOpen
                        ? rosterTab === 'participants'
                            ? 'linear-gradient(90deg,#1A72D0,#1C8BE8)'
                            : 'rgba(255,255,255,0.10)'
                        : 'rgba(255,255,255,0.10)',
                },
              }}
            >
                <PeopleIcon
                    sx={{ fontSize: compact ? '0.9vw' : '1vw' }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35vw',
                  }}
                >
                    <Typography sx={{ fontSize: '0.7vw' }}>
                        Participants
                    </Typography>
                    {unreadParticipantCount > 0 && (
                        <Box
                            sx={{
                                // minWidth: '1vw',
                                // height: '1vw',
                                borderRadius: '50%',
                                bgcolor: '#d97020',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#FFFFFF',
                                fontWeight: 700,
                                py: '0.1vw', px: '0.3vw'
                            }}
                        >
                            <Typography sx={{fontSize: '0.6vw'}}>
                                {unreadParticipantCount > 9 ? '9+' : unreadParticipantCount}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Button>
            <Button
                onClick={() => {
                    setRosterTab('chat');
                    setParticipantsOpen((v) =>
                        disableToggle ? v : (compact ? !v : true)
                    );
                    setBlockMiniHotspots(true);
                }}
                sx={{
                    textTransform: 'none',
                    borderRadius: '999px',
                    fontSize:'0.6vw',
                    fontWeight: 700,
                    boxSizing: 'border-box',
                    width: '50%',
                    px: compact ? '0.9vw' : '0.9vw',
                    py: compact ? '0.35vw' : '0.35vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35vw',
                    color: 
                      participantsOpen
                        ? rosterTab === 'chat'
                            ? '#FFFFFF'
                            : 'rgba(255,255,255,0.75)'
                        : 'rgba(255,255,255,0.75)',
                    background:
                      participantsOpen 
                        ? rosterTab === 'chat'
                            ? 'linear-gradient(90deg,#1D7DEE,#209CD9)'
                            : 'rgba(255,255,255,0.06)'
                        : 'rgba(255,255,255,0.06)',
                    border:
                      participantsOpen
                        ? rosterTab === 'chat'
                            ? '1px solid #00F7FF'
                            : '1px solid rgba(255,255,255,0.22)'
                        : '1px solid rgba(255,255,255,0.22)',
                    boxShadow:
                      participantsOpen
                        ? rosterTab === 'chat'
                            ? '0 4px 14px rgba(0,0,0,0.25)'
                            : 'none'
                        : 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        background:
                          participantsOpen
                            ? rosterTab === 'chat'
                                ? 'linear-gradient(90deg,#1A72D0,#1C8BE8)'
                                : 'rgba(255,255,255,0.10)'
                            : 'rgba(255,255,255,0.10)',
                    },
                }}
            >
                <QuestionAnswerIcon
                    sx={{ fontSize: compact ? '0.9vw' : '1vw' }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35vw',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '0.7vw',
                        }}
                    >
                        Chat
                    </Typography>
                    {unreadChatCount > 0 && (
                        <Box
                            sx={{
                                minWidth: '1vw',
                                height: '1vw',
                                borderRadius: '50%',
                                bgcolor: '#209CD9',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#FFFFFF',
                                fontWeight: 700,
                                lineHeight: 1,
                                p: 0,
                            }}
                        >
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: '0.65vw',
                                    lineHeight: 1,
                                    p: 0,
                                    m: 0,
                                }}
                            >
                                {unreadChatCount > 9 ? '9+' : unreadChatCount}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Button>
        </Box>
    );
    const TiledScreenHeader = () => (
        <Box
            onClick={() => setTilesCollapsed(false)}
            sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            // px: '0.9vw',
            // py: '0.5vw',
            px: '0.4167vw',
            py: '0.1042vw',
            background: PANEL_BG,
            border: PANEL_BORDER,
            borderRadius: '10px',
            backdropFilter: PANEL_BLUR,
            boxShadow: PANEL_SHADOW,
            cursor: tilesCollapsed ? 'pointer' : 'default',
            userSelect: 'none',
            width: '100%',
            boxSizing: 'border-box',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.4167vw', color: 'white',
                px: '0.9vw',
                py: '0.35vw', 
            }}>
                <GridViewIcon sx={{ fontSize: '0.9vw', color: 'white' }} />
                <Typography sx={{ fontSize: '0.8333vw', fontWeight: 700, color: 'white' }}>
                    Tiled Screen
                </Typography>
            </Box>
            <Box
                onClick={(e) => e.stopPropagation()}
                sx={{ display: 'flex', alignItems: 'center', gap: '0.4vw',
                    px: '0.9vw',
                    py: '0.35vw',
                 }}
            >
                <IconButton
                    size="small"
                    onClick={() => {
                        if (!isResized && activeContent === 'tiles') {
                            setActiveContent(null);
                        } else {
                            setActiveContent('tiles');
                            enter2D();
                            onHideHotspots();
                        }
                    }}
                    sx={{
                        color: 'white',
                        bgcolor: 'rgba(255,255,255,0.08)',
                        p: '0.4167vw',
                        transition: 'all 0.2s ease',
                        '&:hover': { 
                            transform: 'scale(1.08)',
                            bgcolor: 'rgba(255,255,255,0.18)'
                        },
                    }}
                    title={!isResized || activeContent === 'tiles' ? 'Hide Tiles (2D)' : 'Open Tiles in 2D'}
                >
                    <FullscreenIcon sx={{color: 'white', fontSize: '0.7vw'}}/>
                </IconButton>
                {!tilesCollapsed && miniTiles > 0 && (
                    <IconButton
                        size="small"
                        onClick={() => setTilesCollapsed(true)}
                        sx={{
                            color: 'white',
                            bgcolor: 'rgba(255,255,255,0.08)',
                            p: '0.4167vw',
                            transition: 'all 0.2s ease',
                            '&:hover': { 
                                transform: 'scale(1.08)',
                                bgcolor: 'rgba(255,255,255,0.18)'
                            },
                        }}
                        title="Close"
                    >
                        <RemoveIcon sx={{color: 'white', fontSize: '0.7vw'}}/>
                    </IconButton>
                )}
            </Box>
        </Box>
    );

    return (
    <>
    <Box sx={{
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
        {/* Exit Fullscreen button to return to 3D when in 2D view */}
        {!isResized && (
            <>
            {(is2DScreenShareActive || activeContent === "tiles") && (
                <IconButton
                    aria-label={screenShareFull ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                    onClick={backTo3D}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: '-2vw',
                        right: '0.6vw', 
                        zIndex: 2500,
                        bgcolor: "rgba(1,0,37,0.85)",
                        color: "white",
                        border: "1px solid rgba(0,247,255,0.6)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                        width: '2vw',
                        height: '2vw',
                        '& .MuiSvgIcon-root': { fontSize: '1.5vw' },
                        transition: 'all 0.2s ease',
                        '&:hover': { 
                            transform: 'scale(1.08)',
                            bgcolor: 'rgba(0,0,0,0.55)'
                        },
                    }}
                >
                    <FullscreenExitIcon /> 
                </IconButton>
            )}
            </>
        )}
        <Box sx={{
            width: isResized ? (isFinalFlip ? '55vw' : '14%') : '100%',
            height: isResized ? (isFinalFlip ? "95%" : "16%") : '100%',
            borderRadius: 0, boxSizing: 'border-box',
            display: 'flex',
            paddingBottom: '0.4167vw',
            overflow: 'hidden',
            opacity:`videoOpacity`,
            pointerEvents: videoOpacity === 0 ? 'none' : 'auto',
            transition: 'opacity 0.3s ease',
            position: 'relative',   
            top: isResized ? (isFinalFlip ? '0vh' : '33.5vh') : 0,
            left: isResized ? (isFinalFlip ? '0vw' : '1vw') : 0,
        }}>
            {/* Main Content */}
            {isResized ? (
                <Box sx={{
                    // bgcolor: PANEL_BG,
                    borderRadius: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: "100%",
                    height: "100%",
                    gap: '0.4167vw',
                    position: 'relative',
                    cursor: screenshareUsers.length > 0 ? 'pointer' : 'pointer'
                }}>
                    {isFinalFlip && (screenshareUsers.length > 0) &&(
                        <IconButton
                            size="small"
                            onClick={
                                showLeavePopup
                                    ? undefined
                                    : (screenshareUsers.length > 0 ? enter2D : undefined)
                            }
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
                                transition: 'all 0.2s ease',
                                '&:hover': { 
                                    transform: 'scale(1.08)',
                                    backgroundColor: 'rgba(93, 92, 92, 0.4)'
                                },
                            }}>
                            <FullscreenIcon />
                        </IconButton>
                    )}
                    <Box
                    onClick={() => {onCameraSwitch();}}
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 1,
                        boxSizing: 'border-box',
                        ...((showLeavePopup || showKickPopup) ? { pointerEvents: 'none' } : {})
                    }}
                    />
                    {screenshareUsers.length > 0 ? (
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: PANEL_BG,
                            border: PANEL_BORDER,
                            backdropFilter: PANEL_BLUR,
                            borderRadius: '0px',
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
                                    width: '95%',
                                    maxHeight: '95%',
                                    }}
                                >
                                    <ScreenVideo track={user.videoTrack} fit="contain" />
                                </Box>
                            ))}
                            </Box>
                    ) : (
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: PANEL_BG,
                            border: PANEL_BORDER,
                            backdropFilter: PANEL_BLUR,
                            borderRadius: '0px',
                            position: 'relative',
                            overflow: 'hidden',
                            opacity: signatureOpacity,
                            // transition: 'opacity .3s ease',
                        }}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                aria-label="No screen shared"
                            >
                                <img
                                    src={SignatureExp}
                                    alt="Signature experience"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                    }}
                                />
                            </Box>
                        </Box>
                    )}
                    
                </Box>
            ) : null}
    
            {/* Single shared content panel in 2D mode only */}
            {!isResized && (sharedContentActive || screenshareUsers.length > 0) && (
                <Box sx={{
                    flex: 1,
                    bgcolor: PANEL_BG,
                    boxSizing: 'border-box',
                    borderLeft: 'none',
                    borderRadius: '8px',
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: "100%",
                    height: "100%",
                    gap: '0.4167vw',
                    position: 'relative',
                    padding: '1vw',
                    boxSizing: 'border-box'
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
                            onKick={handleShowKick}
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
                                }} 
                            />
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
                                        transition: 'all 0.2s ease',
                                        '&:hover': { 
                                            transform: 'scale(1.08)',
                                            backgroundColor: 'rgba(93, 92, 92, 0.4)'
                                        },
                                    }}>
                                    {whiteboardFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                                </IconButton>
                            )}
                        </>
                    )}
                    {activeContent === "tiles" && (
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'grid',
                                gridTemplateColumns: `repeat(${tiles2DCols}, minmax(0, 1fr))`,
                                gridTemplateRows: `repeat(${tiles2DRows}, 1fr)`,
                                gap: '0.4167vw',
                                background: PANEL_BG,              
                                border: PANEL_BORDER,
                                backdropFilter: PANEL_BLUR,
                                borderRadius: '8px',
                                position: 'relative',
                                p: '0.4167vw'
                            }}
                        >
                            {tiles2DVisibleUsers.length === 0 ? (
                                <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,0.6)'}}>
                                    <Typography sx={{fontSize:'0.95vw'}}>No participants yet.</Typography>
                                </Box>
                            ) : (
                                tiles2DVisibleUsers.map((user) => (
                                    <Box
                                        key={user.uid}
                                        sx={{
                                            position: 'relative',
                                            width: '100%',
                                            height: '100%',
                                            overflow: 'hidden',
                                            borderRadius: '6px',
                                            backgroundColor: 'black',
                                        }}
                                    >
                                        <VideoPlayer
                                            user={user}
                                            name={nameMap[user.uid]}
                                            session={session}
                                            onModerate={handleModerate}
                                            onPin={handlePin}
                                            pinnedUser={pinnedUser}
                                            sharedContentActive={true}   // full 2D area
                                            isResized={false}
                                            isFullScreen={true}
                                            onKick={handleShowKick}
                                        />
                                    </Box>
                                ))
                            )}
                        </Box>
                    )}
                    {(activeContent === "screen" || (!activeContent && screenshareUsers.length > 0)) && (
                        <Box
                            sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: PANEL_BG,
                            border: PANEL_BORDER,
                            backdropFilter: PANEL_BLUR,
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
            )}
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
            gap: '0.6vw',
            width: '100vw',
            zIndex: 10,
            backgroundImage: `url(${engagement_room_menu_bar})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}>
            <Tooltip title={fullName} arrow>
                <Button
                    variant="outlined"
                    onClick={() => setProfileOpen(true)}
                    sx={{
                        minWidth: 0,
                        width: '2.5vw',
                        height: '2.5vw',
                        aspectRatio: '1 / 1',
                        p: 0,
                        boxSizing: 'border-box',
                        lineHeight: 1,
                        flex: '0 0 auto',
                        border: '1.5px solid rgba(255,255,255,0.85)',
                        borderRadius: '9999px',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1.0417vw',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textTransform: 'none',
                        transition: 'all 0.2s ease',
                        '&: hover': {
                            transform: 'scale(1.08)',
                        }
                    }}
                >
                    {userInitial}
                </Button>
            </Tooltip>
            <Tooltip title= {cameraOn ? "Turn off Camera" : "Turn on Camera"} arrow>
                <Button
                    variant="outlined"
                    onClick={toggleCamera}
                    sx={{ minWidth: 0, width: '2.5vw', height: '2.5vw', border: 'none', borderRadius: '50%', color: 'white',
                        transition: 'all 0.2s ease',
                        '&: hover': {
                            transform: 'scale(1.08)',
                        }
                    }}
                >
                    {cameraOn ? <VideocamIcon sx={{fontSize: '1.25vw'}} /> : <VideocamOffIcon sx={{fontSize: '1.25vw'}} />}
                </Button>
            </Tooltip>
            <Tooltip title= {micOn ? "Turn off Mic" : "Turn on Mic"} arrow>
                <Button
                    variant="outlined"
                    onClick={toggleMic}
                    sx={{ minWidth: 0, width: '2.5vw', height: '2.5vw', border: 'none', borderRadius: '50%', color: 'white',
                        transition: 'all 0.2s ease',
                        '&: hover': {
                            transform: 'scale(1.08)',
                        }
                     }}
                >
                    {micOn ? <MicIcon sx={{fontSize: '1.25vw'}} /> : <MicOffIcon sx={{fontSize: '1.25vw'}} />}
                </Button>
            </Tooltip>
            <Tooltip
                title={
                    screenShareSupported
                        ? (screenshareOn ? "Stop Sharing" : "Share Screen")
                        : (screenShareReason || "Screen sharing not supported on this device/browser")
                }
                arrow
            >
                <Button
                    variant="outlined"
                    onClick={toggleScreenShare}
                    disabled={!screenShareSupported}
                    sx={{
                        minWidth: 0,
                        width: '2.5vw',
                        height: '2.5vw',
                        aspectRatio: '1 / 1',
                        p: 0,
                        boxSizing: 'border-box',
                        lineHeight: 1,
                        flex: '0 0 auto',
                        border: 'none',
                        borderRadius: '50%',
                        color: 'white',
                        opacity: screenShareSupported ? 1 : 0.5,
                        cursor: screenShareSupported ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s ease',
                        '&: hover': {
                            transform: 'scale(1.08)',
                        }
                    }}
                >
                    {screenshareOn ? <DesktopAccessDisabledOutlinedIcon sx={{fontSize: '1.25vw'}} /> : <DesktopWindowsOutlinedIcon sx={{fontSize: '1.25vw'}} />}
                </Button>
            </Tooltip>
            <Tooltip title= {whiteboardOn ? "Close Whiteboard" : "Open Whiteboard"} arrow>
                <Button
                    variant="outlined"
                    onClick={toggleWhiteboard}
                    sx={{ minWidth: 0, width: '2.5vw', height: '2.5vw', border: 'none', borderRadius: '50%', color: 'white',
                        //cursor: 'not-allowed !important',
                        //opacity: 0.5,
                    }}
                >
                    {whiteboardOn ? <ContentPasteOffIcon sx={{fontSize: '1.25vw'}} /> : <ContentPasteIcon sx={{fontSize: '1.25vw'}} />}
                </Button>
            </Tooltip>
            <Tooltip title="Invite" arrow>
                <Button
                    variant="outlined"
                    sx={{ minWidth: 0, width: '2.5vw', height: '2.5vw', border: 'none', borderRadius: '50%', color: 'white',
                        transition: 'all 0.2s ease',
                        '&: hover': {
                            transform: 'scale(1.08)',
                        }
                     }}
                    onClick={async () => {
                        const subject = encodeURIComponent("Invitation to Virtual Ignition Center Meeting");
                        
                        const currentUrl = window.location.href;
                        const url = new URL(currentUrl);
                        const baseUrl = `${url.origin}`;
                        const roomName = url.pathname.replace("/", ""); // removes leading "/"
                        try {
                            const response = await fetch(`${API_BASE}/api/rooms`);
                            const rooms = await response.json();
                            const room = rooms.find(r => r.roomName === roomName);

                            let meetingCodeText = room?.meetingCode 
                            ? `Meeting Code: ${room.meetingCode}`
                            : "Meeting code not found. ";

                            const body = encodeURIComponent(
                                `Join my meeting at ${baseUrl}\n${meetingCodeText}`
                            );
                            window.open(`mailto:?subject=${subject}&body=${body}`);
                        } catch (error) {
                            console.error("Error fetching meeting code:", error);
                            const body = encodeURIComponent(
                                `Join my meeting at ${baseUrl}\nMeeting Code: (unavailable)`
                            );
                            window.open(`mailto:?subject=${subject}&body=${body}`);
                        }
                    }}>
                    <EmailIcon sx={{fontSize: '1.25vw'}} />
                </Button>
            </Tooltip>
            <Tooltip title="Leave" arrow>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                        setShowLeavePopup(true);
                        handleTutorialSkip();
                        onHideHotspots();
                    }}
                    sx={{
                        minWidth: 0,
                        width: '2.5vw',
                        height: '2.5vw',
                        aspectRatio: '1 / 1',
                        p: 0,
                        boxSizing: 'border-box',
                        lineHeight: 1,
                        flex: '0 0 auto',
                        borderRadius: '9999px',
                        transition: 'all 0.2s ease',
                        '&: hover': {
                            transform: 'scale(1.08)',
                        }
                    }}
                >
                    <ExitToAppIcon sx={{fontSize: '1.25vw'}} />
                </Button>
            </Tooltip>
        </Box>
    </Box>
    {/* Tiles Section */}
    {isResized && !tilesCollapsed && (
        <Box
            sx={{
                position: 'fixed',
                top: '10vh',
                left: '1.2vw',
                //bottom: MINI_PANEL_BOTTOM,
                zIndex: 3500,
                width: '18vw',
                height: isFinalFlip ? '80.7vh' : '80vh', // isFinalFlip -> when we move close to center screen
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4167vw',
                justifyContent: 'flex-start',
            }}
        >
            {/* HEADER */}
            <TiledScreenHeader />

            {/* BODY */}
            {/* Tiles grid (only when expanded and at least one tile) */}
            {miniTiles > 0 && (
                <Box
                className="mobile-scroll hide-scrollbar"
                sx={{
                    width: '100%',
                    flex: 1,
                    boxSizing: 'border-box',
                    p: '0.6vw',
                    display: 'grid',
                    gap: '0.4167vw',
                    gridTemplateColumns: `repeat(${miniCols}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${miniRows}, ${TILE_H})`,
                    alignContent: miniRows < 4 ? 'center' : 'start',
                    background: PANEL_BG,
                    border: PANEL_BORDER,
                    borderRadius: '10px',
                    backdropFilter: PANEL_BLUR,
                    boxShadow: PANEL_SHADOW,
                    overflowY: 'hidden',
                    '&::-webkit-scrollbar': { width: '0.2083vw' },
                    '&::-webkit-scrollbar-thumb': { borderRadius: '3px' },
                }}
                >
                {gridUsers
                    .filter((u) => !screenshareUids.includes(u.uid) && u.uid !== pinnedUser)
                    .slice(0, miniTiles)
                    .map((user) => (
                    <Box
                        key={user.uid}
                        sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                        borderRadius: '6px',
                        backgroundColor: 'black',
                        }}
                    >
                        {/* <Box sx={{ position: 'absolute', inset: 0, display: 'flex' }}> */}
                        <VideoPlayer
                            user={user}
                            name={nameMap[user.uid]}
                            session={session}
                            onModerate={handleModerate}
                            onPin={handlePin}
                            pinnedUser={pinnedUser}
                            sharedContentActive={true}   // mini grid is always 2D
                            isResized={false}
                            onKick={handleShowKick}
                        />
                        {/* </Box> */}
                    </Box>
                    ))}
                </Box>
            )}
        </Box>
    )}

    {showLeavePopup && (
        <Box sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '36vw',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,63,145,0.31)',
            border: '1px solid rgba(158,199,255,0.6)',
            borderRadius: '12px',
            backdropFilter: 'blur(46.09px)',
            boxShadow: `
                0 3.69px 3.69px rgba(0,0,0,0.25),
                inset 0 3.69px 3.69px rgba(74,74,74,0.25)
            `,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.8333vw',
            padding: '2.0833vw',
            boxSizing: 'border-box',
            zIndex: 9999,
        }}>
            {/* Header */}
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw', }}>
                <img src={headerline} style={{transform: 'scaleX(-1)', width: '8.5vw'}}/>
                <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
                    Leave Meeting
                </Typography>
                <img src={headerline} style={{ width: '8.5vw'}}/>
            </Box>
            <Typography sx={{color: 'white', fontSize: '0.9375vw', fontWeight: 'lighter', textAlign: 'center'}}>
                Are you sure you want to leave this meeting?
            </Typography>
            <Typography sx={{mt: '-0.8333vw', color: 'white', fontSize: '0.9375vw', fontWeight: 'lighter', textAlign: 'center'}}>
                You'll be disconnected from the session and any active conversations.
            </Typography>
            <Box sx={{
                display: 'flex',
                gap: '0.8333vw'
            }}>
                <Button
                variant="outlined"
                onClick={() => {
                    setShowLeavePopup(false);
                    onShowHotspots();
                }}
                sx={{
                    width: '5vw',
                    height: '2vw',
                    textTransform: 'none',
                    borderRadius: '6px',
                    fontSize: '0.8333vw',
                    fontWeight: 700,
                    border: '0.5px solid #66E4FF',
                    boxShadow: '0 2.25px 5.63px rgba(0,43,255,0.37)',
                    color: '#66E4FF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&: hover': {
                        transform: 'scale(1.08)',
                    }
                }}>
                    Cancel
                </Button>
                <Button
                variant="contained"
                onClick={() => {leaveCall();}}
                sx={{
                    width: '5vw',
                    height: '2vw',
                    textTransform: 'none',
                    borderRadius: 2,
                    fontSize: '0.8333vw',
                    fontWeight: 700,
                    border: '0.5px solid #66E4FF',
                    boxShadow: '0 2.25px 5.63px rgba(0,43,255,0.37)',
                    background: 'linear-gradient(to right, #209CD9, #1D7DEE)',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                        transform: 'scale(1.08)',
                        bgcolor: '#1976d2'
                    },
                }}>
                    Leave
                </Button>
            </Box>
        </Box>
    )}
    {showKickPopup && (
        <Box sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '36vw',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,63,145,0.31)',
            border: '1px solid rgba(158,199,255,0.6)',
            borderRadius: '12px',
            backdropFilter: 'blur(46.09px)',
            boxShadow: `
                0 3.69px 3.69px rgba(0,0,0,0.25),
                inset 0 3.69px 3.69px rgba(74,74,74,0.25)
            `,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.8333vw',
            padding: '2.0833vw',
            boxSizing: 'border-box',
            zIndex: 9999,
        }}>
            {/* Header */}
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw', }}>
                <img src={headerline} style={{transform: 'scaleX(-1)', width: '8.5vw'}}/>
                <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
                    Remove From Meeting
                </Typography>
                <img src={headerline} style={{ width: '8.5vw'}}/>
            </Box>
            <Typography sx={{color: 'white', fontSize: '0.9375vw', fontWeight: 'lighter', textAlign: 'center'}}>
                Are you sure you want to remove this user from this meeting?
            </Typography>
            {/* <Typography sx={{mt: '-0.8333vw', color: 'white', fontSize: '0.9375vw', fontWeight: 'lighter', textAlign: 'center'}}>
                You'll be disconnected from the session and any active conversations.
            </Typography> */}
            <Box sx={{
                display: 'flex',
                gap: '0.8333vw'
            }}>
                <Button
                variant="outlined"
                onClick={() => {
                    setShowKickPopup(false);
                    onShowHotspots();
                }}
                sx={{
                    width: '5vw',
                    height: '2vw',
                    textTransform: 'none',
                    borderRadius: '6px',
                    fontSize: '0.8333vw',
                    fontWeight: 700,
                    border: '0.5px solid #66E4FF',
                    boxShadow: '0 2.25px 5.63px rgba(0,43,255,0.37)',
                    color: '#66E4FF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&: hover': {
                        transform: 'scale(1.08)',
                    }
                }}>
                    Cancel
                </Button>
                <Button
                variant="contained"
                onClick={async (e) => {
                    e.stopPropagation();
                    await handleModerate('kick', uidToKick);
                }}
                sx={{
                    width: '5vw',
                    height: '2vw',
                    textTransform: 'none',
                    borderRadius: 2,
                    fontSize: '0.8333vw',
                    fontWeight: 700,
                    border: '0.5px solid #66E4FF',
                    boxShadow: '0 2.25px 5.63px rgba(0,43,255,0.37)',
                    background: 'linear-gradient(to right, #209CD9, #1D7DEE)',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                        transform: 'scale(1.08)',
                        bgcolor: '#1976d2'
                    },
                }}>
                    Remove
                </Button>
            </Box>
        </Box>
    )}
    <Dialog
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        BackdropProps={{ invisible: true }} 
        sx={{
            '& .MuiDialog-container': {
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
            },
        }}
        PaperProps={{
            sx: {
                position: 'fixed',
                top: '75vh',
                left: '25vw',
                m: 0,
                width: '20vw',
                maxWidth: '90vw',
                borderRadius: '0.8vw',
                border: '1px solid rgba(158,199,255,0.6)',
                bgcolor: 'rgba(0,63,145,0.31)',
                backdropFilter: 'blur(24px)',
                color: 'white',
                boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            }
        }}
        >
        <DialogTitle sx={{ position: 'relative', p: '1vw', pb: '0.5vw' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.8vw' }}>
            <Avatar
                sx={{
                width: '3.2vw', height: '3.2vw', fontSize: '1.25vw', fontWeight: 700,
                bgcolor: 'rgba(0,247,255,0.15)', color: 'white',
                border: '1px solid rgba(0,247,255,0.6)',
                boxShadow: '0 0 0 6px rgba(0,247,255,0.08)',
                }}
            >
                {userInitial}
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '1.25vw', fontWeight: 'bold', lineHeight: 1.2 }}>
                {fullName}
                </Typography>
                <Typography sx={{ fontSize: '0.9vw', opacity: 0.85, mt: '0.15vw' }}>
                {designation}
                </Typography>
            </Box>
            </Box>
            <IconButton
            onClick={() => setProfileOpen(false)}
            size="small"
            sx={{
                position: 'absolute', right: '0.6vw', top: '0.6vw',
                color: 'white', bgcolor: 'rgba(255,255,255,0.08)',
                width: '1.6vw', height: '1.6vw',
                '& .MuiSvgIcon-root': { fontSize: '1vw' },
                transition: 'all 0.2s ease',
                '&:hover': { 
                    transform: 'scale(1.08)',
                    bgcolor: 'rgba(255,255,255,0.18)' 
                },
            }}
            >
            <CloseIcon />
            </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{
            borderColor: 'rgba(0,247,255,0.2)',
            px: '1vw', py: '0.8vw'
        }}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',   // center horizontally
                    alignContent: 'center',     // center when wrapping to multiple rows
                    gap: '0.6vw',
                    width: '100%',
                }}
            >
            <Chip
                label={`Role: ${roleLabel}`}
                sx={{
                fontSize: '0.78vw', height: '1.6vw',
                color: 'white',
                border: '1px solid rgba(0,247,255,0.45)',
                bgcolor: 'rgba(0,247,255,0.08)',
                '& .MuiChip-label': { px: '0.7vw' }
                }}
                variant="outlined"
            />
            {session?.roomName && (
                <Chip
                label={`Meeting: ${session.roomName}`}
                sx={{
                    fontSize: '0.78vw', height: '1.6vw',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.25)',
                    bgcolor: 'rgba(255,255,255,0.06)',
                    '& .MuiChip-label': { px: '0.7vw' }
                }}
                variant="outlined"
                />
            )}
            </Box>
            
        </DialogContent>
        
    </Dialog>
    {/* Participants/Chat Section */}
    {isResized && participantsOpen && (
        <Box
            sx={{
            position: 'fixed',
            top: '10vh',
            right: '1.2vw',
            width: '18vw',
            height: isFinalFlip ? '80.7vh' : '80vh',
            zIndex: 3000,
            color: 'white',
            userSelect: 'auto',
            cursor: 'default',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4167vw',
            }}
        >
            {/* HEADER */}
            <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4vw',
                width: '100%',
                px: '0.4167vw',
                py: '0.2083vw',
                background: PANEL_BG,
                border: PANEL_BORDER,
                borderRadius: '10px',
                backdropFilter: PANEL_BLUR,
                boxShadow: PANEL_SHADOW,
                boxSizing: 'border-box',
                overflow: 'hidden',
            }}
            >
                {/* Use compact pill look, but DON'T toggle the panel from here */}
                <RosterTabs /> {/*compact disableToggle*/}
                <IconButton
                    size="small"
                    onClick={() => {
                        setParticipantsOpen(false);
                        setBlockMiniHotspots(false);
                    }}
                    sx={{
                        color: 'white',
                        bgcolor: 'rgba(255,255,255,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: '0.4167vw',
                        transition: 'all 0.2s ease',
                        '&:hover': { 
                            transform: 'scale(1.08)',
                            bgcolor: 'rgba(255,255,255,0.18)' 
                        },
                    }}
                >
                    <RemoveIcon sx={{color: 'white', fontSize: '0.7vw'}}/>
                </IconButton>
            </Box>

            {/* BODY */}
            <Box
            sx={{
                width: '100%',
                // height: ROSTER_PANEL_FIXED_H,
                // maxHeight: '80vh',
                flex: 1,
                overflow: 'hidden',
                background: PANEL_BG,
                border: PANEL_BORDER,
                borderRadius: '10px',
                backdropFilter: PANEL_BLUR,
                boxShadow: PANEL_SHADOW,
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box'
            }}
            >
            {rosterTab === 'participants' ? (
                <>
                    {/* Search + Mute All row */}
                    <Box sx={{ 
                        display:'flex', 
                        alignItems:'center', 
                        gap:'0.8333vw', 
                        p:'0.6vw 0.9vw',
                    }}>
                        <TextField
                        value={searchTerm}
                        onChange={(e)=>setSearchTerm(e.target.value)}
                        placeholder="Type a name"
                        size="small"
                        variant="outlined"
                        sx={{
                            p: '0.4167vw',
                            flex: 1,
                            '& .MuiInputBase-input': { fontSize:'0.7292vw', color:'white' },
                            '& .MuiOutlinedInput-root': {
                            bgcolor: 'rgba(255,255,255,0.06)',
                            borderRadius: '0.6vw',
                            '& fieldset': { borderColor:'rgba(255,255,255,0.25)' },
                            }
                        }}
                        />
                        <Button
                        onClick={async ()=>{
                            const toMute = users.filter(u=>u.micOn);
                            for (const u of toMute) { try { await handleModerate('mute', u.uid); } catch(_){} }
                        }}
                        sx={{
                            textTransform:'none',
                            fontSize:'0.7292vw',
                            // height:'2vw',
                            padding: '0.5vw',
                            border:'1px solid rgba(255,255,255,0.3)',
                            color:'white',
                            bgcolor:'rgba(255,255,255,0.06)',
                            borderRadius:'0.5vw',
                            gap: '0.4vw',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'all 0.2s ease',
                            '&: hover': {
                                transform: 'scale(1.08)',
                            }
                        }}>
                            <MicOffIcon sx={{ fontSize: '1vw', opacity: 0.7 }} />
                            <Typography sx={{fontSize: '0.7292vw'}}>
                                Mute All
                            </Typography>
                        </Button>
                    </Box>
                    <Divider sx={{ mx: '0.8vw', borderColor: 'rgba(255,255,255,0.2)' }} />

                    {/* Scrollable list */}
                    <Box
                        className="mobile-scroll hide-scrollbar"
                        sx={{
                        p: '0.8vw',
                        pt: '0.6vw',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5vw',
                        '&::-webkit-scrollbar': { width: '0.2083vw' },
                        '&::-webkit-scrollbar-track': { background: 'transparent' },
                        '&::-webkit-scrollbar-thumb': { borderRadius: '3px' },
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#5fb2e2ff transparent',
                        '@media (hover: none), (pointer: coarse)': {
                            scrollbarWidth: 'none',
                            WebkitOverflowScrolling: 'touch',
                            overscrollBehavior: 'contain',
                            '&::-webkit-scrollbar': { display: 'none' }
                        }
                        }}
                    >
                        {session?.role === "employee" && waitingList.length > 0 && (
                            <>
                                <Typography
                                    sx={{
                                        fontSize: '0.78vw',
                                        fontWeight: 600,
                                        opacity: 0.9,
                                        mb: '0.2vw',
                                    }}
                                >
                                    In the lobby ({waitingList.length})
                                </Typography>
                                <Divider
                                    sx={{
                                        borderColor: 'rgba(255,255,255,0.4)',
                                        mb: '0.35vw',
                                    }}
                                />

                                {waitingList.map((u) => (
                                    <Box
                                        key={u.uid}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            py: '0.3vw',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.55vw',
                                                minWidth: 0,
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    width: 'clamp(1.25vw, 1.8vw, 1.875vw)',
                                                    height: 'clamp(1.25vw, 1.8vw, 1.875vw)',
                                                    fontSize: 'clamp(0.625vw, 0.9vw, 1.875vw)',
                                                    fontWeight: 700,
                                                    bgcolor: 'rgba(0,247,255,0.15)',
                                                    color: 'white',
                                                    border: '1px solid rgba(0,247,255,0.6)',
                                                    flex: '0 0 auto',
                                                }}
                                            >
                                                {getInitial(u.name || 'U')}
                                            </Avatar>
                                            <Typography
                                                sx={{
                                                    fontSize: 'clamp(12px, 0.9vw, 16px)',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    maxWidth: '10vw',
                                                }}
                                                title={u.name}
                                            >
                                                {u.name}
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.4vw',
                                            }}
                                        >
                                            <IconButton
                                                size="small"
                                                onClick={() => approveUser(u.uid)}
                                                sx={{
                                                    width: '1.4vw',
                                                    height: '1.4vw',
                                                    borderRadius: '2px',
                                                    border: '1px solid #66E4FF',
                                                    bgcolor: '#1D7DEE',
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': { 
                                                        transform: 'scale(1.08)',
                                                        bgcolor: '#1D7DEE' 
                                                    },
                                                }}
                                            >
                                                <CheckIcon sx={{ fontSize: '0.95vw', color: '#FFFFFF' }} />
                                            </IconButton>

                                            <IconButton
                                                size="small"
                                                onClick={() => declineUser(u.uid)}
                                                sx={{
                                                    width: '1.4vw',
                                                    height: '1.4vw',
                                                    borderRadius: '2px',
                                                    border: '1px solid #66E4FF',
                                                    bgcolor: 'transparent',
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        transform: 'scale(1.08)',
                                                        bgcolor: 'rgba(102,228,255,0.12)',
                                                    },
                                                }}
                                            >
                                                <CloseIcon sx={{ fontSize: '0.95vw', color: '#FFFFFF' }} />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                ))}

                                <Box sx={{ mt: '0.6vw' }} />
                            </>
                        )}
                        <Typography
                            sx={{
                                fontSize: '0.78vw',
                                fontWeight: 600,
                                opacity: 0.9,
                                mb: '0.2vw',
                            }}
                        >
                            In the meeting
                        </Typography>
                        <Divider
                            sx={{
                                borderColor: 'rgba(255,255,255,0.2)',
                                mb: '0.35vw',
                            }}
                        />
                        {users
                        .filter(u => !looksLikeScreen(u))
                        .filter(u => (nameMap[u.uid] || `User ${u.uid}`).toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((u) => {
                            const hasVideo = Boolean(u.videoTrack);
                            const hasMic = u.micOn === true;
                            const uname = nameMap[u.uid] || `User ${u.uid}`;
                            return (
                            <Box
                                key={u.uid}
                                sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderRadius: '8px',
                                px: '0.8vw',
                                py: '0.35vw',
                                bgcolor: 'rgba(255,255,255,0.06)'
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.55vw', minWidth: 0 }}>
                                    <Avatar
                                        sx={{
                                            width: 'clamp(1.25vw, 1.8vw, 1.875vw)',
                                            height: 'clamp(1.25vw, 1.8vw, 1.875vw)',
                                            fontSize: 'clamp(0.625vw, 0.9vw, 1.875vw)',
                                            fontWeight: 700,
                                            bgcolor: 'rgba(0,247,255,0.15)',
                                            color: 'white',
                                            border: '1px solid rgba(0,247,255,0.6)',
                                            flex: '0 0 auto'
                                        }}
                                    >
                                        {getInitial(uname)}
                                    </Avatar>
                                    <Typography
                                        sx={{
                                            //fontSize: 'clamp(12px, 0.95vw, 16px)',
                                            fontSize: '0.8333vw',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '12vw'
                                        }}
                                        title={uname}
                                    >
                                        {uname}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.6vw' }}>
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: '0.6vw'}}>
                                        {hasVideo ? <VideocamIcon sx={{ fontSize: '1.05vw' }} /> : <VideocamOffIcon sx={{ fontSize: '1.05vw', opacity: 0.7 }} />}
                                        {hasMic ? <MicIcon sx={{ fontSize: '1.05vw' }} /> : <MicOffIcon sx={{ fontSize: '1.05vw', opacity: 0.7 }} />}
                                        {(session?.role === "employee") ? 
                                        <IconButton
                                        size="small"
                                        onClick={() => {
                                        try {
                                            if (u.uid === session?.uid) {
                                                setShowLeavePopup(true);
                                                handleTutorialSkip();
                                                onHideHotspots();
                                            } else {
                                                setUidToKick(u.uid);
                                                setShowKickPopup(true);
                                                handleTutorialSkip();
                                                onHideHotspots();
                                            }
                                        } catch (err) {
                                            console.error('Leave/Kick error:', err);
                                        }
                                        }}
                                        sx={{
                                        color: 'red',
                                            width: '1.4vw',
                                            height: '1.4vw',
                                            '& .MuiSvgIcon-root': { fontSize: '0.95vw' },
                                            transition: 'all 0.2s ease',
                                            '&: hover': {
                                                transform: 'scale(1.08)',
                                            }
                                        }}
                                        >
                                            <ExitToAppIcon />
                                        </IconButton> : null}
                                    </Box>
                                    <MoreHorizIcon sx={{ fontSize: '1.05vw', opacity: 0.7 }} />
                                </Box>
                            </Box>
                            );
                        })}

                        {users.filter(u => !looksLikeScreen(u)).length === 0 && (
                        <Typography sx={{ opacity: 0.8 }}>No participants yet.</Typography>
                        )}
                    </Box>
                </>
                ) : (
                <>
                    <Box sx={{ px:'0.9vw', pt:'0.6vw', pb:'0.6vw', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                        <Typography sx={{ fontSize:'0.9vw', fontWeight:700 }}>Meeting Chat</Typography>
                        <Typography sx={{ fontSize:'0.75vw', opacity:0.75 }}>
                            {chatStatus === "connecting" && "Connecting…"}
                            {chatStatus === "connected" && "Connected"}
                            {chatStatus === "error" && "Error"}
                            {chatStatus === "disconnected" && chatStatus !== "connecting" && "Disconnected"}
                        </Typography>
                    </Box>
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

                    {/* Messages area */}
                    <Box
                        className="mobile-scroll hide-scrollbar"
                        sx={{
                            flex: 1,
                            p:'0.8vw',
                            display:'flex',
                            flexDirection:'column',
                            gap:'0.5vw',
                            overflowY:'auto',
                            '&::-webkit-scrollbar': { width: '0.2083vw' },
                            '&::-webkit-scrollbar-thumb': { borderRadius:'3px' },
                        }}
                    >
                        {chatMessages.length === 0 && (
                            <Box
                                sx={{
                                    alignSelf: 'center',
                                    maxWidth:'80%',
                                    background: 'rgba(255,255,255,0.08)',
                                    border: '1px dashed rgba(255,255,255,0.25)',
                                    borderRadius:'0.6vw',
                                    px:'0.7vw',
                                    py:'0.45vw',
                                }}
                            >
                                <Typography sx={{fontSize:'0.85vw'}}>
                                    Start a conversation with everyone in this room.
                                </Typography>
                            </Box>
                        )}
                        {chatMessages.map((m) => (
                            <Box
                                key={m.id}
                                sx={{
                                    alignSelf:
                                        m.userName === session?.userName ? 'flex-end' : 'flex-start',
                                    maxWidth:'80%',
                                    background:
                                        m.userName === session?.userName
                                            ? 'rgba(0,247,255,0.12)'
                                            : 'rgba(255,255,255,0.08)',
                                    border:
                                        m.userName === session?.userName
                                            ? '1px solid rgba(0,247,255,0.35)'
                                            : '1px solid rgba(255,255,255,0.2)',
                                    borderRadius:'0.6vw',
                                    px:'0.7vw',
                                    py:'0.45vw',
                                }}
                            >
                                {m.userName !== session?.userName && (
                                    <Typography
                                        sx={{
                                            fontSize:'0.72vw',
                                            opacity:0.8,
                                            mb:'0.2vw',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {m.userName}
                                    </Typography>
                                )}
                                <Typography sx={{fontSize:'0.85vw'}}>{m.text}</Typography>
                                <Typography
                                    sx={{
                                        fontSize: '0.7vw',
                                        opacity: 0.75,
                                        mt: '0.1vw',
                                        textAlign: 'right',
                                    }}
                                >
                                    {formatChatTime(m.ts)}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Composer */}
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                    <Box sx={{ display:'flex', alignItems:'center', gap:'0.6vw', p:'0.8vw' }}>
                        <TextField
                            fullWidth
                            placeholder={
                                chatStatus === "connected"
                                    ? "Type a message…"
                                    : "Connecting to chat…"
                            }
                            size="small"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    sendChatMessage();
                                }
                            }}
                            disabled={chatStatus !== "connected"}
                            sx={{
                                '& .MuiInputBase-input': { fontSize:'0.83vw', color:'white' },
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'rgba(255,255,255,0.06)',
                                    borderRadius: '0.6vw',
                                    '& fieldset': { borderColor:'rgba(255,255,255,0.25)' },
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={sendChatMessage}
                            disabled={chatStatus !== "connected" || !chatInput.trim()}
                            endIcon={<SendIcon />}
                            sx={{
                                textTransform:'none',
                                fontSize:'0.78vw',
                                height:'2vw',
                                borderRadius:'0.5vw',
                                background:'linear-gradient(to right, #209CD9, #1D7DEE)',
                                opacity: chatStatus === "connected" ? 1 : 0.5,
                                transition: 'all 0.2s ease',
                                '&: hover': {
                                    transform: 'scale(1.08)',
                                }
                            }}
                        >
                            Send
                        </Button>
                    </Box>
                </>
            )}
            </Box>
        </Box>
    )}

    {tutorialOpen && (
        <Box
            sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)', //scale(1.2)
                width: '26vw',
                height: 'auto',
                // maxWidth: '90vw',
                borderRadius: '0.8vw',
                backgroundColor: 'rgba(0,63,145,0.31)',
                border: '1px solid rgba(158,199,255,0.6)',
                borderRadius: '12px',
                backdropFilter: 'blur(46.09px)',
                boxShadow: `
                    0 3.69px 3.69px rgba(0,0,0,0.25),
                    inset 0 3.69px 3.69px rgba(74,74,74,0.25)
                `,
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 999,
                p: '1.25vw',
                boxSizing: 'border-box',
            }}
        >
            {tutorialStep !== 3 && (
                <Button
                    onClick={handleTutorialSkip}
                    sx={{
                        position: 'absolute',
                        right: '0.4167vw',
                        top: '0.4167vw',
                        minWidth: 0,
                        px: '0.8vw',
                        height: '1.5vw',
                        fontSize: '0.7292vw',
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: '0.5vw',
                        color: '#66E4FF',
                        border: '0.5px solid #66E4FF',
                        boxShadow: '0 2.25px 5.63px rgba(0,43,255,0.37)',
                        backgroundColor: 'rgba(0,247,255,0.08)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            transform: 'scale(1.08)',
                            backgroundColor: 'rgba(0,247,255,0.18)',
                        },
                    }}
                >
                    Skip
                </Button>
            )}
            {/* Header row (title + close) */}
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    mb: '0.8vw',
                    gap: '0.4vw',
                }}
            >
                <img
                    src={headerline}
                    style={{ transform: 'scaleX(-1)', width: '6vw' }}
                />
                <Typography
                    sx={{
                        color: 'white',
                        fontSize: '1.1vw',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        lineHeight: 1.2,
                    }}
                >
                    Instructions
                </Typography>
                <img
                    src={headerline}
                    style={{ width: '6vw' }}
                />
            </Box>

            {/* Step x/4 indicator */}
            <Typography
                sx={{
                    fontSize: '0.8vw',
                    color: 'rgba(255,255,255,0.7)',
                    mb: '0.6vw',
                    fontWeight: 500,
                }}
            >
                Step {tutorialStep}/3
            </Typography>

            <Typography
                sx={{
                    fontSize: '1vw',
                    fontWeight: 700,
                    color: 'white',
                    mb: '0.8vw',
                    textAlign: 'center',
                    lineHeight: 1.3,
                }}
            >
                {tutorialStep === 1 && ''}
                {tutorialStep === 2 && 'Taskbar'}
                {tutorialStep === 3 && 'Interactive Display'}
            </Typography>

            <Box
                sx={{
                    width: '100%',
                    minHeight: '8vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    px: '0.5vw',
                    mb: '1vw',
                }}
            >
                {getTutorialBody(tutorialStep)}
            </Box>

            {/* Footer buttons */}
            {tutorialStep === 3 ? (
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={handleTutorialNext}
                        sx={{
                            minWidth: 0,
                            width: '6vw',
                            height: '1.5vw',
                            textTransform: 'none',
                            borderRadius: 2,
                            fontSize: '0.7292vw',
                            fontWeight: 700,
                            border: '0.5px solid #66E4FF',
                            boxShadow: '0 2.25px 5.63px rgba(0,43,255,0.37)',
                            background: 'linear-gradient(to right, #209CD9, #1D7DEE)',
                            transition: 'all 0.2s ease',
                            '&:hover': { 
                                transform: 'scale(1.08)',
                                bgcolor: '#1976d2'
                            },
                        }}
                    >
                        Finish
                    </Button>
                </Box>
            ) : (
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {/* <Button
                        variant="contained"
                        onClick={handleTutorialPrev}
                        disabled={tutorialStep === 1}
                        sx={{
                            minWidth: 0,
                            width: '5vw',
                            height: '1.5vw',
                            textTransform: 'none',
                            borderRadius: 2,
                            fontSize: '0.7292vw',
                            fontWeight: 700,
                            border: '0.5px solid #66E4FF',
                            boxShadow: '0 2.25px 5.63px rgba(0,43,255,0.37)',
                            background: 'linear-gradient(to right, #209CD9, #1D7DEE)',
                            '&:hover': {
                                bgcolor: '#1976d2',
                            },
                            // make disabled look visually dimmed but keep same shape
                            opacity: tutorialStep === 1 ? 0.4 : 1,
                            cursor: tutorialStep === 1 ? 'not-allowed' : 'pointer',
                        }}
                    >
                        Prev
                    </Button> */}
                    <Button
                        variant="contained"
                        onClick={handleTutorialNext}
                        sx={{
                            minWidth: 0,
                            width: '5vw',
                            height: '1.5vw',
                            textTransform: 'none',
                            borderRadius: 2,
                            fontSize: '0.7292vw',
                            fontWeight: 700,
                            border: '0.5px solid #66E4FF',
                            boxShadow: '0 2.25px 5.63px rgba(0,43,255,0.37)',
                            background: 'linear-gradient(to right, #209CD9, #1D7DEE)',
                            transition: 'all 0.2s ease',
                            '&:hover': { 
                                transform: 'scale(1.08)',
                                bgcolor: '#1976d2' 
                            },
                        }}
                    >
                        Next
                    </Button>
                </Box>
            )}

        </Box>
    )}
    {/* Info Icon */}
    <Box
        sx={{
            position: 'fixed',
            right: '1.5vw',
            bottom: '1.5vw',
            zIndex: 100000, 
        }}
    >
        <IconButton
            onClick={handleOpenTutorialFromButton}
            sx={{
                position: "fixed",
                top: '0.8333vw',
                right: "0.8333vw",
                minWidth: 0,
                width: '2.6042vw',
                height: '2.6042vw',
                borderRadius: "50%",
                border: "1px solid #00F7FF",
                cursor: "pointer",
                zIndex: 1000,
                background: "rgba(1,0,37,0.5)",
                transition: 'all 0.2s ease',
                '&: hover': {
                    transform: 'scale(1.08)',
                }
            }}
        >
            <InfoOutlinedIcon sx={{ fontSize: '1.25vw', color: '#66E4FF' }} />
        </IconButton>
    </Box>
    {isResized && !participantsOpen && (
        <Box
            sx={{
                position: 'fixed',
                right: '1.2vw',
                bottom: '3vh',
                zIndex: 3500,
                width: '18vw',
                background: PANEL_BG,
                border: PANEL_BORDER,
                borderRadius: '10px',
                backdropFilter: PANEL_BLUR,
                boxShadow: PANEL_SHADOW,
                // px: '1.6vw',
                // py: '0.4vw',
                px: '0.4167vw',
                py: '0.2083vw',
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <RosterTabs compact />
        </Box>
    )}
    {isResized && tilesCollapsed && (
        <Box
          sx={{
              position: 'fixed',
              left: '1.2vw',
              bottom: '3vh',
              zIndex: 3500,
              width: '18vw',
              boxSizing: 'border-box',
              display: 'flex',
              justifyContent: 'center',
          }}
        >
            <TiledScreenHeader />
        </Box>
    )}
    </>
    )
}