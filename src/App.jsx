import React, { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";

import { Experience } from "./components/Experience";
import { WaypointRing2D } from "./components/WaypointRing";
import { BlueHotspot } from "./components/BlueHotspot";
import { MiniHotspot } from "./components/MiniHotspot";
import { Conference_Hotspots } from "./components/Conference_Hotspots";
import LoadingScreen from "./components/LoadingScreen";
import RoomsLobby from "./components/RoomsLobby";
import { VideoRoom } from "./components/VideoRoom";
import MiniMap from "./components/MiniMap";
import Cards from './components/Cards';
import ESG from './components/ESG';
import BreakoutGallery from "./components/BreakoutGallery";
import Dashboard from "./components/Dashboard";
import InfoTopLeft from "./components/InfoTopLeft";
import IWCarousel from "./components/IWCarousel";
import IWVideoPopup from "./components/IWVideoPopup";
import LeftScreenPopup from "./components/LeftScreenPopup";
import LibraryPopup from "./components/LibraryPopup";
import LiveFeed from "./components/LiveFeed";
import VideoPopup from "./components/VideoPopup";
import ImagePopup from "./components/ImagePopup";
import navigate_1 from './assets/navigate_1.png';
import navigate_2 from './assets/navigate_2.png';
import navigate_3 from './assets/navigate_3.png';
import AI from './assets/AI.png';
import DM from './assets/DM.png';
import OTS from './assets/OTS.png';
import SignatureExp from './assets/SignatureExp.png';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import CloseIcon from '@mui/icons-material/Close';

import headerline from './assets/header-line.png';
import WASD from './assets/WASD.png';
import Joystick from './assets/Joystick.png';
import LeftRightArrow from './assets/LeftRightArrow.png';
import JoystickBG from './assets/Joystick-BG.png';
import JoystickBG3 from './assets/Joystick-BG-3.png';
import JoystickBG4 from './assets/Joystick-BG-4.png';
import JoystickBG5 from './assets/Joystick-BG-5(2).png';
import notification_underline from './assets/notification_underline.png';

import { useLocation, useNavigate } from "react-router-dom";
import {
  SPAWN_POS,
  SPAWN_LOOK_AT,
  HOTSPOTS,
  WAYPOINTS_WORLD,
  HOTSPOT_SPAWN_OVERRIDES,
  SPAWN_OVERRIDES,
  LOOK_AT_OVERRIDES,
  PRE_F_SPAWN,
  PRE_F_LOOK_AT,
  PRE_G_SPAWN,
  PRE_G_LOOK_AT,
  LobbyOverlay,
  ImpactWallOverlay,
  BreakoutOverlay,
  SolutionZoneOverlay,
  AIOverlay,
  EngagementHubOverlay,
  OVERLAY_POSITIONS,
  AiOptions_Pos,
  CAMERA_FLIP_POINTS,
  CONFERENCE_HOTSPOT_POSITIONS,
  CONFERENCE_SPAWN_OVERRIDES,
  CONFERENCE_LOOK_AT_OVERRIDES,
  CONFERENCE_CLOSE_ICON_POSITIONS,
  RED_HOTSPOTS,
  RED_HOTSPOT_SPAWN_OVERRIDES,
  MINI_CONFERENCE_HOTSPOTS,
  SZ_MINI_HOTSPOTS,
  STEP_BACK,
  INNER_STEP_BACK
} from "./components/DynamicPoints";

import MapIcon from "@mui/icons-material/Map";
import SettingsIcon from "@mui/icons-material/Settings";
import Frame from "./components/Frame";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import { duration, Box, Button, Typography, Slider, IconButton } from "@mui/material";
import RightPopup from "./components/RightPopup";
import Solution_Popup1 from "./components/Solution_Popup1";
import Solution_Popup2 from "./components/Solution_Popup2";
import Solution_Popup3 from "./components/Solution_Popup3";
import Solution_Popup3_1 from "./components/Solution_Popup3_1";
import Solution_Popup4 from "./components/Solution_Popup4";
import Standard_Overlay from "./components/StandardOverlay";
import NewStandardOverlay from "./components/NewStandardOverlay";
import FAQ from "./components/FAQ";
import AiOptions from './components/AiOptions';
import FullScreenButton from "./components/FullScreenButton";
import StepBackButton from "./components/StepBackButton";
import StepBackButton2 from "./components/StepBackButton2";
import LibraryPopup2 from "./components/LibraryPopup2";
import ChangeView from "./components/ChangeView";
import InnerStepBack from "./components/InnerStepBack";
import SettingsButton from "./components/SettingsButton";
import LandingPage from './components/LandingPage';
import FadeOverlay from "./components/FadeOverlay";

const RED_IFRAME_SOURCES = {
  "RHS_1": "https://spo-global.kpmg.com/sites/GO-OI-BUS-GTK-AI/SitePages/Global-AI-credentials.aspx",
  "RHS_2": "https://spo-global.kpmg.com/sites/GO-AIUseCase",
  "RHS_3": "https://kpmg.com/us/en/capabilities-services/ai/kpmg-workbench.html",
  "RHS_4": "https://en.wikipedia.org/wiki/KPMG",
};

const SZ_MINI_CONFIG = {
  SZ_MINI_1: {
    src: "https://kpmg.com/xx/en/our-insights/ai-and-technology/kpmg-digital-gateway.html"
  },
  SZ_MINI_2: {
    src: "https://kpmg.com/ca/en/home/services/audit/kpmg-clara.html"
  },
  SZ_MINI_3: {
    src: "https://kpmg.com/xx/en/what-we-do/services/advisory/consulting/velocity.html"
  },
};

const AI_VIDEOS = {
  "RHS_0": "/videos/AI_Videos_New/5.mp4", ///videos/AI_Default.mp4
  "RHS_1": "/videos/AI_Global_Usecases.mp4",
  "RHS_2": "/videos/AI_Workbench.mp4",
  "RHS_3": "/videos/AI_Credentials.mp4",
  "RHS_4": "/videos/AI_Default.mp4",
}

function BlackHotspot(props) {
  return (
    <BlueHotspot
      {...props}
      color="#000000"
      size={props.size || "5vw"}
      opacity={0.1}
      zIndexRange={[80000, 0]}
    />
  );
}

function FovSetter({ fov }) {
  const { camera, invalidate } = useThree();
  useEffect(() => {
    if (camera && "fov" in camera) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
      invalidate();
    }
  }, [fov, camera, invalidate]);
  return null;
}

function AssetMonitor({ onDone }) {
  const { active } = useProgress();
  useEffect(() => {
    if (!active) onDone?.();
  }, [active, onDone]);
  return null;
}

