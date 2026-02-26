import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, TextField, Typography, List, ListItem, ListItemText, Stack, Tooltip, Switch, IconButton, FilledInput, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/background.jpg";
import CloseIcon from '@mui/icons-material/Close';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import client_img from '../assets/client_img.png';
import employee_img from '../assets/employee_img.png';
import solution_underline from '../assets/solution_underline.png';
import headerline from '../assets/header-line.png';
import participant_icon from '../assets/participant_icon.png';
import admin_icon from '../assets/admin_icon.png';
import PersonIcon from '@mui/icons-material/Person';
import Person2Icon from '@mui/icons-material/Person2';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PasswordIcon from '@mui/icons-material/Password';
import TuneIcon from '@mui/icons-material/Tune';
import accessVerified_icon from '../assets/accessVerified_icon.png';

const API_BASE = import.meta.env.VITE_APP_API_BASE;
const ERROR_COLOR = "#00F7FF"; // #00FFCC

export default function RoomsLobby({onLeaveSession, onClose, onExplore, onContinue, goIn, goToF, onJoinRoom, skipPersona = false, onAdminEnter, onSessionData}) {
  const [personaChosen, setPersonaChosen] = useState(skipPersona ? true : false);
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState("");
  const [createdRoom, setCreatedRoom] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedClientRoom, setSelectedClientRoom] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [role, setRole] = useState("");
  const [prefCameraOn, setPrefCameraOn] = useState(false);
  const [prefMicOn, setPrefMicOn] = useState(false);
  const [avatarGender, setAvatarGender] = useState("male"); // "male" | "female"
  const navigate = useNavigate();
  const [joinRoomName, setJoinRoomName] = useState("");
  const [adminStep, setAdminStep] = useState("landing");
  const [clientStep, setClientStep] = useState("landing");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [meetingCode, setMeetingCode] = useState("");
  const [showNotStartedPopup, setShowNotStartedPopup] = useState({visible: false, message: ""});
  const [showWaitingPopup, setShowWaitingPopup] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [infoRoom, setInfoRoom] = useState(null);
  const [meetingTime, setMeetingTime] = useState(null);
  const [meetingDate, setMeetingDate] = useState(null);
  const [meetingEndTime, setMeetingEndTime] = useState(null);
  const [meetingEndDate, setMeetingEndDate] = useState(null);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [roomName, setRoomName] = useState("");
  const [approvalPollingId, setApprovalPollingId] = useState(null);
  const [requestApproved, setRequestApproved] = useState(false);
  const [waitingUid, setWaitingUid] = useState(null);

  const GenderSelector = ({ value, onChange }) => {
    const commonBtn = {
      borderRadius: '20px',
      px: '0.625vw',
      py: '0.2083vw',
      display: 'flex',
      alignItems: 'center',
      gap: '0.3125vw',
      cursor: 'pointer',
      transition: 'all 120ms ease',
      userSelect: 'none'
    };
    const selected = (isFemale=false) => ({
      background: 'rgba(0,134,201,0.22)',   
      border: '0.4px solid #66E4FF',
      boxShadow: '0 1.2px 3px rgba(0,0,0,0.25)',
    });
    const unselected = { background: 'rgba(0,0,0,0.08)' };
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.625vw',
          borderRadius: '20px',
          px: '0.625vw',
          py: '0.2083vw',
        }}
      >
        <Box
          role="button"
          aria-pressed={value === 'male'}
          onClick={() => onChange('male')}
          sx={{ 
            ...commonBtn, 
            ...(value === 'male' ? selected(false) : unselected) ,
            transition: 'all 0.2s ease',
            '&: hover': {
                transform: 'scale(1.08)',
            }
          }}
        >
          <MaleIcon sx={{ fontSize: '0.9vw', color: 'white' }}/>
          <Typography sx={{ fontSize: '0.7292vw', color: 'white' }}>Male</Typography>
        </Box>
        <Box
          role="button"
          aria-pressed={value === 'female'}
          onClick={() => onChange('female')}
          sx={{ 
            ...commonBtn, 
            ...(value === 'female' ? selected(true) : unselected),
            transition: 'all 0.2s ease',
            '&: hover': {
                transform: 'scale(1.08)',
            }
          }}
        >
          <FemaleIcon sx={{ fontSize: '0.9vw', color: 'white' }}/>
          <Typography sx={{ fontSize: '0.7292vw', color: 'white' }}>Female</Typography>
        </Box>
      </Box>
    );
  };

  const PENDING_JOIN_KEY = "ic_pending_join";
  const savePendingJoin = (obj) => {
    try { localStorage.setItem(PENDING_JOIN_KEY, JSON.stringify(obj)); } catch(e){/* ignore */ }
  };
  const loadPendingJoin = () => {
    try { return JSON.parse(localStorage.getItem(PENDING_JOIN_KEY) || "null"); } catch(e){ return null; }
  };
  const clearPendingJoin = () => {
    try { localStorage.removeItem(PENDING_JOIN_KEY); } catch(e){/* ignore */ }
  };
  const [pendingJoinChecked, setPendingJoinChecked] = useState(false);
  const [pendingJoinData, setPendingJoinData] = useState(null); // { username, meetingCode, roomName }
  const [meetingStartedPopup, setMeetingStartedPopup] = useState(null);

  const SESSION_KEY = "ic_session_data";
  const saveSessionData = (data) => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  };
  const loadSessionData = () => {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null"); }
    catch { return null; }
  };
  const clearSessionData = () => {
    sessionStorage.removeItem(SESSION_KEY);
  };

  const PENDING_APPROVAL_KEY = "ic_pending_approval";
  const FORCE_PREVIEW_KEY = "ic_force_client_preview";

  const savePendingApproval = (obj) => {
    try { sessionStorage.setItem(PENDING_APPROVAL_KEY, JSON.stringify(obj)); } catch(e) {}
  };
  const clearPendingApproval = () => {
    try { sessionStorage.removeItem(PENDING_APPROVAL_KEY); } catch(e) {}
  };
  const loadForcePreview = () => {
    try { return JSON.parse(sessionStorage.getItem(FORCE_PREVIEW_KEY) || "null"); } catch(e){ return null; }
  };
  const clearForcePreview = () => {
    try { sessionStorage.removeItem(FORCE_PREVIEW_KEY); } catch(e) {}
  };
  
  useEffect(() => {
    console.log("Updated selectedClientRoom:", selectedClientRoom);
  }, [selectedClientRoom]);

  useEffect(() => {
    const fp = loadForcePreview();
    if (role === "client" && fp?.roomName) {
      (async () => {
        try {
          const res2 = await fetch(`${API_BASE}/api/roomDetails`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomName: fp.roomName, role }),
          });
          const roomData = await res2.json();
          // const count = getRoomCount(roomData);
          // setSelectedClientRoom({ ...roomData, participantCount: count });
          setSelectedClientRoom(roomData);
          setRoomName(fp.roomName);
          setClientStep("preview");
        } catch (e) {
          console.error("Force-preview failed:", e);
        } finally {
          clearForcePreview();
        }
      })();
    }
  }, [role]);


  useEffect(() => {
    const setupSession = async () => {
      if (clientStep === "meetnotstarted" || clientStep === "meetstarted" || clientStep === "preview") {
        const { roomName } = await resolveRoomByCode(joinRoomName);
        const session = {
          role,
          username,
          meetingCode: joinRoomName,
          roomName: roomName,
          clientStep,
          meetingTime,
          meetingDate,
          meetingEndTime,
          meetingEndDate,
          gender: avatarGender,
          participantCount: getRoomCount(roomName),
        };

        console.log("Session data sent to App (auto on mount): ", session);
        saveSessionData(session);
        onSessionData?.(session); // Notify App
      }
    };
    setupSession();
  }, [clientStep]);

  useEffect(() => {
    const setupSession = async () => {
      if (adminStep === "meetnotstarted" || adminStep === "meetstarted" || adminStep === "preview") {
        const session = {
          role,
          username,
          roomName: roomName,
          adminStep,
          meetingTime,
          meetingDate,
          meetingEndTime,
          meetingEndDate,
          gender: avatarGender,
        };

        console.log("Session data sent to App (auto on mount): ", session);
        saveSessionData(session);
        onSessionData?.(session); // Notify App
      }
    };
    setupSession();
  }, [adminStep]);

  useEffect(() => {
    const session = loadSessionData();
    if (session?.role) {
      if (session.gender) {
        setAvatarGender(session.gender);
      }
      setRole(session.role);
      setPersonaChosen(true);
      if (session.role === "employee") {
        goIn();
        setUsername(session.username || "");
        if (session.adminStep !== "preview") {
          setAdminStep(session.adminStep || "choice");
        } else {
          setAdminStep("choice");
        }
        if (session.adminStep === "meetnotstarted") {
          setMeetingTime(session.meetingTime);
          setMeetingDate(session.meetingDate);
          setMeetingEndTime(session.meetingEndTime);
          setMeetingEndDate(session.meetingEndDate);
          setRoomName(session.roomName);
          const scheduledTime = new Date(`${session.meetingDate} ${session.meetingTime}`);
          const scheduledEndTime = new Date(`${session.meetingEndDate} ${session.meetingEndTime}`);
          const now = new Date();
          if (now >= scheduledEndTime) {
            console.log("Meeting end time reached");
            setAdminStep("join");
          }
          else if (now >= scheduledTime) {
            console.log("Meeting time reached");
            setAdminStep("meetstarted")
          }
          else {
            console.log("Meeting not started yet");
            setAdminStep("meetnotstarted");
          }
        }
        else if (session.adminStep === "meetstarted") {
          setMeetingTime(session.meetingTime);
          setMeetingDate(session.meetingDate);
          setMeetingEndTime(session.meetingEndTime);
          setMeetingEndDate(session.meetingEndDate);
          setRoomName(session.roomName);
          const scheduledTime = new Date(`${session.meetingDate} ${session.meetingTime}`);
          const scheduledEndTime = new Date(`${session.meetingEndDate} ${session.meetingEndTime}`);
          const now = new Date();
          if (now >= scheduledEndTime) {
            console.log("Meeting end time reached");
            setAdminStep("join");
          } else {
            setAdminStep("meetstarted");
          }
        }
      }
      else if (session.role === "client") {
        setUsername(session.username || "");
        setJoinRoomName(session.meetingCode || "");
        if (session.clientStep !== "preview") {
          setClientStep(session.clientStep || "landing");
        } else {
          setClientStep("landing");
        }
        if (session.clientStep === "meetnotstarted") {
          goIn();
          setMeetingTime(session.meetingTime);
          setMeetingDate(session.meetingDate);
          setMeetingEndTime(session.meetingEndTime);
          setMeetingEndDate(session.meetingEndDate);
          setRoomName(session.roomName);
          const scheduledTime = new Date(`${session.meetingDate} ${session.meetingTime}`);
          const scheduledEndTime = new Date(`${session.meetingEndDate} ${session.meetingEndTime}`);
          const now = new Date();
          if (now >= scheduledEndTime) {
            console.log("Meeting end time reached");
            setClientStep("landing");
          }
          else if (now >= scheduledTime) {
            console.log("Meeting time reached");
            setClientStep("meetstarted");
            //joinClientRoom(session.roomName);
            //setClientStep("preview");
          } else {
            goIn();
            console.log("Meeting not started yet");
            setClientStep("meetnotstarted");
          }
        } else if (session.clientStep === "meetstarted") {
          goIn();
          setMeetingTime(session.meetingTime);
          setMeetingDate(session.meetingDate);
          setMeetingEndTime(session.meetingEndTime);
          setMeetingEndDate(session.meetingEndDate);
          setRoomName(session.roomName);
          const scheduledTime = new Date(`${session.meetingDate} ${session.meetingTime}`);
          const scheduledEndTime = new Date(`${session.meetingEndDate} ${session.meetingEndTime}`);
          const now = new Date();
          if (now >= scheduledEndTime) {
            console.log("Meeting end time reached");
            setClientStep("landing");
          } else {
            setClientStep("meetstarted");
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    if (clientStep === "meetnotstarted" && meetingTime && meetingDate) {
      const target = new Date(`${meetingDate} ${meetingTime}`).getTime();

      const interval = setInterval(() => {
        if (requestApproved) return;
        const now = Date.now();
        const diff = target - now;

        if (diff <= 0) {
          clearInterval(interval);
          const session = loadSessionData();
          console.log("Loaded session data: ", session);
          console.log("Meeting started automatically");
          setClientStep("meetstarted");
          if (approvalPollingId) clearInterval(approvalPollingId);
          return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({hours, minutes, seconds});
      }, 1000);
      return () => {
        clearInterval(interval);
        if (approvalPollingId) clearInterval(approvalPollingId);
      };
    }
  }, [clientStep, meetingTime, meetingDate, requestApproved]);

  useEffect(() => {
    if (adminStep === "meetnotstarted" && meetingTime && meetingDate) {
      const target = new Date(`${meetingDate} ${meetingTime}`).getTime();

      const interval = setInterval(() => {
        const now = Date.now();
        const diff = target - now;

        if (diff <= 0) {
          clearInterval(interval);
          console.log("Meeting started automatically");
          setAdminStep("meetstarted")
          return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({hours, minutes, seconds});
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [adminStep, meetingTime, meetingDate]);

  const [errors, setErrors] = useState({
    roomName: "",
    meetingCode: "",
    date: "",
    startTime: "",
    endTime: "",
  })
  const [joinErrors, setJoinErrors] = useState({
    username: "",
    meetingCode: "",
  });

  const handleCopyMeetingCode = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code).catch((err) => {
      console.error("Copy failed: ", err);
    });
  };

  useEffect(() => {
    if (skipPersona === "client") {
      setPersonaChosen(true);
      setRole("client");
    } else if (skipPersona === "employee") {
      setPersonaChosen(true);
      setRole("employee");

      const storedUser = JSON.parse(window.localStorage.getItem("loggedInUser"));
      if (storedUser?.username) {
        const admins = {
          "jeanny@kpmg.com": "Jeanny",
          "alex@kpmg.com": "Alex",
          "admin": "Admin",
        };
        const matchedEmail = Object.keys(admins).find(
          (email) => admins[email] === storedUser.username
        );
        if (matchedEmail) {
          setEmail(matchedEmail);
          setUsername(storedUser.username);
          setAdminStep("join");
        }
      }
    }
  }, [skipPersona]);
  const handleEnter = () => {
    const admins = {
      "jeanny@kpmg.com": "Jeanny",
      "alex@kpmg.com": "Alex",
      "admin": "Admin",
    };
    const matchedName = admins[email.trim().toLowerCase()];

    if(matchedName) {
      setUsername(matchedName);
      setError(false);
      setAdminStep("accessVerified");
      window.dispatchEvent(new CustomEvent("ic:door"));
      const session = {
        role,
        username: matchedName,
        gender: avatarGender,
      };
      console.log("Session data sent to App: ", session);
      saveSessionData(session);
      onSessionData?.(session); // Notify App

      setTimeout(() => {
        if (typeof onAdminEnter === "function") onAdminEnter();
        setAdminStep("choice");
      }, 2000);
    } else {
      setError(true);
    }
  };

  const leaveSession = async () => {
    try {
      await fetch(`${API_BASE}/api/leaveWaiting`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          roomName: roomName,
          uid: waitingUid
        }),
      });
      console.log("User removed from waiting list");
    } catch (error) {
      console.error("Error leaving waiting list: ", error);
    }
  };

  const fetchRooms = async () => {
    const res = await fetch(`${API_BASE}/api/rooms`);
    const data = await res.json();
    setRooms(data);
  };

  useEffect(() => {
    fetchRooms();
    const id = setInterval(fetchRooms, 1000); // refresh list every 5s
    return () => clearInterval(id);
  }, []);

  const digitsOnly = (s = "") => String(s).replace(/\D+/g, "");
  const resolveRoomByCode = async (rawCode) => {
    const norm = digitsOnly(rawCode);
    if (!norm || norm.length !== 9) {
      throw new Error("Please enter a 9-digit meeting code.");
    }
    const res = await fetch(`${API_BASE}/api/roomByCode/${norm}`);
    if (!res.ok) {
      const msg = await res.json().catch(() => ({}));
      throw new Error(msg.error || "Invalid meeting code");
    }
    return res.json(); // { roomName }
  };

  useEffect(() => {
    if (role === "employee" && adminStep === "schedule") {
      (async () => {
        try {
          const res = await fetch(`${API_BASE}/api/meetingCode/new`);
          const data = await res.json();
          if (res.ok && data?.meetingCode) setMeetingCode(data.meetingCode);
        } catch (e) {
          console.error("Failed to get meeting code:", e);
        }
      })();
    }
  }, [role, adminStep]);

  const regenerateMeetingCode = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/meetingCode/new`);
      const data = await res.json();
      if (res.ok && data?.meetingCode) {
        setMeetingCode(data.meetingCode);
      }
    } catch (e) {
      console.error("Failed to regenerate meeting code:", e);
    }
  };

  const getRoomCount = (r) => {
    if (Array.isArray(r?.participants)) {
      return r.participants.filter((p) => {
        const n = p?.userName || p?.name || "";
        return !(n && String(n).startsWith("Screen-")) && !p?.isScreen;
      }).length;
    }
    if (typeof r?.participantCountExcludingScreens === "number") {
      return r.participantCountExcludingScreens;
    }
    if (typeof r?.screenCount === "number") {
      const base = r?.participantCount ?? r?.count ?? 0;
      return Math.max(0, base - r.screenCount);
    }
    return r?.participantCount ?? r?.count ?? 0;
  };
  const isRoomFullByName = (name) => {
    const r = rooms.find((x) => x.roomName === name);
    return r ? getRoomCount(r) >= 10 : false;
  };


  const toUtcMsFromLocalDateTime = (dStr, tStr) => {
    const [yr, mo, day] = dStr.split("-").map(Number);
    const [hh, mm] = tStr.split(":").map(Number);
    const localDate = new Date(yr, mo - 1, day, hh, mm, 0, 0);
    return localDate.getTime(); 
  };

  const createRoom = async () => {
    const newErrors = {
      roomName: "",
      meetingCode: "",
      date: "",
      startTime: "",
      endTime: "",
    };
    const roomName = newRoom.trim();
    const code = (meetingCode || "").trim();
    if (!roomName) newErrors.roomName = "Enter room name";
    if (!code) newErrors.meetingCode = "Enter meeting code";
    if (!date) newErrors.date = "Select date";
    if (!startTime) newErrors.startTime = "Select start time";
    if (!endTime) newErrors.endTime = "Select end time";
    
    if (Object.values(newErrors).some((err) => err !== "")) {
      setErrors(newErrors);
      return;
    }
    setErrors(newErrors);

    const startDateTimeMsUtc = toUtcMsFromLocalDateTime(date, startTime);
    const endDateTimeMsUtc = toUtcMsFromLocalDateTime(date, endTime);

    try {
      const res = await fetch(`${API_BASE}/api/rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomName,
          createdBy: username,
          startDateTimeMsUtc,
          endDateTimeMsUtc,
          meetingCode: code,
          // ALSO send legacy string fields for backward compatibility
          startDateTime: `${date}T${startTime}:00`,
          endDateTime: `${date}T${endTime}:00`,
          gender: avatarGender,
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ ...newErrors, roomName: data.error || "Failed to create room" });
        return;
      }

      // keep a local selectedRoom snapshot using UTC ms
      setSelectedRoom({
        roomName,
        startDateTime: startDateTimeMsUtc,
        endDateTime: endDateTimeMsUtc,
        createdBy: username,
        meetingCode: code,
        participants: []
      });

      setNewRoom("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setMeetingCode("");
      fetchRooms();
      setAdminStep("created");
    } catch (err) {
      console.error(err);
      setErrors({ ...newErrors, roomName: "Error creating room" });
    }
  };

  const joinRoom = async (roomName) => { //admin side (client is joinClientRoom)
    if (!username.trim()) {
        alert("Please enter name before joining");
        return;
    }
    if (isRoomFullByName(roomName)) {
      alert("Not more than 10 participants allowed in a meeting.");
      return;
    }
    goIn();

    if (role === "employee") {
      try {
        const res = await fetch(`${API_BASE}/api/token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roomName, userName: username, role, gender: avatarGender })
        });
        if (res.status === 404) {
          setAdminStep("join");
        }
        if (!res.ok) {
          const msg = await res.json().catch(() => ({}));
          alert(msg.error || "Failed to get token");
          return;
        }
        const data = await res.json();
        localStorage.setItem("session", JSON.stringify({ 
          ...data, 
          userName: username,
          prefCameraOn,
          prefMicOn,
          avatarGender
        }));
        onJoinRoom(roomName);
      } catch(err) {
        console.error("Join room error: ", err);
        alert("Something went wrong while joining the meeting.");
      }
      return;
    }
    else if (role === "client") {
      null
    }
  };
  const joinAdminRoom = async (roomName) => {
    if (isRoomFullByName(roomName)) {
      alert("Not more than 10 participants allowed in a meeting.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/roomDetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomName, role }),
      });
      if (res.status === 403) {
        const data = await res.json().catch(() => ({}));
        if (data?.error === "Meeting not started yet" && data?.startDateTime) {
          const start = new Date(Number(data.startDateTime));
          const end = new Date(Number(data.endDateTime));
          const formattedTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const formattedDate = start.toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' });
          const formattedEndTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
          const formattedEndDate = end.toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' });
          setMeetingTime(formattedTime);
          setMeetingDate(formattedDate);
          setMeetingEndTime(formattedEndTime);
          setMeetingEndDate(formattedEndDate);
          setRoomName(roomName);
          setAdminStep("meetnotstarted");
          return;
        } 
        else if (data?.error === "Meeting has already ended." && data?.endDateTime) {
          const end = new Date(Number(data.endDateTime));
          const formattedEndTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
          setMeetingEndTime(formattedEndTime);
          setAdminStep("choice");
        }
      }
      if (!res.ok) {
        //alert("Failed to fetch room details");
        setAdminStep("join"); //here
        return;
      }
      const roomData = await res.json();
      const count = getRoomCount(roomData);

      setSelectedRoom({
        ...roomData,
        participantCount: count,
      });
      console.log("Selected room with participant count: ", selectedRoom)
      setAdminStep("preview");
      return;
    } catch (err) {
      console.error("Failed to get room details for admin:", err);
    }
  };
  const sendJoinRequestWhileWaiting = async (roomName) => {
    try {
      console.log("Sending join request during waiting");
      const req = await fetch(`${API_BASE}/api/joinRequest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomName,
          userName: username,
          role,
          gender: avatarGender,
        }),
      });
      const data = await req.json();
      if (!data.uid) {
        console.log("Join request failed");
        return;
      }
      if (data.uid) {
        setWaitingUid(data.uid); //to remove from waiting list if user leaves session
        console.log("Waiting Uid: ", waitingUid);
      }
      const uid = data.uid;
      savePendingApproval({ roomName, uid });
      const poll = setInterval(async () => {
        const res = await fetch(`${API_BASE}/api/checkApproval/${roomName}/${uid}`);
        const info = await res.json();

        if (info.approved) {
          clearInterval(poll);
          setApprovalPollingId(null);
          clearPendingApproval();
          console.log("Approved — sending client to preview (gender/avatar selection)");
          setRequestApproved(true);
          const res2 = await fetch(`${API_BASE}/api/roomPreviewDetails`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomName, role }),
          });
          const roomData = await res2.json(); 
          const count = getRoomCount(roomData);
          setSelectedClientRoom({
            ...roomData,
            participantCount: count,
          });
          setClientStep("preview");
        }
        else if (info.declined) {
          clearInterval(poll);
          onSessionData?.({declined: true});
          // setApprovalPollingId(null);
          // clearPendingApproval();

          // sessionStorage.removeItem("ic_session_data");
          // onSessionData?.(null);
          console.log("Entry declined")
        }
      }, 3000);
      setApprovalPollingId(poll);
    } catch (err) {
      console.error("Failed sending join request", err);
    }
  };
  const joinClientRoom = async (roomName) => {
    if (isRoomFullByName(roomName)) {
      alert("Not more than 10 participants allowed in a meeting.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/roomDetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomName, role }),
      });
      if (res.status === 403) {
        const data = await res.json().catch(() => ({}));
        if (data?.error === "Meeting not started yet" && data?.startDateTime) {
          const start = new Date(Number(data.startDateTime));
          const end = new Date(Number(data.endDateTime));
          const formattedTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const formattedDate = start.toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' });
          const formattedEndTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
          const formattedEndDate = end.toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' });
          setMeetingTime(formattedTime);
          setMeetingDate(formattedDate);
          setMeetingEndTime(formattedEndTime);
          setMeetingEndDate(formattedEndDate);
          setRoomName(roomName);
          setClientStep("meetnotstarted");

          sendJoinRequestWhileWaiting(roomName);
          return;
        }
        else if (data?.error === "Meeting has already ended." && data?.endDateTime) {
          const end = new Date(Number(data.endDateTime));
          const formattedEndTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
          setMeetingEndTime(formattedEndTime);
          setClientStep("landing");
        }
      }
      if (!res.ok) {
        //alert("Failed to fetch room details");
        return;
      }
      const roomData = await res.json();

      // include current participant count
      const count = getRoomCount(roomData);

      setSelectedClientRoom({
        ...roomData,
        participantCount: count,
      });

      setClientStep("preview");
      return;
    } catch (err) {
      console.error("Failed to get room details for client:", err);
    }
  };

  const joinClientFromPreview = async (roomName) => {
    try {
      const res = await fetch(`${API_BASE}/api/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomName, userName: username, role, gender: avatarGender })
      });
      if (res.status === 404) {
        setClientStep("landing");
        return;
      }
      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        alert(msg.error || "Failed to get token");
        return;
      }
      const data = await res.json();
      localStorage.setItem("session", JSON.stringify({ 
        ...data, 
        userName: username,
        prefCameraOn,
        prefMicOn,
        avatarGender
      }));
      onJoinRoom(roomName);
    } catch(err) {
      console.error("Join room error: ", err);
      alert("Something went wrong while joining the meeting.");
    }
  };
  const createAndJoinRoom = async () => {
    const roomName = newRoom.trim();
    if (!roomName || !username.trim()) {
      alert("Enter both room name and username");
      return;
    }
    try {
      // Create room
      const res = await fetch(`${API_BASE}/api/rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomName, createdBy: username })
      });

      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        alert(msg.error || "Failed to create room");
        return;
      }
      setNewRoom("");       // reset input
      fetchRooms();         // refresh rooms list
      // Immediately join the room
      await joinRoom(roomName);
    } catch (err) {
      console.error(err);
      alert("Error creating or joining room");
    }
  };

  const handleParticipantJoin = async () => {
    const newErrors = {
      username: "",
      meetingCode: "",
    }
    const trimmedName = username.trim();
    const trimmedCode = joinRoomName.trim();

    if (!trimmedName) newErrors.username = "Invalid Name";
    if (!trimmedCode) newErrors.meetingCode = "Invalid Meeting Code";

    if (Object.values(newErrors).some((err) => err!== "")) {
      setJoinErrors(newErrors);
      return;
    }
    try {
      const { roomName } = await resolveRoomByCode(trimmedCode);
      if (isRoomFullByName(roomName)) {
        setJoinErrors({ ...newErrors, meetingCode: "Room is full" });
        return;
      }
      setJoinErrors(newErrors);

      setClientStep("accessVerified");
      window.dispatchEvent(new CustomEvent("ic:door"));
      const res2 = await fetch(`${API_BASE}/api/roomPreviewDetails`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomName, role }),
          });
          const roomData = await res2.json();
          setSelectedClientRoom(roomData);
          console.log("Selected Client Room", selectedClientRoom);

      setTimeout(async() => {
        goIn();
        await joinClientRoom(roomName);
      }, 2000);
    } catch (e) {
      setJoinErrors({ ...newErrors, meetingCode: e.message || "Invalid Meeting Code" });
    }
  };

  return (
    <Box sx={{
      position: 'fixed',
      top: '55%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: !personaChosen
        ? '36vw'
        : role === 'employee'
          ? (adminStep === 'landing' ? '36vw' : adminStep === 'accessVerified' ? '16vw' : adminStep === 'choice' ? '36vw' : adminStep === 'join' ? '38vw' :  adminStep === 'schedule' ? '38vw' : adminStep === 'meetnotstarted' ? '36vw' : adminStep === 'meetstarted' ? '36vw' : adminStep === 'preview' ? '38vw' : '38vw')
          : (clientStep === 'landing' ? '36vw' : clientStep === 'accessVerified' ? '16vw' : clientStep === 'meetnotstarted' ? '36vw' : clientStep === 'meetstarted' ? '36vw' : clientStep === 'preview' ? '38vw' : ''),
      height: !personaChosen
        ? '40vh'
        : role === 'employee'
          ? (adminStep === 'landing' ? '36vh' : adminStep === 'accessVerified' ? '10vh' : adminStep === 'choice' ? '36vh' : adminStep === 'join' ? '58vh' : adminStep === 'schedule' ? '58vh' : adminStep === 'meetnotstarted' ? '38vh' : adminStep === 'meetstarted' ? '38vh' : adminStep === 'preview' ? '58vh' : '44vh')
          : (clientStep === 'landing' ? '38vh' : clientStep === 'accessVerified' ? '10vh' : clientStep === 'meetnotstarted' ? '38vh' : clientStep === 'meetstarted' ? '38vh' : clientStep === 'preview' ? '58vh' : ''),
      bgcolor: 'rgba(0,63,145,0.31)',
      border: (adminStep === 'accessVerified' || clientStep === 'accessVerified') ? 'none' : '1.14px solid rgba(158,199,255,0.6)' , //1.5px solid rgba(158,199,255,0.6)
      borderRadius: (adminStep === 'accessVerified' || clientStep === 'accessVerified') ? '100px 15px 15px 100px' : '8.5px',
      backdropFilter: 'blur(28.5px)',
      boxShadow: '0px 2.28px 2.28px rgba(0,0,0,0.25)',
      display: 'flex',
      flexDirection: 'column',
      //padding: '1.0417vw',
      boxSizing: 'border-box',
      gap: '0.8333vw',
      overflow: 'hidden'
    }}>
      {/* Back Button */}
      {/* {personaChosen && adminStep !== "created" && adminStep !== "preview" && (
        <IconButton
        onClick={() => {
          if (role === "employee") {
            if (adminStep === "schedule") {
              setAdminStep("join");
            } else if (adminStep === "join") {
              setAdminStep("landing");
            } else if (adminStep === "landing") {
              setPersonaChosen(false);
              setRole("");
            }
          } else if (role === "client") {
            setPersonaChosen(false);
            setRole("");
          }
        }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: 'white',
          '&:hover': {bgcolor: 'rgba(255,255,255,0.1)'}
        }}>
          <KeyboardBackspaceIcon sx={{fontSize: '1.25vw'}}/>
        </IconButton>
      )} */}
      {/* Close Button */}
      {adminStep !== "schedule" && adminStep !== "preview" && clientStep !== "preview" && adminStep !== "accessVerified" 
      && clientStep !== "accessVerified" && adminStep !== "meetnotstarted" && clientStep !== "meetnotstarted" && (
        <IconButton
        onClick={() => {
          if (adminStep === "created") {
            setAdminStep("join");
          } else {
            setPersonaChosen(false);
            setRole("");
            onClose();
          }
        }}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          color: 'white',
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.1)',
            transform: 'scale(1.1)',
          }
        }}>
          <CloseIcon sx={{fontSize: '1.25vw'}}/>
        </IconButton>
      )}
      {!showNotStartedPopup.visible && !personaChosen ? (
        <Box sx={{
          backgroundColor: 'rgba(0,63,145,0.31)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.8333vw',
          padding: '2.0833vw',
          boxSizing: 'border-box',
        }}>
          {/* Header */}
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw', }}>
            <img src={headerline} style={{transform: 'scaleX(-1)', width: '5.5vw'}}/>
            <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
              Welcome to the Conference Hub
            </Typography>
            <img src={headerline} style={{ width: '5.5vw'}}/>
          </Box>
          <Typography sx={{color: 'white', fontSize: '0.9375vw', fontWeight: 'lighter', textAlign: 'center'}}>
            Connect with KPMG experts, partners, and teams to share ideas, host discussions, and co-create innovative solutions that drive action and insight.
          </Typography>
          <Typography sx={{color: 'white', fontSize: '0.9375vw', textAlign: 'center'}}>
            Please select an option to continue
          </Typography>

          {/* Choice buttons */}
          <Box sx={{display: 'flex', gap: '1.667vw', marginTop: '1.0417vw'}}>
              <Box
              onClick={() => { 
                setRole("client"); 
                setPersonaChosen(true);
                setClientStep("landing");
              }}
              sx={{
                  width: '12vw', 
                  height: '5vh',
                  borderRadius: '30px 0px 0px 30px',
                  backgroundColor: 'rgba(0,45,103,0.6)',
                  backdropFilter: 'blur(23.6px)',
                  boxShadow: '0px 1.89px 1.89px rgba(0,0,0,0.25)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&: hover': {
                      transform: 'scale(1.08)',
                  }
              }}>
                  <Box sx={{
                      width: '5vh',
                      height: '5vh',
                      border: '0.5px solid #66E4FF',
                      background: 'rgba(0,72,179,0.49)',
                      borderRadius: '50%',
                      zIndex: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                  }}>
                      <img src={participant_icon} alt="Participant" style={{width: '0.8vw', height: '0.8vw'}}/>
                  </Box>
                  <Typography sx={{color: 'white', fontSize: '0.8333vw', flex: 1, textAlign: 'center'}}>
                      Join as a participant
                  </Typography>
              </Box>
              <Box 
              onClick={() => {
                setRole("employee");
                setPersonaChosen(true);
                setAdminStep("landing");
              }}
              sx={{
                  width: '12vw', 
                  height: '5vh',
                  borderRadius: '30px 0px 0px 30px',
                  backgroundColor: 'rgba(0,45,103,0.6)',
                  backdropFilter: 'blur(23.6px)',
                  boxShadow: '0px 1.89px 1.89px rgba(0,0,0,0.25)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&: hover': {
                      transform: 'scale(1.08)',
                  }
              }}>
                  <Box sx={{
                      width: '5vh',
                      height: '5vh',
                      border: '0.5px solid #66E4FF',
                      background: 'rgba(0,72,179,0.49)',
                      borderRadius: '50%',
                      zIndex: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                  }}>
                      <img src={admin_icon} alt="Admin" style={{ width: '0.8vw', height: '0.8vw' }} />
                  </Box>
                  <Typography sx={{color: 'white', fontSize: '0.8333vw', flex: 1, textAlign: 'center'}}>
                      Join as an admin
                  </Typography>
              </Box>
          </Box>
        </Box>
      ) : role === "employee" && adminStep === "landing" ? (
        <Box sx={{
          backgroundColor: 'rgba(0,63,145,0.31)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.0417vw',
          padding: '2.0833vw',
          boxSizing: 'border-box',
        }}>
          {/* Header */}
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw'}}>
            <img src={headerline} style={{transform: 'scaleX(-1)', width: '8.5vw'}}/>
            <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
              Admin Login
            </Typography>
            <img src={headerline} style={{ width: '8.5vw'}}/>
          </Box>
          {/* Email Field */}
          <TextField
            placeholder="Employee Email"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              disableUnderline: true,
              sx: {
                height: "6vh",
                border: error ? `1px solid ${ERROR_COLOR}` : 'none', // #00FFCC #FF7777
                borderRadius: "10px",
                backgroundColor: "rgba(0,45,103,0.65)",
                boxShadow: "inset 0px 3.3px 7.74px rgba(0,0,0,0.25)",
                "& input": {
                  height: '100%',
                  padding: 0, margin: 0, paddingX: 1,
                  color: "white",
                  fontSize: "0.7812vw",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center", borderRadius: '10px',
                },
                "& input::placeholder": {
                  color: "white",
                  opacity: 1,
                  fontSize: "0.7812vw",
                  fontWeight: 300,
                },
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0px 2px 8.52px rgba(48, 173, 235, 0.08) inset",
                  WebkitTextFillColor: "black",
                },
              },
            }}
            sx={{
              width: "24vw",
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") { handleEnter(); }
            }}
          />
          {error && (
            <Typography variant = "body2"
            sx={{
              color: ERROR_COLOR, //#FF7777
              fontSize: '0.7812vw',
              fontWeight: 600,
              alignSelf: 'flex-end',
              marginRight: '4vw',
              marginTop: '-0.7292vw'
            }}>
              Invalid email
            </Typography>
          )}
          <Box sx={{
            width: '24vw',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Button 
              variant="outlined"
              onClick={() => {
                setPersonaChosen(false);
                setRole("");
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
              }}
            >
              Back
            </Button>
            <Button 
              variant="contained" 
              onClick={handleEnter}
              sx={{
                width: '6vw',
                height: '2vw',
                textTransform: 'none',
                borderRadius: '6px',
                px: 0,
                fontSize: '0.7812vw',
                fontWeight: 700,
                border: '1.28px solid #66E4FF',
                background: 'linear-gradient(to right, #209CD9, #1D7DEE)',
                transition: 'all 0.2s ease',
                '&: hover': {
                  bgcolor: '#1976d2',
                  transform: 'scale(1.08)',
                }
              }}
            >
              Enter
            </Button>
          </Box>
        </Box>
      ) : role === "employee" && adminStep === "accessVerified" ? (
        <Box sx={{
          backgroundColor: 'rgba(0,63,145,0.31)',
          //border: '1.5px solid rgba(158,199,255,0.6)',
          backdropFilter: 'blur(38px)',
          boxShadow: `0 3.1px 3.1px rgba(0,0,0,0.25),
            0 3.1px 3.1px rgba(74,74,74,0.25)`,
          width: '100%', 
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          //gap: '0.8333vw',
          position: 'relative'
        }}>
          <Box sx={{
            width: '9.5vh',
            height: '9.5vh',
            border: '1px solid #66E4FF',
            background: 'rgba(0,72,179,0.49)',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            
          }}>
            <img src={accessVerified_icon} alt="Verified" style={{ width: '3vw', height: '3vw'}} />
          </Box>
          <Typography sx={{color: 'white', fontSize: '1.25vw', flex: 1, textAlign: 'center'}}>
            Access Verified
          </Typography>
        </Box>
      ) : role === "employee" && adminStep === "choice" ? (
        <Box sx={{
          backgroundColor: 'rgba(0,63,145,0.31)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.0417vw',
          padding: '2.0833vw',
          boxSizing: 'border-box',
        }}>
          {/* Header */}
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw'}}>
            <img src={headerline} style={{transform: 'scaleX(-1)', width: '8.5vw'}}/>
            <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
              Conference Hub
            </Typography>
            <img src={headerline} style={{ width: '8.5vw'}}/>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.4167vw'}}>
            <Typography sx={{color: 'white', fontSize: '0.9375vw', fontWeight: 'bold', textAlign: 'center'}}>
              Welcome to the Conference Hub
            </Typography>
            <Typography sx={{color: 'white', fontSize: '0.9375vw', fontWeight: 'lighter', textAlign: 'center'}}>
              Schedule a new meeting or join a session.
            </Typography>
          </Box>
          <Box sx={{display: 'flex', gap: '0.8333vw'}}>
            <Button
              onClick={() => {onExplore();}}
              variant="outlined"
              sx={{
                px: '0.8333vw',
                height: '2vw',
                textTransform: 'none',
                borderRadius: '6px',
                fontSize: '0.7812vw',
                fontWeight: 700,
                border: '0.5px solid #66E4FF',
                boxShadow: '0 2.25px 5.63px rgba(0,43,255,0.37)',
                color: '#66E4FF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&: hover': {
                    transform: 'scale(1.08)',
                }
              }}
            >
              Explore Conference Hub
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setAdminStep("schedule");
              }}
              sx={{
                width: '10vw',
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
              }}
            >
              Schedule a Meeting
            </Button>
            <Button
              variant="contained" 
              onClick={() => {
                setAdminStep("join");
              }}
              sx={{
                width: '8vw',
                height: '2vw',
                textTransform: 'none',
                borderRadius: '6px',
                px: 0,
                fontSize: '0.7812vw',
                fontWeight: 700,
                border: '1.28px solid #66E4FF',
                background: 'linear-gradient(to right, #209CD9, #1D7DEE)',
                transition: 'all 0.2s ease',
                '&: hover': {
                    transform: 'scale(1.08)',
                    bgcolor: '#1976d2'
                }
              }}
            >
              Join a Meeting
            </Button>
          </Box>
        </Box>
      ) : role === "employee" && adminStep === "join" ? (
        <Box sx={{
          backgroundColor: 'rgba(0,63,145,0.31)',
          width: '100%', 
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.8333vw',
          padding: '2.0833vw',
        }}>
          {/* Header */}
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw'}}>
            <img src={headerline} style={{transform: 'scaleX(-1)', width: '8.5vw'}}/>
            <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
              Welcome {username}
            </Typography>
            <img src={headerline} style={{ width: '8.5vw'}}/>
          </Box>
          <Typography sx={{marginX: '5vw', color: 'white', fontSize: '0.9375vw', fontWeight: 'lighter', textAlign: 'center'}}>
            Join an ongoing meeting from the list or schedule a new one to organize your next session.
          </Typography>
          <hr style={{width: '100%', color: 'rgba(255,255,255,0.25)'}}/>
          
          {/* Available Rooms Box */}
          <Box sx={{
            width: '30vw',
            height: '30vh',
            backgroundColor: 'rgba(0,63,145,0.31)',
            border: '0.59px solid rgba(158,199,255,0.6)',
            borderRadius: '6px',
            boxShadow: 'inset 0 3.06px 3.06px rgba(74,74,74,0.25)',
            backdropFilter: 'blur(38.21px)',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            gap: '0.4167vw',
            padding: '0.8333vw',
            //flex: 1,
          }}>
            <Typography sx={{ fontSize: '0.8333vw', fontWeight: 300, color: '#fff', textDecoration: 'underline', textUnderlineOffset: '0.2083vw' }}>
              Meeting Name
            </Typography>
            <Box sx={{
              flex: 1,
              backgroundColor: 'rgba(197,197,197,0.06)',
              borderRadius: '6px',
              boxSizing: 'border-box',
              padding: '0.8333vw',
              overflowY: 'auto',
              '&::-webkit-scrollbar': { width: '0.2083vw' },
              '&::-webkit-scrollbar-track': { background: 'transparent' },
              '&::-webkit-scrollbar-thumb': { borderRadius: '3px' },
              scrollbarWidth: 'thin',
              scrollbarColor: '#5fb2e2ff transparent'
            }}>
              {rooms.length === 0 && (
                <Typography sx={{ fontSize: '0.8333vw', color: 'rgba(255,255,255,0.9)' }}>
                  No rooms yet. Create one!
                </Typography>
              )}
              {rooms.map((r, i) => {
                const count = getRoomCount(r);
                const isFull = count >= 10;
                return (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      pb: '0.8333vw',
                    }}
                  >
                    <Typography
                      title={r.roomName}
                      sx={{ fontSize: '0.9375vw', color: '#fff', fontWeight: 300, letterSpacing: 0.2 }}
                    >
                      {r.roomName}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '0.8333vw', alignItems: 'center' }}>
                      <IconButton
                        size="small"
                        disableRipple
                        onClick={(e) => {
                          e.stopPropagation();
                          setInfoRoom(r);
                          setOpenInfo(true);
                        }}
                        sx={{
                          width: '1.5vw',
                          height: '1.5vw',
                          borderRadius: '4.5px',
                          border: '0.61px solid #66E4FF',
                          color: 'rgba(255,255,255,1)',
                          background: 'transparent',
                          fontSize: '0.9375vw',
                          transition: 'all 0.2s ease',
                          '&: hover': {
                              transform: 'scale(1.08)',
                          }
                        }}
                      >
                        i
                      </IconButton>
                      <IconButton
                        size="small"
                        disableRipple
                        onClick={() => {
                          const subject = encodeURIComponent("Invitation to Virtual Ignition Center Meeting");
                          const currentUrl = window.location.href;
                          const url = new URL(currentUrl);
                          const baseUrl = `${url.origin}`;
                          const body = encodeURIComponent(
                            `Join meeting at ${baseUrl}\nMeeting Code: ${r.meetingCode}`
                          );
                          window.open(`mailto:?subject=${subject}&body=${body}`);
                        }}
                        sx={{
                          width: '1.5vw',
                          height: '1.5vw',
                          borderRadius: '4.5px',
                          border: '0.61px solid #66E4FF',
                          color: 'rgba(255,255,255,1)',
                          background: 'transparent',
                          transition: 'all 0.2s ease',
                          '&: hover': {
                              transform: 'scale(1.08)',
                          }
                        }}
                      >
                        <ShareIcon sx={{ color: 'white', fontSize: '0.7292vw' }} />
                      </IconButton>
                      <Button
                        variant="contained"
                        onClick={() => {
                          if (isFull) {
                            alert("Not more than 10 participants allowed.");
                            return;
                          }
                          setSelectedRoom({
                            roomName: r.roomName,
                            startDateTime: r.startDateTime,
                            endDateTime: r.endDateTime,
                            meetingCode: r.meetingCode,
                          });
                          console.log("Selected Room:", selectedRoom);
                          //setAdminStep("preview");
                          joinAdminRoom(r.roomName);
                        }}
                        disabled={isFull}
                        sx={{
                          height: '1.5vw',
                          borderRadius: '4.5px',
                          textTransform: 'none',
                          fontWeight: 700,
                          fontSize: '0.67vw',
                          color: '#fff',
                          bgcolor: isFull
                            ? 'rgba(255,255,255,0.30)'
                            : 'linear-gradient(to right, #209CD9, #1D7DEE)',
                          boxShadow: isFull ? 'none' : '0 1.22px 2.44px rgba(0,0,0,0.25)',
                          transition: 'all 0.2s ease',
                          '&:hover': { 
                            transform: isFull ? null : 'scale(1.08)',
                            bgcolor: isFull ? 'rgba(255,255,255,0.30)' : '#1976d2' }
                        }}
                      >
                        {isFull ? 'Full' : 'Join'}
                      </Button>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Schedule a Meeting */}
          <Button
            onClick={() => setAdminStep("schedule")}
            sx={{
              mt: '0.4167vw',
              width: '30vw',
              border: '1px solid rgba(158,199,255,0.6)',
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: '0.4167vw',
              py: '0.5042vw',
              boxSizing: 'border-box',
              color: 'white',
              textTransform: 'none',
              backgroundColor: 'transparent',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(0,45,103,0.4)',
                transform: 'scale(1.03)',
              },
            }}
          >
            <Typography
              sx={{
                fontSize: '0.8333vw',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              Schedule a Meeting
            </Typography>
            <PlayArrowIcon sx={{ fontSize: '0.9896vw', color: 'white' }} />
          </Button>
        </Box>
      ) : role === "employee" && adminStep === "schedule" ? (
        <Box sx={{
          backgroundColor: 'rgba(0,63,145,0.31)',
          width: '100%', 
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.8333vw',
          padding: '2.0833vw',
        }}>
          {/* Header */}
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw'}}>
            <img src={headerline} style={{transform: 'scaleX(-1)', width: '8.5vw'}}/>
            <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
              Schedule a Meeting
            </Typography>
            <img src={headerline} style={{ width: '8.5vw'}}/>
          </Box>
          {/* TextFields  */}
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',gap: '0.8333vw'}}>
            <TextField
              placeholder="Meeting Name"
              variant="filled"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
              error={Boolean(errors.roomName)}
              helperText={errors.roomName}
              FormHelperTextProps={{
                sx: {
                  color: ERROR_COLOR,
                  fontSize: '0.7812vw',
                  fontWeight: 600,
                  textAlign: 'right',
                }
              }}
              InputProps={{
                disableUnderline: true,
                sx: {
                  height: "5vh",
                  borderRadius: "10px",
                  backgroundColor: "rgba(0, 45, 103,0.65)",
                  boxShadow: "inset 0px 3.3px 7.74px rgba(0,0,0,0.25)",
                  border: errors.roomName ? `1px solid ${ERROR_COLOR}` : 'none',
                  "& input": {
                    height: '100%',
                    padding: 0, margin: 0, paddingX: 1,
                    color: "white",
                    fontSize: "0.7812vw",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center", borderRadius: '10px',
                  },
                  "& input::placeholder": {
                    color: "white",
                    opacity: 1,
                    fontSize: "0.7812vw",
                    fontWeight: 300,
                  },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0px 2px 8.52px rgba(48, 173, 235, 0.08) inset",
                    WebkitTextFillColor: "black",
                  },
                },
              }}
              sx={{
                width: "30vw",
                "& .MuiFormHelperText-root.Mui-error": {
                  color: ERROR_COLOR,
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "30vw",
                gap: "0.625vw",
              }}
            >
              <TextField
                placeholder="000-000-000"
                variant="filled"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
                error={Boolean(errors.meetingCode)}
                helperText={errors.meetingCode}
                FormHelperTextProps={{
                  sx: {
                    color: ERROR_COLOR,
                    fontSize: '0.7812vw',
                    fontWeight: 600,
                    textAlign: 'right',
                  }
                }}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    height: "5vh",
                    borderRadius: "10px",
                    backgroundColor: "rgba(0, 45, 103,0.65)",
                    boxShadow: "inset 0px 3.3px 7.74px rgba(0,0,0,0.25)",
                    border: errors.meetingCode ? `1px solid ${ERROR_COLOR}` : 'none',
                    "& input": {
                      height: "100%",
                      padding: 0,
                      margin: 0,
                      paddingX: 1,
                      color: "white",
                      fontSize: "0.7812vw",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "10px",
                    },
                    "& input::placeholder": {
                      color: "white",
                      opacity: 1,
                      fontSize: "0.7812vw",
                      fontWeight: 300,
                    },
                    "& input:-webkit-autofill": {
                      WebkitBoxShadow:
                        "0px 2px 8.52px rgba(48, 173, 235, 0.08) inset",
                      WebkitTextFillColor: "black",
                    },
                  },
                }}
                sx={{
                  flex: 3,
                  minWidth: 0,
                  "& .MuiFormHelperText-root.Mui-error": {
                    color: ERROR_COLOR,
                  },
                  "& .MuiFilledInput-root": {
                    // force same height as button
                    height: "5vh",
                    borderRadius: "10px",
                  },
                }}
              />
              <Button
                variant="outlined"
                onClick={regenerateMeetingCode}
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "5vh",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "0.7292vw",
                  fontWeight: 600,
                  color: "#66E4FF",
                  border: "0.5px solid #66E4FF",
                  boxShadow: "0 2.25px 5.63px rgba(0,43,255,0.37)",
                  px: "0.8333vw",
                  backgroundColor: "rgba(0,45,103,0.65)",
                  whiteSpace: "nowrap",
                  transition: 'all 0.2s ease',
                  "&:hover": {
                    backgroundColor: "rgba(0,45,103,0.85)",
                    transform: 'scale(1.05)',
                  },
                }}
              >
                Regenerate
              </Button>
            </Box>
          </Box>
          <Box sx={{width: '30vw', display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
              <Typography sx={{fontSize: '0.7292vw', fontWeight: 300, color: 'white', ml: '0.1vw'}}>
                From
              </Typography>
              <TextField 
                // label="From"
                type="time"
                InputLabelProps={{shrink: true}}
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                error={Boolean(errors.startTime)}
                helperText={errors.startTime}
                FormHelperTextProps={{
                  sx: {
                    color: ERROR_COLOR,
                    fontSize: '0.7812vw',
                    fontWeight: 600,
                    textAlign: 'right',
                  }
                }}
                sx={{
                  width: '8vw',
                  height: '2.5vw',
                  backgroundColor: 'rgba(0,45,103,0.65)',
                  borderRadius: '6px',
                  boxShadow: 'inset 0 3.29px 7.73px rgba(0,0,0,0.25)',
                  border: errors.startTime ? `1px solid ${ERROR_COLOR}` : 'none',
                  "& .MuiFormHelperText-root.Mui-error": {
                    color: ERROR_COLOR,
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '6px',
                    '& fieldset': {border: 'none'},
                    '&:hover fieldset': {border: 'none'},
                    '&.Mui-focused fieldset': {border: 'none'},
                  },
                  '& input': {
                    color: 'white',
                    fontSize: '0.9vw',
                    padding: '0.6vw',
                    '&::-webkit-calendar-picker-indicator': {
                      filter: 'invert(1)', // this turns dark icon to white
                      cursor: 'pointer',
                    },
                  },
                  '& label': {
                    color: 'white',
                    fontSize: '0.9vw',
                  },
                  '& label.Mui-focused': {
                    color: '#8ecaff', // label color when focused
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0,45,103,0.75)',
                  },
                }}
              />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
              <Typography sx={{fontSize: '0.7292vw', fontWeight: 300, color: 'white', ml: '0.4167vw'}}>
                To
              </Typography>
              <TextField 
                // label="To"
                type="time"
                InputLabelProps={{shrink: true}}
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                error={Boolean(errors.endTime)}
                helperText={errors.endTime}
                FormHelperTextProps={{
                  sx: {
                    color: ERROR_COLOR,
                    fontSize: '0.7812vw',
                    fontWeight: 600,
                    textAlign: 'right',
                  }
                }}
                sx={{
                  width: '8vw',
                  height: '2.5vw',
                  backgroundColor: 'rgba(0,45,103,0.65)',
                  borderRadius: '6px',
                  boxShadow: 'inset 0 3.29px 7.73px rgba(0,0,0,0.25)',
                  border: errors.endTime ? `1px solid ${ERROR_COLOR}` : 'none',
                  "& .MuiFormHelperText-root.Mui-error": {
                    color: ERROR_COLOR,
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '6px',
                    '& fieldset': {border: 'none'},
                    '&:hover fieldset': {border: 'none'},
                    '&.Mui-focused fieldset': {border: 'none'},
                  },
                  '& input': {
                    color: 'white',
                    fontSize: '0.9vw',
                    padding: '0.6vw',
                    '&::-webkit-calendar-picker-indicator': {
                      filter: 'invert(1)', // this turns dark icon to white
                      cursor: 'pointer',
                    },
                  },
                  '& label': {
                    color: 'white',
                    fontSize: '0.9vw',
                  },
                  '& label.Mui-focused': {
                    color: '#8ecaff', // label color when focused
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0,45,103,0.75)',
                  },
                }}
              />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
              <Typography sx={{fontSize: '0.7292vw', fontWeight: 300, color: 'white', ml: '0.1vw'}}>
                Date
              </Typography>
              <TextField 
                // label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                error={Boolean(errors.date)}
                helperText={errors.date}
                FormHelperTextProps={{
                  sx: {
                    color: '#00F7FF',
                    fontSize: '0.7812vw',
                    fontWeight: 600,
                    textAlign: 'right',
                  }
                }}
                sx={{
                  width: '11vw',
                  height: '2.5vw',
                  backgroundColor: 'rgba(0,45,103,0.65)',
                  borderRadius: '6px',
                  boxShadow: 'inset 0 3.29px 7.73px rgba(0,0,0,0.25)',
                  border: errors.date ? `1px solid ${ERROR_COLOR}` : 'none',
                  "& .MuiFormHelperText-root.Mui-error": {
                    color: ERROR_COLOR,
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '6px',
                    '& fieldset': {border: 'none'},
                    '&:hover fieldset': {border: 'none'},
                    '&.Mui-focused fieldset': {border: 'none'},
                  },
                  '& input': {
                    color: 'white',
                    fontSize: '0.9vw',
                    padding: '0.6vw',
                    '&::-webkit-calendar-picker-indicator': {
                      filter: 'invert(1)', // this turns dark icon to white
                      cursor: 'pointer',
                    },
                  },
                  '& label': {
                    color: 'white',
                    fontSize: '0.9vw',
                  },
                  '& label.Mui-focused': {
                    color: '#8ecaff', // label color when focused
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0,45,103,0.75)',
                  },
                }}
              />
            </Box>
          </Box>
          <Box sx={{
            flex: 1,
            width: '30vw',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.2083vw',
          }}>
            <hr style={{width: '100%'}}/>
            <Typography sx={{color: 'white', fontSize: '0.8333vw', fontWeight: 600}}>
              Admin Controls
            </Typography>
            <hr style={{width: '100%'}}/>
          </Box>
          <Box sx={{
            width: '30vw',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <Button 
            variant="outlined"
            onClick={() => {setAdminStep("join");}}
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
              Back
            </Button>
            <Button 
              variant="contained" 
              onClick={() => {
                createRoom();
              }}
              sx={{
                width: '5vw',
                height: '2vw',
                textTransform: 'none',
                borderRadius: 2,
                px: 0,
                fontSize: '0.7812vw',
                border: '0.77px solid #66E4FF',
                boxShadow: '0 3.45px 8.61px rgba(0,43,255,0.37)',
                background: 'linear-gradient(to right, #209CD9, #1D7DEE)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.08)',
                  bgcolor: '#1976d2'
                },
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
      ) : role === "employee" && adminStep === "created" ? (
        <Box sx={{
          backgroundColor: 'rgba(0,63,145,0.31)',
          width: '100%', 
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.8333vw',
          padding: '2.0833vw',
        }}>
          {/* Header */}
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw'}}>
            <img src={headerline} style={{transform: 'scaleX(-1)', width: '8.5vw'}}/>
            <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
              Meeting Created
            </Typography>
            <img src={headerline} style={{ width: '8.5vw'}}/>
          </Box>
          <Typography sx={{marginX: '5vw', color: 'white', fontSize: '0.9375vw', fontWeight: 'lighter', textAlign: 'center'}}>
            Your meeting has been successfully created!
          </Typography>
          <Typography sx={{marginTop: '-0.8333vw', color: 'white', fontSize: '0.9375vw', fontWeight: 'lighter', textAlign: 'center'}}>
            Click Join to start the session, or share the meeting link via email to invite others.
          </Typography>
          <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', gap: '0.2083vw', }}>
            <Typography sx={{color: 'white', fontSize: '0.8333vw', ml: '0.4167vw'}}>
              Meeting Name
            </Typography>
            <Box sx={{
              height: '5vh',
              backgroundColor: 'rgba(0,45,103,0.65)',
              borderRadius: '8px',
              display: 'flex', 
              padding: '0.4167vw',
              gap: '0.4167vw', 
              alignItems: 'center'
            }}>
              <PersonIcon sx={{color: 'rgba(255,255,255,0.7)', fontSize: '0.9896vw'}}/>
              <Typography sx={{color: 'rgba(255,255,255,0.7)', fontSize: '0.9375vw'}}>
                {selectedRoom?.roomName}
              </Typography>
            </Box>
          </Box>
          <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', gap: '0.2083vw'}}>
            <Typography sx={{color: 'white', fontSize: '0.8333vw', ml: '0.4167vw'}}>
              Meeting Code
            </Typography>
            <Box sx={{
              width: '100%',
              height: '5vh',
              backgroundColor: 'rgba(0,45,103,0.65)',
              borderRadius: '8px',
              display: 'flex', 
              padding: '0.4167vw',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4167vw',
                minWidth: 0,
              }}>
                <PasswordIcon sx={{color: 'rgba(255,255,255,0.7)', fontSize: '0.9896vw'}}/>
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.9375vw',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {selectedRoom?.meetingCode || "Meeting Code"}
                </Typography>
              </Box>
              <IconButton
                  onClick={() => handleCopyMeetingCode(selectedRoom?.meetingCode)}
                  size="small"
                  disableRipple
                  sx={{
                    width: '1.2vw',
                    height: '1.2vw',
                    minWidth: 0,
                    minHeight: 0,
                    borderRadius: '4px',
                    border: '0.61px solid #66E4FF',
                    backgroundColor: 'rgba(0,0,0,0.15)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.08)',
                      backgroundColor: 'rgba(0,0,0,0.3)',
                    },
                  }}
                >
                  <ContentCopyIcon sx={{ fontSize: '0.7vw', color: 'white' }}/>
              </IconButton>
            </Box>
          </Box>
          <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Button
              variant="outlined"
              onClick={() => {
                joinAdminRoom(selectedRoom.roomName);
              }}
              sx={{
                width: '5vw',
                height: '2vw',
                textTransform: 'none',
                borderRadius: '6px',
                fontSize: '0.7812vw',
                fontWeight: 700,
                border: '0.5px solid #66E4FF',
                boxShadow: '0 2.25px 5.63px rgba(0,43,255,0.37)',
                color: '#66E4FF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&: hover': {
                    transform: 'scale(1.08)',
                }
              }}
            >
              Join
            </Button>
            <Button 
              variant="contained"
              disableRipple
              onClick={() => {
                const subject = encodeURIComponent("Invitation to Virtual Ignition Center Meeting");
                const currentUrl = window.location.href;
                const url = new URL(currentUrl);
                const baseUrl = `${url.origin}`;
                const body = encodeURIComponent(
                  `Join meeting at ${baseUrl}\nMeeting ID: ${selectedRoom?.meetingCode}`
                );
                window.open(`mailto:?subject=${subject}&body=${body}`);
              }}
              sx={{
                width: '5vw',
                height: '2vw',
                textTransform: 'none',
                borderRadius: 2,
                fontSize: '0.7812vw',
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
              Share
            </Button>
          </Box>
        </Box>
      ) : role === "employee" && adminStep === "meetnotstarted" ? (
        <Box sx={{
          width: '100%', 
          height: '100%',
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.0417vw',
          padding: '1.0417vw',
          boxSizing: 'border-box',
        }}>
          {/* Header */}
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw'}}>
            <img src={headerline} style={{transform: 'scaleX(-1)', width: '6.5vw'}}/>
            <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
              Meeting Will Begin Soon
            </Typography>
            <img src={headerline} style={{ width: '6.5vw'}}/>
          </Box>
          <Box sx={{
            display: 'flex',
            gap: '0.4167vw',
            alignItems: 'center',
          }}>
            <Box sx={{
              borderRadius: '8px',
              backgroundColor: 'rgba(0,63,145,0.68)',
              fontSize: '1.25vw',
              fontWeight: 500,
              color: 'white',
              padding: '0.8333vw',
              position: 'relative'
            }}>
              {countdown.hours.toString().padStart(2, '0')}
              <Typography sx={{
                position: 'absolute',
                bottom: '-1.2vw',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.7292vw',
                color: 'white',
                whiteSpace: 'nowrap'
              }}>
                Hours
              </Typography>
            </Box>
            <Typography sx={{color: 'white', fontSize: '1.25vw'}}>
              :
            </Typography>
            <Box sx={{
              borderRadius: '8px',
              backgroundColor: 'rgba(0,63,145,0.68)',
              fontSize: '1.25vw',
              fontWeight: 500,
              color: 'white',
              padding: '0.8333vw',
              position: 'relative'
            }}>
              {countdown.minutes.toString().padStart(2, '0')}
              <Typography sx={{
                position: 'absolute',
                bottom: '-1.2vw',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.7292vw',
                color: 'white',
                whiteSpace: 'nowrap'
              }}>
                Minutes
              </Typography>
            </Box>
            <Typography sx={{color: 'white', fontSize: '1.25vw'}}>
              :
            </Typography>
            <Box sx={{
              borderRadius: '8px',
              backgroundColor: 'rgba(0,63,145,0.68)',
              fontSize: '1.25vw',
              fontWeight: 500,
              color: 'white',
              padding: '0.8333vw',
              position: 'relative'
            }}>
              {countdown.seconds.toString().padStart(2, '0')}
              <Typography sx={{
                position: 'absolute',
                bottom: '-1.2vw',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.7292vw',
                color: 'white',
                whiteSpace: 'nowrap'
              }}>
                Seconds
              </Typography>
            </Box>
          </Box>
          <Typography sx={{mt: '1.0417vw', color: 'white', fontSize: '0.9375vw', fontWeight: 500, textAlign: 'center'}}>
            Welcome to the Conference Hub
          </Typography>
          <Typography sx={{color: 'white', fontSize: '0.9375vw', fontWeight: 'lighter', textAlign: 'center'}}>
            Your meeting will begin shortly. You may review meeting settings or invite participants.
          </Typography>
          <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.8333vw',
          }}>
            <Button 
              variant="contained"
              disableRipple
              onClick={() => {
                if (typeof onClose === "function") onClose();
              }}
              sx={{
                px: '0.8333vw',
                height: '2vw',
                textTransform: 'none',
                borderRadius: 2,
                fontSize: '0.7812vw',
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
              Explore Ignition Center
            </Button>
            <Button
            onClick={() => {onContinue();}}
              variant="outlined"
              sx={{
                px: '0.8333vw',
                height: '2vw',
                textTransform: 'none',
                borderRadius: '6px',
                fontSize: '0.7812vw',
                fontWeight: 700,
                border: '0.5px solid #66E4FF',
                boxShadow: '0 2.25px 5.63px rgba(0,43,255,0.37)',
                color: '#66E4FF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&: hover': {
                    transform: 'scale(1.08)',
                }
              }}
            >
              Explore Conference Hub
            </Button>
            <Button
              variant="outlined"
              sx={{
                px: '0.8333vw',
                height: '2vw',
                textTransform: 'none',
                borderRadius: '6px',
                fontSize: '0.7812vw',
                fontWeight: 700,
                border: '0.5px solid #66E4FF',
                boxShadow: '0 2.25px 5.63px rgba(0,43,255,0.37)',
                color: '#66E4FF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&: hover': {
                    transform: 'scale(1.08)',
                }
              }}
            >
              Invite Participants
            </Button>
          </Box>
        </Box>
      ) : role === "employee" && adminStep === "meetstarted" ? (
        <Box sx={{
          width: '100%', 
          height: '100%',
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.0417vw',
          padding: '1.0417vw',
          boxSizing: 'border-box',
        }}>
          {/* Header */}
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw'}}>
            <img src={headerline} style={{transform: 'scaleX(-1)', width: '6.5vw'}}/>
            <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
              Meeting Has Started
            </Typography>
            <img src={headerline} style={{ width: '6.5vw'}}/>
          </Box>
          <Typography sx={{color: 'white', fontSize: '0.8333vw', fontWeight: 'bold', textAlign: 'center'}}>
            {/* {(() => {
              const session = loadSessionData();
              const roomName = session.roomName;
              return `${roomName} has started`;
            })()} */}
            {`${roomName} has started.`}
            {/* {`${selectedRoom?.roomName} has started`}. */}
          </Typography>
          <Box>
            <Typography sx={{color: 'white', fontSize: '0.8333vw', fontWeight: 'lighter', textAlign: 'center'}}>
              Your meeting is live.
            </Typography>
            <Typography sx={{color: 'white', fontSize: '0.8333vw', fontWeight: 'lighter', textAlign: 'center'}}>
              Join now to enter the session.
            </Typography>
          </Box>
          <Typography sx={{ color: 'white', fontSize: '0.8333vw', textAlign: 'center' }}>
            {(() => {
              const session = loadSessionData();
              const startStr = session.meetingTime;
              const endStr = session.meetingEndTime; 
              // const start = new Date(Number(selectedRoom.startDateTime));
              // const end = new Date(Number(selectedRoom.endDateTime));
              // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
              // const startStr = start.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
              // const endStr = end.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
              return `Time: ${startStr} - ${endStr}`;
            })()}
          </Typography>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.0417vw'
          }}>
            <Button 
            variant="outlined"
            onClick={() => {
              goToF();
              joinAdminRoom(roomName);
            }}
            sx={{
              px: '0.8333vw',
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
              Join Session
            </Button>
            <Button
            variant="contained"
            sx={{
              px: '0.8333vw',
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
              Leave Session
            </Button>
          </Box>
        </Box>
      ) : role === "employee" && adminStep === "preview" ? (
        <Box sx={{
          backgroundColor: 'rgba(0,63,145,0.31)',
          width: '100%', 
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.8333vw',
          padding: '2.0833vw',
        }}>
          {/* Header */}
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw'}}>
            <img src={headerline} style={{transform: 'scaleX(-1)', width: '8.5vw'}}/>
            <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
              {selectedRoom?.roomName}
            </Typography>
            <img src={headerline} style={{ width: '8.5vw'}}/>
          </Box>
          <Typography sx={{color: 'white', fontSize: '0.8333vw', textAlign: 'center'}}>
            {selectedRoom ? (() => {
              // selectedRoom.startDateTime/endDateTime are UTC ms
              const start = new Date(Number(selectedRoom.startDateTime));
              const end = new Date(Number(selectedRoom.endDateTime));

              const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
              const dateStr = start.toLocaleDateString(undefined, options);
              const startStr = start.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
              const endStr = end.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

              return `${dateStr} • ${startStr} - ${endStr}`;
            })() : ""}
          </Typography>
          <Typography sx={{color: 'white', fontSize: '0.8333vw', textAlign: 'center'}}>
            {selectedRoom 
              ? `${getRoomCount(selectedRoom)} ${getRoomCount(selectedRoom) === 1 ? 'person has' : 'people have'} joined the meeting` 
              : ""
            }
          </Typography>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            width: '30vw',
            backgroundColor: 'rgba(0,45,103,0.65)',
            borderRadius: '6px',
            position: 'relative'
          }}>
            {/* Gender toggle (Admin Preview) */}
            <Box
              sx={{
                position: 'absolute',
                top: '0.625vw',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <GenderSelector value={avatarGender} onChange={setAvatarGender} />
            </Box>
            {avatarGender === "female"
              ? <Person2Icon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '10.417vw' }}/>
              : <PersonIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '10.417vw' }}/>
            }
            <Box sx={{
              position: 'absolute',
              bottom: '0.8333vw',
              left: '0.8333vw',
              display: 'flex',
              gap: '0.4167vw'
            }}>
              {/* Mic Preference */}
              <IconButton
              onClick={() => setPrefMicOn(!prefMicOn)}
              sx={{
                borderRadius: 2,
                p: 0,
                width: '1.84vw',
                height: '1.84vw',
                backgroundColor: prefMicOn ? 'rgba(0,134,201,1)' : 'rgba(0,0,0,0.05)',
                border: prefMicOn ? '0.4px solid #66E4FF' : 'none',
                color: '#fff',
                boxShadow: prefMicOn ? '0 1.58px 3.95px rgba(0,43,255,0.37)' : 'inset 0 1.62px 3.23px rgba(0,0,0,0.25)',
                transition: 'all 0.2s ease',
                '&: hover': {
                    transform: 'scale(1.08)',
                }
              }}>
                {prefMicOn ? <MicIcon sx={{fontSize: '0.9375vw'}}/> : <MicOffIcon sx={{fontSize: '0.9375vw'}}/>}
              </IconButton>
              {/* Cam Preference */}
              <IconButton
              onClick={() => setPrefCameraOn(!prefCameraOn)}
              sx={{
                borderRadius: 2,
                p: 0,
                width: '1.84vw',
                height: '1.84vw',
                backgroundColor: prefCameraOn ? 'rgba(0,134,201,1)' : 'rgba(0,0,0,0.05)',
                border: prefCameraOn ? '0.4px solid #66E4FF' : 'none',
                color: '#fff',
                boxShadow: prefCameraOn ? '0 1.58px 3.95px rgba(0,43,255,0.37)' : 'inset 0 1.62px 3.23px rgba(0,0,0,0.25)',
                transition: 'all 0.2s ease',
                '&: hover': {
                    transform: 'scale(1.08)',
                }
              }}>
                {prefCameraOn ? <VideocamIcon sx={{fontSize: '0.9375vw'}}/> : <VideocamOffIcon sx={{fontSize: '0.9375vw'}}/>}
              </IconButton>
            </Box>
            <Box sx={{
              position: 'absolute',
              bottom: '0.8333vw',
              right: '0.8333vw',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4167vw',
            }}>
              <TuneIcon sx={{color: 'white', fontSize: '1.0417vw'}}/>
              <Typography sx={{
                textDecoration: 'underline',
                color: 'white',
                fontSize: '0.9375vw',
                fontWeight: 300
              }}>
                Background Filters
              </Typography>
            </Box>
          </Box>
          <Box sx={{
            width: '30vw',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <Button 
            variant="outlined"
            onClick={() => {setAdminStep("join");}}
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
            onClick={() => {
              if (!selectedRoom) return;
              joinRoom(selectedRoom.roomName);
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
              Join
            </Button>
          </Box>
        </Box>
      ) : clientStep === "landing" ? (
        <Box sx={{
          width: '100%', 
          height: '100%',
          //border: '1px solid green', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.0417vw',
          padding: '1.0417vw',
          boxSizing: 'border-box',
        }}>
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw'}}>
            <img src={headerline} style={{transform: 'scaleX(-1)', width: '6.5vw'}}/>
            <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
              Join Meeting
            </Typography>
            <img src={headerline} style={{ width: '6.5vw'}}/>
          </Box>
          
          {/* TextFields  */}
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',gap: '0.8333vw'}}>
            <TextField
              placeholder="Enter your name"
              variant="filled"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={Boolean(joinErrors.username)}
              helperText={joinErrors.username}
              FormHelperTextProps={{
                sx: {
                  color: ERROR_COLOR,
                  fontSize: '0.7812vw',
                  fontWeight: 600,
                  textAlign: 'right',
                }
              }}
              InputProps={{
                disableUnderline: true,
                sx: {
                  height: "5vh",
                  borderRadius: "10px",
                  backgroundColor: "rgba(0, 45, 103,0.65)",
                  boxShadow: "inset 0px 3.3px 7.74px rgba(0,0,0,0.25)",
                  border: joinErrors.username ? `1px solid ${ERROR_COLOR}` : 'none',
                  //px: '0.8333vw',
                  "& input": {
                    height: '100%',
                    padding: 0, margin: 0, paddingX: 1,
                    color: "white",
                    fontSize: "0.7812vw",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center", borderRadius: '10px',
                  },
                  "& input::placeholder": {
                    color: "white",
                    opacity: 1,
                    fontSize: "0.7812vw",
                    fontWeight: 300,
                  },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0px 2px 8.52px rgba(48, 173, 235, 0.08) inset",
                    WebkitTextFillColor: "black",
                  },
                },
              }}
              sx={{
                width: "20vw",
                "& .MuiFormHelperText-root.Mui-error": {
                  color: ERROR_COLOR,
                },
              }}
            />
            <TextField
              placeholder="Meeting Code"
              variant="filled"
              value={joinRoomName}
              onChange={(e) => setJoinRoomName(e.target.value)}
              error={Boolean(joinErrors.meetingCode)}
              helperText={joinErrors.meetingCode}
              FormHelperTextProps={{
                sx: {
                  color: ERROR_COLOR,
                  fontSize: '0.7812vw',
                  fontWeight: 600,
                  textAlign: 'right',
                }
              }}
              InputProps={{
                disableUnderline: true,
                sx: {
                  height: "5vh",
                  borderRadius: "10px",
                  backgroundColor: "rgba(0, 45, 103,0.65)",
                  boxShadow: "inset 0px 3.3px 7.74px rgba(0,0,0,0.25)",
                  border: joinErrors.meetingCode ? `1px solid ${ERROR_COLOR}` : 'none',
                  "& input": {
                    height: '100%',
                    padding: 0, margin: 0, paddingX: 1,
                    color: "white",
                    fontSize: "0.7812vw",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: '10px'
                  },
                  "& input::placeholder": {
                    color: "white",
                    opacity: 1,
                    fontSize: "0.7812vw",
                    fontWeight: 300,
                  },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0px 2px 8.52px rgba(48, 173, 235, 0.08) inset",
                    WebkitTextFillColor: "black",
                  },
                },
              }}
              sx={{
                width: "20vw",
                "& .MuiFormHelperText-root.Mui-error": {
                  color: ERROR_COLOR,
                },
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter") { await handleParticipantJoin(); }
              }}
            />
          </Box>
          <Box sx={{
            mx: '1.167vw', mt: '0.4167vw',
            width: '20vw',
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Button 
              variant="contained"
              onClick={() => {
                handleParticipantJoin();
              }}
              sx={{
                width: '4.4792vw',
                height: '1.84vw',
                textTransform: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.7812vw',
                border: '0.7px solid #66E4FF',
                background: 'linear-gradient(to right, #209CD9, #1D7DEE)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: '#1976d2',
                  transform: 'scale(1.08)',
                },
              }}
            >
              Enter
            </Button>
          </Box>
        </Box>
      ) : clientStep === "accessVerified" ? (
        <Box sx={{
          backgroundColor: 'rgba(0,63,145,0.31)',
          //border: '1.5px solid rgba(158,199,255,0.6)',
          backdropFilter: 'blur(38px)',
          boxShadow: `0 3.1px 3.1px rgba(0,0,0,0.25),
            0 3.1px 3.1px rgba(74,74,74,0.25)`,
          width: '100%', 
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          //gap: '0.8333vw',
          position: 'relative'
        }}>
          <Box sx={{
            width: '9.5vh',
            height: '9.5vh',
            border: '1px solid #66E4FF',
            background: 'rgba(0,72,179,0.49)',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            
          }}>
            <img src={accessVerified_icon} alt="Verified" style={{ width: '3vw', height: '3vw'}} />
          </Box>
          <Typography sx={{color: 'white', fontSize: '1.25vw', flex: 1, textAlign: 'center'}}>
            Access Verified
          </Typography>
        </Box>
      ) : clientStep === "meetnotstarted" ? (
        <Box sx={{
          width: '100%', 
          height: '100%',
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.0417vw',
          padding: '1.0417vw',
          boxSizing: 'border-box',
        }}>
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw'}}>
            <img src={headerline} style={{transform: 'scaleX(-1)', width: '6.5vw'}}/>
            <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
              Meeting Will Begin In
            </Typography>
            <img src={headerline} style={{ width: '6.5vw'}}/>
          </Box>
          {/* <Typography sx={{color: 'white', fontSize: '0.9375vw', fontWeight: 'lighter', textAlign: 'center'}}>
            The meeting will begin at {meetingTime} on {meetingDate}.
          </Typography> */}
          <Box sx={{
            display: 'flex',
            gap: '0.4167vw',
            alignItems: 'center',
          }}>
            <Box sx={{
              borderRadius: '8px',
              backgroundColor: 'rgba(0,63,145,0.68)',
              fontSize: '1.25vw',
              fontWeight: 500,
              color: 'white',
              padding: '0.8333vw',
              position: 'relative'
            }}>
              {countdown.hours.toString().padStart(2, '0')}
              <Typography sx={{
                position: 'absolute',
                bottom: '-1.2vw',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.7292vw',
                color: 'white',
                whiteSpace: 'nowrap'
              }}>
                Hours
              </Typography>
            </Box>
            <Typography sx={{color: 'white', fontSize: '1.25vw'}}>
              :
            </Typography>
            <Box sx={{
              borderRadius: '8px',
              backgroundColor: 'rgba(0,63,145,0.68)',
              fontSize: '1.25vw',
              fontWeight: 500,
              color: 'white',
              padding: '0.8333vw',
              position: 'relative'
            }}>
              {countdown.minutes.toString().padStart(2, '0')}
              <Typography sx={{
                position: 'absolute',
                bottom: '-1.2vw',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.7292vw',
                color: 'white',
                whiteSpace: 'nowrap'
              }}>
                Minutes
              </Typography>
            </Box>
            <Typography sx={{color: 'white', fontSize: '1.25vw'}}>
              :
            </Typography>
            <Box sx={{
              borderRadius: '8px',
              backgroundColor: 'rgba(0,63,145,0.68)',
              fontSize: '1.25vw',
              fontWeight: 500,
              color: 'white',
              padding: '0.8333vw',
              position: 'relative'
            }}>
              {countdown.seconds.toString().padStart(2, '0')}
              <Typography sx={{
                position: 'absolute',
                bottom: '-1.2vw',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.7292vw',
                color: 'white',
                whiteSpace: 'nowrap'
              }}>
                Seconds
              </Typography>
            </Box>
          </Box>
          <Typography sx={{mt: '1.0417vw', color: 'white', fontSize: '0.9375vw', fontWeight: 500, textAlign: 'center'}}>
            Welcome to the Conference Hub
          </Typography>
          <Typography sx={{color: 'white', fontSize: '0.9375vw', fontWeight: 'lighter', textAlign: 'center'}}>
            Your meeting will begin shortly. You may explore the interactive options on the walls or take a short tour of the Ignition Center. You'll receive a notification once the session begins.
          </Typography>
          <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.8333vw',
          }}>
            <Button 
              variant="contained"
              disableRipple
              onClick={() => {
                if (typeof onClose === "function") onClose();
              }}
              sx={{
                width: '11vw',
                height: '2vw',
                textTransform: 'none',
                borderRadius: 2,
                fontSize: '0.7812vw',
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
              Explore Ignition Center
            </Button>
            <Button
              onClick={() => {onContinue();}}
              variant="outlined"
              sx={{
                px: '0.8333vw',
                height: '2vw',
                textTransform: 'none',
                borderRadius: '6px',
                fontSize: '0.7812vw',
                fontWeight: 700,
                border: '0.5px solid #66E4FF',
                boxShadow: '0 2.25px 5.63px rgba(0,43,255,0.37)',
                color: '#66E4FF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&: hover': {
                    transform: 'scale(1.08)',
                }
              }}
            >
              Explore Conference Hub
            </Button>
            <Button
            onClick={() => {
              leaveSession();
              onLeaveSession();
            }}
              variant="outlined"
              sx={{
                px: '0.8333vw',
                height: '2vw',
                textTransform: 'none',
                borderRadius: '6px',
                fontSize: '0.7812vw',
                fontWeight: 700,
                border: '0.5px solid #66E4FF',
                boxShadow: '0 2.25px 5.63px rgba(0,43,255,0.37)',
                color: '#66E4FF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&: hover': {
                    transform: 'scale(1.08)',
                }
              }}
            >
              Leave Session
            </Button>
          </Box>
        </Box>
      ) : clientStep === "meetstarted" ? (
        <Box sx={{
          width: '100%', 
          height: '100%',
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.0417vw',
          padding: '1.0417vw',
          boxSizing: 'border-box',
        }}>
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw'}}>
            <img src={headerline} style={{transform: 'scaleX(-1)', width: '6.5vw'}}/>
            <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
              Meeting Has Started
            </Typography>
            <img src={headerline} style={{ width: '6.5vw'}}/>
          </Box>
          <Typography sx={{color: 'white', fontSize: '0.8333vw', fontWeight: 'bold', textAlign: 'center'}}>
            {/* {`${selectedClientRoom?.roomName} has started`}. */}
            {`${roomName} has started.`}
          </Typography>
          <Box>
            <Typography sx={{color: 'white', fontSize: '0.8333vw', fontWeight: 'lighter', textAlign: 'center'}}>
              Your meeting is live.
            </Typography>
            <Typography sx={{color: 'white', fontSize: '0.8333vw', fontWeight: 'lighter', textAlign: 'center'}}>
              Join now to enter the session.
            </Typography>
          </Box>
          <Typography sx={{ color: 'white', fontSize: '0.8333vw', textAlign: 'center' }}>
            {(() => {
              const session = loadSessionData();
              const startStr = session.meetingTime;
              const endStr = session.meetingEndTime; 
              // const start = new Date(Number(selectedClientRoom.startDateTime));
              // const end = new Date(Number(selectedClientRoom.endDateTime));
              // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
              // const startStr = start.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
              // const endStr = end.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
              return `Time: ${startStr} - ${endStr}`;
            })()}
          </Typography>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.8333vw'
          }}>
            <Button 
            onClick={() => {
              goToF();
              joinClientRoom(roomName);
            }}
            variant="outlined"
            sx={{
              width: '8vw',
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
              Join Session
            </Button>
            <Button
            onClick={() => {
              onLeaveSession();
            }}
            variant="contained"
            sx={{
              width: '8vw',
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
              Leave Session
            </Button>
          </Box>
        </Box>
      ) : clientStep === "preview" ? (
        <Box sx={{
          backgroundColor: 'rgba(0,63,145,0.31)',
          width: '100%', 
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.8333vw',
          padding: '2.0833vw',
        }}>
          {/* Header */}
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw'}}>
            <img src={headerline} style={{transform: 'scaleX(-1)', width: '8.5vw'}}/>
            <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
              {/* {selectedClientRoom?.roomName} */}
              {(() => {
                const session = loadSessionData();
                // Safely read roomName from session or fall back to selectedClientRoom
                const roomName = selectedClientRoom?.roomName || session?.roomName; // session?.roomName || selectedClientRoom?.roomName || ""
                return roomName;
              })()}
            </Typography>
            <img src={headerline} style={{ width: '8.5vw'}}/>
          </Box>
          <Typography sx={{ color: 'white', fontSize: '0.8333vw', textAlign: 'center' }}>
            {(() => {
              if (!selectedClientRoom) return "";
              const start = new Date(Number(selectedClientRoom.startDateTime));
              const end = new Date(Number(selectedClientRoom.endDateTime));
              const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
              const dateStr = start.toLocaleDateString(undefined, options);
              const startStr = start.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
              const endStr = end.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
              return `${dateStr} • ${startStr} - ${endStr}`;
            })()}
          </Typography>
          <Typography sx={{ color: 'white', fontSize: '0.8333vw', textAlign: 'center' }}>
            {(() => {
              const session = loadSessionData();
              
              const v1 = session?.participantCount || 0;
              const v2 = selectedClientRoom?.participantCount || 0;
              const count = Math.max(v1, v2);

              // let source = "partCount (default)";
              // if (count === v1 && v1 !== 0) source = "Session Data";
              // else if (count === v2 && v2 !== 0) source = "Selected Client Room";

              // console.log(`Highest count: ${count} (Source: ${source})`);
              const personText = count === 1 ? "person has" : "people have";
              return `${count} ${personText} joined the meeting`;
            })()}
            {/* {`${selectedClientRoom.participantCount} people have joined the meeting`} */}
          </Typography>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            width: '30vw',
            backgroundColor: 'rgba(0,45,103,0.65)',
            borderRadius: '6px',
            position: 'relative'
          }}>
             {/* Gender toggle (Client Preview) */}
            <Box
              sx={{
                position: 'absolute',
                top: '0.625vw',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <GenderSelector value={avatarGender} onChange={setAvatarGender} />
            </Box>
            {avatarGender === "female"
              ? <Person2Icon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '10.417vw' }}/>
              : <PersonIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '10.417vw' }}/>
            }
            <Box sx={{
              position: 'absolute',
              bottom: '0.8333vw',
              left: '0.8333vw',
              display: 'flex',
              gap: '0.4167vw'
            }}>
              {/* Mic Preference */}
              <IconButton
              onClick={() => setPrefMicOn(!prefMicOn)}
              sx={{
                borderRadius: 2,
                p: 0,
                width: '1.84vw',
                height: '1.84vw',
                backgroundColor: prefMicOn ? 'rgba(0,134,201,1)' : 'rgba(0,0,0,0.05)',
                border: prefMicOn ? '0.4px solid #66E4FF' : 'none',
                color: '#fff',
                boxShadow: prefMicOn ? '0 1.58px 3.95px rgba(0,43,255,0.37)' : 'inset 0 1.62px 3.23px rgba(0,0,0,0.25)',
                transition: 'all 0.2s ease',
                '&: hover': {
                    transform: 'scale(1.08)',
                }
              }}>
                {prefMicOn ? <MicIcon sx={{fontSize: '0.9375vw'}}/> : <MicOffIcon sx={{fontSize: '0.9375vw'}}/>}
              </IconButton>
              {/* Cam Preference */}
              <IconButton
              onClick={() => setPrefCameraOn(!prefCameraOn)}
              sx={{
                borderRadius: 2,
                p: 0,
                width: '1.84vw',
                height: '1.84vw',
                backgroundColor: prefCameraOn ? 'rgba(0,134,201,1)' : 'rgba(0,0,0,0.05)',
                border: prefCameraOn ? '0.4px solid #66E4FF' : 'none',
                color: '#fff',
                boxShadow: prefCameraOn ? '0 1.58px 3.95px rgba(0,43,255,0.37)' : 'inset 0 1.62px 3.23px rgba(0,0,0,0.25)',
                transition: 'all 0.2s ease',
                '&: hover': {
                    transform: 'scale(1.08)',
                }
              }}>
                {prefCameraOn ? <VideocamIcon sx={{fontSize: '0.9375vw'}}/> : <VideocamOffIcon sx={{fontSize: '0.9375vw'}}/>}
              </IconButton>
            </Box>
            <Box sx={{
              position: 'absolute',
              bottom: '0.8333vw',
              right: '0.8333vw',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4167vw',
            }}>
              <TuneIcon sx={{color: 'white', fontSize: '1.0417vw'}}/>
              <Typography sx={{
                textDecoration: 'underline',
                color: 'white',
                fontSize: '0.9375vw',
                fontWeight: 300
              }}>
                Background Filters
              </Typography>
            </Box>
          </Box>
          <Box sx={{
            width: '30vw',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <Button 
            variant="outlined"
            onClick={() => {
              onLeaveSession();
              setClientStep("landing");
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
            // onClick={() => {
            //   if (!selectedClientRoom) return;
            //   joinClientFromPreview(selectedClientRoom.roomName);
            // }}
            onClick={() => {
              const session = loadSessionData();
              const roomName = session?.roomName || selectedClientRoom?.roomName;
              if (!roomName) return;
              joinClientFromPreview(roomName);
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
              Join
            </Button>
          </Box>
        </Box>
      ) : (none)}

      {showNotStartedPopup.visible && (
        <Box sx={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          bgcolor: 'rgba(0,0,0,0.5)'
        }}>
          <Box sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,63,145,0.31)',
            border: '1px solid rgba(158,199,255,0.6)',
            borderRadius: '8px',
            width: '35vw',
            boxSizing: 'border-box',
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.8333vw',
            padding: '2.0833vw',
            boxShadow: `
              0 2.39px 2.39px rgba(0,0,0,0.25),
              inset 0 2.39px 2.39px rgba(74,74,74,0.25)
            `,
            backdropFilter: 'blur(29.84px)',
          }}>
            <IconButton
            onClick={() => setShowNotStartedPopup({ visible: false })}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              color: 'white',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'scale(1.08)',
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}>
              <CloseIcon sx={{fontSize: '1.25vw'}}/>
            </IconButton>
            {/* Header */}
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw'}}>
              <img src={headerline} style={{transform: 'scaleX(-1)', width: '8vw'}}/>
              <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
                Meeting has not started
              </Typography>
              <img src={headerline} style={{ width: '8vw'}}/>
            </Box>
            <Typography sx={{color: 'white', fontSize: '0.9375vw', fontWeight: 'lighter', textAlign: 'center'}}>
              {showNotStartedPopup.message} You may explore the Ignition Center until the session starts. For any queries, please connect with the AI assistant in the AI Zone or contact the administrator.
            </Typography>
          </Box>
        </Box>
      )}
      {openInfo && infoRoom && (
        <Box sx={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          bgcolor: 'rgba(0, 0, 0, 0.5)'
        }}>
          <Box sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,63,145,0.31)',
            border: '1px solid #6EE9F9',
            borderRadius: '8px',
            width: '20vw',
            boxSizing: 'border-box',
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '0.8333vw',
            padding: '1.0417vw',
            boxShadow: `
              0 2.39px 2.39px rgba(0,0,0,0.25),
              inset 0 2.39px 2.39px rgba(74,74,74,0.25)
            `,
            backdropFilter: 'blur(29.84px)',
          }}>
            <Box sx={{display: 'flex', alignItems: 'center', gap: '0.8333vw'}}>
              <Typography sx={{width: '5.6vw', color: 'white', fontSize: '0.8333vw'}}>
                Meeting Name
              </Typography>
              <Box sx={{flex: 1, bgcolor: 'rgba(67,98,141,0.72)', px: '1.0417vw', py: '0.2083vw',borderRadius: '5px', color: 'white', fontSize: '0.8333vw'}}>
                {infoRoom.roomName}
              </Box>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', gap: '0.8333vw'}}>
              <Typography sx={{width: '5.6vw', color: 'white', fontSize: '0.8333vw'}}>
                Meeting Code
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: 'rgba(67,98,141,0.72)',
                  pl: '1.0417vw',
                  pr: '0.4167vw',
                  py: '0.2083vw',
                  borderRadius: '5px',
                  color: 'white',
                  fontSize: '0.8333vw'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.8333vw',
                    color: 'white',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '8vw',
                  }}
                >
                  {infoRoom.meetingCode}
                </Typography>
                <IconButton
                  onClick={() => handleCopyMeetingCode(infoRoom.meetingCode)}
                  size="small"
                  disableRipple
                  sx={{
                    width: '1.2vw',
                    height: '1.2vw',
                    minWidth: 0,
                    minHeight: 0,
                    borderRadius: '4px',
                    border: '0.61px solid #66E4FF',
                    backgroundColor: 'rgba(0,0,0,0.15)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.08)',
                      backgroundColor: 'rgba(0,0,0,0.3)',
                    },
                  }}
                >
                  <ContentCopyIcon sx={{ fontSize: '0.7vw', color: 'white' }}/>
                </IconButton>
              </Box>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', gap: '0.8333vw'}}>
              <Typography sx={{width: '5.6vw',color: 'white', fontSize: '0.8333vw'}}>
                Date & Time
              </Typography>
              <Box sx={{flex: 1, bgcolor: 'rgba(67,98,141,0.72)', px: '1.0417vw', py: '0.2083vw',borderRadius: '5px', color: 'white', fontSize: '0.8333vw'}}>
                {(() => {
                  const start = new Date(Number(infoRoom.startDateTime));
                  const options = { year: 'numeric', month: 'long', day: 'numeric' };
                  const dateStr = start.toLocaleDateString(undefined, options);
                  const startStr = start.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
                  return (
                    <>
                      <Typography sx={{ fontSize: '0.8333vw', color: '#D6E9FF' }}>
                        {dateStr} , {startStr}
                      </Typography>
                    </>
                  );
                })()}
              </Box>
            </Box>
            <Button 
            onClick={() => setOpenInfo(false)}
            sx={{
              alignSelf: 'center',
              width: '5vw',
              height: '1.5vw',
              textTransform: 'none',
              borderRadius: '6px',
              fontSize: '0.7812vw',
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
          </Box>
        </Box>
      )}
    </Box>
  );
}