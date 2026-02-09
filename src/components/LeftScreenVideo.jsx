import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function LeftScreenVideo({ mesh, frameMesh, isVisible }) {
  const videoRef = useRef(null);
  const textureRef = useRef(null);
  const materialRef = useRef(null);
  const originalMaterial = useRef(null);

  useEffect(() => {
    if (!mesh || !mesh.material) return;

    if (!videoRef.current) {
      originalMaterial.current = mesh.material;

      const video = document.createElement("video");
      video.src = "/videos/Left_Screen_Video3.mp4";
      video.loop = true;
      video.muted = true;
      video.autoplay = true;
      video.crossOrigin = "anonymous";
      video.setAttribute("playsinline", "true");

      const texture = new THREE.VideoTexture(video);
      texture.flipY = false;

      const material = new THREE.MeshBasicMaterial({ map: texture });

      videoRef.current = video;
      textureRef.current = texture;
      materialRef.current = material;

      mesh.material = material;

      video.play().catch((e) => console.log("Video play error:", e));
    }
  }, [mesh]);

  // useEffect(() => {
  //   if (!mesh || !frameMesh) return;

  //   mesh.visible = isVisible;
  //   frameMesh.visible = isVisible;
  // }, [isVisible, mesh, frameMesh]);

  useEffect(() => {
    return () => {
      // cleanup on unmount
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute("src");
        videoRef.current.load();
      }
      if (textureRef.current) textureRef.current.dispose();
      if (materialRef.current) materialRef.current.dispose();

      if (mesh && originalMaterial.current) {
        mesh.material = originalMaterial.current;
      }
    };
  }, []);

  return null;
}
