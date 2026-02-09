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

    const getParticipantVideos = () => {
    const vids = Array.from(document.querySelectorAll("video"));
    return vids.filter((v) => {
    const stream = v.srcObject;
    if (!(stream instanceof MediaStream)) return false;
    const tracks = stream.getVideoTracks?.() || [];
    if (tracks.length === 0) return false;

    const attrBlob = `${v.getAttribute("data-source") || ""} ${v.getAttribute("data-agora-source") || ""} ${v.className || ""}`.toLowerCase();
    const hintedScreen = attrBlob.includes("screen") || attrBlob.includes("screenshare");

    const isDisplayCapture = (t) => {
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
    };
        const anyDisplayTrack = tracks.some(isDisplayCapture);
        const hiRes = (v.videoWidth || 0) >= 1600 || (v.videoHeight || 0) >= 900;

        return hintedScreen || anyDisplayTrack || hiRes;
        });
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
        const vids = getParticipantVideos();

        // Clear background
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (vids.length === 0) {
            tex.needsUpdate = true;
            return;
        }
        
        const cols = Math.ceil(Math.sqrt(vids.length));
        const rows = Math.ceil(vids.length / cols);
        const cellW = Math.floor(canvas.width / cols);
        const cellH = Math.floor(canvas.height / rows);

        vids.forEach((v, i) => {
            const c = i % cols;
            const r = Math.floor(i / cols);
            const dx = c * cellW;
            const dy = r * cellH;

            try {
                if (v.readyState >= 2) {
                    ctx.drawImage(v, dx, dy, cellW, cellH);
                }
            } catch (_) {}
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
        g.scale(-1, 1, -1);
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
