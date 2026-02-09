import React, { useState, useMemo } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

const Frame = ({
    minimizedWidth = "24vw",
    maximizedWidth = "60vw",
    minimizedHeight = "14vw",
    maximizedHeight = "34vw",
    src,
    title = "Embedded frame",
    initialIsMinimized = true,
    borderColor = "rgba(158,199,255,0.6)",
    //borderRadius = "12px",
    backgroundColor = "rgba(0,63,145,0.31)",
    className = "",
    style = {},
    onStateChange,
    onMinimizeChange,
    top,
    left,
    showFullscreen = true,
    popupMode = false, //when opened in Solution Zone
    }) => {
    const [isMinimized, setIsMinimized] = useState(initialIsMinimized);
    const [isClosed, setIsClosed] = useState(false);

    const { width, height } = useMemo(() => {
        if (isMinimized) {
        return { width: minimizedWidth, height: minimizedHeight };
        }
        return { width: maximizedWidth, height: maximizedHeight };
    }, [isMinimized, minimizedWidth, maximizedWidth, minimizedHeight, maximizedHeight]);

    const handleToggleMinimize = () => {
        const next = !isMinimized;
        setIsMinimized(next);
        if (onStateChange) {
        onStateChange({ isMinimized: next, isFullscreen: false, isClosed });
        }
        if (typeof onMinimizeChange === "function") {
            onMinimizeChange(next);
        }
    };
    const handleClose = () => {
        // If in maximized mode, restore minimized state on close
        if (!isMinimized) {
            setIsMinimized(true);
            if (typeof onMinimizeChange === "function") {
                onMinimizeChange(true);
            }
            if (onStateChange) {
                onStateChange({
                    isMinimized: true,
                    isFullscreen: false,
                    isClosed: true
                });
            }
        } else {
            // If already minimized, no modification
            if (onStateChange) {
                onStateChange({
                    isMinimized: true,
                    isFullscreen: false,
                    isClosed: true
                });
            }
        }
        setIsClosed(true);
    };


    if (isClosed) {
        return null;
    }
    let translateX = "0%";
    let translateY = "0%";
    if (popupMode) {
        translateX = isMinimized ? "-25%" : "-19%";
        translateY = "-50%";
    }

    const containerStyle = {
        ...style,
        position: style.position || "relative",
        top: top ?? style.top,
        left: left ?? style.left,
        right: style.right,
        bottom: style.bottom,
        width,
        height,
        ...(popupMode ? { transform: `translate(${translateX}, ${translateY})` } : {}),
        border: `1px solid ${borderColor}`,
        padding: '0.4167vw',
        backgroundColor: style.backgroundColor || backgroundColor,
        overflow: "visible",
        boxShadow: style.boxShadow || "0 8px 24px rgba(0,0,0,0.45)",
        zIndex: style.zIndex ?? 1200,
    };

    return (
        <div className={className} style={containerStyle}>
            {/* Minimize / Maximize toggle */}
            {showFullscreen && (
                <IconButton
                onClick={handleToggleMinimize}
                sx={{
                    position: "absolute",
                    top: '-2.2vw',
                    right: '2.2vw',
                    background: "rgba(1,0,37,0.85)",
                    color: "white",
                    border: "1.14px solid rgba(158,199,255,0.6)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                        background: 'rgba(0,0,0,0.55)',
                        transform: 'scale(1.08)'
                    },
                    width: '2vw',
                    height: '2vw',
                    zIndex: 1,
                }}>
                    {isMinimized ? <FullscreenIcon sx={{fontSize: '1.25vw'}} /> : <FullscreenExitIcon sx={{fontSize: '1.25vw'}} />}
                </IconButton>
            )}
            {/* Top-right close button */}
            <IconButton
            onClick={handleClose}
            sx={{
                position: "absolute",
                top: '-2.2vw',
                right: '0vw',
                width: '2vw',
                height: '2vw',
                border: "1.14px solid rgba(158,199,255,0.6)",
                background: "rgba(1,0,37,0.85)",
                color: "white",
                boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                transition: 'all 0.2s ease',
                '&:hover': { 
                    background: 'rgba(0,0,0,0.55)',
                    transform: 'scale(1.08)'
                },
                zIndex: 1,
            }}>
                <Close sx={{fontSize: '1.25vw'}} />
            </IconButton>

            {/* Iframe */}
            <iframe
                src={src}
                title={title}
                style={{
                width: "100%",
                height: "100%",
                border: "none",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default Frame;
