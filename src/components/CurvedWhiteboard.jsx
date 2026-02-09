// CurvedWhiteboard.jsx
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export default function CurvedWhiteboard({
    centerAngle = 0,
    radius = 6,
    arc = 60,
    height = 3.5,
    elevation = 1.7,
    segments = 128,
    onOpenPopup,
    controlsRef,
    }) {
    // angles
    const thetaStart = THREE.MathUtils.degToRad(centerAngle - arc / 2);
    const thetaLength = THREE.MathUtils.degToRad(arc);

    // canvas/texture
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const textureRef = useRef(null);
    const panelRef = useRef(null);    // NEW: visible panel mesh
    const colliderRef = useRef(null); // NEW: invisible click mesh
    const rayRef = useRef(new THREE.Raycaster());
    const { camera, gl } = useThree(); // NEW

    const texture = useMemo(() => {
        const canvas = document.createElement("canvas");
        canvas.width = 1920;
        canvas.height = 1080;
        const ctx = canvas.getContext("2d");
        canvasRef.current = canvas;
        ctxRef.current = ctx;

        const tex = new THREE.CanvasTexture(canvas);
        tex.encoding = THREE.sRGBEncoding;
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.flipY = true;
        tex.repeat.x = -1; // mirror horizontally for cylinder backside
        tex.offset.x = 1;
        textureRef.current = tex;
        return tex;
    }, []);

    // --- Robust DOM-level click handling (works with/without pointer lock) ---
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

    // --- Pointer-locked fallback: center-of-screen mousedown ---
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



    // draw loop
    useEffect(() => {
        const id = setInterval(() => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        if (!canvas || !ctx) return;

        // background
        ctx.fillStyle = "#0b1f46";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // static placeholder text
        ctx.font = "bold 60px Inter, Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.fillText("Click to open Whiteboard", canvas.width / 2, canvas.height / 2);

        if (textureRef.current) textureRef.current.needsUpdate = true;
        }, 500); // refresh every 0.5s is enough for static text
        return () => clearInterval(id);
    }, []);

    return (
        <group position={[0, elevation, 0]}>
        <mesh
            ref={panelRef}
            frustumCulled={false}
            onPointerDown={(e) => { e.stopPropagation(); onOpenPopup?.(); }}
        >
            <cylinderGeometry
            args={[radius, radius, height, segments, 1, true, thetaStart, thetaLength]}
            />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>

        <mesh
            ref={colliderRef}
            frustumCulled={false}
        >
            <cylinderGeometry
            args={[
                radius * 1.002,
                radius * 1.002,
                height * 1.01,
                segments,
                1,
                true,
                thetaStart,
                thetaLength,
            ]}
            />
            <meshStandardMaterial color="#0a0a0a" side={THREE.FrontSide} />
        </mesh>
        
        {/* Invisible click collider to open Whiteboard popup */}
        <mesh
        onPointerDown={(e) => {
            e.stopPropagation();
            onOpenPopup?.();
        }}
        >
        <cylinderGeometry
        args={[radius * 1.0035, radius * 1.0035, height, segments, 1, true, thetaStart, thetaLength]}
        />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
            
        </group>
    );
}
