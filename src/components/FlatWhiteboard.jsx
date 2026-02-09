import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export default function FlatWhiteboard({
centerAngle = 0,   // degrees around Y
radius = 6,        // distance from scene center
arc = 60,          // used to compute width (chord length)
height = 3.5,
elevation = 1.7,
segments = 1,      // plane segs (kept for API symmetry)
onOpenPopup,
controlsRef,
}) {
const panelRef = useRef(null);     // visible plane
const colliderRef = useRef(null);  // invisible, slightly larger plane
const canvasRef = useRef(null);
const ctxRef = useRef(null);
const textureRef = useRef(null);
const rayRef = useRef(new THREE.Raycaster());

const { camera, gl } = useThree();

const rotY = THREE.MathUtils.degToRad(centerAngle);
const width = useMemo(() => {
    const shrinkDeg = 4; // small safety gap so it doesn't touch neighbors
    const half = THREE.MathUtils.degToRad(Math.max(arc - shrinkDeg, 1)) / 2;
    return 2 * radius * Math.sin(half);
}, [arc, radius]);

// Texture (same placeholder text as before)
const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    canvasRef.current = canvas;
    ctxRef.current = ctx;

    const tex = new THREE.CanvasTexture(canvas);
    tex.encoding = THREE.sRGBEncoding;
    tex.flipY = true;
    textureRef.current = tex;
    return tex;
}, []);


useEffect(() => {
    if (!gl?.domElement) return;
    const handleCanvasClick = (ev) => {
    const rect = gl.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(
        ((ev.clientX - rect.left) / rect.width) * 2 - 1,
        -((ev.clientY - rect.top) / rect.height) * 2 + 1
    );
    rayRef.current.setFromCamera(ndc, camera);
    const targets = [colliderRef.current, panelRef.current].filter(Boolean);
    for (const m of targets) {
        const hit = m && rayRef.current.intersectObject(m, false)[0];
        if (hit) { onOpenPopup?.(); break; }
    }
    };
    gl.domElement.addEventListener("click", handleCanvasClick);
    return () => gl.domElement.removeEventListener("click", handleCanvasClick);
}, [gl, camera, onOpenPopup]);

// Pointer-locked fallback: center-of-screen mousedown
useEffect(() => {
    const onMouseDown = () => {
    if (controlsRef?.current?.isLocked) {
        rayRef.current.setFromCamera(new THREE.Vector2(0, 0), camera);
        const targets = [colliderRef.current, panelRef.current].filter(Boolean);
        for (const m of targets) {
        const hit = m && rayRef.current.intersectObject(m, false)[0];
        if (hit) { onOpenPopup?.(); break; }
        }
    }
    };
    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
}, [camera, controlsRef, onOpenPopup]);


useEffect(() => {
    const id = setInterval(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    ctx.fillStyle = "#0b1f46";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 60px Inter, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText("Click to open Whiteboard", canvas.width / 2, canvas.height / 2);

    if (textureRef.current) textureRef.current.needsUpdate = true;
    }, 500);
    return () => clearInterval(id);
}, []);

const inset = 0.05;


return (
    <group position={[0, elevation, 0]} rotation={[0, rotY, 0]}>
    {/* Visible panel */}
    <mesh
        ref={panelRef}
        position={[radius - inset, 0, 0]}
        onUpdate={(m) => m.lookAt(0, elevation, 0)}
        onPointerDown={(e) => { e.stopPropagation(); onOpenPopup?.(); }}
        frustumCulled={false}
    >
        <planeGeometry args={[width, height, segments, segments]} />
        <meshBasicMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>

    {/* Invisible, slightly larger click collider */}
    <mesh
        ref={colliderRef}
        position={[radius - inset, 0, 0]}
        onUpdate={(m) => m.lookAt(0, elevation, 0)}
        frustumCulled={false}
    >
        <planeGeometry args={[width * 1.04, height * 1.04, 1, 1]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
    </group>
);
}
