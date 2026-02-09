import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
export default function LiveFeed({
    start,
    end,
    lookStart,
    lookEnd,
    t = 0,
    autoScan = true,
    scanSpeed = 6,
    fov = 40,
    near = 0.1,
    far = 200,
    panelSize = [0.62, 0.31],
    hudOffset = [-0.9, -0.55, -2],
    opacity = 0.85,
    borderColor = "#00F7FF",
    }) {
    const { gl, scene, camera: mainCam, size } = useThree();

    // CCTV camera and target
    const cctvCam = useMemo(
        () => new THREE.PerspectiveCamera(fov, 16 / 9, near, far),
        [fov, near, far]
    );

    const dpr = Math.min(1.75, gl.getPixelRatio?.() || 1);
    const texWidth = Math.floor(512 * dpr);
    const texHeight = Math.floor((512 * 9) / 16 * dpr);
    const rt = useMemo(
        () =>
        new THREE.WebGLRenderTarget(texWidth, texHeight, {
            depthBuffer: true,
            stencilBuffer: false,
            samples: 2,
        }),
        [texWidth, texHeight]
    );

    const hudGroupRef = useRef(null);
    const quadRef = useRef(null);
    const clockRef = useRef(0);

    const lerpVec = (out, a, b, k) => {
        out.set(
        THREE.MathUtils.lerp(a.x, b.x, k),
        THREE.MathUtils.lerp(a.y, b.y, k),
        THREE.MathUtils.lerp(a.z, b.z, k)
        );
        return out;
    };

    useFrame((_, delta) => {
        let k = t;
        if (autoScan) {
        clockRef.current += delta;
        const phase = (clockRef.current / scanSpeed) % 1; 
        const tri = phase < 0.5 ? phase * 2 : (1 - phase) * 2;
        k = 0.5 - 0.5 * Math.cos(tri * Math.PI); // cosine ease
        }

        const p0 = start ?? { x: 0, y: 2, z: 0 };
        const p1 = end ?? { x: 0, y: 2, z: 5 };
        const l0 = lookStart ?? p0;
        const l1 = lookEnd ?? p1;

        const camPos = new THREE.Vector3();
        const lookAt = new THREE.Vector3();
        lerpVec(camPos, p0, p1, k);
        lerpVec(lookAt, l0, l1, k);
        cctvCam.position.copy(camPos);
        cctvCam.lookAt(lookAt);
        cctvCam.updateProjectionMatrix();

        const prevTarget = gl.getRenderTarget();
        gl.setRenderTarget(rt);
        gl.clear();
        gl.render(scene, cctvCam);
        gl.setRenderTarget(prevTarget);

        if (hudGroupRef.current) {
        hudGroupRef.current.position.copy(mainCam.position);
        hudGroupRef.current.quaternion.copy(mainCam.quaternion);
        const off = new THREE.Vector3(...hudOffset);
        hudGroupRef.current.position.add(
            off.clone().applyQuaternion(mainCam.quaternion)
        );
        }
    });

    const [pw, ph] = panelSize;

    return (
        <group ref={hudGroupRef}>
        <mesh position={[-0.065, 0, 0]}>
            <planeGeometry args={[pw, ph]} />
            <meshBasicMaterial
            transparent
            opacity={opacity}
            color={"#0a1b27"}
            />
        </mesh>

        {/* live feed texture */}
        <mesh position={[-0.065, 0, 0.0001]}>
            <planeGeometry args={[pw * 0.96, ph * 0.86]} />
            <meshBasicMaterial map={rt.texture} toneMapped={false} />
        </mesh>

        <mesh position={[-0.065, 0, 0.0002]}>
            <planeGeometry args={[pw, ph]} />
            <meshBasicMaterial
            color={borderColor}
            wireframe
            transparent
            opacity={0.5}
            />
        </mesh>
        </group>
    );
}
