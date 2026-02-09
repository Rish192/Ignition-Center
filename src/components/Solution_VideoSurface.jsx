import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Solution_VideoSurface({ mesh, videoSrc }) {
  const videoRef = useRef(null);
  const textureRef = useRef(null);
  const originalMaterialRef = useRef(null);

  useEffect(() => {
    if (!mesh || !mesh.material) return;

    // Store original material for cleanup
    originalMaterialRef.current = mesh.material;

    // --- CREATE VIDEO ELEMENT ---
    const video = document.createElement("video");
    video.src = videoSrc;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    videoRef.current = video;

    // --- CREATE TEXTURE ---
    const texture = new THREE.VideoTexture(video);
    texture.flipY = false;
    textureRef.current = texture;

    // --- MATERIAL WITH VIDEO ---
    const videoMat = new THREE.MeshBasicMaterial({ map: texture });

    // Assign to mesh
    mesh.material = videoMat;

    // Start video
    video.play().catch(() => {});

    // Cleanup on unmount
    return () => {
      video.pause();
      video.src = "";
      video.load();

      if (texture) texture.dispose();
      if (mesh && originalMaterialRef.current)
        mesh.material = originalMaterialRef.current;
    };
  }, [mesh, videoSrc]);

  return null;
}
