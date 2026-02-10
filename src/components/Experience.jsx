import * as THREE from "three";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Billboard, Text, RoundedBox } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

import { VideoSurface } from "./VideoSurface";
import { Solution_VideoSurface } from "./Solution_VideoSurface";
import WhiteboardScreen from "./WhiteboardScreen";
import CurvedVideoScreen from "./CurvedVideoScreen";
import CurvedScreenShare from "./CurvedScreenShare";
import { WHITEBOARD_SCREENS, VIDEO_SCREENS, SCREENSHARE_SCREENS, AVATAR_POINTS, BUSINESSWOMAN_POS } from "./DynamicPoints";
import LeftScreenVideo from "./LeftScreenVideo";

const SZ_MINI_CONFIG = {
  SZ_MINI_1: {
    hoverVideo: "/videos/SZ_Videos/KPMG_Digital_Gateway.mp4",
  },
  SZ_MINI_2: {
    hoverVideo: "/videos/SZ_Videos/KPMG_Clara.mp4",
  },
  SZ_MINI_3: {
    hoverVideo: "/videos/SZ_Videos/KPMG_Velocity.mp4",
  },
}
const DEFAULT_IMAGE_URL = "/images/testimg2_outside.png"; //image1
const SCREEN_IMAGE_URL = "/images/testimg1_inside.png"; //image2

