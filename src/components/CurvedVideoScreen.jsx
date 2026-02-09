import * as THREE from "three";
import React, { useMemo, useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function CurvedVideoScreen({
    position = [0, 0, 0],     
    radius = 2.4,             
    height = 2.0,             
    arcDeg = 80,              
    rotationY = 0,            
    segments = 64,            
    thetaStartDeg,           
    }) {

    const canvasRef = useRef(null);
    const texRef = useRef(null);
    const matRef = useRef(null);
    const [texReady, setTexReady] = useState(false);
    const lastScanRef = useRef(0);
    const participantsRef = useRef({ tiles: [], key: 0 });

        const isScreenShareTrack = (tracks) => {
        return tracks.some((t) => {
            const label = (t.label || "").toLowerCase();
            const s = t.getSettings ? t.getSettings() : {};
            const surface = (s.displaySurface || "").toString().toLowerCase();
            return (
                surface === "monitor" ||
                surface === "window" ||
                surface === "application" ||
                surface === "browser" ||
                label.includes("screen") ||
                label.includes("display") ||
                label.includes("tab") ||
                label.includes("window") ||
                label.includes("monitor") ||
                label.includes("share")
            );
        });
    };

    // Find the most likely name label inside/near a VideoPlayer tile
    const findNameForElement = (el) => {
        let node = el;
        for (let up = 0; node && up < 4; up++) {
            // look for the Typography label within this subtree
            const label = node.querySelector?.(".MuiTypography-root");
            const txt = label?.textContent?.trim();
            if (txt && txt.length <= 64 && txt.toLowerCase() !== "collaboration dome") {
                return txt;
            }
            node = node.parentElement;
        }
        return undefined;
    };

    // Collects video tiles (with a <video>) and audio-only tiles (no <video>, but with a name label).
    const scanParticipants = () => {
        // 1) Collect all valid <video> elements that belong to people (exclude screen-share)
        const videos = Array.from(document.querySelectorAll("video")).filter((v) => {
            const rect = v.getBoundingClientRect?.();
            if (!rect || rect.width === 0 || rect.height === 0) return false;
            const stream = v.srcObject;
            if (!(stream instanceof MediaStream)) return false;
            const tracks = stream.getVideoTracks?.() || [];
            if (tracks.length === 0) return false;
            // skip screen-share feeds
            if (isScreenShareTrack(tracks)) return false;
            // skip any videos explicitly marked as screenshare via data/class hints
            const attrBlob = `${v.getAttribute("data-source") || ""} ${v.getAttribute("data-agora-source") || ""} ${v.className || ""}`.toLowerCase();
            if (attrBlob.includes("screen") || attrBlob.includes("screenshare")) return false;
            return true;
        });

        // Deduplicate by underlying stream id (pinned + grid might show the same user twice)
        const seenStream = new Set();
        const videoTiles = [];
        for (const v of videos) {
            const sid = v.srcObject?.id || v.srcObject;
            if (sid && seenStream.has(sid)) continue;
            if (sid) seenStream.add(sid);
            videoTiles.push({
                kind: "video",
                video: v,
                name: findNameForElement(v),
            });
        }

        // 2) Discover audio-only "tiles": look for absolute-positioned Typography labels
        // that live inside a 16:9 card with no <video> in it.
        const labels = Array.from(document.querySelectorAll(".MuiTypography-root"));
        const audioOnly = [];
        for (const label of labels) {
            const text = label.textContent?.trim();
            if (!text || text.length > 64) continue;
            if (text.toLowerCase() === "collaboration dome") continue; // page title
            // prefer only labels that look like overlays (position: absolute with bottom/left)
            const cs = window.getComputedStyle(label);
            if (cs.position !== "absolute") continue;
            // Walk up to find a container that represents the tile card
            let tile = label.parentElement;
            let found = false;
            for (let i = 0; tile && i < 4; i++) {
                const style = window.getComputedStyle(tile);
                const aspect = style.aspectRatio || "";
                const bg = style.backgroundColor || "";
                const hasVideo = tile.querySelector?.("video");
                if (!hasVideo && (aspect.includes("16 / 9") || bg === "rgb(0, 0, 0)")) {
                    found = true;
                    break;
                }
                tile = tile.parentElement;
            }
            if (!found) continue;
            // Avoid duplicating names if we already have a video tile with the same name
            if (videoTiles.some(t => (t.name || "").toLowerCase() === text.toLowerCase())) continue;
            audioOnly.push({ kind: "audio", name: text });
        }

        return [...videoTiles, ...audioOnly];
    };

    useEffect(() => {
        const canvas = document.createElement("canvas");
        canvas.width = 1280;
        canvas.height = 720;
        canvasRef.current = canvas;

        const tex = new THREE.CanvasTexture(canvas);
        tex.colorSpace = THREE.LinearSRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        texRef.current = tex;
        setTexReady(true);

        return () => {
            tex.dispose?.();
        };
    }, []);

    useFrame(() => {
        const canvas = canvasRef.current;
        const tex = texRef.current;
        if (!canvas || !tex) return;

        const ctx = canvas.getContext("2d");
        // throttle DOM scans to ~5Hz
        const now = performance.now();
        if (now - lastScanRef.current > 200) {
            participantsRef.current.tiles = scanParticipants();
            participantsRef.current.key++;
            lastScanRef.current = now;
        }

        const tiles = participantsRef.current.tiles;

        // Clear background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // If nobody is present at all, show a friendly placeholder
        if (tiles.length === 0) {
            ctx.fillStyle = "#999";
            ctx.font = "28px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("Waiting for participants…", canvas.width / 2, canvas.height / 2);
            tex.needsUpdate = true;
            return;
        }

        // Compute grid (near-square). Keep 16:9-ish cells with padding.
        const N = tiles.length;
        const cols = Math.ceil(Math.sqrt(N));
        const rows = Math.ceil(N / cols);
        const pad = 8; // px padding between tiles
        const cellW = Math.floor((canvas.width - pad * (cols + 1)) / cols);
        const cellH = Math.floor((canvas.height - pad * (rows + 1)) / rows);
        const labelBar = 22; // name ribbon height

        tiles.forEach((tile, i) => {
            const c = i % cols;
            const r = Math.floor(i / cols);
            const x = pad + c * (cellW + pad);
            const y = pad + r * (cellH + pad);

            // draw tile background
            ctx.fillStyle = "#111";
            ctx.fillRect(x, y, cellW, cellH);

            if (tile.kind === "video" && tile.video?.readyState >= 2) {
                // draw video with object-fit: cover
                const vw = tile.video.videoWidth || 16;
                const vh = tile.video.videoHeight || 9;
                const cellAR = (cellW) / (cellH - labelBar);
                const vidAR = vw / vh;
                let dw = cellW, dh = cellH - labelBar, sx = 0, sy = 0, sw = vw, sh = vh;
                if (vidAR > cellAR) {
                    // crop width
                    sh = vh;
                    sw = Math.floor(vh * cellAR);
                    sx = Math.floor((vw - sw) / 2);
                } else {
                    // crop height
                    sw = vw;
                    sh = Math.floor(vw / cellAR);
                    sy = Math.floor((vh - sh) / 2);
                }
                try {
                    ctx.drawImage(tile.video, sx, sy, sw, sh, x, y, cellW, cellH - labelBar);
                } catch (_) {}
            } else {
                // audio-only avatar with initial
                const name = tile.name || "Guest";
                // subtle gradient bubble
                const cx = x + cellW / 2;
                const cy = y + (cellH - labelBar) / 2;
                const radius = Math.max(24, Math.min((cellH - labelBar), cellW) * 0.28);
                const grad = ctx.createRadialGradient(cx - radius/3, cy - radius/3, radius*0.2, cx, cy, radius);
                grad.addColorStop(0, "#1f6feb");
                grad.addColorStop(1, "#0a3069");
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                ctx.fill();
                // initial
                ctx.fillStyle = "#fff";
                ctx.font = `${Math.floor(radius)}px sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                const initial = (name[0] || "?").toUpperCase();
                ctx.fillText(initial, cx, cy + 2);
            }

            // name ribbon (bottom bar)
            const label = (tile.name || "").trim();
            if (label) {
                ctx.fillStyle = "rgba(0,0,0,0.6)";
                ctx.fillRect(x, y + cellH - labelBar, cellW, labelBar);
                ctx.fillStyle = "#fff";
                ctx.font = "12px sans-serif";
                ctx.textAlign = "left";
                ctx.textBaseline = "middle";
                const t = label.length > 28 ? (label.slice(0, 27) + "…") : label;
                ctx.fillText(t, x + 6, y + cellH - labelBar / 2);
            }
        });
        tex.needsUpdate = true;

    });
    const { geo, rotY } = useMemo(() => {
        const arc = THREE.MathUtils.degToRad(arcDeg);
        const thetaStart = THREE.MathUtils.degToRad(
        thetaStartDeg ?? -arcDeg / 2
        );
        const g = new THREE.CylinderGeometry(
        radius,           
        radius,           
        height,           
        Math.max(8, segments), 
        1,                
        true,             
        thetaStart,       
        arc               
        );
        g.scale(-1, 1, 1);
        return { geo: g, rotY: THREE.MathUtils.degToRad(rotationY) };
    }, [radius, height, arcDeg, rotationY, segments, thetaStartDeg]);

    return (
        <mesh position={position} rotation={[0, rotY, 0]} geometry={geo} castShadow receiveShadow>
            <meshStandardMaterial
                ref={matRef}
                attach="material"
                color={texReady ? undefined : "#ffffff"}
                roughness={1}
                metalness={0}
                side={THREE.DoubleSide}
                map={texReady ? texRef.current : null}
            />
        </mesh>
    );
}
