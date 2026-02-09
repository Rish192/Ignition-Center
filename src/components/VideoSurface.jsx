import { useEffect, useRef } from "react";
import * as THREE from "three";

export function VideoSurface({
  mesh,
  impactWallMode,
  iwVideoIndex,
  isActive = true,
  autoplay = true,
  showBlackImg = false,
  videoSrcList,
}) {
  const videoRef = useRef(null);
  const textureRef = useRef(null);
  const materialRef = useRef(null);
  const originalMaterialRef = useRef(null);
  const currentIndexRef = useRef(0);
  const blackTextureRef = useRef(null);
  const blackMaterialRef = useRef(null);

  const defaultVideoFiles = ["/videos/IW/Vid_4.mp4", "/videos/IW/Vid_5.mp4"];
  const videoFiles =
    Array.isArray(videoSrcList) && videoSrcList.length > 0
      ? videoSrcList
      : defaultVideoFiles;
  
  const fadeIn = () => {
    const material = materialRef.current;
    if (!material) return;

    material.opacity = 0;
    material.transparent = true;

    let fade = 0;
    const fadeInterval = setInterval(() => {
      fade += 0.03;
      material.opacity = Math.min(fade, 1);
      if (fade >= 1) clearInterval(fadeInterval);
    }, 30);
  };

  useEffect(() => {
    if (!mesh || !mesh.material) return;

    originalMaterialRef.current = mesh.material;

    const blackTexture = new THREE.TextureLoader().load("/images/BlackImg.png");
    blackTexture.flipY = false;

    const blackMaterial = new THREE.MeshBasicMaterial({ map: blackTexture });
    blackTextureRef.current = blackTexture;
    blackMaterialRef.current = blackMaterial;

    const video = document.createElement("video");
    video.src = videoFiles[0];
    video.muted = true;
    video.crossOrigin = "anonymous";
    video.setAttribute("playsinline", "true");
    video.loop = false; // LOOPING ONLY MANUAL
    videoRef.current = video;

    const texture = new THREE.VideoTexture(video);
    texture.flipY = false;
    textureRef.current = texture;

    const mat = new THREE.MeshBasicMaterial({ map: texture });
    materialRef.current = mat;

    mesh.material = mat;
    
    fadeIn();
    // AUTO LOOP MODE (outside Impact Wall)
    // function handleEnded() {
    //   currentIndexRef.current =
    //     (currentIndexRef.current + 1) % videoFiles.length;

    //   video.src = videoFiles[currentIndexRef.current];
    //   fadeIn();
    //   video.load();
    //   video.play().catch((e) => console.error(e));
    // }

    // video.addEventListener("ended", handleEnded);

    // return () => {
    //   video.removeEventListener("ended", handleEnded);
    // };
  }, [mesh]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    fadeIn();
    if (impactWallMode) {
      // Play only the selected video
      video.src = videoFiles[iwVideoIndex];
      video.loop = true;
    } else {
      // RESET TO AUTO SLIDESHOW MODE
      //currentIndexRef.current = 0;
      video.src = videoFiles[0];
      video.loop = true;
    }
    video.load();
      video.play().catch((e) => console.error(e));
  }, [impactWallMode, iwVideoIndex]);

  useEffect(() => {
    if (!mesh) return;

    const videoMaterial = materialRef.current;
    const blackMaterial = blackMaterialRef.current;

    if (!videoMaterial || !blackMaterial) return;

    if (showBlackImg) {
      mesh.material = blackMaterial;

      // Pause video
      const video = videoRef.current;
      if (video && !video.paused) {
        video.pause();
      }
    } else {
      mesh.material = videoMaterial;

      // Resume video if needed
      const video = videoRef.current;
      if (video && autoplay) {
        video.play().catch(() => {});
      }
    }
  }, [showBlackImg, mesh, autoplay]);


  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      if (autoplay && video.paused) {
        video.play().catch(() => {});
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
    }
  }, [isActive, autoplay]);

  useEffect(() => {
    const video = videoRef.current;
    const texture = textureRef.current;
    const material = materialRef.current;
    const original = originalMaterialRef.current;

    const currentMesh = mesh;

    return () => {
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
      if (texture) texture.dispose();
      if (material) material.dispose();
      if (currentMesh && original) currentMesh.material = original;
    };
  }, [mesh]);

  return null;
}