// WASD to move; hold Shift to run. Click canvas to enable mouse-look.
export const Experience = forwardRef(
  (
    {
      viewMode = "FPP", // "FPP" | "TPP"
      navTarget,
      setNavTarget,
      allowManualMove = true,
      participantCount = 0,
      participantNames = [],
      participantGenders = [],
      pointerEnabled = true,
      iwScreenActive,
      disableArrowSpin = false,
      mouseSensitivity = 0.5,
      moveInput = { x: 0, y: 0 },
      showVid1,
      showVid2,
      showImg,
      showIWMesh,
      leftScreenVisible,
      // aiImage
      aiVideo,
      impactWallMode,
      iwVideoIndex,
      setIwVideoIndex,
      showBlackImg,
      screenshareOn,
      szVideoOverride,
      hoverMiniVideo,
      showSZScreenText,
      avatarType="default",
    },
    ref
  ) => {
    const isFPP = viewMode === "FPP";
    const { scene, animations: globeAnims } = useGLTF("/models/Innovation_Center_V11_Check_v25_Anim.compressed.glb");
    const libText = useGLTF("/models/Lib_Text_01.glb");
    const sz_globe = useGLTF("/models/SZ_Globe.glb");

    const globeMixerRef = useRef(null);
    const doorMixerRef = useRef(null);

    useEffect(() => {
      if (!scene || !aiVideo) return;

      const mesh = scene.getObjectByName("AI_Large_Circle");
      if (!mesh) return;

      // Clone material so we don’t modify original gltf material
      mesh.material = mesh.material.clone();
      mesh.material.emissiveMap = null;
      mesh.material.emissive.set(0x000000);

      // Create video element
      const video = document.createElement("video");
      video.src = aiVideo;
      //video.src = "/videos/AI_Videos_New/9.mp4"; //here
      video.loop = true;
      video.muted = true;
      video.crossOrigin = "anonymous";
      video.playsInline = true;

      video.play().catch(err => console.warn("Video play blocked:", err));

      const texture = new THREE.VideoTexture(video);
      texture.flipY = false;

      mesh.material.map = texture;
      mesh.material.needsUpdate = true;

    }, [aiVideo, scene]);

    useEffect(() => {
      if (!scene) return;

      // 1. Grab both mesh references
      const text1 = scene.getObjectByName("SZ_Screen_Text1");
      const text2 = scene.getObjectByName("SZ_Screen_Text2");

      const applyTexture = (mesh, url) => {
        if (!mesh) return;

        if (!mesh.userData.isCloned) {
          mesh.material = mesh.material.clone();
          mesh.userData.isCloned = true;
        }

        new THREE.TextureLoader().load(url, (tex) => {
          tex.flipY = false;
          tex.colorSpace = THREE.SRGBColorSpace;
          mesh.material.map = tex;
          mesh.material.needsUpdate = true;
        });
      };

      if (!showSZScreenText) {
        if (text1) text1.visible = false;
        if (text2) text2.visible = false;
      } 
      else if (showSZScreenText === "default") {
        if (text1) {
          text1.visible = true;
          applyTexture(text1, DEFAULT_IMAGE_URL);
        }
        if (text2) text2.visible = false;
      } 
      else if (showSZScreenText === "screen") {
        if (text1) text1.visible = false;
        if (text2) {
          text2.visible = true;
          applyTexture(text2, SCREEN_IMAGE_URL);
        }
      }
    }, [scene, showSZScreenText]);

    useEffect(() => {
      if (!scene) return;
      const signExp = scene.getObjectByName("SignExp");
      if (!signExp) return;

      signExp.visible = !screenshareOn;
    }, [scene, screenshareOn]);


    useEffect(() => {
      if (!scene) return;
      const mesh = scene.getObjectByName("IW_Screen");
      const frameMesh = scene.getObjectByName("IW_ScreenFrame");
      if (mesh) mesh.visible = showIWMesh;
      if (frameMesh) frameMesh.visible = showIWMesh;
    }, [scene, showIWMesh]);

    useEffect(() => {
      const GLOBE_TIME_SCALE = 0.5; // original speed was 1.0, <1 = slower, >1 = faster; Rishab follow this if further changes are expected
      if (!scene || !globeAnims || globeAnims.length === 0) return;
      const clip = THREE.AnimationClip.findByName(globeAnims, "Globe");
      if (!clip) return; // "Globe" not found; no-op
      const mixer = new THREE.AnimationMixer(scene);
      globeMixerRef.current = mixer;
      const action = mixer.clipAction(clip);
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.clampWhenFinished = false;
      action.timeScale = GLOBE_TIME_SCALE;
      action.play();
      return () => {
        mixer.stopAllAction();
        mixer.uncacheRoot(scene);
        globeMixerRef.current = null;
      };
    }, [scene, globeAnims]);

    const playDoorOnce = React.useCallback(() => {
      if (!scene || !globeAnims || globeAnims.length === 0) return;
      const clip = THREE.AnimationClip.findByName(globeAnims, "Door");
      if (!clip) return;
      const mixer = doorMixerRef.current ?? new THREE.AnimationMixer(scene);
      doorMixerRef.current = mixer;

      // Clear any prior listeners to avoid duplicates
      mixer.removeEventListener?.("finished");

      const action = mixer.clipAction(clip);
      action.reset();
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = false; // we'll handle closing manually
      action.timeScale = 1;
      action.play();

      let reversed = false;
      const onFinished = () => {
        if (!reversed) {
          // Play backwards to close
          reversed = true;
          action.reset();
          action.setLoop(THREE.LoopOnce, 1);
          action.timeScale = -1;
          action.play();
          // Start from end when reversing
          action.time = clip.duration;
        } else {
          // fully done: stop and ensure back to initial pose
          action.stop();
          action.timeScale = 1;
          action.time = 0;
        }
      };
      mixer.addEventListener("finished", onFinished);
    }, [scene, globeAnims]);

    useEffect(() => {
      const handler = () => playDoorOnce();
      window.addEventListener("ic:door", handler);
      return () => window.removeEventListener("ic:door", handler);
    }, [playDoorOnce]);

    const businessMan = useGLTF("/models/SeatedAvatar.glb");
    const businessWomanSeat = useGLTF("/models/Avatar_Seated_3_LightBlue.glb"); //SA_Female_2
    const defaultAvatar = useGLTF("/models/Lady_AI5.glb");
    const variantAvatar = useGLTF("/models/Lady_AI4.glb");
    const businessWoman = avatarType === "variant" ? variantAvatar : defaultAvatar;
    //const businessWoman = useGLTF("/models/Lady_AI5.glb");
    const aiMixerRef = useRef();
    const sz_globeMixerRef = useRef();
    const szIdleActionRef = useRef(null);
    const idleActionRef = useRef();
    const talkActionRef = useRef();
    const isTalkingRef = useRef(false);
    const AI_TALK_SPEED = 1.8; //Rishab: Speed of the talking animation can be adjusted here 

    useEffect(() => {
      if (!businessWoman?.scene || !businessWoman?.animations?.length) return;
      const mixer = new THREE.AnimationMixer(businessWoman.scene);
      aiMixerRef.current = mixer;

      const idleClip = THREE.AnimationClip.findByName(businessWoman.animations, "Avatar_Anim_IdleStanding");
      const talkClip = THREE.AnimationClip.findByName(businessWoman.animations, "Avatar_Anim_Talk1N");

      if (idleClip) {
        const idleAction = mixer.clipAction(idleClip);
        idleAction.enabled = true;
        idleAction.setLoop(THREE.LoopRepeat, Infinity);
        idleAction.clampWhenFinished = false;
        idleAction.setEffectiveWeight(1);
        idleAction.setEffectiveTimeScale(1);
        idleAction.reset().play();
        idleActionRef.current = idleAction;
      }
      if (talkClip) {
        const talkAction = mixer.clipAction(talkClip);
        talkAction.enabled = true;
        talkAction.setLoop(THREE.LoopRepeat, Infinity);
        talkAction.clampWhenFinished = false;
        talkAction.timeScale = AI_TALK_SPEED;
        talkAction.setEffectiveWeight(0);
        talkActionRef.current = talkAction;
      }
      const handleTalk = () => {
        if (!talkActionRef.current || !idleActionRef.current) return;
        if (isTalkingRef.current) return;
        isTalkingRef.current = true;

        const idle = idleActionRef.current;
        const talk = talkActionRef.current;
        talk.reset();
        talk.setEffectiveWeight(1);
        talk.play();
        idle.crossFadeTo(talk, 0.25, false);
      };
      const handleStop = () => {
        if (!talkActionRef.current || !idleActionRef.current) return;
        if (!isTalkingRef.current) return;
        isTalkingRef.current = false;

        const idle = idleActionRef.current;
        const talk = talkActionRef.current;
        idle.reset();
        idle.setEffectiveWeight(1);
        idle.play();
        talk.crossFadeTo(idle, 0.25, false);

        // Optional: fully disable talk after fade (keeps things clean)
        setTimeout(() => {
          if (isTalkingRef.current) return;
          talk.stop();
          talk.setEffectiveWeight(0);
        }, 300);
      };

      window.addEventListener("ic:aiTalk", handleTalk);
      window.addEventListener("ic:aiStop", handleStop);

      return () => {
        window.removeEventListener("ic:aiTalk", handleTalk);
        window.removeEventListener("ic:aiStop", handleStop);
        mixer.stopAllAction();
      };
    }, [businessWoman]);

    useEffect(() => {
      const GLOBE_TIME_SCALE = 0.5;
      if (!sz_globe?.scene || !sz_globe?.animations?.length) return;

      const mixer = new THREE.AnimationMixer(sz_globe.scene);
      sz_globeMixerRef.current = mixer;

      const idleClip = THREE.AnimationClip.findByName(sz_globe.animations, "Globe");
      if (!idleClip) return;

      const idle = mixer.clipAction(idleClip);
      idle.setLoop(THREE.LoopRepeat, Infinity);
      idle.clampWhenFinished = false;
      idle.timeScale = GLOBE_TIME_SCALE;
      idle.reset().play();
      szIdleActionRef.current = idle;

      return () => {
        mixer.stopAllAction();
        mixer.uncacheRoot(sz_globe.scene);
        sz_globeMixerRef.current = null;
        szIdleActionRef.current = null;
      };
    }, [sz_globe.scene, sz_globe.animations]);

    const { camera, gl } = useThree();
    useEffect(() => {
  const handler = () => {
    if (!camera) return;

    // Position
    const pos = camera.position.clone();

    // LookAt: construct a direction vector
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);

    // Convert direction → actual lookAt point (ray 100 units forward)
    const lookAt = pos.clone().add(dir.multiplyScalar(100));

    console.log("Spawn Position:", {
      x: pos.x.toFixed(3),
      y: pos.y.toFixed(3),
      z: pos.z.toFixed(3),
    });

    console.log("LookAt Target:", {
      x: lookAt.x.toFixed(3),
      y: lookAt.y.toFixed(3),
      z: lookAt.z.toFixed(3),
    });
  };

  window.addEventListener("log-transform", handler);
  return () => window.removeEventListener("log-transform", handler);
}, [camera]);

    // ---- Tunables ----
    const WALK_SPEED = 3.2;
    const RUN_SPEED = 6.4;
    const ACCEL = 14.0; // m/s^2 when pressing move keys
    const DECEL = 14.0; // m/s^2 when releasing
    const TURN_SMOOTH = 12.0; // higher = snappier turn
    const CAM_HEIGHT = 1.8;
    const CAM_DISTANCE = 3.5;
    const CAM_SMOOTH = 15.0; // higher = snappier follow
    const LOCAL_FORWARD = new THREE.Vector3(0, 0, 1);
    const AUTO_STOP_DIST = 0.25;
    const YAW_SPEED = 2.3;

    // Label tunables
   const LABEL_OFFSET_Y = 1.85;   // how high above the avatar the name sits
   const LABEL_FONT_SIZE = 0.08; // meters
  const ALWAYS_SHOW_REMOTE_LABELS = true; 

    const LABEL_PAD_X = 0.04;     
    const LABEL_PAD_Y = 0.04;     
    const LABEL_DEPTH = 0.01; 
    const LABEL_BORDER_THICKNESS = 0.015;    

    const estimateTextWidth = (str, fontSize) => {
     const avg = 0.6 * fontSize;
     return Math.max(fontSize * 1.6, str.length * avg); // min width for short names
    };

    // ---- Hover label show for 5 seconds ----
      const [hoverLabelMap, setHoverLabelMap] = useState({}); // { [key]: true/false }
    const hoverLabelTimersRef = useRef({}); // { [key]: timeoutId }

    const showHoverLabelFor5s = React.useCallback((key) => {
      // show immediately
      setHoverLabelMap((prev) => ({ ...prev, [key]: true }));

      // reset existing timer if any
      if (hoverLabelTimersRef.current[key]) {
        clearTimeout(hoverLabelTimersRef.current[key]);
      }

      // hide after 5 seconds
      hoverLabelTimersRef.current[key] = setTimeout(() => {
        setHoverLabelMap((prev) => ({ ...prev, [key]: false }));
        delete hoverLabelTimersRef.current[key];
      }, 5000);
    }, []);

    // cleanup timers on unmount
    useEffect(() => {
      return () => {
        Object.values(hoverLabelTimersRef.current).forEach(clearTimeout);
        hoverLabelTimersRef.current = {};
      };
    }, []);


    // --- Simple collision tunables ---
    const COLLISION_RADIUS = 0.35;
    const EYE_HEIGHT = 0.9;
    const BLOCK_MARGIN = 0.15;

    // Spawn
    const SPAWN_POS = { x: -26, y: 0, z: 20 };
    const SPAWN_LOOK_AT = { x: -25, y: 0, z: -25 };
    const SPAWN_YAW_DEG = 0;

    // ---- State & refs ----
    const manual = !!allowManualMove && !!pointerEnabled;
    const avatarRef = useRef(); // transform root for the local avatar
    const keys = useRef({
      w: false, a: false, s: false, d: false, shift: false,
      leftArrow: false, rightArrow: false
    });

    const vel = useRef(new THREE.Vector3());
    const [anim, setAnim] = useState("idle"); // "idle" | "walk" | "run"

    const glide = useRef({
      active: false,
      start: 0,
      durationMs: 0,
      from: new THREE.Vector3(),
      to: new THREE.Vector3(),
      qFrom: new THREE.Quaternion(),
      qTo: new THREE.Quaternion(),
      customLook: false,
      camTargetFrom: new THREE.Vector3(),
      camTargetTo: new THREE.Vector3(),
    });

    // --- Collision data ---
    const collidersRef = useRef([]);
    const raycasterRef = useRef(new THREE.Raycaster());


    // ---- Drag-to-look (FPP) ----
    const dragRef = useRef({ active: false, x: 0, y: 0, locked: false });
    const anglesRef = useRef({ yaw: 0, pitch: 0 }); // radians
    const SENSITIVITY = useMemo(() => {
      const v = THREE.MathUtils.clamp(mouseSensitivity ?? 0.5, 0.2, 0.9);
      const t = (v - 0.2) / 0.7; // 0..1
      return THREE.MathUtils.lerp(0.001, 0.004, t);
    }, [mouseSensitivity]);
    const PITCH_LIMIT = Math.PI / 2 - 0.01; // avoid gimbal flip

    const syncAnglesFromCamera = React.useCallback(() => {
      const e = new THREE.Euler().setFromQuaternion(camera.quaternion, "YXZ");
      anglesRef.current.yaw = e.y;
      anglesRef.current.pitch = e.x;
    }, [camera]);

   // Initialize angles from current camera once
    useEffect(() => {
      // nice grab cursor by default
      if (gl?.domElement) {
        gl.domElement.style.cursor = "grab";
        gl.domElement.style.userSelect = "none";
        gl.domElement.style.touchAction = "none";
      }
      const e = new THREE.Euler().setFromQuaternion(camera.quaternion, "YXZ");
      anglesRef.current.yaw = e.y;
      anglesRef.current.pitch = e.x;
    }, [camera, gl]);
    
    useEffect(() => {
      if (!gl?.domElement) return;
      gl.domElement.style.pointerEvents = pointerEnabled ? "auto" : "none";
    }, [gl, pointerEnabled]);

    useEffect(() => {
      if (!gl?.domElement) return;
      const el = gl.domElement;

      if (!pointerEnabled) {
        dragRef.current.active = false;
        el.style.cursor = "default";
      }

      const onDown = (e) => {
        if (!isFPP || !pointerEnabled) return; // respect pointer gating
        syncAnglesFromCamera();
        dragRef.current.active = true;
        dragRef.current.x = e.clientX;
        dragRef.current.y = e.clientY;
        el.style.cursor = "grabbing";
      };
      const onMove = (e) => {
        if (!dragRef.current.active || !isFPP || !pointerEnabled) return;
        const dx = e.clientX - dragRef.current.x;
        const dy = e.clientY - dragRef.current.y;
        dragRef.current.x = e.clientX;
        dragRef.current.y = e.clientY;
        anglesRef.current.yaw -= dx * SENSITIVITY;
        anglesRef.current.pitch -= dy * SENSITIVITY;
        // clamp pitch
        anglesRef.current.pitch = Math.max(
          -PITCH_LIMIT,
          Math.min(PITCH_LIMIT, anglesRef.current.pitch)
        );
        camera.rotation.set(
          anglesRef.current.pitch,
          anglesRef.current.yaw,
          0,
          "YXZ"
        );
      };
      const onUp = () => {
        if (!dragRef.current.active) return;
        dragRef.current.active = false;
        el.style.cursor = "grab";
      };
      el.addEventListener("mousedown", onDown);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
      return () => {
        el.removeEventListener("mousedown", onDown);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
    }, [gl, isFPP, camera, pointerEnabled]);

    const visibleIndices = useMemo(() => {
      const arr = [];
      (participantNames || []).forEach((n, i) => {
        if (typeof n === "string" && !/^screen-/i.test(n)) arr.push(i);
      });
      return arr;
    }, [participantNames]);

    const visibleNames = useMemo(
      () => visibleIndices.map(i => participantNames[i]),
      [visibleIndices, participantNames]
    );

    // Genders aligned with visibleNames (same indexing)
    const visibleGenders = useMemo(
      () => visibleIndices.map(i => participantGenders?.[i] ?? null),
      [visibleIndices, participantGenders]
    );

    // Meta per visible avatar: { name, gender }
    const avatarMetaList = useMemo(
      () =>
        visibleNames.map((name, idx) => ({
          name,
          gender: visibleGenders[idx] ?? null,
        })),
      [visibleNames, visibleGenders]
    );

    useEffect(() => {
      console.log("Current avatars (name + gender):", avatarMetaList);
    }, [avatarMetaList]);
    useEffect(() => {
  if (!scene) return;

  scene.traverse((obj) => {
    console.log("Object:", obj.name);
  });
}, [scene]);


    // Touch support: drag-to-look on touch screens
    useEffect(() => {
      if (!gl?.domElement) return;
      const el = gl.domElement;

      const getTouchPoint = (e) => {
        const t = e.touches?.[0] || e.changedTouches?.[0];
        return t ? { x: t.clientX, y: t.clientY } : null;
      };

      const onTouchStart = (e) => {
        if (!isFPP || !pointerEnabled) return;
        const p = getTouchPoint(e);
        if (!p) return;
        syncAnglesFromCamera();
        dragRef.current.active = true;
        dragRef.current.x = p.x;
        dragRef.current.y = p.y;
        el.style.cursor = "grabbing";
        // prevent page scroll/zoom while dragging
        e.preventDefault();
      };

      const onTouchMove = (e) => {
        if (!dragRef.current.active || !isFPP) return;
        const p = getTouchPoint(e);
        if (!p) return;
        const dx = p.x - dragRef.current.x;
        const dy = p.y - dragRef.current.y;
        dragRef.current.x = p.x;
        dragRef.current.y = p.y;
        anglesRef.current.yaw -= dx * SENSITIVITY;
        anglesRef.current.pitch -= dy * SENSITIVITY;
        anglesRef.current.pitch = Math.max(
          -PITCH_LIMIT,
          Math.min(PITCH_LIMIT, anglesRef.current.pitch)
        );
        camera.rotation.set(
          anglesRef.current.pitch,
          anglesRef.current.yaw,
          0,
          "YXZ"
        );
        e.preventDefault();
      };

      const onTouchEnd = () => {
        if (!dragRef.current.active) return;
        dragRef.current.active = false;
        el.style.cursor = "grab";
      };

      // passive:false is required so preventDefault works on touchmove
      el.addEventListener("touchstart", onTouchStart, { passive: false });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onTouchEnd);
      window.addEventListener("touchcancel", onTouchEnd);

      return () => {
        el.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
        window.removeEventListener("touchcancel", onTouchEnd);
      };
    }, [gl, isFPP, camera]);

    // Build a list of collidable meshes (world height > 0.5 m) once the scene is ready
    useEffect(() => {
      if (!scene) return;
      const colliders = [];
      scene.updateMatrixWorld(true);
      scene.traverse((obj) => {
        if (!obj.isMesh || !obj.geometry) return;
        obj.geometry.computeBoundingBox?.();
        const bb = obj.geometry.boundingBox?.clone();
        if (!bb) return;
        bb.applyMatrix4(obj.matrixWorld);
        const size = new THREE.Vector3();
        bb.getSize(size);
        if (size.y > 0.5) colliders.push(obj); // ignore floor/low props
      });
      collidersRef.current = colliders;
    }, [scene]);

    // Keyboard input
    useEffect(() => {
      if (!manual) return;
      const down = (e) => {
        if (e.code === "KeyW") { keys.current.w = true; e.preventDefault(); }
        else if (e.code === "KeyA") { keys.current.a = true; e.preventDefault(); }
        else if (e.code === "KeyS") { keys.current.s = true; e.preventDefault(); }
        else if (e.code === "KeyD") { keys.current.d = true; e.preventDefault(); }
        else if (e.code === "ShiftLeft" || e.code === "ShiftRight")
          keys.current.shift = true;
        else if (e.code === "ArrowLeft" && !disableArrowSpin) {
          keys.current.leftArrow = true;
          e.preventDefault();
        }
        else if (e.code === "ArrowRight") {
          keys.current.rightArrow = true;
          e.preventDefault();
        }
        if (navTarget) setNavTarget?.(null);
      };
      const up = (e) => {
        if (e.code === "KeyW") keys.current.w = false;
        else if (e.code === "KeyA") keys.current.a = false;
        else if (e.code === "KeyS") keys.current.s = false;
        else if (e.code === "KeyD") keys.current.d = false;
        else if (e.code === "ShiftLeft" || e.code === "ShiftRight")
          keys.current.shift = false;
        else if (e.code === "ArrowLeft") {
          keys.current.leftArrow = false;
          e.preventDefault();
        }
        else if (e.code === "ArrowRight") {
          keys.current.rightArrow = false;
          e.preventDefault();
        }
      };
      window.addEventListener("keydown", down);
      window.addEventListener("keyup", up);
      return () => {
        window.removeEventListener("keydown", down);
        window.removeEventListener("keyup", up);
      };
    }, [manual, navTarget, setNavTarget]);

    useEffect(() => {
      if (!pointerEnabled) {
        keys.current = {
          w: false, a: false, s: false, d: false, shift: false,
          leftArrow: false, rightArrow: false
        };
        vel.current.set(0, 0, 0);
        setNavTarget?.(null);
      }
    }, [pointerEnabled, setNavTarget]);

    // Initial placement (run once)
    const spawnedOnce = useRef(false);
    useEffect(() => {
      if (!avatarRef.current || spawnedOnce.current) return;
      spawnedOnce.current = true;

      // spawn position
      avatarRef.current.position.set(SPAWN_POS.x, SPAWN_POS.y, SPAWN_POS.z);

      // initial facing
      let yaw = THREE.MathUtils.degToRad(SPAWN_YAW_DEG);
      if (SPAWN_LOOK_AT) {
        const from = avatarRef.current.position.clone();
        const to = new THREE.Vector3(
          SPAWN_LOOK_AT.x,
          SPAWN_LOOK_AT.y ?? 0,
          SPAWN_LOOK_AT.z
        );
        const dir = to.sub(from).setY(0);
        if (dir.lengthSq() > 1e-6) yaw = Math.atan2(dir.x, dir.z);
      }
      avatarRef.current.quaternion.setFromEuler(new THREE.Euler(0, yaw, 0));

      // camera
      const forward = LOCAL_FORWARD.clone()
        .applyQuaternion(avatarRef.current.quaternion)
        .normalize();
      if (isFPP) {
        const camPos = avatarRef.current.position
          .clone()
          .add(new THREE.Vector3(0, CAM_HEIGHT * 0.9, 0))
          .add(forward.clone().multiplyScalar(0.1));
        camera.position.copy(camPos);
        if (SPAWN_LOOK_AT) {
          camera.lookAt(
            SPAWN_LOOK_AT.x,
            SPAWN_LOOK_AT.y ?? CAM_HEIGHT,
            SPAWN_LOOK_AT.z
          );
        }
        syncAnglesFromCamera();
      } else {
        const camPos = avatarRef.current.position
          .clone()
          .add(new THREE.Vector3(0, CAM_HEIGHT, 0))
          .add(forward.clone().multiplyScalar(-CAM_DISTANCE));
        camera.position.copy(camPos);
        if (SPAWN_LOOK_AT) {
          camera.lookAt(
            SPAWN_LOOK_AT.x,
            SPAWN_LOOK_AT.y ?? CAM_HEIGHT * 0.85,
            SPAWN_LOOK_AT.z
          );
        } else {
          const lookTarget = avatarRef.current.position
            .clone()
            .add(new THREE.Vector3(0, CAM_HEIGHT * 0.85, 0))
            .add(forward.clone().multiplyScalar(3));
          camera.lookAt(lookTarget);
        }
        syncAnglesFromCamera();
      }
    }, [camera, isFPP, LOCAL_FORWARD, CAM_HEIGHT, CAM_DISTANCE, SPAWN_POS, SPAWN_LOOK_AT, syncAnglesFromCamera]);

    // If we exit FPP, release pointer lock so the cursor returns.
    useEffect(() => {
      if (typeof document === "undefined") return;
      if ((!isFPP || !pointerEnabled) && document.pointerLockElement) {
        document.exitPointerLock?.();
      }
    }, [isFPP, pointerEnabled]);

    // ---------- Teleport / Look API (imperative) ----------
    useImperativeHandle(ref, () => ({
      teleportTo: ({ x, z, y = 0, duration = 0, lookAt } = {}) => {
        if (!avatarRef.current) return;

        // stop movement and clear autopilot
        vel.current.set(0, 0, 0);
        setNavTarget?.(null);

        const fromNow = avatarRef.current.position.clone();
        const toNow = new THREE.Vector3(x, y, z);
        const distNow = fromNow.distanceTo(toNow);
        const NEAR_EPS = 0.2; // meters
        const shouldGlide = duration && duration > 0 && distNow > NEAR_EPS;


        // Timed glide
        if (shouldGlide) {
          const from = avatarRef.current.position.clone();
          const to = new THREE.Vector3(x, y, z);
          const dir = to.clone().sub(from);
          dir.y = 0;
          dir.normalize();
          const yaw = Math.atan2(dir.x, dir.z);

          glide.current.active = true;
          glide.current.start = performance.now();
          glide.current.durationMs = duration * 1000;
          glide.current.from.copy(from);
          glide.current.to.copy(to);
          glide.current.qFrom.copy(avatarRef.current.quaternion);
          glide.current.qTo.setFromEuler(new THREE.Euler(0, yaw, 0));

          if (lookAt) {
            const dirNow = new THREE.Vector3();
            camera.getWorldDirection(dirNow);
            glide.current.camTargetFrom
              .copy(camera.position)
              .add(dirNow.multiplyScalar(5));

            const lx = Array.isArray(lookAt) ? lookAt[0] : lookAt.x ?? 0;
            const ly = Array.isArray(lookAt) ? lookAt[1] : lookAt.y ?? CAM_HEIGHT;
            const lz = Array.isArray(lookAt) ? lookAt[2] : lookAt.z ?? 0;
            glide.current.camTargetTo.set(lx, ly, lz);
            glide.current.customLook = true;
          } else {
            glide.current.customLook = false;
          }
          setAnim("walk");
          return;
        }

        // Instant snap
        avatarRef.current.position.set(x, y, z);
        avatarRef.current.updateMatrixWorld(true);

        const forward = LOCAL_FORWARD.clone()
          .applyQuaternion(avatarRef.current.quaternion)
          .normalize();

        if (isFPP) {
          const camPos = avatarRef.current.position
            .clone()
            .add(new THREE.Vector3(0, CAM_HEIGHT * 0.9, 0))
            .add(forward.clone().multiplyScalar(0.1));
          camera.position.copy(camPos);
          if (lookAt) {
            const lx = Array.isArray(lookAt) ? lookAt[0] : lookAt.x ?? 0;
            const ly = Array.isArray(lookAt) ? lookAt[1] : lookAt.y ?? CAM_HEIGHT;
            const lz = Array.isArray(lookAt) ? lookAt[2] : lookAt.z ?? 0;
            camera.lookAt(lx, ly, lz);
          }
        } else {
          const camPos = avatarRef.current.position
            .clone()
            .add(new THREE.Vector3(0, CAM_HEIGHT, 0))
            .add(forward.clone().multiplyScalar(-CAM_DISTANCE));
          camera.position.copy(camPos);
          if (lookAt) {
            const lx = Array.isArray(lookAt) ? lookAt[0] : lookAt.x ?? 0;
            const ly = Array.isArray(lookAt) ? lookAt[1] : lookAt.y ?? CAM_HEIGHT;
            const lz = Array.isArray(lookAt) ? lookAt[2] : lookAt.z ?? 0;
            camera.lookAt(lx, ly, lz);
          } else {
            const lookTarget = avatarRef.current.position
              .clone()
              .add(new THREE.Vector3(0, CAM_HEIGHT * 0.85, 0))
              .add(forward.clone().multiplyScalar(3));
            camera.lookAt(lookTarget);
          }
        }
      },

      // Rotate camera to a point without moving the avatar
      lookAtOnly: ({ lookAt, duration = 0 } = {}) => {
        if (!avatarRef.current || !lookAt) return;
        setNavTarget?.(null);

        if (duration > 0) {
          const from = avatarRef.current.position.clone();

          glide.current.active = true;
          glide.current.start = performance.now();
          glide.current.durationMs = duration * 1000;
          glide.current.from.copy(from);
          glide.current.to.copy(from); // no motion
          glide.current.qFrom.copy(avatarRef.current.quaternion);
          glide.current.qTo.copy(avatarRef.current.quaternion);

          const dirNow = new THREE.Vector3();
          camera.getWorldDirection(dirNow);
          glide.current.camTargetFrom
            .copy(camera.position)
            .add(dirNow.multiplyScalar(5));

          const lx = Array.isArray(lookAt) ? lookAt[0] : lookAt.x ?? 0;
          const ly = Array.isArray(lookAt) ? lookAt[1] : lookAt.y ?? CAM_HEIGHT;
          const lz = Array.isArray(lookAt) ? lookAt[2] : lookAt.z ?? 0;
          glide.current.camTargetTo.set(lx, ly, lz);
          glide.current.customLook = true;
          setAnim("idle");
          return;
        }

        const lx = Array.isArray(lookAt) ? lookAt[0] : lookAt.x ?? 0;
        const ly = Array.isArray(lookAt) ? lookAt[1] : lookAt.y ?? CAM_HEIGHT;
        const lz = Array.isArray(lookAt) ? lookAt[2] : lookAt.z ?? 0;
        camera.lookAt(lx, ly, lz);
      },

      getAvatarPosition: () =>
        avatarRef.current ? avatarRef.current.position.clone() : null,
        playDoor: () => playDoorOnce(),
    }));

    // Per-frame update
    useFrame((_, delta) => {
      if (globeMixerRef.current) globeMixerRef.current.update(delta);
      if (doorMixerRef.current) doorMixerRef.current.update(delta);
      if (aiMixerRef.current) aiMixerRef.current.update(delta);
      if (sz_globeMixerRef.current) sz_globeMixerRef.current.update(delta);
      if (!avatarRef.current) return;

      const now = performance.now();

      // --- Arrow key spin (camera/heading) ---
      if (keys.current.leftArrow || keys.current.rightArrow) {
        const dir = keys.current.leftArrow ? 1 : -1;
        const yawDelta = dir * YAW_SPEED * delta;
        if (isFPP) {
          // Spin camera yaw directly in FPP
          anglesRef.current.yaw += yawDelta;
          camera.rotation.set(anglesRef.current.pitch, anglesRef.current.yaw, 0, "YXZ");
        } else {
          // Rotate avatar heading in TPP; camera will follow
          const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0), yawDelta);
          avatarRef.current.quaternion.multiply(q);
        }
      }

      // GLIDE OVERRIDE
      if (glide.current.active) {
        const t = Math.min(
          1,
          (now - glide.current.start) / glide.current.durationMs
        );
        const k = t * t * (3 - 2 * t); // smoothstep

        avatarRef.current.position.lerpVectors(
          glide.current.from,
          glide.current.to,
          k
        );
        avatarRef.current.quaternion.slerpQuaternions(
          glide.current.qFrom,
          glide.current.qTo,
          k
        );
        vel.current.set(0, 0, 0);

        // Camera follow while gliding
        const avatarPos = avatarRef.current.position;
        const camLerp = 1 - Math.exp(-CAM_SMOOTH * delta);
        const avatarForward = LOCAL_FORWARD.clone()
          .applyQuaternion(avatarRef.current.quaternion)
          .normalize();

        if (isFPP) {
          const camTargetPos = avatarPos
            .clone()
            .add(new THREE.Vector3(0, CAM_HEIGHT * 0.9, 0))
            .add(avatarForward.clone().multiplyScalar(0.1));
          camera.position.lerp(camTargetPos, camLerp);
          if (glide.current.customLook) {
            const look = new THREE.Vector3().lerpVectors(
              glide.current.camTargetFrom,
              glide.current.camTargetTo,
              k
            );
            camera.lookAt(look);
          }
        } else {
          const camTargetPos = avatarPos
            .clone()
            .add(new THREE.Vector3(0, CAM_HEIGHT, 0))
            .add(avatarForward.clone().multiplyScalar(-CAM_DISTANCE));
          camera.position.lerp(camTargetPos, camLerp);
          if (glide.current.customLook) {
            const look = new THREE.Vector3().lerpVectors(
              glide.current.camTargetFrom,
              glide.current.camTargetTo,
              k
            );
            camera.lookAt(look);
          } else {
            const lookTarget = avatarPos
              .clone()
              .add(new THREE.Vector3(0, CAM_HEIGHT * 0.85, 0))
              .add(avatarForward.clone().multiplyScalar(3));
            camera.lookAt(lookTarget);
          }
        }

        if (t >= 1) {
          glide.current.active = false;
          setAnim("idle");
        }
        return; // skip normal movement while gliding
      }

      // Input → desired direction (relative to camera)
      const fwd = new THREE.Vector3();
      camera.getWorldDirection(fwd);
      fwd.y = 0;
      fwd.normalize();

      const right = new THREE.Vector3()
        .crossVectors(fwd, new THREE.Vector3(0, 1, 0))
        .normalize();

      const dir = new THREE.Vector3();
      if (keys.current.w) dir.add(fwd);
      if (keys.current.s) dir.sub(fwd);
      if (keys.current.a) dir.sub(right);
      if (keys.current.d) dir.add(right);

      const joyVec = new THREE.Vector2(
        manual ? (moveInput?.x ?? 0) : 0,
        manual ? (moveInput?.y ?? 0) : 0
      );
      const joyMag = Math.min(1, joyVec.length());
      const hasJoystick = joyMag > 0.08; // deadzone
      if (hasJoystick) {
        dir.addScaledVector(right, joyVec.x);
        dir.addScaledVector(fwd,   joyVec.y);
      }

      let hasInput = dir.lengthSq() > 0;
      if (hasInput) dir.normalize();

      // Autopilot when no manual input and navTarget set
      let aiDriving = false;
      if (!hasInput && navTarget) {
        const avatarPos = avatarRef.current.position.clone();
        const dest = new THREE.Vector3(navTarget.x ?? 0, 0, navTarget.z ?? 0);
        const toTarget = dest
          .clone()
          .sub(new THREE.Vector3(avatarPos.x, 0, avatarPos.z));
        const dist = toTarget.length();
        if (dist > AUTO_STOP_DIST) {
          dir.copy(toTarget.normalize());
          hasInput = true;
          aiDriving = true;
        } else {
          setNavTarget?.(null); // arrived
        }
      }

      // Backpedal only (S only)
      const currForward = LOCAL_FORWARD.clone()
        .applyQuaternion(avatarRef.current.quaternion)
        .normalize();
      const isBackwardOnly =
        !aiDriving &&
        keys.current.s &&
        !keys.current.w &&
        !keys.current.a &&
        !keys.current.d;
      if (isBackwardOnly) {
        if (isFPP) {
          dir.copy(fwd).multiplyScalar(-1);
        } else {
          dir.copy(currForward).multiplyScalar(-1);
        }
        hasInput = true;
      }

      let targetSpeed = 0;
      if (hasInput) {
        if (aiDriving) {
          targetSpeed = RUN_SPEED;
        } else if (!hasJoystick) {
          targetSpeed = keys.current.shift ? RUN_SPEED : WALK_SPEED;
        } else {
          // Scale between WALK and RUN by joystick magnitude
          const t = joyMag; // 0..1
          targetSpeed = THREE.MathUtils.lerp(WALK_SPEED, RUN_SPEED, t);
        }
      }

      const desired = dir.clone().multiplyScalar(targetSpeed);
      const rate = hasInput ? ACCEL : DECEL;
      const lerpAlpha = 1 - Math.exp(-rate * delta);
      vel.current.lerp(desired, lerpAlpha);

      // Step with simple collision
      const step = vel.current.clone().multiplyScalar(delta);
      if (step.lengthSq() > 0) {
        const dirNorm = step.clone().normalize();
        const up = new THREE.Vector3(0, 1, 0);
        const side = new THREE.Vector3().crossVectors(dirNorm, up).normalize();
        const baseOrigin = avatarRef.current.position
          .clone()
          .add(new THREE.Vector3(0, EYE_HEIGHT, 0));
        const origins = [
          baseOrigin, // center
          baseOrigin.clone().add(side.clone().multiplyScalar(COLLISION_RADIUS)), // right shoulder
          baseOrigin.clone().add(side.clone().multiplyScalar(-COLLISION_RADIUS)), // left shoulder
        ];
        const rc = raycasterRef.current;
        let blocked = false;
        const maxDist = step.length() + BLOCK_MARGIN;
        for (let i = 0; i < origins.length && !blocked; i++) {
          rc.set(origins[i], dirNorm);
          rc.near = 0;
          rc.far = maxDist;
          const hits = rc.intersectObjects(collidersRef.current, false);
          if (hits.length > 0) blocked = true;
        }
        if (!blocked) {
          const currentY = avatarRef.current.position.y;
          avatarRef.current.position.add(step);
          if (currentY > 2.0) {
            avatarRef.current.position.y = 3.5; // Stay on First Floor
          } else {
            avatarRef.current.position.y = 0;   // Stay on Ground Floor
          }
          //avatarRef.current.position.y = 0; // stay grounded
        }
      }

      // Facing
      if (isFPP) {
        const e = new THREE.Euler().setFromQuaternion(camera.quaternion, "YXZ");
        const yawQuat = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0, e.y, 0)
        );
        const slerpAlpha = 1 - Math.exp(-TURN_SMOOTH * delta);
        avatarRef.current.quaternion.slerp(yawQuat, slerpAlpha);
      } else {
        if (hasInput && !isBackwardOnly) {
          const yaw = Math.atan2(dir.x, dir.z);
          const targetQuat = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(0, yaw, 0)
          );
          const slerpAlpha = 1 - Math.exp(-TURN_SMOOTH * delta);
          avatarRef.current.quaternion.slerp(targetQuat, slerpAlpha);
        }
      }

      // Camera follow
      const avatarPos = avatarRef.current.position;
      const camLerp = 1 - Math.exp(-CAM_SMOOTH * delta);
      if (isFPP) {
        const avatarForward = LOCAL_FORWARD.clone()
          .applyQuaternion(avatarRef.current.quaternion)
          .normalize();
        const camTargetPos = avatarPos
          .clone()
          .add(new THREE.Vector3(0, CAM_HEIGHT * 0.9, 0))
          .add(avatarForward.clone().multiplyScalar(0.1));
        camera.position.lerp(camTargetPos, camLerp);
      } else {
        const avatarForward = LOCAL_FORWARD.clone()
          .applyQuaternion(avatarRef.current.quaternion)
          .normalize();
        const camTargetPos = avatarPos
          .clone()
          .add(new THREE.Vector3(0, CAM_HEIGHT, 0))
          .add(avatarForward.clone().multiplyScalar(-CAM_DISTANCE));
        camera.position.lerp(camTargetPos, camLerp);
        const lookTarget = avatarPos
          .clone()
          .add(new THREE.Vector3(0, CAM_HEIGHT * 0.85, 0))
          .add(avatarForward.clone().multiplyScalar(3));
        camera.lookAt(lookTarget);
      }

      // Animation state
      const speedNow = vel.current.length();
      const nextAnim =
        speedNow < 0.05
          ? "idle"
          : (keys.current.shift || (hasJoystick && joyMag > 0.8)) && speedNow > WALK_SPEED * 0.9
          ? "run"
          : "walk";
      if (nextAnim !== anim) setAnim(nextAnim);
    });


    const avatarClones = useMemo(() => {
      if (!businessMan?.scene && !businessWomanSeat?.scene) return [];
      const count = Math.max(0, Math.min(avatarMetaList.length, AVATAR_POINTS.length));

      return Array.from({ length: count }, (_, i) => {
        const meta = avatarMetaList[i];
        const gender = (meta?.gender || "").toString().toLowerCase();
        const isFemale =
          gender === "female" ||
          gender === "f" ||
          gender === "woman" ||
          gender === "lady";

        const sourceScene =
          isFemale && businessWomanSeat?.scene
            ? businessWomanSeat.scene
            : businessMan?.scene;

        if (!sourceScene) return null;

        const clone = SkeletonUtils.clone(sourceScene);
        clone.traverse((o) => {
          if (o.isMesh) {
            o.frustumCulled = false;
            o.castShadow = true;
            o.receiveShadow = true;
            o.raycast = THREE.Mesh.prototype.raycast;
          }
        });
        clone.scale.setScalar(1);
        clone.name = AVATAR_POINTS[i]?.id ?? `Av${String(i + 1).padStart(2, "0")}`;
        return clone;
      }).filter(Boolean);
    }, [businessMan, businessWomanSeat, avatarMetaList]);

    const disposeObject = React.useCallback((obj) => {
    if (!obj) return;
    obj.traverse((child) => {
      if (child.isMesh) {
        child.geometry?.dispose?.();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m?.dispose?.());
        } else {
          child.material?.dispose?.();
        }
      }
    });
    obj.parent?.remove?.(obj);
  }, []);

  // Keep track of last rendered clones; dispose them whenever the set changes
  const prevClonesRef = useRef([]);
  useEffect(() => {
    // dispose previously rendered clones
    prevClonesRef.current.forEach(disposeObject);
    // remember current set (they will be disposed on next change/unmount)
    prevClonesRef.current = avatarClones;
    return () => {
      // final cleanup on unmount
      prevClonesRef.current.forEach(disposeObject);
      prevClonesRef.current = [];
    };
  }, [avatarClones, disposeObject]);

  // Force-remount the avatars group when the participant list changes,
  // ensuring React fully unmounts prior nodes when list becomes empty.
  const avatarsKey = useMemo(
    () => `avatars-${visibleNames.join("|")}-${visibleNames.length}`,
    [visibleNames]
  );

  // Group to contain all remote avatars so we can brutally clear it
  const avatarsGroupRef = useRef();

  // When participant list becomes empty, nuke everything inside the group
  useEffect(() => {
    if (!avatarsGroupRef.current) return;
    if (visibleNames.length === 0) {
      const g = avatarsGroupRef.current;
      // copy to avoid mutating while iterating
      [...g.children].forEach((child) => {
        g.remove(child);
        disposeObject(child);
      });
    }
  }, [visibleNames, disposeObject]);

  // Also clear on unmount just in case
  useEffect(() => {
    return () => {
      if (!avatarsGroupRef.current) return;
      const g = avatarsGroupRef.current;
      [...g.children].forEach((child) => {
        g.remove(child);
        disposeObject(child);
      });
    };
  }, [disposeObject]);

  useEffect(() => {
    function handleRegionSelect(e) {
        const region = e.detail;

        if (!sz_globeMixerRef.current) return;

        // Stop looping Globe animation
        const mixer = sz_globeMixerRef.current;
        mixer.stopAllAction();
        szIdleActionRef.current?.stop();

        const clipName =
            region === "Americas" ? "Empty.001Action.003" :
            region === "APAC"     ? "Empty.001Action.002" :
            region === "EMEA"     ? "Empty.001Action.001" : null;

        if (!clipName) return;

        const clip = THREE.AnimationClip.findByName(sz_globe.animations, clipName);
        if (!clip) return;

        const idle = mixer.clipAction(clip);
        idle.setLoop(THREE.LoopRepeat, Infinity);
        idle.clampWhenFinished = false;
        idle.timeScale = 0.5;
        idle.reset().play();
        szIdleActionRef.current = idle;
    }

    function handlePopupClosed() {

        // restore original loop animation
        if (!sz_globeMixerRef.current) return;

        const clip = THREE.AnimationClip.findByName(sz_globe.animations, "Globe");
        if (!clip) return;

        const mixer = sz_globeMixerRef.current;
        mixer.stopAllAction();

        const action = mixer.clipAction(clip);
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.clampWhenFinished = false;
        action.timeScale = 0.5;
        action.reset();
        action.play();
    }

    window.addEventListener("regionSelected", handleRegionSelect);
    window.addEventListener("regionPopupClosed", handlePopupClosed);

    return () => {
        window.removeEventListener("regionSelected", handleRegionSelect);
        window.removeEventListener("regionPopupClosed", handlePopupClosed);
    };
}, [sz_globe.scene, sz_globe.animations]);

    return (
      <>
        {/* Lighting */}
        <Environment preset="sunset" />
        <ambientLight intensity={0.4} />

        {/* Mouse-look (click canvas to lock pointer) in FPP */}
        {/* <PointerLockControls enabled={isFPP && pointerEnabled} /> */}

        {/* Scene */}
        <primitive object={scene} position={[-25, 0, 25]} />

        {/* {libText?.scene && (
          <primitive
            object={libText.scene}
            position={[-25, 0, 25]} 
          />
        )} */}
        {sz_globe?.scene && (
          <primitive
            object={sz_globe.scene}
            position={[-25, 0, 25]}
          />
        )}

        <primitive
          object={businessWoman.scene}
          position={[BUSINESSWOMAN_POS.x, BUSINESSWOMAN_POS.y, BUSINESSWOMAN_POS.z]}
          //position={[-17.8, 0.2, 2.7]}
          rotation={[0, THREE.MathUtils.degToRad(BUSINESSWOMAN_POS.rotationY), 0]}
        />

        {/* Poster video surface */}
        {scene && scene.getObjectByName("IW_Screen") && (
          <VideoSurface
            mesh={scene.getObjectByName("IW_Screen")}
            frameMesh={scene.getObjectByName("IW_ScreenFrame")}
            loop={true}
            autoplay={true}
            // isActive={iwScreenActive}
            showVid1={showVid1}
            showVid2={showVid2}
            showImg={showImg}
            impactWallMode={impactWallMode}
            iwVideoIndex={iwVideoIndex}
            showBlackImg={showBlackImg}
          />
        )}
        {scene && scene.getObjectByName("SZ_Wall_Screen04") && (
          <Solution_VideoSurface
            mesh={scene.getObjectByName("SZ_Wall_Screen04")}
            videoSrc={
              hoverMiniVideo
              ? SZ_MINI_CONFIG[hoverMiniVideo].hoverVideo
              : szVideoOverride === "HS1"
              ? "/videos/SZ_Videos/solution_video_V7_Without _Icons.mp4" //"/videos/SZ_Videos/KPMG_Initial_Page.mp4"
              : szVideoOverride === "Globe"
              ? "/videos/SZ_Videos/KPMG_Logo.mp4"
              : "/videos/SZ_Videos/solution_video_V7.mp4" //"/videos/SZ_Videos/Solution_Zone_Initial_Page4.mp4" //"/videos/SZ_Videos/Solution_zone_initial_page.mp4"
            }
          />
        )}

        {/* SZ zone screens */}
        {scene && scene.getObjectByName("SZ_screen1001") && (
          <VideoSurface
            mesh={scene.getObjectByName("SZ_screen1001")}
            autoplay={true}
            isActive={true}
            videoSrcList={["/videos/Clara.mp4"]}
          />
        )}

        {scene && scene.getObjectByName("SZ_screen1002") && (
          <VideoSurface
            mesh={scene.getObjectByName("SZ_screen1002")}
            autoplay={true}
            isActive={true}
            videoSrcList={["/videos/Digital Gateway.mp4"]}
          />
        )}

        {scene && scene.getObjectByName("SZ_screen1003") && (
          <VideoSurface
            mesh={scene.getObjectByName("SZ_screen1003")}
            autoplay={true}
            isActive={true}
            videoSrcList={["/videos/MindBridge.mp4"]}
          />
        )}

        {scene && scene.getObjectByName("SZ_screen1004") && (
          <VideoSurface
            mesh={scene.getObjectByName("SZ_screen1004")}
            autoplay={true}
            isActive={true}
            videoSrcList={["/videos/Velocity.mp4"]}
          />
        )}

        {/* Library Shelf Screen - Impact Stories */}
        {scene && scene.getObjectByName("LIB_ShelfScreen") && (
          <VideoSurface
            mesh={scene.getObjectByName("LIB_ShelfScreen")}
            autoplay={true}
            isActive={true}
            videoSrcList={["/videos/1.mp4"]}
          />
        )}
        {scene && scene.getObjectByName("Right_Lib_wall_Screen_Mesh") && (
          <VideoSurface 
            mesh={scene.getObjectByName("Right_Lib_wall_Screen_Mesh")}
            autoplay={true}
            isActive={true}
            videoSrcList={["/videos/1_global.mp4"]}
          />
        )}
        {/* Conference Hub Left Screen Video Surface */}
        {scene && scene.getObjectByName("MR_Left_Screen_Frame") && (
          <LeftScreenVideo
            mesh={scene.getObjectByName("MR_Left_Screen_Frame")}
            frameMesh={scene.getObjectByName("MR_Left_Screen")}
            isVisible={leftScreenVisible}
          />
        )}

{/* Remote avatars */}
{participantCount > 0 && visibleNames.length > 0 && (
  <group ref={avatarsGroupRef} key={avatarsKey}>
    {avatarClones.map((obj, i) => {
      const pt = AVATAR_POINTS[i];

      if (pt?.rotationY !== undefined) {
        obj.rotation.set(0, THREE.MathUtils.degToRad(pt.rotationY), 0);
      }

      const pos = pt?.position ?? [0, 0, 0];
      const labelText =
        visibleNames?.[i] ?? pt?.name ?? pt?.label ?? `User ${i + 1}`;

      const boxW =
        estimateTextWidth(labelText, LABEL_FONT_SIZE) + LABEL_PAD_X * 2;

      const boxH = LABEL_FONT_SIZE * 1.2 + LABEL_PAD_Y;
      const labelKey = pt?.id ?? `av-${i}`;
      const isLabelVisible = ALWAYS_SHOW_REMOTE_LABELS || !!hoverLabelMap[labelKey];

      return (
        <group
          key={pt?.id ?? i}
          position={pos}
        >
          <primitive
            object={obj}
            onPointerOver={(e) => {
              e.stopPropagation();
              showHoverLabelFor5s(labelKey);
            }}
          />

          {isLabelVisible && (
            <Billboard position={[0, LABEL_OFFSET_Y, 0]}>
              <RoundedBox
                args={[boxW, boxH, LABEL_DEPTH]}
                radius={boxH / 2}
                smoothness={8}
                position={[0, boxH / 2, -0.005]}
              >
                <meshBasicMaterial color="#0f3d8c" transparent opacity={0.9} />
              </RoundedBox>

              <Text
                fontSize={LABEL_FONT_SIZE}
                anchorX="center"
                anchorY="middle"
                position={[0, boxH / 2, 0]}
                depthTest={false}
              >
                {labelText}
              </Text>
            </Billboard>
          )}
        </group>
      );
    })}
  </group>
)}

        {/* Curved Video screen(s) */}
        {/* {VIDEO_SCREENS.map((vs) => (
          <CurvedVideoScreen
            key={vs.id}
            position={vs.position}
            radius={vs.radius}
            height={vs.height}
            arcDeg={vs.arcDeg ?? 80}
            rotationY={vs.rotationY ?? 0}
            segments={vs.segments ?? 64}
            thetaStartDeg={vs.thetaStartDeg}
          />
        ))} */}

        {/* Whiteboard screen(s) */}
        {/* {WHITEBOARD_SCREENS.map((scr) => (
          <WhiteboardScreen
            key={scr.id}
            position={scr.position}
            size={scr.size}
            rotationY={scr.rotationY ?? 0}
          />
        ))} */}

        {/* {SCREENSHARE_SCREENS.map((ss) => (
          <CurvedScreenShare
            key={ss.id}
            position={ss.position}
            radius={ss.radius}
            height={ss.height}
            arcDeg={ss.arcDeg ?? 80}
            rotationY={ss.rotationY ?? 0}
            segments={ss.segments ?? 64}
            thetaStartDeg={ss.thetaStartDeg}
          />
        ))} */}

        {/* Local avatar (simple capsule). Hidden in FPP, visible in TPP. */}
        <group ref={avatarRef}>
          <mesh visible={!isFPP} castShadow position={[0, 0.9, 0]}>
            {/* Capsule: radius=0.25, length=1.2 */}
            <capsuleGeometry args={[0.25, 1.2, 8, 16]} />
            <meshStandardMaterial metalness={0.1} roughness={0.8} />
          </mesh>
          {!isFPP && (
            <Billboard position={[0, LABEL_OFFSET_Y, 0]}>
              {(() => {
                const youText = "You";
                const boxW = estimateTextWidth(youText, LABEL_FONT_SIZE) + LABEL_PAD_X * 2;
                const boxH = LABEL_FONT_SIZE * 1.2 + LABEL_PAD_Y;
                return (
                  <>
                    <RoundedBox
                    args={[boxW, boxH, LABEL_DEPTH]}
                    radius={boxH / 2}
                    smoothness={8}
                    position={[0, boxH / 2, -0.006]} 
                  >
                    <meshBasicMaterial color="#ffffff" transparent opacity={1} />
                  </RoundedBox>

                  <RoundedBox
                    args={[
                      boxW - LABEL_BORDER_THICKNESS * 2,
                      boxH - LABEL_BORDER_THICKNESS * 2,
                      LABEL_DEPTH + 0.0001
                    ]}
                    radius={(boxH - LABEL_BORDER_THICKNESS * 2) / 2}
                    smoothness={8}
                    position={[0, boxH / 2, -0.005]}
                  >
                    <meshBasicMaterial color="#5f9ec4" transparent opacity={0.9} />
                  </RoundedBox>
                  </>
                );
              })()}
              <Text
                fontSize={LABEL_FONT_SIZE}
                anchorX="center"
                anchorY="middle"
                position={[0, boxH / 2, 0]}
                depthTest={false}
              >
                You
              </Text>
            </Billboard>
          )}
        </group>
      </>
    );
  }
);

useGLTF.preload("/models/Innovation_Center_V11_Check_v25_Anim.compressed.glb");
useGLTF.preload("/models/SeatedAvatar.glb");
useGLTF.preload("/models/Avatar_Seated_3_LightBlue.glb");
useGLTF.preload("/models/Lady_AI5.glb");
useGLTF.preload("/models/Lady_AI4.glb");
useGLTF.preload("/models/Lib_Text_01.glb");
useGLTF.preload("/models/SZ_Globe.glb");
