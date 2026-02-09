import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Slider, Grow, Zoom } from '@mui/material';
import SettingsIcon from "@mui/icons-material/Settings";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import mouseicon from '../assets/mouse-icon2.png';

export default function SettingsButton ({mouseSensitivity, setMouseSensitivity}) {
    const [openMenu, setOpenMenu] = useState(false);
    const [openLeftBox, setOpenLeftBox] = useState(false);
    const [isFs, setIsFs] = useState(false);
    const [canUseFs, setCanUseFs] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [mouseHovered, setMouseHovered] = useState(false);
    const [fsHovered, setFsHovered] = useState(false);

    const handleSettingsClick = () => {
        setOpenMenu(prev => !prev);
        setOpenLeftBox(false);
    };

    const handleTopIconClick = () => {
        setOpenLeftBox(prev => !prev);
    };

    const fullscreenElement = () =>
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        null;

    const fullscreenEnabled = () =>
        document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.msFullscreenEnabled ||
        false;

    const requestFsTarget = () =>
        document.documentElement ||
        document.getElementById("root") ||
        document.body;

    const requestFsFn = (el) =>
        el.requestFullscreen ||
        el.webkitRequestFullscreen ||
        el.msRequestFullscreen ||
        null;

    const exitFsFn = () =>
        document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen ||
        null;

    const isStandalonePWA = () => {
        return (
        (window.matchMedia &&
            window.matchMedia("(display-mode: standalone)").matches) ||
        (typeof navigator !== "undefined" &&
            "standalone" in navigator &&
            navigator.standalone)
        );
    };

    const canOfferFullscreen = () => {
        const el = requestFsTarget();
        return !!requestFsFn(el) && fullscreenEnabled() && !isStandalonePWA();
    };

    const enterFullscreen = async () => {
        const el = requestFsTarget();
        const req = requestFsFn(el);
        if (!req) return;

        try {
        await req.call(el, { navigationUI: "hide" });
        } catch (e) {}

        if (screen.orientation && screen.orientation.lock) {
        try {
            await screen.orientation.lock("landscape");
        } catch (e) {}
        }
    };

    const exitFullscreen = async () => {
        const exit = exitFsFn();
        if (!exit) return;

        try {
        await exit.call(document);
        } catch (e) {}

        if (screen.orientation && screen.orientation.unlock) {
        try {
            screen.orientation.unlock();
        } catch (e) {}
        }
    };

    useEffect(() => {
        setCanUseFs(canOfferFullscreen());

        const handleChange = () => setIsFs(!!fullscreenElement());

        document.addEventListener("fullscreenchange", handleChange);
        document.addEventListener("webkitfullscreenchange", handleChange);

        return () => {
        document.removeEventListener("fullscreenchange", handleChange);
        document.removeEventListener("webkitfullscreenchange", handleChange);
        };
    }, []);

    if (!canUseFs) return null;

    return (
        <>
            <IconButton 
            disableRipple
            onClick={handleSettingsClick}
            onMouseOver={(e) => {
                setHovered(true);
            }}
            onMouseOut={(e) => {
                setHovered(false);
            }}
            sx={{
                position: 'fixed',
                bottom: '0.3vw',
                right: '0.3vw',
                padding: '0.7vw',
                pointerEvents: 'auto',
                border: '1px solid white',
                //backgroundColor: 'rgba(0, 51, 141, 0.4)',
                background: `
                    linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(2,42,64,0.09)),
                    rgba(0, 39, 89, 0.5)
                `,
                backdropFilter: 'blur(120px)',
                color: 'white',
                zIndex: 3500,
            }}>
                <SettingsIcon sx={{ fontSize: '1.667vw' }}/>
                {hovered && (
                    <Box sx={{
                        position: 'absolute', 
                        top: '0.7vw', 
                        right: '4vw',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'rgba(0,63,145,0.5)',
                        padding: '0.5vw',
                        borderRadius: '8px',
                    }}>
                        <Typography sx={{whiteSpace: 'nowrap', color: 'white', fontSize: '0.7292vw'}}>
                            Settings
                        </Typography>
                    </Box>
                )}
            </IconButton>

            <Zoom in={openMenu} style={{ transitionDelay: openMenu ? '100ms' : '0ms' }}>
              <Box
                sx={{
                  position: 'fixed',
                  bottom: '4vw',
                  right: '0.2vw',
                  //backgroundColor: 'rgba(0, 51, 141, 0.4)',
                  background: `
                    linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(2,42,64,0.09)),
                    rgba(0, 39, 89, 0.5)
                  `,
                  backdropFilter: 'blur(120px)',
                  border: '1px solid white',
                  borderRadius: '40px',
                  boxSizing: 'border-box',
                  padding: '0.4vw ',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4vw',
                  zIndex: 3500,
                  transformOrigin: 'bottom',
                }}
              >
                <IconButton
                  disableRipple
                  onClick={handleTopIconClick}
                  sx={{ color: 'white' }}
                >
                    <img 
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.25)";
                        setMouseHovered(true);
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        setMouseHovered(false);
                      }}
                      src={mouseicon} 
                      style={{ color: 'white', width: '1.5vw', height: '1.5vw',}} />
                    {mouseHovered && !openLeftBox && (
                        <Box sx={{
                            position: 'absolute', 
                            top: 0, 
                            right: '3.5vw',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: 'rgba(0,63,145,0.5)',
                            padding: '0.5vw',
                            borderRadius: '8px',
                        }}>
                            <Typography sx={{whiteSpace: 'nowrap', color: 'white', fontSize: '0.7292vw'}}>
                                Drag Sensitivity
                            </Typography>
                        </Box>
                    )}
                </IconButton>
                <Grow 
                    in={openLeftBox} 
                    style={{ transformOrigin: 'right center' }}
                    {...(openLeftBox ? { timeout: 400 } : {})}
                >
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        right: '4.5vw',
                        width: '12vw',
                        //backgroundColor: 'rgba(0, 51, 141, 0.4)',
                        background: `
                            linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(2,42,64,0.09)),
                            rgba(0, 39, 89, 0.5)
                        `,
                        backdropFilter: 'blur(120px)',
                        border: '1px solid white',
                        borderRadius: '20px',
                        padding: '0.8vw 1vw 0.5vw 1vw',
                        display: 'flex',
                        flexDirection: 'column',
                        // Ensure it doesn't block clicks when hidden
                        visibility: openLeftBox ? 'visible' : 'hidden' 
                    }}>
                        <Typography sx={{ fontSize: '0.8333vw', mb: '0.4vw', color: 'white' }}>
                            Mouse drag sensitivity : <b>{mouseSensitivity.toFixed(2)}</b>
                        </Typography>
                        <Slider
                            min={0.2}
                            max={0.9}
                            step={0.05}
                            value={mouseSensitivity}
                            onChange={(_, v) => {
                                if (Array.isArray(v)) return;
                                setMouseSensitivity(v);
                            }}
                            sx={{
                                width: "100%",
                                mx: "auto",
                                color: "#00F7FF",
                                '& .MuiSlider-thumb': { boxShadow: "0 0 0 6px rgba(0,247,255,0.2)" },
                            }}
                        />
                    </Box>
                </Grow>
                <IconButton 
                  disableRipple
                  onClick={() => {
                    if (isFs) exitFullscreen();
                    else enterFullscreen();
                  }}
                  sx={{ color: 'white' }}
                >
                    {isFs ? (
                        <FullscreenExitIcon 
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.25)";
                          setFsHovered(true);
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          setFsHovered(false);
                        }}
                        style={{ color: "white", fontSize: "1.5vw" }} />
                    ) : (
                        <FullscreenIcon 
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.25)";
                          setFsHovered(true);
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          setFsHovered(false);
                        }}
                        style={{ color: "white", fontSize: "1.5vw" }} />
                    )}
                    {fsHovered && (
                        <Box sx={{
                            position: 'absolute', 
                            top: '0.2vw', 
                            right: '3.5vw',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: 'rgba(0,63,145,0.5)',
                            padding: '0.5vw',
                            borderRadius: '8px',
                        }}>
                            <Typography sx={{whiteSpace: 'nowrap', color: 'white', fontSize: '0.7292vw'}}>
                                {isFs ? "Exit Fullscreen" : "Fullscreen"}
                            </Typography>
                        </Box>
                    )}
                </IconButton>
                {/* {openLeftBox && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: '4.5vw',
                      width: '12vw',
                      backgroundColor: 'rgba(0, 51, 141, 0.4)',
                      backdropFilter: 'blur(120px)',
                      border: '1px solid white',
                      borderRadius: '30px',
                      padding: '0.8vw 1vw 0.5vw 1vw',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography sx={{ fontSize: '0.8333vw', mb: '0.4vw', color: 'white' }}>
                        Mouse drag sensitivity : <b>{mouseSensitivity.toFixed(2)}</b>
                    </Typography>
                    <Slider
                      min={0.2}
                      max={0.9}
                      step={0.05}
                      value={mouseSensitivity}
                      onChange={(_, v) => {
                        if (Array.isArray(v)) return;
                        setMouseSensitivity(v);
                      }}
                      sx={{
                        width: "100%",
                        mx: "auto",
                        color: "#00F7FF",
                        '& .MuiSlider-thumb': { boxShadow: "0 0 0 6px rgba(0,247,255,0.2)" },
                      }}
                    />
                  </Box>
                )} */}
              </Box>
            </Zoom>
        </>
    )
}