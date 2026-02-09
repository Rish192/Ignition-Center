import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, useCursor, Html } from "@react-three/drei";
import { Box, Button, IconButton,Typography } from '@mui/material';
import solution_underline from '../assets/solution_underline.png';
import { WAYPOINTS_WORLD } from "./DynamicPoints";

export function WaypointRing2D({
    id,
    position = [0, 0.02, 0],
    color = "#00e5ff",
    size,            // pixels (2D)
    label="",
    desc="",
    onEnter,
    interaction="Enter",
    showLandingPopup,
    zIndexRange = [200, 0], // keep above most Html UI
}) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [showIntroTooltip, setShowIntroTooltip] = useState(false);
    const [hovered, setHovered] = useState(false);
    const tooltipRef = useRef();
    const tooltipWidth = useMemo(() => {
        const wp = WAYPOINTS_WORLD.find(
            (w) => w.id === id || w.label === label
        );
        return wp?.tooltipWidth || "16vw";
    }, [id, label]);

    useEffect(() => {
        // Ensure the static object exists
        if (!WaypointRing2D.hasShownTooltips) {
            WaypointRing2D.hasShownTooltips = {};
        }

        // Check if this label's intro tooltip has been shown before
        const hasShownForThis = WaypointRing2D.hasShownTooltips[label] || false;

        if (!hasShownForThis && !showLandingPopup) {
            setShowIntroTooltip(true);
            WaypointRing2D.hasShownTooltips[label] = true;

            const timer = setTimeout(() => {
                setShowIntroTooltip(false);
            }, 5000);

            return () => clearTimeout(timer);
        } else {
            setShowIntroTooltip(false);
        }
    }, [showLandingPopup, label]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
                setShowTooltip(false);
            }
        };
        if (showTooltip) {
        document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showTooltip]);

    return (
        <Html
        position={position}
        transform={false}
        occlude={false}
        zIndexRange={showTooltip ? [10000000, 9990000] : zIndexRange}
        pointerEvents="auto"
        >
            <div
              ref={tooltipRef}
              style={{position: 'relative', display: 'inline-block'}}>
                <button
                    className={`wp2d ${showTooltip ? "active" : ""}`}
                    aria-label={label}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={(e) => { e.stopPropagation(); setShowTooltip((prev) => !prev); }}
                    style={{
                        // CSS vars let us theme via inline style
                        ["--wp-color"]: showTooltip ? '#0d5267ff' : color,
                        width: size,
                        height: size,
                        transition: "background-color 0.2s ease, transform 0.2s ease",
                        transform: showTooltip ? "scale(1.2)" : "scale(1)",
                        zIndex: 30,
                    }}
                />
                {/* Initial tooltip (only name) */}
                {(!showTooltip || hovered) && (
                  <div
                    style={{
                    position: "absolute",
                    bottom: "2.5vw",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: 'rgba(0, 63, 145, 0.5)',
                    color: "white",
                    border: '1.14px solid rgba(158,199,255,0.6)',
                    borderRadius: "8px",
                    backdropFilter: 'blur(28.5px)',
                    boxShadow: '0px 2.28px 2.28px rgba(0,0,0,0.25)',
                    padding: "0.5vw 1vw",
                    fontSize: "0.8333vw",
                    fontWeight: 600,
                    opacity: (hovered || showIntroTooltip) ? 1 : 0, // fade
                    whiteSpace: "nowrap",
                    transition: "opacity 0.6s ease-in-out",
                    pointerEvents: "none",
                    }}
                  >
                    {label}
                  </div>
                )}

                {/* Custom tooltip */}
                {showTooltip && (
                    <Box sx={{
                        position: 'absolute',
                        top: '20%',
                        left: '70%',
                        width: tooltipWidth,
                        padding: "0.2vw",
                        background: 'rgba(1,91,187,0.8)',
                        color: "white",
                        borderRadius: "0px 10px 10px 10px",
                        backdropFilter: 'blur(0px)',
                        zIndex: 20,
                    }}>
                        <Box sx={{
                            position: 'absolute',
                            top: '-5%',
                            left: 0,
                            boxSizing: 'border-box',
                            p: '0.5vw',
                            pl: '1vw',
                            pr: '2.5vw',
                            fontSize: '0.8333vw',
                            fontWeight: 600,
                            background: '#015BBB',
                            borderRadius: '0px 8px 8px 0px'
                        }}>
                            {label}
                        </Box>
                        <Box 
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowTooltip(false);
                            onEnter?.();
                        }}
                        sx={{
                            width: '100%',
                            height: '100%',
                            boxSizing: 'border-box',
                            p: '0.5vw',
                            pt: '1.75vw',
                            background: 'rgba(32, 109, 191, 0.7)',
                            borderRadius: '10px',
                            cursor: 'pointer',
                        }}>
                            <Box sx={{gap: '0.4167vw', display: 'flex', flexDirection: 'column'}}>
                                <Typography sx={{fontSize: '0.7812vw', whiteSpace: 'pre-wrap'}}>
                                    {desc}
                                </Typography>
                                <Typography sx={{alignSelf: 'center', fontSize: '0.625vw', fontStyle: 'italic'}}>
                                    Click Here to {interaction}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
            </div>
        </Html>
    );
}