function App() {
  const expRef = useRef(null);

  // Scene step
  const [step] = useState("space");

  // Loader
  const [assetsReady, setAssetsReady] = useState(false);
  const showLoader = !assetsReady;
  const [hasEntered, setHasEntered] = useState(false);

  // UI state
  const [overlay, setOverlay] = useState(null); // null || "roomslobby" || "cards"
  const [leftOverlay, setLeftOverlay] = useState(null);
  const [standardOverlay, setStandardOverlay] = useState(null);
  const [showMiniMap, setShowMiniMap] = useState(false);
  const [hiddenWpId, setHiddenWpId] = useState(null);
  const [showHotspots, setShowHotspots] = useState(false);
  const [hiddenHotspotId, setHiddenHotspotId] = useState(null);
  const [showMiniHotspots, setShowMiniHotspots] = useState(false);
  const [activeBlueHotspot, setActiveBlueHotspot] = useState(null); //for IW Logic

  // Nav state
  const [navTarget, setNavTarget] = useState(null);
  const [viewMode] = useState("FPP"); // "FPP" | "TPP"
  const [cameraFov, setCameraFov] = useState(50); //change

  const location = useLocation();
  const navigate = useNavigate();
  const [activeRoom, setActiveRoom] = useState(null);
  const [showLandingPopup, setShowLandingPopup] = useState(true);
  const [activeNav, setActiveNav] = useState("Entrance");
  const [hideUI, setHideUI] = useState(false); //to hide minimap and settings
  const [hideTopBar, setHideTopBar] = useState(false); //to hide top bar in engagement hub
  const [pointerEnabled, setPointerEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [mouseSensitivity, setMouseSensitivity] = useState(0.5);
  const [cameraFlipIdx, setCameraFlipIdx] = useState(0);
  const [cameraFlipState, setCameraFlipState] = useState(0);
  const [moveInput, setMoveInput] = useState({ x: 0, y: 0 });

  const [participantCount, setParticipantCount] = useState(0);
  const [participantNames, setParticipantNames] = useState([]);
  const [participantGenders, setParticipantGenders] = useState([]); 
  const [iwScreenActive, setIwScreenActive] = useState(true);
  const [showVid1, setShowVid1] = useState(false);
  const [showVid2, setShowVid2] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [cardsBgColor, setCardsBgColor] = useState(null);
  const [videoBgColor, setVideoBgColor] = useState(null);
  const [faqMode, setFaqMode] = useState(null);
  const [faqOverlay, setFaqOverlay] = useState(null);
  const [showEmpLeavePopup, setShowEmpLeavePopup] = useState(null);
  const [showClientLeavePopup, setShowClientLeavePopup] = useState(null);
  const [leftUserName, setLeftUserName] = useState("");
  const [showLiveFeed, setShowLiveFeed] = useState(true);
  const [userSession, setUserSession] = useState(null);
  const [viewFlag, setViewFlag] = useState(0);
  const [conferenceHotspots, setConferenceHotspots] = useState([]);
  const [hiddenConferenceHotspot, setHiddenConferenceHotspot] = useState(null);
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const [showConferenceHotspots, setShowConferenceHotspots] = useState(true); //to hide and show conf hotspots within meeting
  const [minimizeBoxesTrigger, setMinimizeBoxesTrigger] = useState(0); //to minimize video tiles and participant list when conf hotspot is clicked
  const [showIWMesh, setShowIWMesh] = useState(true);
  const [currentHS, setCurrentHS] = useState(""); //to track which Lounge hotspot is selected
  const [leftScreenVisible, setLeftScreenVisible] = useState(true);
  const [activeRedHotspot, setActiveRedHotspot] = useState(null);
  const [iframeKey, setIframeKey] = useState(0);
  const [atAltView, setAtAltView] = useState(false);
  const [showRedHotspots, setShowRedHotspots] = useState(false); 
  const [pendingRedSrc, setPendingRedSrc] = useState(null);
  const [activeSZLink, setActiveSZLink] = useState(null);
  // const [aiImage, setAiImage] = useState(null);
  const [aiVideo, setAiVideo] = useState(AI_VIDEOS["RHS_0"]);
  const [activeLibraryHotspot, setActiveLibraryHotspot] = useState(null);
  const [iwVideoIndex, setIwVideoIndex] = useState(0);
  const [videoOverlay, setVideoOverlay] = useState(null);
  const [showBlackImg, setShowBlackImg] = useState(false);
  const [showMiniConferenceHotspots, setShowMiniConferenceHotspots] = useState(null);
  const [selectedLeftImage, setSelectedLeftImage] = useState(false);
  const [leftPopupSource, setLeftPopupSource] = useState(null);
  const [showLibraryDetails, setShowLibraryDetails] = useState(false);
  const [szVideoOverride, setSzVideoOverride] = useState(null);
  const [hoverMiniVideo, setHoverMiniVideo] = useState(null);
  const [showSzMiniHotspots, setShowSzMiniHotspots] = useState(false);
  const [activeSzMiniHotspot, setActiveSzMiniHotspot] = useState(null);
  const [openSzFramefor, setOpenSzFrameFor] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [closeSolutionPopup3, setCloseSolutionPopup3] = useState(null);
  const [showStepBack, setShowStepBack] = useState(null);
  const [showRealStepBack, setShowRealStepBack] = useState(null);
  const [showResume, setShowResume] = useState(false);
  const [open, setOpen] = useState(true); //decides if info box is open or not
  const [librarySection, setLibrarySection] = useState(null); //to change infotopleft content
  const [changeView, setChangeView] = useState(null); //to change view from SZ Screen to Globe
  const [showSZScreenText, setShowSZScreenText] = useState(null); //to show SZ screen text on hover
  const [notification, setNotification] = useState(false); //to show declined notification
  const [isLeavePopupActive, setIsLeavePopupActive] = useState(false); //to block mini_conference_hotspots when leave popup is active
  const [isBlockMiniHotspots, setIsBlockMiniHotspots] = useState(false); //to block mini_conference_hotspots in some other cases
  const [kicked, setKicked] = useState(false);
  const [selectedHotspotId, setSelectedHotspotId] = useState(RED_HOTSPOTS[0]?.id); //to track which hotspot is selected in AI Left Area
  const [isFading, setIsFading] = useState(false); //to trigger fade effect when teleporting

  const [isScreenShared, setIsScreenShared] = useState(false);
  const isMeetingActive = !!activeRoom;

  const autoShowSZText = (duration = 5000) => {
    setShowSZScreenText("default");
    setTimeout(() => {
      setShowSZScreenText(null);
    }, duration);
  };

  const shouldShowLiveFeed = useMemo(
    () => activeRoom && showLiveFeed && (cameraFlipState === 1 || viewFlag === 2),
    [activeRoom, showLiveFeed, cameraFlipState, viewFlag]
  );
  // Rishab follow this if I'm not here: [x, y, z] = [left(-)/right(+), down(-)/up(+), distance from camera]
  const liveFeedHudOffset = useMemo(() => {
    const offsetTopRight = [-1.39, -0.6, -2];

    if (viewFlag === 2) return offsetTopRight;
    if (cameraFlipState === 0) return offsetTopRight;
    return offsetTopRight;
  }, [cameraFlipState, viewFlag]);
  const [countdown, setCountdown] = useState(null);
  const [showJoin, setShowJoin] = useState(false);
  
  const API_BASE = import.meta.env.VITE_APP_API_BASE;
  const PENDING_APPROVAL_KEY = "ic_pending_approval";
  const FORCE_PREVIEW_KEY = "ic_force_client_preview";

  const closeAllTransientOverlays = () => {
    // kill any open popups / dialogs / overlays
    setLeftOverlay(null);
    setStandardOverlay(null);
    setFaqOverlay(null);
    setVideoOverlay(null);

    // kill IW / media popups
    setShowVid1(false);
    setShowVid2(false);
    setShowImg(false);
    setShowBlackImg(false);

    // kill red hotspot iframe / AI / library overlays
    setActiveRedHotspot(null);
    setPendingRedSrc(null);
    setShowRedHotspots(false);
    setActiveSZLink(null);
    setActiveLibraryHotspot(null);
    setShowLibraryDetails(false);

    // mini/SZ hover popups
    setActiveSzMiniHotspot(null);
    setShowSzMiniHotspots(false);
    setHoverMiniVideo(null);

    // left screen popup state
    setSelectedLeftImage(false);
    setLeftPopupSource(null);

    // misc UI states that can keep things "open"
    setShowSettings(false);
    setShowMiniMap(false);
    setAtAltView(false);
    setCloseSolutionPopup3(null);
    setShowStepBack(null);
  };


  const loadPendingApproval = () => {
    try { return JSON.parse(sessionStorage.getItem(PENDING_APPROVAL_KEY) || "null"); } catch { return null; }
  };
  const clearPendingApproval = () => {
    try { sessionStorage.removeItem(PENDING_APPROVAL_KEY); } catch {}
  };
  const setForceClientPreview = (roomName) => {
    try { sessionStorage.setItem(FORCE_PREVIEW_KEY, JSON.stringify({ roomName, at: Date.now() })); } catch {}
  };

  useEffect(() => {
    let session = userSession;
    if (!session) {
      const stored = sessionStorage.getItem("ic_session_data");
      if (!stored) return;
      session = JSON.parse(stored);
    }

    if (session?.role !== "client") return;
    if (session?.clientStep !== "meetnotstarted") return;

    const pending = loadPendingApproval();
    if (!pending?.roomName || !pending?.uid) return;

    let alive = true;
    const poll = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/checkApproval/${pending.roomName}/${pending.uid}`);
        const info = await res.json();
        if (!alive) return;

        if (info?.approved) {
          clearInterval(poll);
          clearPendingApproval();
          setForceClientPreview(pending.roomName);
          const updated = { ...session, roomName: pending.roomName, clientStep: "meetnotstarted" };
          sessionStorage.setItem("ic_session_data", JSON.stringify(updated));
          setUserSession(updated);
          setShowHotspots(false);
          closeAllTransientOverlays();
          setShowRealStepBack(null);
          setActiveNav("Engagement_Hub");
          setOverlay("clientroomslobby");
          setConferenceHotspots([]);
          setHiddenConferenceHotspot(null);
          setShowMiniConferenceHotspots(null);
          setPointerEnabled(false);
        }
      } catch (e) {
      }
    }, 2000);

    return () => {
      alive = false;
      clearInterval(poll);
    };
  }, [userSession, overlay]);

  useEffect(() => {
    if (activeRoom) {
      setMinimizeBoxesTrigger(0);
    }
  }, [activeRoom]);

  useEffect(() => {
    let session = userSession;
    if (session === null) {
      setCountdown(null);
      const timer = setTimeout(() => {
        setNotification(false);
      }, 10000);

      if (activeNav === "Engagement_Hub") {
        setConferenceHotspots([]);
        setHiddenConferenceHotspot(null);
        setShowMiniConferenceHotspots(null);
        setLeftOverlay(null);
        backToWaypointF();
        setHideUI(false);
        setOverlay(null);
      }
      //return;
      return () => clearTimeout(timer); //cleanup the timer if userSession changes
    }
    if (!session) {
      const stored = sessionStorage.getItem("ic_session_data");
      console.log("Stored session from storage:", stored);
      if (!stored) {
        setCountdown(null);
        return;
      }
      session = JSON.parse(stored);
    }
    console.log("Using session for countdown:", session);

    if (session.clientStep === "meetnotstarted" && session.meetingTime && session.meetingDate) {
      const target = new Date(`${session.meetingDate} ${session.meetingTime}`).getTime();
      const interval = setInterval(() => {
        const now = Date.now();
        const diff = target - now;
        if (diff <= 0) {
          clearInterval(interval);
          setCountdown(null);
          setOverlay("roomslobby");
          setHiddenConferenceHotspot(null);
          setShowMiniConferenceHotspots(null);
          //setShowJoin(true);
          return;
        }
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ hours, minutes, seconds });
      }, 1000);
      return () => clearInterval(interval);
    }
    else if (session.adminStep === "meetnotstarted" && session.meetingTime && session.meetingDate) {
      const target = new Date(`${session.meetingDate} ${session.meetingTime}`).getTime();
      const interval = setInterval(() => {
        const now = Date.now();
        const diff = target - now;
        if (diff <= 0) {
          clearInterval(interval);
          setCountdown(null);
          setOverlay("roomslobby");
          setHiddenConferenceHotspot(null);
          setShowMiniConferenceHotspots(null);
          //setShowJoin(true);
          return;
        }
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ hours, minutes, seconds });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [userSession]);

  const shouldBlockPointer = useMemo(() => {
    return faqOverlay === "faq" || overlay === "iwcarousel" || overlay === "aioptions" || leftOverlay === "leftscreenpopup";
  }, [overlay, faqOverlay]);

  const isInMeetingLobby = useMemo(
    () => overlay === "roomslobby" || overlay === "emproomslobby" || overlay === "clientroomslobby",
    [overlay]
  );

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     const keys = ["w", "a", "s", "d", "ArrowLeft", "ArrowRight", "Enter"];
  //     if (keys.includes(event.key)) {
  //       setShowLandingPopup(false);
  //     }
  //   };
  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  useEffect(() => {
    const navEntries = performance.getEntriesByType("navigation");
    const isReload = navEntries.length && navEntries[0].type === "reload";

    if (isReload && location.pathname !== "/") {
      navigate("/", {replace: true});
    }
  }, []);

  const handleOpenFAQ = (mode) => {
    setFaqMode(mode);
    setFaqOverlay("faq");
    setHideUI(true);
    setPointerEnabled(false);
  }
  const handleJoinAMeeting = () => {
    setShowLandingPopup(false);
    setActiveNav("Engagement_Hub");
    expRef.current?.teleportTo({
      x: PRE_F_SPAWN.x,
      y: PRE_F_SPAWN.y,
      z: PRE_F_SPAWN.z,
      duration: GLIDE,
      lookAt: PRE_F_LOOK_AT
    });

    const wp = markers.waypointsWorld.find((w) => w.id === "F");
    if (wp) {
      setHiddenWpId(wp.id);
      setShowHotspots(false);
      //setCameraFov(50);
      setOverlay("clientroomslobby");
      setPointerEnabled(false);
    }
  };

  const overlayMap = {
    Lobby: LobbyOverlay,
    Impact_Wall: ImpactWallOverlay,
    Breakout: BreakoutOverlay,
    Solution_Experience: SolutionZoneOverlay,
    AI_In_Action: AIOverlay,
    Engagement_Hub: EngagementHubOverlay,
  }

  const GLIDE = 0.95;//Rishab change this for glide speed
  const HIDE_ALL_WP = "__ALL__";

  //const shouldShowRedHotspots = hiddenWpId === "D" && showRedHotspots;

  const handleCameraFlip = () => {
    if (!expRef.current || !CAMERA_FLIP_POINTS?.length) return;
    const idx = cameraFlipIdx % CAMERA_FLIP_POINTS.length;
    const target = CAMERA_FLIP_POINTS[idx];
    expRef.current?.teleportTo({
      x: target.x,
      y: target.y ?? 0,
      z: target.z,
      duration: GLIDE,
      ...(target.lookAt ? { lookAt: target.lookAt } : {}),
    });
    setCameraFlipIdx((i) => (i + 1) % CAMERA_FLIP_POINTS.length);
    setCameraFlipState((v) => (v === 0 ? 1 : 0));
  };

  const resetRedHotspots = () => { //so that red hotspots go when AI or other location is clicked
    setShowRedHotspots(false);
    setPendingRedSrc(null);
    setActiveRedHotspot(null);
    setActiveSZLink(null);
    setAiVideo(AI_VIDEOS["RHS_0"]);
  };

  function useAutoHide(timeout = 3000) {
    const [hidden, setHidden] = useState(false);
    const timerRef = useRef(null);

    const resetTimer = () => {
      setHidden(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setHidden(true), timeout);
    };

    useEffect(() => {
      resetTimer();
      const handleMouseMove = () => resetTimer();
      const handleTouchStart = () => resetTimer();
      const handleScroll = () => resetTimer();
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("scroll", handleScroll);
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, []);

    return hidden;
  }

  const headersHidden = useAutoHide(3000);

  useEffect(() => {
    if (activeRoom) setShowSettings(false);
  }, [activeRoom]);

  // helper to teleport
  const teleportTo = async (spawn, aim = null, wpId = null) => {
    const isBlinkPoint = (wpId === "H" || wpId === "I");

    if (isBlinkPoint) {
      setIsFading(true);
      await new Promise((res) => setTimeout(res, 500));
      expRef.current?.teleportTo({
        x: spawn.x,
        y: spawn.y ?? 0,
        z: spawn.z,
        duration: 0,
        ...(aim ? { lookAt: aim } : {}),
      });
      setHiddenWpId(wpId);
      setShowHotspots(wpId === "C" || wpId === "D" || wpId === "A" || wpId === "B" || wpId === "F" || wpId === "E" || wpId === "G");
      setHiddenHotspotId(null);
      setIsFading(false);
    } else {
      expRef.current?.teleportTo({
        x: spawn.x,
        y: spawn.y ?? 0,
        z: spawn.z,
        duration: GLIDE,
        ...(aim ? { lookAt: aim } : {}),
      });

      setHiddenWpId(wpId);
      setShowHotspots(wpId === "C" || wpId === "D" || wpId === "A" || wpId === "B" || wpId === "F" || wpId === "E" || wpId === "G");
      setHiddenHotspotId(null);

      if (wpId === "F") {
        setPointerEnabled(false);
      } else {
        setPointerEnabled(true);
      }
    }
  };

  const goToLobby = () => {
    expRef.current?.teleportTo({
      x: SPAWN_POS.x,
      y: SPAWN_POS.y,
      z: SPAWN_POS.z,
      duration: GLIDE,
      lookAt: SPAWN_LOOK_AT,
    });
    // restore HUD/FOV/state
    setHiddenWpId(null);
    setNavTarget(null);
    //setCameraFov(50); //change
    setOverlay(null);
    setShowHotspots(false);
    setHiddenHotspotId(null);
    setActiveNav("Entrance");
    setPointerEnabled(true);
    setStandardOverlay(null);
    setCameraFlipState(0);
  }
  
  const goToF = () => {
    setActiveNav("Engagement_Hub");
    //setOverlay("roomslobby");
    setHiddenHotspotId(null);
    setHideUI(false);
    setPointerEnabled(false);
    const wp = markers.waypointsWorld.find(w => w.id === "F");
    if (wp) {
      const spawn = wp.spawnAt ?? { x: wp.wx, y: wp.wy ?? 0, z: wp.wz };
      const aim = wp.aimAt ?? wp.lookAt ?? null;
      expRef.current?.teleportTo({
        x: spawn.x,
        y: spawn.y ?? 0,
        z: spawn.z,
        duration: GLIDE,
        ...(aim ? { lookAt: aim } : {}),
      });
      setHiddenWpId(wp.id);
      setShowHotspots(false);
    }
    setIwScreenActive(true);
  }

  const backToWaypointF = () => {
    setActiveNav("Engagement_Hub");
    setOverlay(null);
    setHiddenHotspotId(null);
    setHideUI(false);
    setPointerEnabled(false);
    expRef.current?.teleportTo({
      x: PRE_F_SPAWN.x,
      y: PRE_F_SPAWN.y,
      z: PRE_F_SPAWN.z,
      duration: GLIDE,
      lookAt: PRE_F_LOOK_AT,
    });
    const wp = markers.waypointsWorld.find((w) => w.id === "F");
    if (wp) {
      setHiddenWpId(wp.id);
      setShowHotspots(true);
      setHiddenHotspotId(null);
      //setOverlay("roomslobby");
    }
    setIwScreenActive(true);
  }

  const goToWaypointA = () => {
    const wp = markers.waypointsWorld.find((w) => w.id === "A");
    if (wp) {
      const spawn = wp.spawnAt ?? { x: wp.wx, y: wp.wy ?? 0, z: wp.wz };
      const aim = wp.aimAt ?? wp.lookAt ?? null;

      expRef.current?.teleportTo({
        x: spawn.x,
        y: spawn.y ?? 0,
        z: spawn.z,
        duration: GLIDE,
        ...(aim ? { lookAt: aim } : {}),
      });

      setHiddenWpId(wp.id);
      setShowHotspots(wp.id === "C" || wp.id === "D" || wp.id === "A");
      setHiddenHotspotId(null);
      setOverlay(null);
      setPointerEnabled(true); 
    }
  };

  const goToWaypointD = () => {
    const wp = markers.waypointsWorld.find((w) => w.id === "D");
    if (wp) {
      const spawn = wp.spawnAt ?? { x: wp.wx, y: wp.wy ?? 0, z: wp.wz };
      const aim = wp.aimAt ?? wp.lookAt ?? null;

      expRef.current?.teleportTo({
        x: spawn.x,
        y: spawn.y ?? 0,
        z: spawn.z,
        duration: GLIDE,
        ...(aim ? { lookAt: aim } : {}),
      });

      setHiddenWpId(wp.id);
      setShowHotspots(wp.id === "C" || wp.id === "D" || wp.id === "A");
      setHiddenHotspotId(null);

      //setCameraFov(50);  // change

      setOverlay(null);
      setHiddenHotspotId(null);
      setPointerEnabled(true);
    }
  };
  const closeAIZone = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    window.dispatchEvent(new Event("ic:aiStop"));
    setShowRedHotspots(false);
    setActiveRedHotspot(null);
    setPendingRedSrc(null);
    setOverlay(null);
    setFaqOverlay(null);
    setFaqMode(null);
    goToWaypointD();
    setHiddenHotspotId(null);
    setHideUI(false);
    setPointerEnabled(false);
    setAtAltView(false);
    setOpen(false);
    setStandardOverlay("infotopleft");
    setAiVideo(AI_VIDEOS["RHS_0"]);
    setShowRealStepBack("D");
    setSelectedHotspotId(RED_HOTSPOTS[0]?.id);
  }

  //Initial spawn
  useEffect(() => {
    if (assetsReady && expRef.current) {
      expRef.current.teleportTo({
        x: SPAWN_POS.x,
        y: SPAWN_POS.y,
        z: SPAWN_POS.z,
        duration: 0,
        lookAt: SPAWN_LOOK_AT,
      });
    }
  }, [assetsReady]);


  // Active room from URL
  useEffect(() => {
    if (location.pathname !== "/" && location.pathname.length > 1) {
      setActiveRoom(location.pathname.slice(1));
    } else {
      setActiveRoom(null);
    }
  }, [location.pathname]);

  // Waypoint & minimap data (no multiplayer)
  const markers = useMemo(() => {
    const X_MIN = -25,
      X_MAX = 25;
    const Z_MIN = -25,
      Z_MAX = 25;

    const toPercent = (v, min, max) => {
      const c = Math.min(Math.max(v, min), max);
      return ((c - min) / (max - min)) * 100;
    };

    // Enrich waypoints with optional spawn/aim overrides
    const waypointsWorld = WAYPOINTS_WORLD.map((wp) => ({
      ...wp,
      spawnAt: SPAWN_OVERRIDES[wp.id] || null,
      aimAt: LOOK_AT_OVERRIDES[wp.id] || wp.lookAt || null,
    }));

    const waypointsForMini = waypointsWorld.map((wp) => {
      const xPct = toPercent(wp.wx, X_MIN, X_MAX);
      const yPct = 100 - toPercent(wp.wz, Z_MIN, Z_MAX); // invert so +Z is up
      return { ...wp, x: xPct, y: yPct, badge: wp.id };
    });

    // no player markers in single-player version
    const playerMarkers = [];

    return {
      playerMarkers,
      waypointsForMini,
      waypointsWorld,
    };
  }, []);

  useEffect(() => {
    if (overlay === 'roomslobby' && activeRoom) {
      setStandardOverlay(null);
      setHiddenWpId(HIDE_ALL_WP);
    }
  }, [overlay, activeRoom]);

  useEffect(() => {
    if (overlay === 'clientroomslobby' && activeRoom) {
      setStandardOverlay(null);
      setHiddenWpId(HIDE_ALL_WP);
    }
  }, [overlay, activeRoom]);
  useEffect(() => {
    // Clears session when page reloads
    window.addEventListener("beforeunload", () => {
      sessionStorage.removeItem("ic_session_data");
    });
  }, []);

  const goToHS_F = () => {
    setShowRealStepBack(null);
    setPointerEnabled(false);
    const hs = HOTSPOTS.find(h => h.id === "HS_F");
    if (!hs) return;

    const spawn = HOTSPOT_SPAWN_OVERRIDES["HS_F"] ?? {
      x: hs.position[0],
      y: hs.position[1] ?? 0,
      z: hs.position[2],
    };
    const aim = hs.lookAt ?? {
      x: hs.position[0],
      y: hs.position[1] ?? 1.5,
      z: hs.position[2],
    };
    expRef.current?.teleportTo({
      x: spawn.x,
      y: spawn.y ?? 0,
      z: spawn.z,
      duration: GLIDE,
      lookAt: aim,
    });
    setActiveBlueHotspot("HS_F");
    setHiddenHotspotId("HS_F");
    setShowHotspots(false);
    setHideUI(true);
    setStandardOverlay(null);
    setChangeView("F");
    setOverlay("solution_popup3");
    setSzVideoOverride("Globe");
  };
  const goToHS_SZ1 = () => {
    const hs = HOTSPOTS.find(h => h.id === "HS_SZ1");
    if (!hs) return;

    const spawn = HOTSPOT_SPAWN_OVERRIDES["HS_SZ1"] ?? {
      x: hs.position[0],
      y: hs.position[1] ?? 0,
      z: hs.position[2],
    };
    const aim = hs.lookAt ?? {
      x: hs.position[0],
      y: hs.position[1] ?? 1.5,
      z: hs.position[2],
    };
    expRef.current?.teleportTo({
      x: spawn.x,
      y: spawn.y ?? 0,
      z: spawn.z,
      duration: GLIDE,
      lookAt: aim,
    });
    setActiveBlueHotspot("HS_SZ1");
    setHiddenHotspotId("HS_SZ1");
    setHideUI(true);
    setOverlay(null);
    setStandardOverlay(null);
    setSzVideoOverride("HS1");
    setTimeout(() => {
      setShowSzMiniHotspots(true);
    }, 400);
    setChangeView("SZ");
  };
  const goToHS_G_START = () => {
    setHideUI(true);
    const hs = HOTSPOTS.find(h => h.id === "HS_G_START");
    if (!hs) return;

    const spawn = HOTSPOT_SPAWN_OVERRIDES["HS_G_START"] ?? {
      x: hs.position[0],
      y: hs.position[1] ?? 0,
      z: hs.position[2],
    };
    const aim = hs.lookAt ?? {
      x: hs.position[0],
      y: hs.position[1] ?? 1.5,
      z: hs.position[2],
    };
    expRef.current?.teleportTo({
      x: spawn.x,
      y: spawn.y ?? 0,
      z: spawn.z,
      duration: GLIDE,
      lookAt: aim,
    });
    setLibrarySection("left");
    setShowLibraryDetails(true);
    setHiddenHotspotId(null);
    // setShowStepBack("G");
    setChangeView("Lib1");
    
  }
  const goToHS_G_RIGHT = () => {
    const hs = HOTSPOTS.find(h => h.id === "HS_G_RIGHT");
    if (!hs) return;

    const spawn = HOTSPOT_SPAWN_OVERRIDES["HS_G_RIGHT"] ?? {
      x: hs.position[0],
      y: hs.position[1] ?? 0,
      z: hs.position[2],
    };
    const aim = hs.lookAt ?? {
      x: hs.position[0],
      y: hs.position[1] ?? 1.5,
      z: hs.position[2],
    };
    expRef.current?.teleportTo({
      x: spawn.x,
      y: spawn.y ?? 0,
      z: spawn.z,
      duration: GLIDE,
      lookAt: aim,
    });
    setLibrarySection("right");
    setShowLibraryDetails(true);
    setHiddenHotspotId(null);
    // setShowStepBack("G");
    setChangeView("Lib2");
    setHideUI(true);
  }

  return (
    <>
      <Canvas
        shadows
        dpr={[1, 1.25]} //1, 1.75
        frameloop="always"            
        gl={{ powerPreference: "high-performance", antialias: true }}
        camera={{ position: [8, 8, 8], fov: cameraFov }}
      >
        <color attach="background" args={["#ececec"]} />
        <FovSetter fov={cameraFov} />

        <Experience
          ref={expRef}
          viewMode={viewMode}
          navTarget={navTarget}
          setNavTarget={setNavTarget}
          allowManualMove={true}
          participantCount={participantCount}
          participantNames={participantNames}
          participantGenders={participantGenders}
          pointerEnabled={pointerEnabled}
          // iwScreenActive={iwScreenActive}
          mouseSensitivity={mouseSensitivity}
          moveInput={moveInput}
          disableArrowSpin={!pointerEnabled}
          showVid1={showVid1}
          showVid2={showVid2}
          showImg={showImg}
          // showIWMesh={showIWMesh}
          leftScreenVisible={leftScreenVisible}
          // aiImage={aiImage}
          aiVideo={aiVideo}
          impactWallMode={activeNav === "Impact_Wall"}
          iwVideoIndex={iwVideoIndex}
          setIwVideoIndex={setIwVideoIndex}
          showBlackImg={showBlackImg}
          screenshareOn={isScreenShared}
          szVideoOverride={szVideoOverride}
          hoverMiniVideo={hoverMiniVideo}
          showSZScreenText={showSZScreenText}
        />

        {/* {shouldShowLiveFeed && (
          <LiveFeed
          //panelSize={[0.6, 0.34]}
            //panelSize={[350, 200]}
            //margin={[30, 30]}
            start={{ x: -32.0, y: 2, z: 3.5 }}
            end={{   x: -32.0, y: 2, z: 3.5 }}
            lookStart={{  x: -41.0, y: 1.6, z: 0.5 }}
            lookEnd={{   x: -41.0, y: 1.6, z: 0.5 }}
            // UI options
            autoScan={true}
            scanSpeed={7}          
            fov={38}
            //panelSize={[0.59, 0.325]}     
            hudOffset={liveFeedHudOffset}
            opacity={0.82}
          />
        )} */}

        <AssetMonitor onDone={() => setAssetsReady(true)} />

        {/* HUD Waypoints (DOM overlay) */}
        {markers.waypointsWorld
          .filter((wp) =>
            hiddenWpId === "G" ? false : hiddenWpId === HIDE_ALL_WP ? false : wp.id !== hiddenWpId
            //hiddenWpId === "G" ? wp.id === "G" : wp.id !== hiddenWpId
          )
          .map((wp) => (
            <WaypointRing2D
              key={wp.id || `${wp.wx},${wp.wz}`}
              id={wp.id}
              position={[wp.wx, wp.wy ?? wp.y ?? 0.9, wp.wz]}
              color={wp.color} // || "#ff5e00"
              label={wp.label}
              desc={wp.desc}
              interaction={wp.interaction}
              size={'1.95vw'}
              showLandingPopup={showLandingPopup}
              onEnter={() => {
                setConferenceHotspots([]);
                setHiddenConferenceHotspot(null);
                if (wp.id !== "F") {
                  setShowMiniConferenceHotspots(null);
                }
                setOverlay(false);
                const spawn = wp.spawnAt ?? { x: wp.wx, y: wp.wy ?? 0, z: wp.wz };
                const aim = wp.aimAt ?? wp.lookAt ?? null;

                teleportTo(spawn, aim, wp.id);
                // Teleport + optional lookAt
                // expRef.current?.teleportTo({
                //   x: spawn.x,
                //   y: spawn.y ?? 0,
                //   z: spawn.z,
                //   duration: GLIDE,
                //   wpId: wp.id,
                //   ...(aim ? { lookAt: aim } : {}),
                // });

                setHiddenWpId(wp.id);
                setShowHotspots(wp.id === "C" || wp.id === "D" || wp.id === "A" || wp.id === "B" || wp.id === "F" || wp.id === "E" || wp.id === "G");
                setHiddenHotspotId(null);

                if (wp.id === "F") {
                  //setCameraFov(50); //45 //change
                  setActiveNav("Engagement_Hub");
                  setOpen(true);
                  setStandardOverlay("infotopleft");
                  setOverlay(null);
                  setHideUI(false);
                  setPointerEnabled(false);
                  setIwScreenActive(true);
                  setShowResume(false);
                  setShowRealStepBack("F");
                  expRef.current?.teleportTo({
                    x: PRE_F_SPAWN.x,
                    y: PRE_F_SPAWN.y,
                    z: PRE_F_SPAWN.z,
                    duration: GLIDE,
                    lookAt: PRE_F_LOOK_AT
                  });
                } else {
                  //setCameraFov(50); //change
                  //setHideUI(false);
                }
                if (wp.id === "A"){
                  setActiveNav("Solution_Experience");
                  setOpen(true);
                  setStandardOverlay("infotopleft");
                  setHideUI(false);
                  setIwScreenActive(true);
                  setPointerEnabled(false);
                  setShowRealStepBack("A");
                  autoShowSZText(5000);
                }
                if (wp.id === "B"){
                  setActiveNav("Impact_Wall");
                  setOpen(true);
                  setStandardOverlay("infotopleft");
                  setHideUI(false);
                  setIwScreenActive(false);
                  setPointerEnabled(false);
                  // setShowMainMesh(prev => !prev);
                  setShowIWMesh(false);
                  setOverlay("iwcarousel");
                  setShowRealStepBack("B");
                }
                if (wp.id === "C"){
                  setActiveNav("Lobby");
                  setOpen(true);
                  setStandardOverlay("infotopleft");
                  setHideUI(false);
                  setIwScreenActive(true);
                  setPointerEnabled(false);
                  setShowRealStepBack("C");
                }
                if (wp.id === "D"){
                  setActiveNav("AI_In_Action");
                  setOpen(true);
                  setStandardOverlay("infotopleft");
                  setHideUI(false);
                  setIwScreenActive(true);
                  setPointerEnabled(false);
                  setShowRealStepBack("D");
                }
                if (wp.id === "E"){
                  setActiveNav("Breakout");
                  setOpen(true);
                  setStandardOverlay("infotopleft");
                  setHideUI(false);
                  setIwScreenActive(true);
                  setPointerEnabled(false);
                  setShowRealStepBack("E");
                }
                if (wp.id === "G"){
                  setActiveNav("Library");
                  setOpen(true);
                  setStandardOverlay("infotopleft");
                  setHideUI(false);
                  setIwScreenActive(true);
                  setPointerEnabled(false);
                  setShowRealStepBack("G");
                  expRef.current?.teleportTo({
                    x: PRE_G_SPAWN.x,
                    y: PRE_G_SPAWN.y,
                    z: PRE_G_SPAWN.z,
                    duration: GLIDE,
                    lookAt: PRE_G_LOOK_AT
                  });
                  // setHiddenWpId(HIDE_ALL_WP);
                }
              }}
            />
          ))}

        {/* Blue Hotspots */}
        {showHotspots &&
          HOTSPOTS.filter(
            (hs) => {
              if (hiddenWpId !== "G") {
                return hs.waypoint === hiddenWpId && hs.id !== hiddenHotspotId;
              }
              if (!showLibraryDetails) {
                return ["HS_G_START", "HS_G_RIGHT"].includes(hs.id);
              }
              return ["HS_R","HS_S","HS_T","HS_U","HS_V","HS_W","HS_X","HS_Y", "HS_Z", "HS_AA", "HS_AB", "HS_AC", "HS_AD", "HS_AE", "HS_AF"].includes(hs.id);
            }).map((hs) => (
            <BlueHotspot
              key={hs.id}
              id={hs.id}
              position={hs.position}
              label={hs.label}
              autoShowDesc={["HS_F", "HS_SZ1","HS_B", "HS_G_START", "HS_G_RIGHT", 'HS_R','HS_S','HS_T',"HS_U","HS_V","HS_W","HS_X","HS_Y", "HS_Z", "HS_AA", "HS_AC", "HS_AD", "HS_AE", "HS_AF"].includes(hs.id) ? 5000 : 0}
              onSZHoverChange={(visible) => {
                if (hs.id === "HS_SZ1") {
                  setShowSZScreenText(visible);
                }
              }}
              onClick={() => {
                setShowRealStepBack(null);
                setPointerEnabled(false);
                const spawn = HOTSPOT_SPAWN_OVERRIDES[hs.id]
                ?? {x: hs.position[0], y: hs.position[1] ?? 0, z: hs.position[2]};
                const aim = hs.lookAt ?? {
                  x: hs.position[0],
                  y: hs.position[1] ?? 1.5,
                  z: hs.position[2],
                };

                const opens2DOverlay = [
                  "HS_A","HS_B","HS_C","HS_D","HS_E","HS_F","HS_G","HS_H","HS_I","HS_J","HS_K","HS_L","HS_M","HS_N","HS_O","HS_P","HS_Q"
                ].includes(hs.id);
                if (opens2DOverlay) {
                  expRef.current?.lookAtOnly({ lookAt: aim, duration: 0 });
                } else {
                  expRef.current?.teleportTo({
                    x: spawn.x, y: spawn.y ?? 0, z: spawn.z,
                    duration: GLIDE,
                    lookAt: aim,
                  });
                }
                expRef.current?.teleportTo({
                  x: spawn.x,
                  y: spawn.y ?? 0,
                  z: spawn.z,
                  duration: GLIDE,
                  lookAt: aim,
                });
                setActiveBlueHotspot(hs.id);
                setHiddenHotspotId(hs.id);
                if (["HS_F", "HS_G", "HS_H", "HS_I"].includes(hs.id)) {
                  setShowHotspots(false); // hides all except this one
                }
                if (["HS_A", "HS_B"].includes(hs.id)) {
                  setShowHotspots(false);
                }
                if (["HS_F", "HS_SZ1"].includes(hs.id)) {
                  setShowHotspots(false);
                }
                if (hs.id === "HS_G_START") {
                  goToHS_G_START();
                  return;
                }
                if (hs.id === "HS_G_RIGHT") {
                  goToHS_G_RIGHT();
                  return;
                }
                if (["HS_R","HS_S","HS_T","HS_U","HS_V","HS_W","HS_X","HS_Y", "HS_Z", "HS_AA"].includes(hs.id)) {
                  setOverlay("library_popup");
                  setHideUI(true);
                  setActiveLibraryHotspot(hs.id);
                  setShowHotspots(false);
                  setStandardOverlay(null);
                  setChangeView(null);
                }
                if (["HS_AD","HS_AE"].includes(hs.id)) {
                  setOverlay("library_popup_right_2");
                  setHideUI(true);
                  setActiveLibraryHotspot(hs.id);
                  setShowHotspots(false);
                  setStandardOverlay(null);
                  setChangeView(null);
                }
                if (["HS_AC","HS_AF"].includes(hs.id)) {
                  setOverlay("library_popup_right_2");
                  setHideUI(true);
                  setActiveLibraryHotspot(hs.id);
                  setShowHotspots(false);
                  setStandardOverlay(null);
                  setChangeView(null);
                }
                if (hs.id === "HS_A") {
                  setOverlay("aioptions");
                  setHideUI(true);
                  setStandardOverlay(null);
                  setCurrentHS("HS_A");
                  setAtAltView(false);
                  setChangeView("AI_A");
                  // setShowHotspots(true);
                  // if (hiddenWpId === "D") {
                  //   setShowRedHotspots(true);
                  // }
                }
                if (hs.id === "HS_B") {
                  setOverlay("aioptions");
                  setHideUI(true);
                  setStandardOverlay(null);
                  setCurrentHS("HS_B");
                  setAtAltView(true);
                  setChangeView("AI_B");
                  setAiVideo(AI_VIDEOS["RHS_1"]);
                  setTimeout(() => {
                    setPendingRedSrc("https://spo-global.kpmg.com/sites/GO-OI-BUS-GTK-AI/SitePages/Global-AI-credentials.aspx");
                  }, 1500);
                  // setShowHotspots(true);
                }
                if (hs.id === "HS_C") {
                  setOverlay("rightpopup");
                }
                if (hs.id === "HS_D") {
                  setOverlay("esg"); //"cards"
                  setHideTopBar(true);
                  setStandardOverlay(null);
                  setCurrentHS("HS_D");
                }
                if(hs.id === "HS_F") {
                  goToHS_F();
                }
                if(hs.id === "HS_SZ1") {
                  setShowSZScreenText("screen");
                  goToHS_SZ1();
                  // setHideUI(true);
                  // setStandardOverlay(null);
                  // setSzVideoOverride("HS1");
                  // setTimeout(() => {
                  //   setShowSzMiniHotspots(true);
                  // }, 400);
                  // setChangeView("SZ");
                }
                if (hs.id === "HS_J") {
                  setStandardOverlay(null);
                  setVideoOverlay("video");
                  setHideUI(true);
                  setShowBlackImg(true);
                }
                if (hs.id === "HS_K") {
                  setStandardOverlay(null);
                  //setVideoBgColor("rgba(41, 103, 157, 0.67)");
                  // setShowVid2(true);
                  setShowMiniHotspots(true);
                }
                if (hs.id === "HS_L") {
                  setOverlay("esg");
                  setStandardOverlay(null);
                  //setVideoBgColor("rgba(58, 53, 150, 0.67)");
                }
                if (hs.id === "HS_M") {
                  //setOverlay("image_popup");
                  setStandardOverlay(null);
                  // setVideoBgColor("rgba(97, 62, 153, 0.67)");
                  setShowImg(true);
                  setShowMiniHotspots(true);
                }
                if (hs.id === "HS_N") {
                  setOverlay("roomslobby");
                  setStandardOverlay(null);
                }
                if (hs.id === "HS_O") {
                  setOverlay("breakoutgallery");
                  setStandardOverlay(null);
                }
                if (hs.id === "HS_P") {
                  setOverlay("esg");
                  setHideTopBar(true);
                  setStandardOverlay(null);
                  setCurrentHS("HS_P");
                }
                if (hs.id === "HS_Q") {
                  setOverlay("esg");
                  setHideTopBar(true);
                  setStandardOverlay(null);
                  setCurrentHS("HS_Q");
                }
              }}
            />
          ))}
        
        {showSzMiniHotspots && SZ_MINI_HOTSPOTS.map((mini) => (
          <BlueHotspot 
            key={mini.id}
            id={mini.id}
            position={mini.position}
            size={'1.2vw'}
            label={mini.id}
            zIndexRange={[999, 0]}
            isActive={activeSzMiniHotspot === mini.id}
            activeSzMiniHotspot={activeSzMiniHotspot}
            onClick={() => {
              setActiveSzMiniHotspot(mini.id);
              setOverlay(null);
            }}
            onOpenFrame={(id) => {
              setOpenSzFrameFor(id);
              setChangeView(null);
            }}
          />
        ))}

        {showConferenceHotspots && conferenceHotspots
        .filter((wp) => hiddenConferenceHotspot === "temp" 
          ? wp.id !== "temp1" && wp.id !== "temp2"
          : wp.id !== hiddenConferenceHotspot)
        .map((wp) => {
          const pos = CONFERENCE_HOTSPOT_POSITIONS[wp.id];
          if (!pos) return null;
          return (
            <Conference_Hotspots
              key={wp.id}
              id={wp.id}
              position={[pos.x, pos.y, pos.z]}
              size={'1.95vw'}
              onClick={() => {
                const spawn = CONFERENCE_SPAWN_OVERRIDES[wp.id] ?? {
                  x: wp.wx,
                  y: wp.wy,
                  z: wp.wz,
                };
                const aim = CONFERENCE_LOOK_AT_OVERRIDES[wp.id] ?? {
                  x: wp.wx,
                  y: wp.wy,
                  z: wp.wz,
                };
                expRef.current?.teleportTo({
                  x: spawn.x,
                  y: spawn.y,
                  z: spawn.z,
                  duration: GLIDE,
                  lookAt: aim,
                });
                setHiddenConferenceHotspot("temp");
                if (wp.id === "temp1") {
                  setShowMiniConferenceHotspots("temp1");
                  if (activeRoom) { setMinimizeBoxesTrigger((prev) => prev + 1); }
                }
                if (wp.id === "temp2") {
                  setShowMiniConferenceHotspots("temp2");
                  setTimeout(() => {
                    setSelectedLeftImage(SignatureExp);
                    setLeftOverlay("leftscreenpopup");
                    setLeftPopupSource("MINI_5");
                  }, 800);
                }
              }}
            />
          );
        })}

        {showMiniConferenceHotspots && MINI_CONFERENCE_HOTSPOTS
        .filter((mini) => {
          if (showMiniConferenceHotspots === "temp1") {
            return ["MINI_1", "MINI_2", "MINI_3", "MINI_4"].includes(mini.id);
          }
          if (showMiniConferenceHotspots === "temp1_popup") {
            return false;
          }
          // if (showMiniConferenceHotspots === "temp2") {
          //   return mini.id === "MINI_5";
          // }
          return false;
        })
        .map((mini) => (
          <BlueHotspot 
            key={mini.id}
            id={mini.id}
            position={mini.position}
            size={'1.2vw'}
            label={mini.id}
            zIndexRange={[8000, 0]}
            onClick={() => {
              console.log("Mini hotspot clicked: ", mini.id);
              if (mini.id === "MINI_1") {
                setSelectedLeftImage(DM);
                setLeftOverlay("leftscreenpopup");
                setLeftPopupSource("MINI_1");
                setShowMiniConferenceHotspots("temp1_popup");
              }
              if (mini.id === "MINI_2") {
                setSelectedLeftImage(AI);
                setLeftOverlay("leftscreenpopup");
                setLeftPopupSource("MINI_2");
                setShowMiniConferenceHotspots("temp1_popup");
              }
              if (mini.id === "MINI_3") {
                setSelectedLeftImage(OTS);
                setLeftOverlay("leftscreenpopup");
                setLeftPopupSource("MINI_3");
                setShowMiniConferenceHotspots("temp1_popup");
              }
              if (mini.id === "MINI_4") {
                setHiddenConferenceHotspot(null);
                setShowMiniConferenceHotspots(null);
                setLeftOverlay(null);
                const wp = markers.waypointsWorld.find((w) => w.id === "F");
                if (wp) {
                  const spawn = wp.spawnAt ?? {x: wp.wx, y: wp.wy, z: wp.wz};
                  const aim = wp.aimAt ?? wp.lookAt ?? null;
                  expRef.current?.teleportTo({
                    x: spawn.x,
                    y: spawn.y ?? 0,
                    z: spawn.z,
                    duration: GLIDE,
                    ...(aim ? { lookAt: aim } : {}),
                  });
                }
              }
            }}
          />
        ))}

          {showRedHotspots && RED_HOTSPOTS.map((rhs, index) => (
            <BlueHotspot
              key={rhs.id}
              id={rhs.id}
              position={rhs.position}
              label={rhs.label}
              zIndexRange={[999, 0]}
              opacity='0'
              color="rgba(68, 239, 233, 0)"  
              size="2.4vw"
              showLabelOnHover
              sequenceIndex={index}
              isSelected={selectedHotspotId === rhs.id}
              onClick={() => {
                setSelectedHotspotId(rhs.id);
                const iframeKeys = Object.keys(RED_IFRAME_SOURCES); // ["RHS_1","RHS_2","RHS_3","RHS_4"]
                const hasIdMapping = Boolean(RED_IFRAME_SOURCES[rhs.id]);
                const key = hasIdMapping
                  ? rhs.id
                  : iframeKeys[index] || iframeKeys[0];

                const src = RED_IFRAME_SOURCES[key];
                setPendingRedSrc(src);

                const vid = AI_VIDEOS[key];
                if (vid) {
                  setAiVideo(vid);
                }
              }}
            />
          ))}

      {hasEntered && !showLandingPopup && pendingRedSrc && (
        <BlackHotspot
          id="BLACK_RHS"
          position={[-15, -0.15, -2.75]}
          label=""
          onClick={() => {
            setActiveRedHotspot(pendingRedSrc);
            setOverlay(null);
            setIframeKey((k) => k + 1);
            setPendingRedSrc(null);
            setChangeView(null);
          }}
        />
      )}

        {showMiniHotspots && (
          <>
            <MiniHotspot
              id="mini_close"
              position={[-38, 5.3, 3.3]}
              type="close"
              onClick={() => {
                setShowMiniHotspots(false);
                setHiddenHotspotId(null); // bring back the blue hotspot
                setShowHotspots(true);
                // if (activeBlueHotspot === "HS_J") setShowVid1(false);
                // if (activeBlueHotspot === "HS_K") setShowVid2(false);
                if (activeBlueHotspot === "HS_M") setShowImg(false);
                setActiveBlueHotspot(null);
              }}
            />
            <MiniHotspot
              id="mini_fullscreen"
              position={[-38, 5.28, 3.8]}
              type="fullscreen"
              onClick={() => {
                if (activeBlueHotspot === "HS_M") {
                  setOverlay("dashboard");
                } else {
                  setOverlay("video_popup");
                }
              }}
            />
          </>
        )}
        {standardOverlay === "newstandardoverlay" && (
          <NewStandardOverlay 
            position={OVERLAY_POSITIONS[activeNav]}
            location={activeNav}
          />
        )}
        {overlay === "aioptions" && (
          <AiOptions
            position={AiOptions_Pos}
            openFAQ={handleOpenFAQ}
            expRef={expRef}
            atAltView={atAltView}
            setAtAltView={setAtAltView}
            onAIQuickLinksClick={() => {
              setShowRedHotspots(true);
              setHideUI(true);
              setAiVideo(AI_VIDEOS["RHS_1"]);
              setTimeout(() => {
                setPendingRedSrc("https://spo-global.kpmg.com/sites/GO-OI-BUS-GTK-AI/SitePages/Global-AI-credentials.aspx");
              }, 1500);
            }}
            onAiAssistantClick={() => {
              setShowRedHotspots(false);
              setPendingRedSrc(null);
              setActiveRedHotspot(null);
              setAiVideo(AI_VIDEOS["RHS_0"]);
              setSelectedHotspotId(RED_HOTSPOTS[0]?.id);
            }}
          />
        )}
      </Canvas>
      <FadeOverlay active = {isFading} />
      {shouldBlockPointer && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 800,
            background: "transparent",
            cursor: "default",
          }}
        />
      )}
      {(!assetsReady || !hasEntered) && (
        <LoadingScreen onEnter={() => setHasEntered(true)} onJoinAMeeting={handleJoinAMeeting}/>
      )}
      {hasEntered && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0, right: 0,
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1002,
        }}>
          <div style={{
            background: 'linear-gradient(to right, rgba(13,35,48,1), rgba(0,83,119,1))',
            color: 'white',
            padding: '0.7812vw 5.208vw 0.7812vw 1.5625vw',
            borderRadius: '0px 0px 100px 0px',
            //borderBottom: "4px solid transparent",
            //borderImage: "linear-gradient(to right, rgba(0,148,153,0), rgba(0,246,255,1), rgba(0,204,211,0)) 1",
          }}>
            <Typography variant="h6"
            sx={{
              fontWeight: 'bold', fontSize: '1.25vw',
            }}>
              KPMG Virtual Ignition Center
            </Typography>
          </div>
        </div>
      )}
      {hasEntered && !showLandingPopup &&(
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '3.5624vw',
            display: 'flex',
            alignItems: 'center',
            zIndex: 1001,
            backgroundColor: 'rgba(0,63,145,0.31)',
            paddingLeft: '25.5625vw',
            gap: '1.5625vw',
            color: 'white',
            transform: (headersHidden || hideUI || hideTopBar) ? 'translateY(-150%)' : 'translateY(0)', 
            transition: 'transform 0.5s ease',
          }}>
            <Typography variant="h6" sx={{
              fontSize: '1.0417vw', cursor: 'pointer',
              fontWeight: activeNav === "Entrance" ? 'bold' : 'thin',
              borderBottom: activeNav === "Entrance" ? "2px solid rgba(0, 247, 255, 1)" : "none",
              transition: "transform 0.2s ease",
            }}
            onClick={() => {
              setActiveNav("Entrance");
              setConferenceHotspots([]);
              setHiddenConferenceHotspot(null);
              setShowMiniConferenceHotspots(null);
              setShowLibraryDetails(false);
              setOverlay(null);
              setVideoOverlay(null);
              setLeftOverlay(null);
              setHiddenHotspotId(null);
              setHideUI(false);
              setPointerEnabled(true);
              setStandardOverlay(null);
              // expRef.current?.teleportTo({
              //   x: SPAWN_POS.x,
              //   y: SPAWN_POS.y,
              //   z: SPAWN_POS.z,
              //   duration: GLIDE,
              //   lookAt: SPAWN_LOOK_AT,
              // });
              goToLobby();
              setIwScreenActive(true);
              setShowIWMesh(true);
              setLeftScreenVisible(true);
              resetRedHotspots();
              setShowResume(false);
              setShowStepBack(null);
              setShowRealStepBack(null);
              setLibrarySection(null);
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.color = "rgba(0, 247, 255, 1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.color = "white";
            }}
            >
              Lobby
            </Typography>
            <Typography variant="h6" sx={{
              fontSize: '1.0417vw', cursor: 'pointer',
              fontWeight: activeNav === "Lobby" ? 'bold' : 'thin',
              borderBottom: activeNav === "Lobby" ? "2px solid rgba(0, 247, 255, 1)" : "none",
              transition: "transform 0.2s ease",
            }}
            onClick={() => {
              setActiveNav("Lobby");
              setConferenceHotspots([]);
              setHiddenConferenceHotspot(null);
              setShowMiniConferenceHotspots(null);
              setShowLibraryDetails(false);
              setOverlay(null);
              setVideoOverlay(null);
              setLeftOverlay(null);
              setHiddenHotspotId(null);
              setHideUI(false);
              const wp = markers.waypointsWorld.find((w) => w.id === "C");
              if (wp) {
                const spawn = wp.spawnAt ?? {x: wp.wx, y: wp.wy ?? 0, z: wp.wz};
                teleportTo(spawn, wp.aimAt, wp.id);
                setOpen(true);
                setStandardOverlay("infotopleft");
              }
              setIwScreenActive(true);
              setShowIWMesh(true);
              setLeftScreenVisible(true);
              setPointerEnabled(false);
              resetRedHotspots();
              setShowResume(false);
              setShowStepBack(null);
              setShowRealStepBack("C");
              setLibrarySection(null);
              //teleportTo(SPAWN_POS, SPAWN_LOOK_AT, null);
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.color = "rgba(0, 247, 255, 1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.color = "white";
            }}
            >
              Lounge
            </Typography>
            <Typography variant="h6" sx={{
              fontSize: '1.0417vw', cursor: 'pointer',
              fontWeight: activeNav === "Library" ? 'bold' : 'thin',
              borderBottom: activeNav === "Library" ? "2px solid rgba(0, 247, 255, 1)" : "none",
              transition: "transform 0.2s ease",
            }}
            onClick={() => {
              setActiveNav("Library");
              setConferenceHotspots([]);
              setHiddenConferenceHotspot(null);
              setShowMiniConferenceHotspots(null);
              setShowLibraryDetails(false);
              setOverlay(null);
              setLeftOverlay(null);
              setOpen(true);
              setStandardOverlay("infotopleft");
              setHiddenHotspotId(null);
              setHideUI(false);
              expRef.current?.teleportTo({
                x: PRE_G_SPAWN.x,
                y: PRE_G_SPAWN.y,
                z: PRE_G_SPAWN.z,
                duration: GLIDE,
                lookAt: PRE_G_LOOK_AT,
              });
              const wp = markers.waypointsWorld.find((w) => w.id === "G");
              if (wp) {
                setHiddenWpId(wp.id);
                setShowHotspots(true);
              }
              // const wp = markers.waypointsWorld.find((w) => w.id === "G");
              // if (wp) {
              //   const spawn = wp.spawnAt ?? {x: wp.wx, y: wp.wy ?? 0, z: wp.wz};
              //   teleportTo(spawn, wp.aimAt, wp.id);
              //   setStandardOverlay(null);
              // }
              setIwScreenActive(true);
              setShowIWMesh(true);
              setLeftScreenVisible(true);
              setPointerEnabled(false);
              resetRedHotspots();
              setShowResume(false);
              setShowStepBack(null);
              setShowRealStepBack("G");
              setLibrarySection(null);
              //teleportTo(SPAWN_POS, SPAWN_LOOK_AT, null);
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.color = "rgba(0, 247, 255, 1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.color = "white";
            }}
            >
              Library
            </Typography>
            <Typography variant="h6" sx={{
              fontSize: '1.0417vw', cursor: 'pointer',
              fontWeight: activeNav === "Impact_Wall" ? 'bold' : 'thin',
              borderBottom: activeNav === "Impact_Wall" ? "2px solid rgba(0, 247, 255, 1)" : "none",
              transition: "transform 0.2s ease",
            }}
            onClick={() => {
              setActiveNav("Impact_Wall");
              setConferenceHotspots([]);
              setHiddenConferenceHotspot(null);
              setShowMiniConferenceHotspots(null);
              setShowLibraryDetails(false);
              setOverlay(null);
              setVideoOverlay(null);
              setLeftOverlay(null);
              setHiddenHotspotId(null);
              setHideUI(false);
              const wp = markers.waypointsWorld.find((w) => w.id === "B");
              if (wp) {
                const spawn = wp.spawnAt ?? {x: wp.wx, y: wp.wy ?? 0, z: wp.wz};
                teleportTo(spawn, wp.aimAt, wp.id);
                setOpen(true);
                setStandardOverlay("infotopleft");
              }
              setIwScreenActive(false);
              setShowIWMesh(false);
              setLeftScreenVisible(true);
              setOverlay("iwcarousel");
              setPointerEnabled(false);
              resetRedHotspots();
              setShowResume(false);
              setShowStepBack(null);
              setShowRealStepBack("B");
              setLibrarySection(null);
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.color = "rgba(0, 247, 255, 1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.color = "white";
            }}
            >
              Impact Wall
            </Typography>
            <Typography variant="h6" sx={{
              fontSize: '1.0417vw', cursor: 'pointer',
              fontWeight: activeNav === "Engagement_Hub" ? 'bold' : 'thin',
              borderBottom: activeNav === "Engagement_Hub" ? "2px solid rgba(0, 247, 255, 1)" : "none",
              transition: "transform 0.2s ease",
            }}
            onClick={() => {
              setActiveNav("Engagement_Hub");
              setConferenceHotspots([]);
              setHiddenConferenceHotspot(null);
              setShowMiniConferenceHotspots(null);
              setShowLibraryDetails(false);
              setOverlay(null);
              setVideoOverlay(null);
              setLeftOverlay(null);
              setHiddenHotspotId(null);
              setHideUI(false);
              setPointerEnabled(false);
              expRef.current?.teleportTo({
                x: PRE_F_SPAWN.x,
                y: PRE_F_SPAWN.y,
                z: PRE_F_SPAWN.z,
                duration: GLIDE,
                lookAt: PRE_F_LOOK_AT,
              });
              const wp = markers.waypointsWorld.find((w) => w.id === "F");
              if (wp) {
                setHiddenWpId(wp.id);
                setShowHotspots(true);
                //setCameraFov(50); //change
                setOpen(true);
                setStandardOverlay("infotopleft");
                //setOverlay("roomslobby");
                setPointerEnabled(false);
              }
              setIwScreenActive(true);
              setShowIWMesh(true);
              setLeftScreenVisible(true);
              resetRedHotspots();
              setShowResume(false);
              setShowStepBack(null);
              setShowRealStepBack("F");
              setLibrarySection(null);
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.color = "rgba(0, 247, 255, 1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.color = "white";
            }}
            >
              Conference
            </Typography>
            <Typography variant="h6" sx={{
              fontSize: '1.0417vw', cursor: 'pointer',
              fontWeight: activeNav === "Solution_Experience" ? 'bold' : 'thin',
              borderBottom: activeNav === "Solution_Experience" ? "2px solid rgba(0, 247, 255, 1)" : "none",
              transition: "transform 0.2s ease",
            }}
            onClick={() => {
              setActiveNav("Solution_Experience");
              autoShowSZText(5000);
              setConferenceHotspots([]);
              setHiddenConferenceHotspot(null);
              setShowMiniConferenceHotspots(null);
              setShowLibraryDetails(false);
              setOverlay(null);
              setVideoOverlay(null);
              setLeftOverlay(null);
              setHiddenHotspotId(null);
              setHideUI(false);
              const wp = markers.waypointsWorld.find((w) => w.id === "A");
              if (wp) {
                const spawn = wp.spawnAt ?? {x: wp.wx, y: wp.wy ?? 0, z: wp.wz};
                teleportTo(spawn, wp.aimAt, wp.id);
                setOpen(true);
                setStandardOverlay("infotopleft");
              }
              setIwScreenActive(true);
              setShowIWMesh(true);
              setLeftScreenVisible(true);
              setPointerEnabled(false);
              resetRedHotspots();
              setShowResume(false);
              setShowStepBack(null);
              setShowRealStepBack("A");
              setLibrarySection(null);
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.color = "rgba(0, 247, 255, 1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.color = "white";
            }}
            >
              Solution Zone
            </Typography>
            <Typography variant="h6" sx={{
              fontSize: '1.0417vw', cursor: 'pointer',
              fontWeight: activeNav === "AI_In_Action" ? 'bold' : 'thin',
              borderBottom: activeNav === "AI_In_Action" ? "2px solid rgba(0, 247, 255, 1)" : "none",
              transition: "transform 0.2s ease",
            }}
            onClick={() => {
              setActiveNav("AI_In_Action");
              setConferenceHotspots([]);
              setHiddenConferenceHotspot(null);
              setShowMiniConferenceHotspots(null);
              setShowLibraryDetails(false);
              setOverlay(null);
              setVideoOverlay(null);
              setLeftOverlay(null);
              setHiddenHotspotId(null);
              setHideUI(false);
              const wp = markers.waypointsWorld.find((w) => w.id === "D");
              if (wp) {
                const spawn = wp.spawnAt ?? {x: wp.wx, y: wp.wy ?? 0, z: wp.wz};
                teleportTo(spawn, wp.aimAt, wp.id);
                setOpen(true);
                setStandardOverlay("infotopleft");
              }
              setIwScreenActive(true);
              setShowIWMesh(true);
              setLeftScreenVisible(true);
              setPointerEnabled(false);
              resetRedHotspots();
              setShowResume(false);
              setShowStepBack(null);
              setShowRealStepBack("D");
              setLibrarySection(null);
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.color = "rgba(0, 247, 255, 1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.color = "white";
            }}
            >
              AI Zone
            </Typography>
            <Typography variant="h6" sx={{
              fontSize: '1.0417vw', cursor: 'pointer',
              fontWeight: activeNav === "Breakout" ? 'bold' : 'thin',
              borderBottom: activeNav === "Breakout" ? "2px solid rgba(0, 247, 255, 1)" : "none",
              transition: "transform 0.2s ease",
            }}
            onClick={() => {
              setActiveNav("Breakout");
              setConferenceHotspots([]);
              setHiddenConferenceHotspot(null);
              setShowMiniConferenceHotspots(null);
              setShowLibraryDetails(false);
              setOverlay(null);
              setVideoOverlay(null);
              setLeftOverlay(null);
              setHiddenHotspotId(null);
              setHideUI(false); 
              const wp = markers.waypointsWorld.find((w) => w.id === "E");
              if (wp) {
                const spawn = wp.spawnAt ?? {x: wp.wx, y: wp.wy ?? 0, z: wp.wz};
                teleportTo(spawn, wp.aimAt, wp.id);
                setOpen(true);
                setStandardOverlay("infotopleft");
              }
              setIwScreenActive(true);
              setShowIWMesh(true);
              setLeftScreenVisible(true);
              setPointerEnabled(false);
              resetRedHotspots();
              setShowResume(false);
              setShowStepBack(null);
              setShowRealStepBack("E");
              setLibrarySection(null);
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.color = "rgba(0, 247, 255, 1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.color = "white";
            }}
            >
              Ignition Experience Zone
            </Typography>
          </div>
      )}
      {hasEntered && showLandingPopup && (
        <div
          style={{
            position: "fixed",
            top: "0rem",
            width: "100%",
            height: '100%',
            padding: "1.25vw",
            backgroundColor: 'rgba(0,0,0,0.43)',
            zIndex: 1000,
          }}
        >
          <LandingPage
          onClose={() => {
            setShowLandingPopup(false);
            setPointerEnabled(true);
          }}
        />
        </div>
      )}
      {hasEntered && !showLandingPopup && !activeRoom && ( //&& !hideUI
        <SettingsButton 
        mouseSensitivity={mouseSensitivity} 
        setMouseSensitivity={setMouseSensitivity} />
      )}
      {/* {hasEntered && !showLandingPopup && !activeRoom && ( //&& !hideUI
      <>
        <Button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => {
            if (activeRoom) {
              handleCameraFlip();
              return;
            }
            setShowSettings((s) => !s);
            setShowLiveFeed(prev => !prev);
          }}
          style={{
            position: "fixed",
            bottom: activeRoom ? "2.0833vw" : '0.8333vw',
            right: "0.8333vw",
            minWidth: 0,
            width: '2.6042vw',
            height: '2.6042vw',
            borderRadius: "50%",
            border: "1px solid #00F7FF",
            cursor: "pointer",
            zIndex: 3000,
            background: "rgba(1,0,37,0.5)",
          }}
          title={"Settings"}
        >
          <SettingsIcon style={{ color: 'white', fontSize: '1.5vw' }} />
        </Button>
        {hovered && (
          <Box
            sx={{
                position: "fixed",
                bottom: "4vw",
                right: "0vw",
                bgcolor: 'rgba(0,63,145,0.5)',
                border: '0.8px solid rgba(158,199,255,0.9)',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.35)',
                backdropFilter: 'blur(10px)',
                color: "white",
                padding: "0.5vw 1vw",
                borderRadius: "0.5vw",
                fontSize: "0.8333vw",
                zIndex: 3001,
            }}
          >
              Drag Control
          </Box>
        )}
      </>
      )}
      {hasEntered && !showLandingPopup && !activeRoom && ( //&& !hideUI
        <FullScreenButton />
      )} */}
      {hasEntered && !showLandingPopup && !activeRoom && showStepBack && ( //&& !hideUI
        <StepBackButton 
        onClose={() => {
          if (showStepBack === "A_B") {
            if (window.speechSynthesis.speaking) {
              window.speechSynthesis.cancel();
            }
            window.dispatchEvent(new Event("ic:aiStop"));
            setShowRedHotspots(false);
            setActiveRedHotspot(null);
            setPendingRedSrc(null);
            setOverlay(null);
            setFaqOverlay(null);
            setFaqMode(null);
            goToWaypointD();
            setHiddenHotspotId(null);
            setHideUI(false);
            setPointerEnabled(false);
            setAtAltView(false);
            setOpen(false);
            setStandardOverlay("infotopleft");
            setAiVideo(AI_VIDEOS["RHS_0"]);
            setShowRealStepBack("D");
          }
          if (showStepBack === "F") {
            if (closeSolutionPopup3) closeSolutionPopup3();
            setOpen(false);
            setStandardOverlay("infotopleft");
            setShowRealStepBack("A");
          }
          if (showStepBack === "SZ_1") {
            goToWaypointA();
            setHideUI(false);
            setPointerEnabled(false);
            setSzVideoOverride(null);
            setShowSzMiniHotspots(false);
            setActiveSzMiniHotspot(null);
            setOpen(false);
            setStandardOverlay("infotopleft");
            setShowRealStepBack("A");
          }
          if (showStepBack === "G") {
            expRef.current?.teleportTo({
              x: PRE_G_SPAWN.x,
              y: PRE_G_SPAWN.y,
              z: PRE_G_SPAWN.z,
              duration: GLIDE,
              lookAt: PRE_G_LOOK_AT,
            });
            setShowLibraryDetails(false);
            setLibrarySection(null);
            setShowRealStepBack("G");
          }
          setShowStepBack(null);
        }}
        />
      )}
      {hasEntered && !showLandingPopup && !activeRoom && showRealStepBack && (
        <StepBackButton2 
        onClick={() => {
          const step = STEP_BACK.find(
            p => p.id === showRealStepBack
          );
          if (!step) return;
          expRef.current?.teleportTo({
            x: step.x,
            y: step.y,
            z: step.z,
            duration: GLIDE,
            lookAt: step.lookAt,
          });
          setActiveNav("Entrance");
          setHiddenWpId(null);
          setOverlay(null);
          setStandardOverlay(null);
          setShowRealStepBack(null);
          setPointerEnabled(true);
        }}
        />
      )}
      {hasEntered && !showLandingPopup && !activeRoom && changeView && (
        <ChangeView 
        changeView={changeView}
        onExplore1={() => {
          if (changeView === "Lib2") {
            goToHS_G_START();
          }
          if (changeView === "F") {
            if (closeSolutionPopup3) closeSolutionPopup3();
            goToHS_SZ1();
            setShowSZScreenText("screen");
          }
        }}
        onExplore2={() => {
          if (changeView === "SZ") {
            setShowSzMiniHotspots(false);
            setActiveSzMiniHotspot(null);
            goToHS_F();
            setShowSZScreenText(null);
          }
          if (changeView === "Lib1") {
            goToHS_G_RIGHT();
          }
        }}
        onClose={() => {
          if (changeView === "SZ") {
            goToWaypointA();
            setHideUI(false);
            setPointerEnabled(false);
            setSzVideoOverride(null);
            setShowSzMiniHotspots(false);
            setActiveSzMiniHotspot(null);
            setOpen(false);
            setStandardOverlay("infotopleft");
            setShowRealStepBack("A");
            setShowSZScreenText(null);
          }
          if (changeView === "F") {
            goToWaypointA();
            setHideUI(false);
            setOpen(false);
            setPointerEnabled(false);
            if (closeSolutionPopup3) closeSolutionPopup3();
            setSzVideoOverride(null);
            setStandardOverlay("infotopleft");
            setShowRealStepBack("A");
          }
          if (changeView === "Lib1" || changeView === "Lib2") {
            expRef.current?.teleportTo({
              x: PRE_G_SPAWN.x,
              y: PRE_G_SPAWN.y,
              z: PRE_G_SPAWN.z,
              duration: GLIDE,
              lookAt: PRE_G_LOOK_AT,
            });
            setHideUI(false);
            setShowLibraryDetails(false);
            setLibrarySection(null);
            setShowRealStepBack("G");
          }
          setChangeView(null);
        }}/>
      )}
      {hasEntered && !showLandingPopup && !activeRoom && changeView && (
        <InnerStepBack 
        onClose={() => {
          if (changeView === "SZ") {
            goToWaypointA();
            setHideUI(false);
            setPointerEnabled(false);
            setSzVideoOverride(null);
            setShowSzMiniHotspots(false);
            setActiveSzMiniHotspot(null);
            setOpen(false);
            setStandardOverlay("infotopleft");
            setShowRealStepBack("A");
            setShowSZScreenText(null);
          }
          if (changeView === "F") {
            goToWaypointA();
            setHideUI(false);
            setOpen(false);
            setPointerEnabled(false);
            if (closeSolutionPopup3) closeSolutionPopup3();
            setSzVideoOverride(null);
            setStandardOverlay("infotopleft");
            setShowRealStepBack("A");
          }
          if (changeView === "Lib1" || changeView === "Lib2") {
            expRef.current?.teleportTo({
              x: PRE_G_SPAWN.x,
              y: PRE_G_SPAWN.y,
              z: PRE_G_SPAWN.z,
              duration: GLIDE,
              lookAt: PRE_G_LOOK_AT,
            });
            setHideUI(false);
            setShowLibraryDetails(false);
            setLibrarySection(null);
            setShowRealStepBack("G");
          }
          if (changeView === "AI_A" || changeView === "AI_B") {
            closeAIZone();
          }
          setChangeView(null);
        }}
        onNavigate={() => {
          if (changeView === "SZ") {
            goToWaypointA();
            setHideUI(false);
            setPointerEnabled(false);
            setSzVideoOverride(null);
            setShowSzMiniHotspots(false);
            setActiveSzMiniHotspot(null);
            setOpen(false);
            setStandardOverlay("infotopleft");
            setShowSZScreenText(null);
          }
          if (changeView === "F") {
            goToWaypointA();
            setHideUI(false);
            setOpen(false);
            setPointerEnabled(false);
            if (closeSolutionPopup3) closeSolutionPopup3();
            setSzVideoOverride(null);
            setStandardOverlay("infotopleft");
          }
          if (changeView === "Lib1" || changeView === "Lib2") {
            expRef.current?.teleportTo({
              x: PRE_G_SPAWN.x,
              y: PRE_G_SPAWN.y,
              z: PRE_G_SPAWN.z,
              duration: GLIDE,
              lookAt: PRE_G_LOOK_AT,
            });
            setHideUI(false);
            setShowLibraryDetails(false);
            setLibrarySection(null);
          }
          if(changeView === "AI_A" || changeView === "AI_B") {
            closeAIZone();
          }
          setChangeView(null);
          const step = INNER_STEP_BACK.find(
            p => p.id === activeNav
          );
          if (!step) return;
          expRef.current?.teleportTo({
            x: step.x,
            y: step.y,
            z: step.z,
            duration: GLIDE,
            lookAt: step.lookAt,
          });
          setActiveNav("Entrance");
          setHiddenWpId(null);
          setOverlay(null);
          setStandardOverlay(null);
          setShowRealStepBack(null);
          setPointerEnabled(true);
        }}/>
      )}

      {hasEntered && !showLandingPopup && !hideUI && !activeRoom && (
        <Button
          onClick={() => window.dispatchEvent(new Event("log-transform"))}
          style={{
            position: 'fixed',
            bottom: '4vw',
            right: '0.8333vw',
            minWidth: 0,
            width: '2.6042vw',
            height: '2.6042vw',
            borderRadius: "50%",
            border: "1px solid #00F7FF",
            zIndex: 1000
        }}>
            <SettingsIcon style={{color: 'black', fontSize: '1.5vw'}} />
        </Button>
      )}
      {hasEntered && !showLandingPopup && !hideUI && !isInMeetingLobby && pointerEnabled && activeNav === "Entrance" && (
        <FixedJoystick
          bgSrc={JoystickBG5}
          onChange={(vec) => setMoveInput(vec)}
          onEnd={() => setMoveInput({ x: 0, y: 0 })}
        />
      )}

      {hasEntered && !showLandingPopup && (activeRedHotspot || activeSZLink) && ( //Frame at AI Left Section
        <Frame
          key={iframeKey}
          minimizedWidth="90vw"
          maximizedWidth="90vw"
          minimizedHeight="83vh"
          maximizedHeight="83vh"
          src={activeRedHotspot || activeSZLink}
          top="50vh"
          left="50vw"
          showFullscreen={false}
          style={{ position: "fixed", transform: "translate(-50%, -50%)", zIndex: 3200 }}
          onStateChange={(state) => {
            if (state.isClosed) {
              setOverlay("aioptions");
              setChangeView("AI_B");
            }
          }}
        />
      )}
      {openSzFramefor && !showLandingPopup && ( //Frame at SZ Display
        <Frame 
          //key={activeSzMiniHotspot}
          key={openSzFramefor}
          src={SZ_MINI_CONFIG[activeSzMiniHotspot].src}
          minimizedWidth="90vw"
          maximizedWidth="90vw"
          minimizedHeight="83vh"
          maximizedHeight="83vh"
          style={{ position: "fixed", transform: "translate(-50%, -50%)", zIndex: 3200 }}
          top="50vh"
          left="50vw"
          showFullscreen={false}
          onStateChange={(state) => {
            if (state.isClosed) {
              // setActiveSzMiniHotspot(null);
              setOpenSzFrameFor(null);
              setChangeView("SZ");
            }
          }}
        />
      )}

      {hasEntered && !showLandingPopup && !hideUI && showSettings && (
        <Box
          sx={{
            position: "fixed",
            right: "0.8333vw",
            bottom: activeRoom ? "5.5vw" : "3.5vw",
            width: "16.5vw",
            p: "1vw",
            borderRadius: "0.8vw",
            bgcolor: "rgba(1,0,37,0.85)",
            color: "white",
            border: "1px solid rgba(0,247,255,0.6)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
            zIndex: 1100,
            backdropFilter: "blur(6px)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: "0.5vw" }}>
            <Typography sx={{ fontSize: "1.0417vw", fontWeight: "bold" }}>
              Settings
            </Typography>
            <IconButton
              size="small"
              onClick={() => setShowSettings(false)}
              sx={{ color: "white" }}
            >
              ✕
            </IconButton>
          </Box>
          <Box sx={{ mt: "0.5vw" }}>
            <Typography sx={{ fontSize: "0.9375vw", mb: "0.4vw" }}>
              Mouse drag sensitivity: <b>{mouseSensitivity.toFixed(2)}</b>
            </Typography>
            <Slider
              min={0.2}
              max={0.9}
              step={0.05}
              value={mouseSensitivity}
              onChange={(_, v) => {
                if (Array.isArray(v)) return;
                setMouseSensitivity(v);
              }}
              sx={{
                width: "16vw",
                mx: "auto",
                color: "#00F7FF",
                '& .MuiSlider-thumb': { boxShadow: "0 0 0 6px rgba(0,247,255,0.2)" },
              }}
            />
          </Box>
        </Box>
      )}
      {/* {hasEntered && !showLandingPopup && !showMiniMap && !hideUI && (
        <Button
          style={{
            position: "fixed",
            bottom: activeRoom ? "2.0833vw" : '0.8333vw',
            left: "0.8333vw",
            minWidth: 0,
            width: '2.6042vw',
            height: '2.6042vw',
            borderRadius: "50%",
            border: "1px solid #00F7FF",
            background: "rgba(1,0,37,0.5)",
            cursor: "pointer",
            zIndex: 1000,
          }}
          title="Open Map"
        >
          <MapIcon style={{color: 'white', fontSize: '1.5625vw' }} />
        </Button>
      )}
      {hasEntered && showMiniMap && (
        <MiniMap
          src="/assets/map_wireframe.png"
          markers={[]} // no multiplayer markers
          waypoints={markers.waypointsForMini}
          onWaypointClick={(wp) => {
            const spawn = wp.spawnAt ?? { x: wp.wx, z: wp.wz };
            setNavTarget({ x: spawn.x, z: spawn.z }); // autopilot
          }}
          title="Insight Center Map"
          miniScale={0.2}
          onCloseAll={() => setShowMiniMap(false)}
        />
      )} */}
      {activeNav === "Engagement_Hub" && showResume && hasEntered && !showLandingPopup && !activeRoom &&(
        <Button 
        onClick={() => {
          setOverlay("roomslobby");
          setConferenceHotspots([]);
          setHiddenConferenceHotspot(null);
          setShowMiniConferenceHotspots(null);
          setShowResume(false);
        }}
        sx={{
          position: 'fixed',
          top: '0.5208vw',
          right: '0.4167vw',
          // height: '3.5624vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textTransform: 'none',
          color: 'white',
          fontSize: '0.9375vw',
          backgroundColor: "rgba(0, 63, 145, 0.75)",
          borderRadius: '8px',
          padding: '0.4167vw 0.8333vw',
          boxSizing: 'border-box',
          zIndex: 3001,
          transition: 'all 0.2s ease',
          '&: hover': {
              transform: 'scale(1.04)',
          }
        }}>
          Meeting Scheduler
        </Button>
      )}
      {/* Rooms Lobby overlay */}
      {overlay === "roomslobby" && !activeRoom && (
          <RoomsLobby
            onLeaveSession={() => {
              backToWaypointF();
              setHideUI(false);
              setShowRealStepBack("F");
              sessionStorage.removeItem("ic_session_data");
              setUserSession(null);
            }}
            onClose={() => {
              //goToLobby();
              backToWaypointF();
              setHideUI(false);
              setShowRealStepBack("F");
            }}
            onExplore={() => {
              setOverlay(null);
              const newHotspots = [
                { id: "temp1" },
                { id: "temp2" },
                // { id: "temp3" },
              ];
              setConferenceHotspots(newHotspots);
              setHiddenConferenceHotspot(null);
              setShowResume(true);
            }}
            onContinue={() => {
              setOverlay(null);
              const newHotspots = [
                { id: "temp1" },
                { id: "temp2" },
                // { id: "temp3" },
              ];
              setConferenceHotspots(newHotspots);
              setHiddenConferenceHotspot(null);
            }}
            goToF={() => {goToF();}}
            goIn={() => {
              const wp = markers.waypointsWorld.find(w => w.id === "F");
              if (wp) {
                const spawn = wp.spawnAt ?? { x: wp.wx, y: wp.wy ?? 0, z: wp.wz };
                const aim = wp.aimAt ?? wp.lookAt ?? null;
                expRef.current?.teleportTo({
                  x: spawn.x,
                  y: spawn.y ?? 0,
                  z: spawn.z,
                  duration: GLIDE,
                  ...(aim ? { lookAt: aim } : {}),
                });
              }
            }}
            onJoinRoom={(roomName) => {
              navigate(`/${roomName}`)
              setHideTopBar(true);
              setCountdown(null);
              setShowJoin(false);
              const newHotspots = [
                { id: "temp1" },
                //{ id: "temp2" },
                // { id: "temp3" },
              ];
              setConferenceHotspots(newHotspots);
              setHiddenConferenceHotspot(null);
            }}
            onAdminEnter={() => {
              setActiveNav("Engagement_Hub");
              setStandardOverlay(null);
              setOverlay("roomslobby");
              setHideUI(false);
              setPointerEnabled(false);
              const wp = markers.waypointsWorld.find((w) => w.id === "F");
              expRef.current?.teleportTo({
                x: SPAWN_OVERRIDES.F.x,
                y: SPAWN_OVERRIDES.F.y ?? 0,
                z: SPAWN_OVERRIDES.F.z,
                duration: GLIDE,
                lookAt: LOOK_AT_OVERRIDES.F,
              });
              if (wp) {
                setHiddenWpId(wp.id);
                setShowHotspots(true);
                //setCameraFov(50);
              }
            }}
            onSessionData={(data) => {
              if (data?.declined) {
                sessionStorage.removeItem("ic_session_data");
                setUserSession(null);
                setCountdown(null);
                setNotification(true);
                return;
              }
              console.log("Received session data in App.jsx:", data);
              setUserSession(data);
            }}
          />
      )}
      {/* Rooms Lobby overlay in Emp Mode (On clicking Meeting Scheduler) */}
      {overlay === "emproomslobby" && !activeRoom && (
          <RoomsLobby
            onLeaveSession={() => {
                backToWaypointF();
                setHideUI(false);
                setShowRealStepBack("F");
                sessionStorage.removeItem("ic_session_data");
                setUserSession(null);
              }}
            onClose={() => {
              //goToLobby();
              backToWaypointF();
              setHideUI(false);
              setShowRealStepBack("F");
            }}
            onExplore={() => {
              setOverlay(null);
              const newHotspots = [
                { id: "temp1" },
                { id: "temp2" },
                // { id: "temp3" },
              ];
              setConferenceHotspots(newHotspots);
              setHiddenConferenceHotspot(null);
              setShowResume(true);
            }}
            onContinue={() => {
              setOverlay(null);
              const newHotspots = [
                { id: "temp1" },
                { id: "temp2" },
                // { id: "temp3" },
              ];
              setConferenceHotspots(newHotspots);
              setHiddenConferenceHotspot(null);
            }}
            goToF={() => {goToF();}}
            goIn={() => {
              const wp = markers.waypointsWorld.find(w => w.id === "F");
              if (wp) {
                const spawn = wp.spawnAt ?? { x: wp.wx, y: wp.wy ?? 0, z: wp.wz };
                const aim = wp.aimAt ?? wp.lookAt ?? null;
                expRef.current?.teleportTo({
                  x: spawn.x,
                  y: spawn.y ?? 0,
                  z: spawn.z,
                  duration: GLIDE,
                  ...(aim ? { lookAt: aim } : {}),
                });
              }
            }}
            skipPersona="employee"
            onJoinRoom={(roomName) => {
              const wp = markers.waypointsWorld.find(w => w.id === "F");
              if (wp) {
                const spawn = wp.spawnAt ?? { x: wp.wx, y: wp.wy ?? 0, z: wp.wz };
                const aim = wp.aimAt ?? wp.lookAt ?? null;
                expRef.current?.teleportTo({
                  x: spawn.x,
                  y: spawn.y ?? 0,
                  z: spawn.z,
                  duration: GLIDE,
                  ...(aim ? { lookAt: aim } : {}),
                });
              }
              navigate(`/${roomName}`)
              setHideTopBar(true);
              setCountdown(null);
              setShowJoin(false);
              const newHotspots = [
                { id: "temp1" },
                //{ id: "temp2" },
                // { id: "temp3" },
              ];
              setConferenceHotspots(newHotspots);
              setHiddenConferenceHotspot(null);
            }}
            onAdminEnter={() => {
              setActiveNav("Engagement_Hub");
              setStandardOverlay(null);
              setOverlay("roomslobby");
              setHideUI(false);
              setPointerEnabled(false);
              const wp = markers.waypointsWorld.find((w) => w.id === "F");
              expRef.current?.teleportTo({
                x: SPAWN_OVERRIDES.F.x,
                y: SPAWN_OVERRIDES.F.y ?? 0,
                z: SPAWN_OVERRIDES.F.z,
                duration: GLIDE,
                lookAt: LOOK_AT_OVERRIDES.F,
              });
              if (wp) {
                setHiddenWpId(wp.id);
                setShowHotspots(true);
                //setCameraFov(50);
              }
            }}
            onSessionData={(data) => {
              console.log("Received session data in App.jsx:", data);
              setUserSession(data);
            }}
          />
      )}
      {/* Rooms Lobby overlay in Client Mode */}
      {overlay === "clientroomslobby" && !activeRoom && (
          <RoomsLobby
            onLeaveSession={() => {
              backToWaypointF();
              setHideUI(false);
              setShowRealStepBack("F");
              sessionStorage.removeItem("ic_session_data");
              setUserSession(null);
            }}
            onClose={() => {
              //goToLobby();
              backToWaypointF();
              setHideUI(false);
              setShowRealStepBack("F");
            }}
            onContinue={() => {
              setOverlay(null);
              const newHotspots = [
                { id: "temp1" },
                { id: "temp2" },
                // { id: "temp3" },
              ];
              setConferenceHotspots(newHotspots);
              setHiddenConferenceHotspot(null);
            }}
            goToF={() => {goToF();}}
            goIn={() => {
              const wp = markers.waypointsWorld.find(w => w.id === "F");
              if (wp) {
                const spawn = wp.spawnAt ?? { x: wp.wx, y: wp.wy ?? 0, z: wp.wz };
                const aim = wp.aimAt ?? wp.lookAt ?? null;
                expRef.current?.teleportTo({
                  x: spawn.x,
                  y: spawn.y ?? 0,
                  z: spawn.z,
                  duration: GLIDE,
                  ...(aim ? { lookAt: aim } : {}),
                });
              }
            }}
            skipPersona="client"
            onJoinRoom={(roomName) => {
              const wp = markers.waypointsWorld.find(w => w.id === "F");
              if (wp) {
                const spawn = wp.spawnAt ?? { x: wp.wx, y: wp.wy ?? 0, z: wp.wz };
                const aim = wp.aimAt ?? wp.lookAt ?? null;
                expRef.current?.teleportTo({
                  x: spawn.x,
                  y: spawn.y ?? 0,
                  z: spawn.z,
                  duration: GLIDE,
                  ...(aim ? { lookAt: aim } : {}),
                });
              }
              navigate(`/${roomName}`)
              setHideTopBar(true);
              setCountdown(null);
              setShowJoin(false);
              const newHotspots = [
                { id: "temp1" },
                //{ id: "temp2" },
                // { id: "temp3" },
              ];
              setConferenceHotspots(newHotspots);
              setHiddenConferenceHotspot(null);
            }}
            onSessionData={(data) => {
              if (data?.declined) {
                sessionStorage.removeItem("ic_session_data");
                setUserSession(null);
                setCountdown(null);
                setNotification(true);
                return;
              }
              console.log("Received session data in App.jsx:", data);
              setUserSession(data);
            }}
          />
        // </div>
      )}
      {overlay === "roomslobby" && activeRoom && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(10,10,10,0.1)",
            zIndex: (isLeavePopupActive || isBlockMiniHotspots) ? 9999 : 999,
          }}
        >
          <VideoRoom
            roomName={activeRoom}
            cameraFlipState={cameraFlipState}
            onCameraSwitch={() => {handleCameraFlip();}}
            onLeavePopupStateChange={(isActive) => setIsLeavePopupActive(isActive)}
            onBlockMiniHotspots={(isActive) => setIsBlockMiniHotspots(isActive)}
            onLeaveAll={(name, role, wasKicked) => {
              const wp = markers.waypointsWorld.find(w => w.id === "F");
              if (wp) {
                const spawn = wp.spawnAt ?? { x: wp.wx, y: wp.wy ?? 0, z: wp.wz };
                const aim = wp.aimAt ?? wp.lookAt ?? null;
                expRef.current?.teleportTo({
                  x: spawn.x,
                  y: spawn.y ?? 0,
                  z: spawn.z,
                  duration: GLIDE,
                  ...(aim ? { lookAt: aim } : {}),
                });
              }
              if (wasKicked) {
                setKicked(true);
                console.log(`User ${name}, role ${role} was removed by a moderator.`);
              } else {
                setKicked(false);
                console.log(`User ${name}, (${role}) has left the meeting.`);
              }
              setLeftUserName(name);
              if (role === "employee") {
                setShowEmpLeavePopup(true);
              } else if (role === "client") {
                setShowClientLeavePopup(true);
              }
              setOverlay(null);
              setActiveRoom(null);        
              //setPointerEnabled(true); 
              setConferenceHotspots([]);
              setHiddenConferenceHotspot(null);
              setShowMiniConferenceHotspots(null);
              setLeftOverlay(null);
              setCameraFlipIdx(0);
              setCameraFlipState(0);
            }}
            onParticipantCountChange={setParticipantCount}
            onParticipantsChange={setParticipantNames}
            onParticipantsGenderChange={setParticipantGenders}  
            onViewFlagChange={(v) => setViewFlag(v)}
            onScreenShareChange={setIsScreenShared}
            onHideHotspots={() => setShowConferenceHotspots(false)}
            onShowHotspots={() => setShowConferenceHotspots(true)}
            minimizeBoxesTrigger={minimizeBoxesTrigger}
          />
        </div>
      )}
      {overlay === "emproomslobby" && activeRoom && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(10,10,10,0.1)",
            zIndex: isLeavePopupActive ? 9999 : 999,
          }}
        >
          <VideoRoom
            roomName={activeRoom}
            cameraFlipState={cameraFlipState}
            onCameraSwitch={() => {handleCameraFlip();}}
            onLeavePopupStateChange={(isActive) => setIsLeavePopupActive(isActive)}
            onBlockMiniHotspots={(isActive) => setIsBlockMiniHotspots(isActive)}
            onLeaveAll={(name, role, wasKicked) => { 
              const wp = markers.waypointsWorld.find(w => w.id === "F");
              if (wp) {
                const spawn = wp.spawnAt ?? { x: wp.wx, y: wp.wy ?? 0, z: wp.wz };
                const aim = wp.aimAt ?? wp.lookAt ?? null;
                expRef.current?.teleportTo({
                  x: spawn.x,
                  y: spawn.y ?? 0,
                  z: spawn.z,
                  duration: GLIDE,
                  ...(aim ? { lookAt: aim } : {}),
                });
              }
              if (wasKicked) {
                setKicked(true);
                console.log(`User ${name}, role ${role} was removed by a moderator.`);
              } else {
                setKicked(false);
                console.log(`User ${name}, (${role}) has left the meeting.`);
              }
              setLeftUserName(name);
              if (role === "employee") {
                setShowEmpLeavePopup(true);
              } else if (role === "client") {
                setShowClientLeavePopup(true);
              }
              setOverlay(null);
              setActiveRoom(null);        
              //setPointerEnabled(true);
              setConferenceHotspots([]);
              setHiddenConferenceHotspot(null);
              setShowMiniConferenceHotspots(null);
              setLeftOverlay(null);
              setCameraFlipIdx(0);
              setCameraFlipState(0);
            }}
            onParticipantCountChange={setParticipantCount}
            onParticipantsChange={setParticipantNames}
            onParticipantsGenderChange={setParticipantGenders}  
            onViewFlagChange={(v) => setViewFlag(v)}
            onScreenShareChange={setIsScreenShared}
            onHideHotspots={() => setShowConferenceHotspots(false)}
            onShowHotspots={() => setShowConferenceHotspots(true)}
            minimizeBoxesTrigger={minimizeBoxesTrigger}
          />
        </div>
      )}
      {overlay === "clientroomslobby" && activeRoom && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(10,10,10,0.1)",
            zIndex: isLeavePopupActive ? 9999 : 999,
          }}
        >
          <VideoRoom
            roomName={activeRoom}
            cameraFlipState={cameraFlipState}
            onCameraSwitch={() => {handleCameraFlip();}}
            onLeavePopupStateChange={(isActive) => setIsLeavePopupActive(isActive)}
            onBlockMiniHotspots={(isActive) => setIsBlockMiniHotspots(isActive)}
            onLeaveAll={(name, role, wasKicked) => { 
              const wp = markers.waypointsWorld.find(w => w.id === "F");
              if (wp) {
                const spawn = wp.spawnAt ?? { x: wp.wx, y: wp.wy ?? 0, z: wp.wz };
                const aim = wp.aimAt ?? wp.lookAt ?? null;
                expRef.current?.teleportTo({
                  x: spawn.x,
                  y: spawn.y ?? 0,
                  z: spawn.z,
                  duration: GLIDE,
                  ...(aim ? { lookAt: aim } : {}),
                });
              }
              if (wasKicked) {
                setKicked(true);
                console.log(`User ${name}, role ${role} was removed by a moderator.`);
              } else {
                setKicked(false);
                console.log(`User ${name}, (${role}) has left the meeting.`);
              }
              setLeftUserName(name);
              setShowClientLeavePopup(true);
              setOverlay(null);
              setActiveRoom(null);        
              //setPointerEnabled(true);
              setConferenceHotspots([]);
              setHiddenConferenceHotspot(null);
              setShowMiniConferenceHotspots(null);
              setLeftOverlay(null);
              setCameraFlipIdx(0);
              setCameraFlipState(0);
            }}
            onParticipantCountChange={setParticipantCount}
            onParticipantsChange={setParticipantNames}
            onParticipantsGenderChange={setParticipantGenders}  
            onViewFlagChange={(flag) => setViewFlag(flag)}
            onScreenShareChange={setIsScreenShared}
            onHideHotspots={() => setShowConferenceHotspots(false)}
            onShowHotspots={() => setShowConferenceHotspots(true)}
            minimizeBoxesTrigger={minimizeBoxesTrigger}
          />
        </div>
      )}
      {showEmpLeavePopup && (
        <Box sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'rgba(0,63,145,0.31)',
            border: '1px solid rgba(158,199,255,0.6)' ,
            borderRadius: '12px',
            backdropFilter: 'blur(46.09px)',
            boxShadow: `0 3.69px 3.69px rgba(0,0,0,0.25),
              inset 0 3.69px 3.69px rgba(74,74,74,0.25)`,
            width: '46vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2.0833vw',
            boxSizing: 'border-box',
            gap: '0.8333vw',
        }}>
            {/* Header */}
            {!kicked ? (
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw'}}>
                <img src={headerline} style={{transform: 'scaleX(-1)', width: '8.5vw'}}/>
                <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
                  Thank You
                </Typography>
                <img src={headerline} style={{ width: '8.5vw'}}/>
              </Box>
            ) : (
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
                  You've been removed from this meeting
                </Typography>
              </Box>
            )}
            {!kicked ? (
              <Typography sx={{marginX: '4vw', color: 'white', fontSize: '0.9375vw', fontWeight: 'lighter', textAlign: 'center'}}>
                Thank you for hosting the meeting. You may join or schedule another meeting, or continue exploring other zones in the Ignition Center.
              </Typography>
            ) : (<></>)}
            <Box sx={{
              display: 'flex',
              gap: '0.8333vw'
            }}>
              <Button 
              variant="contained"
              onClick={() => {
                  setShowEmpLeavePopup(false);
                  navigate("/");
                  setHideTopBar(false);
                  const newHotspots = [
                    { id: "temp1" },
                    { id: "temp2" },
                    // { id: "temp3" },
                  ];
                  setConferenceHotspots(newHotspots);
                  setHiddenConferenceHotspot(null);
                  setShowConferenceHotspots(true);
                  setShowResume(true);
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
              }}>
                Explore Conference Room
              </Button>
              <Button 
              variant="contained"
              onClick={() => {
                  setShowEmpLeavePopup(false);
                  navigate("/");
                  setHideTopBar(false);
                  setOverlay("emproomslobby");
                  window.localStorage.setItem("loggedInUser", JSON.stringify({ username: leftUserName }));
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
              }}>
                Join Another Session
              </Button>
              <Button
              variant="outlined"
              onClick={() => {
                  setShowEmpLeavePopup(false);
                  navigate("/");
                  backToWaypointF(); 
                  setHideTopBar(false);
              }}
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
              }}>
                Leave Conference Room
              </Button>
            </Box>
        </Box>
      )}
      {showClientLeavePopup && (
        <Box sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'rgba(0,63,145,0.31)',
            border: '1px solid rgba(158,199,255,0.6)' ,
            borderRadius: '12px',
            backdropFilter: 'blur(46.09px)',
            boxShadow: `
            0 3.69px 3.69px rgba(0,0,0,0.25),
            inset 0 3.69px 3.69px rgba(74,74,74,0.25)
            `,
            width: '46vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2.0833vw',
            boxSizing: 'border-box',
            gap: '0.8333vw'
        }}>
            {/* Header */}
            {!kicked ? (
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw'}}>
                <img src={headerline} style={{transform: 'scaleX(-1)', width: '8.5vw'}}/>
                <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
                  Thank You
                </Typography>
                <img src={headerline} style={{ width: '8.5vw'}}/>
              </Box>
            ) : (
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
                  You've been removed from this meeting
                </Typography>
              </Box>
            )}
            {!kicked ? (
              <Typography sx={{marginX: '4vw', color: 'white', fontSize: '0.9375vw', fontWeight: 'lighter', textAlign: 'center'}}>
                Thank you for attending the meeting. You may review the meeting summary, explore the Conference Hub, or join another session in the Ignition Center.
              </Typography>
            ) : (<></>)}
            <Box sx={{
              display: 'flex',
              gap: '0.8333vw'
            }}>
              <Button 
              variant="contained"
              onClick={() => {
                    setShowClientLeavePopup(false);
                    navigate("/");
                    setHideTopBar(false);
                    const newHotspots = [
                      { id: "temp1" },
                      { id: "temp2" },
                      // { id: "temp3" },
                    ];
                    setConferenceHotspots(newHotspots);
                    setHiddenConferenceHotspot(null);
                    setShowConferenceHotspots(true);
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
              }}>
                Explore Conference Room
              </Button>
              <Button 
              onClick={() => {
                setShowClientLeavePopup(false);
                navigate("/");
                setHideTopBar(false);
                setOverlay("clientroomslobby");
                window.localStorage.setItem("loggedInUser", JSON.stringify({ username: leftUserName }));
              }}
              variant="contained"
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
              }}>
                Join Another Session
              </Button>
              <Button
              variant="outlined"
              onClick={() => {
                  setShowClientLeavePopup(false);
                  navigate("/");
                  backToWaypointF(); 
                  setHideTopBar(false);
              }}
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
              }}>
                Leave Conference Room
              </Button>
            </Box>
        </Box>
      )}
      {overlay === "cards" && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(10,10,10,0.4)",
            zIndex: 999,
          }}
        >
          <Cards
          backgroundColor={cardsBgColor}
          onClose={() => {
            setOverlay(null);
            setShowHotspots(true);
            setHiddenHotspotId(null);
            setPointerEnabled(false);
          }}/>
        </div>
      )}
      {overlay === "esg" && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 3000,
          }}
        >
        <ESG
          hotspotId={currentHS}
          onClose={() => {
            setOverlay(null);
            setShowHotspots(true);
            setHiddenHotspotId(null);
            setPointerEnabled(false);
            setHideTopBar(false);
            setOpen(false);
            setStandardOverlay("infotopleft");
            setShowRealStepBack("C");
          }}/>
          </div>
      )}
      {overlay === "dashboard" && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <Dashboard onClose={() => {
            setOverlay(null);
            setShowHotspots(true);
            setHiddenHotspotId(null);
            setPointerEnabled(false);
          }}/>
        </div>
      )}
      {overlay === "breakoutgallery" && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <BreakoutGallery onClose={() => {
            setOverlay(null);
            setShowHotspots(true);
            setHiddenHotspotId(null);
            setPointerEnabled(false);
            setOpen(false);
            setStandardOverlay("infotopleft");
            setShowRealStepBack("E");
          }}/>
        </div>
      )}
      {overlay === "rightpopup" && (
        <RightPopup onClose={() => {
          setOverlay(null);
          setPointerEnabled(false);
        }}
        onGoToG={goToWaypointA}
        />
      )}
      {overlay === "solution_popup1" && (
        <Solution_Popup1 onClose={() => {
          // setOverlay(null);
          // setHiddenHotspotId(null);
          goToWaypointA();
          setHideUI(false);
          setPointerEnabled(false);
        }}/>
      )}
      {overlay === "solution_popup2" && (
        <Solution_Popup2 onClose={() => {
          goToWaypointA();
          setHideUI(false);
          setPointerEnabled(false);
        }}/>
      )}
      {overlay === "solution_popup3" && (
        <Solution_Popup3_1 onClose={() => {
          goToWaypointA();
          setHideUI(false);
          setPointerEnabled(false);
          setSzVideoOverride(null);
          setOpen(false);
          setStandardOverlay("infotopleft");
          setShowRealStepBack("A");
          setChangeView(null);
        }}
        setChangeView={setChangeView}
        onRequestClose={fn => setCloseSolutionPopup3(() => fn)} 
        />
      )}
      {overlay === "solution_popup4" && (
        <Solution_Popup4 onClose={() => {
          goToWaypointA();
          setHideUI(false);
          setPointerEnabled(false);
          setSzVideoOverride(null);
          setShowSzMiniHotspots(false);
        }} />
      )}
      {overlay === "video_popup" && (
        <VideoPopup
        backgroundColor={videoBgColor}
        activeHotspot={activeBlueHotspot}
        onClose={() => {
          setOverlay(null);
          //setShowHotspots(true);
          setHiddenHotspotId(null);
          setPointerEnabled(false);
        }} />
      )}
      {overlay === "image_popup" && (
        <ImagePopup onClose={() => {
          setOverlay(null);
          setShowHotspots(true);
          setHiddenHotspotId(null);
          setPointerEnabled(false);
        }} />
      )}
      {overlay === "standard_overlay" && (
        <Standard_Overlay
          onClose={() => {
            setOverlay(null);
            setHideUI(false);
            setPointerEnabled(false);
          }}
          onSelectOverlay={(overlayName) => setOverlay(overlayName)}
          content={overlayMap[activeNav]}
        />
      )}
      {overlay === "iwcarousel" && (
        <IWCarousel 
        iwVideoIndex={iwVideoIndex}
        setIwVideoIndex={setIwVideoIndex}
        />
      )}
      {videoOverlay === "video" && (
        <IWVideoPopup 
        iwVideoIndex={iwVideoIndex}
        onClose={() => {
          setVideoOverlay(null);
          setShowHotspots(true);
          setHiddenHotspotId(null);
          setShowBlackImg(false);
          setHideUI(false);
          setOpen(false);
          setStandardOverlay("infotopleft");
          setShowRealStepBack("B");
        }}/>
      )}
      {leftOverlay === "leftscreenpopup" && (
        <LeftScreenPopup 
          selectedImage={selectedLeftImage}
          onClose={() => {
            setHiddenConferenceHotspot(null);
            setLeftOverlay(null);
            if (leftPopupSource === "MINI_1" || leftPopupSource === "MINI_2" || leftPopupSource === "MINI_3") {
              setShowMiniConferenceHotspots("temp1");
            }
            if (leftPopupSource === "MINI_5") {
              const wp = markers.waypointsWorld.find((w) => w.id === "F");
              if (wp) {
                const spawn = wp.spawnAt ?? {x: wp.wx, y: wp.wy, z: wp.wz};
                const aim = wp.aimAt ?? wp.lookAt ?? null;
                expRef.current?.teleportTo({
                  x: spawn.x,
                  y: spawn.y ?? 0,
                  z: spawn.z,
                  duration: GLIDE,
                  ...(aim ? { lookAt: aim } : {}),
                });
              }
            }
            setLeftPopupSource(null);
          }}
        />
      )}
      {overlay === "library_popup" && (
        <LibraryPopup 
          activeHotspot={activeLibraryHotspot}
          setActiveHotspot={setActiveLibraryHotspot}
          impactStories={true}
          onClose={() => {
            setOverlay(null);
            setActiveLibraryHotspot(null);
            setHiddenHotspotId(null);
            setShowHotspots(true);
            //setHideUI(false);
            setOpen(false);
            setStandardOverlay("infotopleft");
            setChangeView("Lib1");
          }}
        />
      )}
      {/* Lib_Right_Rack middle hotspots earlier like Lib_Left_Rack
      {overlay === "library_popup_right_1" && (
        <LibraryPopup
          activeHotspot={activeLibraryHotspot}
          setActiveHotspot={setActiveLibraryHotspot}
          impactStories={false}
          onClose={() => {
            setOverlay(null);
            setActiveLibraryHotspot(null);
            setHiddenHotspotId(null);
            setShowHotspots(true);
            //setHideUI(false);
            setOpen(false);
            setStandardOverlay("infotopleft");
            setChangeView("Lib2");
          }}
        />
      )} */}
      {overlay === "library_popup_right_2" && (
        <LibraryPopup2
          activeHotspot={activeLibraryHotspot}
          onClose={() => {
            setOverlay(null);
            setActiveLibraryHotspot(null);
            setHiddenHotspotId(null);
            setShowHotspots(true);
            //setHideUI(false);
            setOpen(false);
            setStandardOverlay("infotopleft");
            setChangeView("Lib2");
          }}
        />
      )}
      {faqOverlay === "faq" && (
        <FAQ
          onClose={() => {
            //goToWaypointD();
            //setHiddenHotspotId(null);
            //setOverlay("aioptions");
            setFaqOverlay(null);
            setHideUI(false);
            setPointerEnabled(false);
          }}
          onStepback={() => {
            closeAIZone();
          }}
          mode={faqMode}
          setOverlay={setOverlay}
          setChangeView={setChangeView}
        />
      )}
      {standardOverlay === "infotopleft" && (
          <InfoTopLeft 
            // key={activeNav}
            key={`${activeNav}-${librarySection}`}
            location={activeNav}
            librarySection={librarySection}
            open={open}
            setOpen={setOpen}
            headersHidden={headersHidden}
            hideUI={hideUI}
          />
        )}
      {!["roomslobby", "clientroomslobby", "emproomslobby"].includes(overlay) && countdown && (
        <Box sx={{
          position: 'absolute',
          top: "0vw", //3.5vw
          right: "0vw", //1vw
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 2000,
          backgroundColor: "rgba(0, 63, 145, 0.75)",
          padding: '0.4167vw 0.8333vw',
          // paddingBottom: "1.25vw",
          gap: '0.4167w',
          borderRadius: "8px",
        }}>
          <Typography sx={{color: 'white', fontSize: '0.7292vw'}}>
            Meeting Starts In
          </Typography>
          <Box sx={{ display: 'flex', gap: '0.4167vw', alignItems: 'center'}}>
            <Box sx={{
              borderRadius: "8px",
              backgroundColor: "rgba(0,63,145,0.85)",
              fontSize: "0.7292vw",
              fontWeight: 500,
              color: "white",
              padding: "0.4167vw",
              position: "relative",
              textAlign: "center",
            }}>
              {countdown.hours.toString().padStart(2, "0")}
              {/* <Typography
                sx={{
                  position: "absolute",
                  bottom: "-1vw",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "0.625vw",
                  color: "white",
              }}>
                H
              </Typography> */}
            </Box>
            <Typography sx={{ color: "white", fontSize: "0.7292vw" }}>:</Typography>
            <Box sx={{
              borderRadius: "8px",
              backgroundColor: "rgba(0,63,145,0.85)",
              fontSize: "0.7292vw",
              fontWeight: 500,
              color: "white",
              padding: "0.4167vw",
              position: "relative",
              textAlign: "center",
            }}>
              {countdown.minutes.toString().padStart(2, "0")}
              {/* <Typography
                sx={{
                  position: "absolute",
                  bottom: "-1vw",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "0.625vw",
                  color: "white",
              }}>
                M
              </Typography> */}
            </Box>
            <Typography sx={{ color: "white", fontSize: "0.7292vw" }}>:</Typography>
            <Box sx={{
              borderRadius: "8px",
              backgroundColor: "rgba(0,63,145,0.85)",
              fontSize: "0.7292vw",
              fontWeight: 500,
              color: "white",
              padding: "0.4167vw",
              position: "relative",
              textAlign: "center",
            }}>
              {countdown.seconds.toString().padStart(2, "0")}
              {/* <Typography
                sx={{
                  position: "absolute",
                  bottom: "-1vw",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "0.625vw",
                  color: "white",
              }}>
                S
              </Typography> */}
            </Box>
          </Box>
        </Box>
      )}
      {!["roomslobby", "clientroomslobby", "emproomslobby"].includes(overlay) && showJoin && (
        <Box sx={{
          position: 'absolute',
          top: "3.5vw",
          right: "1vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 2000,
          //backgroundColor: "rgba(0, 63, 145, 0.75)",
          padding: "0.8333vw",
          borderRadius: "12px",
        }}>
          <Button
            variant="contained"
            disableRipple
            onClick={() => {
              setConferenceHotspots([]);
              setHiddenConferenceHotspot(null);
              setShowJoin(false);
              setCountdown(null);
              goToF();
            }}
            sx={{
              textTransform: 'none',
              fontSize: '0.7292vw',
              fontWeight: 500,
              borderRadius: '8px',
              border: "0.5px solid #66E4FF",
              background: "linear-gradient(to right, #209CD9, #1D7DEE)",
              color: 'white',
              boxShadow: "0 0 0 rgba(33,156,217,0.9)",
              animation: "pulseJoin 1.8s infinite",
              transition: "box-shadow 0.3s ease-in-out transform 0.2s ease",
              "&:hover": { 
                background: "#1976d2",
                boxShadow: "0 0 30px 8px rgba(33,156,217,0.8)",
                animation : "none",
                transform: 'scale(1.08)',
              },
              "@keyframes pulseJoin": {
                "0%": { boxShadow: "0 0 0 0 rgba(33,156,217,0.9)" },
                "70%": { boxShadow: "0 0 0 15px rgba(33,156,217,0)" },
                "100%": { boxShadow: "0 0 0 0 rgba(33,156,217,0)" },
              },
            }}
          >
            Join Meeting
          </Button>
        </Box>
      )}
      {notification && (
        <Box sx={{
          position: 'absolute',
          top: '4vw',
          left: '0.5vw',
          width: '22vw',
          display: "flex",
          flexDirection: "column",
          zIndex: 3500,
          backgroundColor: "rgba(0, 63, 145, 0.31)",
          border: '1px solid rgba(158,199,255,0.6)',
          backdropFilter: 'blur(76px)',
          boxShadow: `0 6.14px 6.14px rgba(0,0,0,0.25),
            inset 0 6.14px 6.14px rgba(74,74,74,0.25)`,
          padding: '1.0417vw',
          gap: '0.8333vw',
          borderRadius: '20px',
          transition: 'opacity 0.5s ease-in-out',
          opacity: notification ? 1 : 0,
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0vw'
          }}>
            <Typography sx={{color: 'white', fontSize: '1.0417vw'}}>
              Unable to join the meeting
            </Typography>
            <Box 
            component="img"
            src={notification_underline}
            sx={{marginLeft: '-0.4167vw', width: '100%'}}
            />
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1042vw'}}>
            <Typography sx={{color: 'white', fontSize: '0.8333vw'}}>
              We're having trouble connecting you to the meeting.
            </Typography>
            <Typography sx={{color: 'white', fontSize: '0.8333vw'}}>
              Try again or reach out to the admin for support.
            </Typography>
          </Box>
        </Box>
      )}
      {/* {showCloseIcon && hiddenConferenceHotspot && (
        <IconButton sx={{
          position: 'absolute',
          top: CONFERENCE_CLOSE_ICON_POSITIONS[hiddenConferenceHotspot]?.top,
          right: CONFERENCE_CLOSE_ICON_POSITIONS[hiddenConferenceHotspot]?.right,
          zIndex: 3000,
          cursor: 'pointer',
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: '50%',
          border: "1px solid white",
          padding: '0.4vw',
          '&:hover': {backgroundColor: 'rgba(0,0,0,0.5)'},
        }}
        onClick={() => {
          const wp = markers.waypointsWorld.find((w) => w.id === "F");
          if (wp) {
            const spawn = wp.spawnAt ?? {x: wp.wx, y: wp.wy, z: wp.wz};
            const aim = wp.aimAt ?? wp.lookAt ?? null;
            expRef.current?.teleportTo({
              x: spawn.x,
              y: spawn.y ?? 0,
              z: spawn.z,
              duration: GLIDE,
              ...(aim ? { lookAt: aim } : {}),
            });
          }
          setHiddenConferenceHotspot(null);
          setShowCloseIcon(false);
          setLeftScreenVisible(true);
        }}>
          <CloseIcon sx={{color: 'white', fontSize: '1.25vw'}} />
        </IconButton>
      )} */}
    </>
  );
}

export default App;

function FixedJoystick({ size = 120, knobSize = 28, onChange, onEnd, bgSrc = JoystickBG  }) {
  const offsetX = 0; 
  const offsetY = 0; 
  const wrapRef = useRef(null);
  const knobRef = useRef(null);
  const activeRef = useRef(false);
  const centerRef = useRef({ x: 0, y: 0 });
  const radius = size / 2 - 6; // padding inside ring

  const setKnob = (dx, dy) => {
    // clamp to circle
    const mag = Math.hypot(dx, dy);
    const cl = mag > radius ? radius / mag : 1;
    const kx = dx * cl;
    const ky = dy * cl;
    if (knobRef.current) {
      //knobRef.current.style.transform = `translate(${kx}px, ${ky}px)`;
      knobRef.current.style.transform = `translate(calc(-50% + ${kx}px), calc(-50% + ${ky}px))`;
    }
    const nx = (kx / radius);
    const ny = (-ky / radius);
    onChange?.({ x: nx, y: ny });
  };

  const getLocal = (e) => {
    const rect = wrapRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return { dx: clientX - cx, dy: clientY - cy };
  };

  const start = (e) => {
    e.preventDefault();
    activeRef.current = true;
    const { dx, dy } = getLocal(e);
    setKnob(dx, dy);
  };
  const move = (e) => {
    if (!activeRef.current) return;
    e.preventDefault();
    const { dx, dy } = getLocal(e);
    setKnob(dx, dy);
  };
  const end = (e) => {
    activeRef.current = false;
    if (knobRef.current) {
      // knobRef.current.style.transform = `translate(0px, 0px)`;
      knobRef.current.style.transform = `translate(-50%, -50%)`;
    }
    onEnd?.();
  };

  return (
    <div
      ref={wrapRef}
      style={{
        position: "fixed",
        bottom: '0.5vw',
        left: "1vw",
        width: size,
        height: size,
        borderRadius: "50%",
        background: "transparent",
        border: "none",
        boxShadow: "none",
        zIndex: 1100,
        touchAction: "none",
        userSelect: "none",
        backdropFilter: "blur(1px)",
      }}
      onMouseDown={start}
      onMouseMove={move}
      onMouseUp={end}
      onMouseLeave={end}
      onTouchStart={start}
      onTouchMove={move}
      onTouchEnd={end}
      onTouchCancel={end}
    >
       <img
        src={bgSrc}
        alt="Joystick background"
        style={{
          position: "absolute",
          inset: 0,
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          pointerEvents: "none",
          //filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.35))"
        }}
        aria-hidden
      />

      <div
        ref={knobRef}
        style={{
          position: "absolute",
          //left: `calc(50% + ${offsetX}px)`,
          //top:  `calc(50% + ${offsetY}px)`,
          left: '50%',
          top: '50%',
          width: knobSize,
          height: knobSize,
          borderRadius: "50%",
          transform: "translate(-50%,-50%)",
          background: 'white',
          border: "2px solid white",
          boxShadow: "0 6px 18px rgba(0,0,0,0.35), 0 0 10px rgba(0, 94, 255, 0.6)",
          willChange: "transform",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
