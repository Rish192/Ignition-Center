import * as THREE from "three";
import React, { useMemo } from "react";

export default function WhiteboardScreen({
    position = [0, 0, 0],   
    size = [2, 1],          
    rotationY = 0           
    }) {
    const rotY = useMemo(() => THREE.MathUtils.degToRad(rotationY), [rotationY]);
    return (
        <mesh position={position} rotation={[0, rotY, 0]} castShadow receiveShadow>
        <planeGeometry args={size} />
        <meshStandardMaterial
            color="#ffffff"
            roughness={1}
            metalness={0}
            side={THREE.DoubleSide}
        />
        </mesh>
    );
}
