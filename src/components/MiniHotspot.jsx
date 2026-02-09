// MiniHotspot.jsx
import React, { useState } from "react";
import { Html } from "@react-three/drei";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

export function MiniHotspot({
  id,
  position = [0, 0, 0],
  type, // "close" or "fullscreen"
  onClick,
  color = "rgba(255,255,255,0.8)",
  size = "1.8vw",
  zIndexRange = [20, 0],
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Html
      position={position}
      transform={false}
      occlude={false}
      zIndexRange={zIndexRange}
      pointerEvents="auto"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: "1px solid white",
          backgroundColor: hovered ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.3)",
          color,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.25s ease",
          transform: hovered ? "scale(1.15)" : "scale(1)",
        }}
      >
        {type === "close" ? (
          <CloseIcon sx={{ fontSize: "1.2vw" }} />
        ) : (
          <FullscreenIcon sx={{ fontSize: "1.2vw" }} />
        )}
      </button>
    </Html>
  );
}

export default MiniHotspot;
