import React, {useState, useEffect, useId} from "react";
import { Html } from "@react-three/drei";
import { Box, Button, IconButton,Typography } from '@mui/material';
import { Close } from "@mui/icons-material";
import Brochure_1_1 from '../assets/Lounge_Brochure_1/CEOOutlook2025_InsightSummary.pdf - Page 1 of 17.png';
import Brochure_2_1 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 1 of 46.png';
import Brochure_3_1 from '../assets/Lounge_Flyer_1/Slide0.png';
import RectangleBG from '../assets/SZ_Trial/rectangle_bg.png';
import newBG from '../assets/SZ_Trial/newbg.png';
import Rectangle from '../assets/SZ_Trial/Rectangle.png';
import finalRectangle from '../assets/SZ_Trial/final_rectangle.png';
import finalRectangleBigger from '../assets/SZ_Trial/final_rectangle_bigger.png';
import GatewayBG from '../assets/SZ_Trial/bg_with_descriptions/gateway_description.png';
import left_image from "../assets/Library_Right_Rack/left_image.jpg";
import right_image from "../assets/Library_Right_Rack/right_image.jpg";
import MQ_1 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant01.png";
import Forrester_01 from "../assets/Library_Right_Rack/Social_Post_Forrester/Social_Post_Forrester01.png";

const LIBRARY_LABELS = {
    HS_R: "Explore", //"Explore Audit",
    HS_S: "Explore", //"Explore Tax",
    HS_T: "Explore", //"Explore Strategy",
    HS_U: "Explore", //"Explore Finance",
    HS_V: "Explore", //"Explore Cyber/Forensic",
    HS_W: "Explore", //"Explore AI",
    HS_X: "Explore", //"Explore CX/UX",
    HS_Y: "Explore", //"Explore HR",
    HS_Z: "Explore", //"Explore Emerging Tech",
    HS_AA: "Explore", //"Explore GRC",
};
const LIBRARY_RIGHT_LABELS = {
    HS_AC: "Digital Business Strategy Consulting",
    HS_AD: "Forrester",
    HS_AE: "Gartner",
    HS_AF: "Digital Technology Strategy and Consulting",
};
const SPECIAL_IMAGES = {
    HS_AC: left_image,
    HS_AD: Forrester_01,
    HS_AE: MQ_1,
    HS_AF: right_image,
};

const SZ_LABELS = {
    SZ_MINI_1: {label:"Digital Gateway", imgSrc:"/images/sz_icons/kpmg_digitalgateway_icon.png"},
    SZ_MINI_2: {label:"Clara", imgSrc:"/images/sz_icons/kpmg_clara_icon.png"},
    SZ_MINI_3: {label:"Velocity", imgSrc:"/images/sz_icons/kpmg_velocity_icon.png"}
};

export function BlueHotspot({
    id,
    position = [0, 0.02, 0],
    color = "#2563eb",   // default: blue "#2563eb"
    size = '1.62vw',
    label,
    onClick,
    zIndexRange = [20, 0],
    opacity=1,
    showLabelOnHover = false,
    sequenceIndex = 0,
    onMiniEnter,
    onMiniLeave,
    autoShowDesc = 0,
    isActive,
    activeSzMiniHotspot,
    onOpenFrame,
    onSZHoverChange,
    isSelected,
}) {
    const [hovered, setHovered] = useState(false);
    const [showPermanentLabel, setShowPermanentLabel] = useState(false);
    const [autoVisible, setAutoVisible] = useState(false);
    const [showWelcomeAI, setShowWelcomeAI] = useState(false);
    const [showGlowDiv, setShowGlowDiv] = useState(false);

    useEffect(() => {
    let timer;
    if (id === 'HS_B') {
        // 1 second delay (adjust as needed)
        timer = setTimeout(() => setShowGlowDiv(true), 1000);
    } else {
        setShowGlowDiv(false);
    }
    return () => clearTimeout(timer);
    }, [id]);

const transformStyle = activeSzMiniHotspot
  ? isActive
    ? id === "SZ_MINI_2"
        ? "scale(1) translateX(-4vw)"
    : id === "SZ_MINI_3"
        ? "scale(1) translateX(-12vw)"
    : "scale(1)"
    : id === "SZ_MINI_1"
    ? "scale(0.6)"
    : id === "SZ_MINI_2"
        ? activeSzMiniHotspot === "SZ_MINI_1" 
            ? "scale(0.6) translateX(16vw)"
            : "scale(0.6) translateX(-12vw)"
    : activeSzMiniHotspot === "SZ_MINI_1" //Velocity
        ? "scale(0.6)"
        : "scale(0.6) translateX(12vw)"
  : "scale(1)";

const descBoxStyle = {
  position: "absolute",
  top: "50%",
  left:
    id === "SZ_MINI_1"
      ? "100%"
      : id === "SZ_MINI_2"
      ? "100%"
      : "100%",
  transform: "translateY(-50%)",
  width: "21vw",
  height: 'fit-content',
  padding: "1vw",
  borderRadius: "0.7vw",
  cursor: "pointer",
  zIndex: 9999999,
  backgroundImage: `url(${finalRectangle})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
   backdropFilter: 'blur(50px)',
};


    useEffect(() => {
        setAutoVisible(false);
        if (!autoShowDesc || autoShowDesc <= 0) return;
        const startTimer = setTimeout(() => setAutoVisible(true), 1000);
        const endTimer = setTimeout(() => {
            setAutoVisible(false);
        }, autoShowDesc + 1000);
        return () => {
            clearTimeout(startTimer);
            clearTimeout(endTimer);
        };
    }, [id, autoShowDesc]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcomeAI(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!showLabelOnHover) return;

        // show label initially
        setShowPermanentLabel(true);

        // 1st hotspot: 5s, 2nd: 6s, 3rd: 7s, ...
        const delayMs = (5 + sequenceIndex) * 1000;
        const timer = setTimeout(() => {
            setShowPermanentLabel(false);
        }, delayMs);

        return () => {
            clearTimeout(timer);
        };
    }, [showLabelOnHover, sequenceIndex]);

    const curvePathId = useId();
    const curve = 12;

    return (
    <>
    <Html
      position={id === "BLACK_RHS" ? [-15, -0.15, -2.75] : position}
      transform={false}
      occlude={false}
      zIndexRange={id === "HS_J" ? [2000, 3000] : zIndexRange}
      pointerEvents="auto"
    >
        <style>
        {`
            @keyframes glowing-border-only {
                0% { background-position: 0 0; }
                50% { background-position: 400% 0; }
                100% { background-position: 0 0; }
            }

            .glow-container {
                position: relative;
                z-index: 0;
            }

            /* 1. The Animated Rainbow (Bottom Layer) */
            .glow-container::before {
                content: '';
                background: linear-gradient(45deg, #002bff, #fff ); /* #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #ff0000     #7a00ff, #ff00c8*/
                position: absolute;
                top: -2px;
                left: -2px;
                background-size: 400%;
                z-index: -2; /* Sit at the very bottom */
                filter: blur(5px);
                width: calc(100% + 4px);
                height: calc(100% + 4px);
                animation: glowing-border-only 20s linear infinite;
                border-radius: 12px;
            }

            /* 2. The Solid Cover (Middle Layer) */
            .glow-container::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,39,89,0.9);
                z-index: -1;
                border-radius: 10px;
            }
        `}
        </style>
        <div style={{position: 'relative', textAlign: 'center'}}>
            {(id === "HS_D" || id === "HS_P" || id === "HS_Q") ? (
                <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={(e) => { e.stopPropagation(); onClick?.(); }}
                style={{
                    width: '5vw',
                    height: '5vw',
                    borderRadius: '50%',
                    border: '1px solid white',
                    backgroundColor: 'rgba(217,217,217,0.4)',
                    boxShadow: '0 4px 4px rgba(0,0,0,0.25)',
                    color: 'white',
                    fontSize: '0.8vw',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.5vw',
                    position: 'relative',
                    zIndex: 1,
                    transform: hovered ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                }}>
                    <img src={id === "HS_D" ? Brochure_1_1 : id === "HS_P" ? Brochure_2_1 : id === "HS_Q" ? Brochure_3_1 : ""} 
                    style={{width: '100%', height: id === "HS_Q" ? '90%' : '100%', objectFit: 'contain'}} />
                    {hovered && (
                    <>
                        <div style={{
                            backgroundColor: 'rgba(0,63,145,0.61)',
                            border: '1px solid rgba(158,199,255,0.6)',
                            backdropFilter: 'blur(23px)',
                            boxShadow: ` 0 1.84px 1.84px rgba(0,0,0,0.25),
                            inset 0 1.84px 1.84px rgba(74,74,74,0.25)`,
                            color: 'white',
                            padding: '0.4167vw 1.2vw',
                            minWidth: '7vw',
                            fontSize: '0.7292vw',
                            borderRadius: '34px',
                            whiteSpace: 'nowrap',
                            position: 'absolute',
                            top: '-4.5vh'
                        }}>
                            {id === "HS_D" && "2025 CEO Outlook"}
                            {id === "HS_P" && "2025 Redefining Excellence in the Age of Agentic AI"}
                            {id === "HS_Q" && "2025 Global Tech Report, Technology Insights"}
                        </div>
                        <button 
                        style={{
                            backgroundColor: '#113378',
                            boxShadow: '0 5.15px 12.87px rgba(0,43,255,0.37)',
                            padding: '0.5vw 0.8vw',
                            fontSize: '0.7292vw',
                            border: 'none',
                            borderRadius: '34px',
                            color: 'white',
                            cursor: 'pointer',
                            position: 'absolute',
                            bottom: '-3vh',
                            zIndex: 10,
                        }}>
                            Click to view
                        </button>
                    </>
                    )}
                </div>
            ) : id === "HS_N" ? (
                <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClick?.();
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    width: '8vw',
                    height: '8vw',
                    borderRadius: '50%',
                    border: '0.63px solid white',
                    backgroundColor: hovered
                    ? 'rgba(0,63,145,0.7)'
                    : 'rgba(0, 63, 145, 0.6)',
                    color: 'white',
                    fontSize: '0.8vw',
                    fontWeight: 600,
                    boxShadow: `
                        0 2.52px 2.52px rgba(0,0,0,0.25),
                        inset 0 2.52px 2.52px rgba(0,0,0,0.25)
                    `,
                    backdropFilter: 'blur(315px)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: hovered ? 'scale(1.15)' : 'scale(1)',
                }}
                >
                    Enter
                </button>
            ) : id === "HS_B" ? (
                <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClick?.();
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    width: '16vw',
                    height: '41vh',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    opacity: 0,
                }}>

                </button>
            ) : id === "BLACK_RHS" ? (
                <Button 
                onClick={(e) => { e.stopPropagation(); onClick?.(); }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    width: '10vw',
                    backgroundColor: 'rgba(0, 63, 145, 0.6)',
                    borderRadius: '10px',
                    border: '1px solid white',
                    color: 'white',
                    fontSize: '0.8vw',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: hovered ? 'scale(1.15)' : 'scale(1)',
                    textTransform: 'none',
                }}>
                    Click to learn more
                </Button>
            ) : id === "HS_J"? (
                <Button 
                onClick={(e) => { e.stopPropagation(); onClick?.(); }}
                sx={{
                    width: '80vw',
                    height: '70vh',
                    bgcolor: 'rgba(0,0,0,1)',
                    opacity: 0,
                }}>
                </Button>
            ) : id === "MINI_1" || id === "MINI_2" || id === "MINI_3" ? (
                <Button
                onClick={(e) => { e.stopPropagation(); onClick?.(); }}
                sx={{
                    width: '13vw',
                    height: '20vh',
                    bgcolor: 'rgba(0,0,0,1)',
                    opacity: 0,
                }}>
                </Button>
            ) : id === "MINI_4" ? (
                <IconButton
                onClick={(e) => { e.stopPropagation(); onClick?.(); }}
                sx={{
                    background: 'transparent',
                    transition: 'all 0.2s ease',
                    '&: hover': {
                        transform: 'scale(1.08)',
                    }
                }}
                >
                    <Close sx={{fontSize: '1.5vw', color: 'white' }} />
                </IconButton>
            ) : id === "HS_SZ1" ? (
                <Button 
                onMouseEnter={() => {
                    setHovered(true);
                    onSZHoverChange?.("default");
                }}
                onMouseLeave={() => {
                    setHovered(false);
                    onSZHoverChange?.(null);
                }}
                onClick={(e) => { e.stopPropagation(); onClick?.(); }}
                sx={{
                    width: '41vw',
                    height: '24vh',
                    bgcolor: 'rgba(0,0,0,1)',
                    opacity: 0,
                }}>
                </Button>
            ) : id === "SZ_MINI_1" || id === "SZ_MINI_2" || id === "SZ_MINI_3" ? (
            <>
                <Button
                disableRipple
                onMouseEnter={() => {
                    setHovered(true);
                    onMiniEnter?.(id);
                }}
                onMouseLeave={() => {
                    setHovered(false);
                    onMiniLeave?.(id);
                }}
                onClick={(e) => { e.stopPropagation(); onClick?.(); }}
                sx={{
                    width: 'fit-content',
                    height: 'fit-content',
                    background: 'transparent',
                    opacity: 1,
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8333vw',
                    transition: 'all 0.5s ease',
                    transform: transformStyle,
                    // '&:hover': {
                    //     transform: 'scale(1.005)',
                    // },
                }}>
                    <img src={SZ_LABELS[id].imgSrc} style={{width: '13vw', height: '13vw'}}/>
                    {/* <Typography sx={{fontSize: '1.4583vw', fontWeight: '600'}}>
                        {SZ_LABELS[id].label}
                    </Typography> */}
                    {isActive && (
                        <Box
                            sx={descBoxStyle}
                            onClick={(e) => {
                            e.stopPropagation();
                            onOpenFrame?.(id);
                            }}
                        >
                            <Box sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.4167vw',
                            }}>
                            <Typography sx={{textAlign: 'left', fontSize: "0.9375vw", fontWeight: 600, color: '#0e54b1ff', textTransform: 'none' }}>
                                {id === "SZ_MINI_1" 
                                ? (
                                    <>
                                    KPMG Digital Gateway is a <b>tax, legal, and finance platform</b> that provides a single point of access to KPMG's digital tools and AI-enabled capabilities to simplify compliance, generate actionable insights, and drive smarter decision-making through integrated workflows and collaboration.
                                    </>
                                )
                                : id === "SZ_MINI_2"
                                ? (
                                    <>
                                    KPMG Clara is KPMG's cloud-based <b>smart audit platform</b> that uses advanced analytics and AI to deliver deep risk insights and enhance audit quality. It enables secure, real-time collaboration and transparency by giving audit teams and clients 24/7 access to audit progress and data.
                                    </>
                                )
                                : (
                                    <>
                                    KPMG Velocity is an AI-enabled <b>business transformation platform</b> that brings together KPMG's consulting methods, tools, data and insights to help organizations design and execute strategic change, boost agility, and build resilient, intelligent enterprises.
                                    </>
                                )
                                }
                            </Typography>
                            <Typography sx={{textAlign: 'left', fontSize: "0.8333vw", fontStyle: 'italic', fontWeight: 500, color: '#0e54b1ff', textTransform: 'none', textDecoration: 'underline', textUnderlineOffset: '0.2vw' }}>
                                Click here to learn more
                            </Typography>
                            </Box>
                        </Box>
                    )}
                    {/* {hovered && (
                        <div style={{
                            position: 'absolute',
                            bottom: '-8vw',
                            right: '0vw',
                            width: '14vw',
                            padding: '0.8333vw',
                            background: `
                            linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(2,42,64,0.09)),
                            #002759 50%
                            `,
                            color: "white",
                            borderRadius: '10px',
                            boxShadow: "0 4.38px 10.95px rgba(0,43,255,0.37)",
                            boxSizing: 'border-box',
                            backdropFilter: "blur(8px)",
                            fontSize: '0.9375vw',
                            textAlign: 'center',
                            textTransform: 'none'
                        }}>
                            Explore {SZ_LABELS[id].label}
                        </div>
                    )} */}
                </Button>
                
            </>
            ) : (
                <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <button
                        className="wp2d"                 // re-use same CSS look
                        aria-label={label}
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            onClick?.();
                        }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        style={{
                        ["--wp-color"]:  
                            ["HS_G_START", "HS_G_RIGHT", "HS_R","HS_S","HS_T","HS_U","HS_V","HS_W","HS_X","HS_Y", "HS_Z", "HS_AA"].includes(id) 
                            ? '#fff' : //hovered ? '#1d0849ff' :
                            color,         //4vw & 3vw
                        width: ['HS_R','HS_S','HS_T',"HS_U","HS_V","HS_W","HS_X","HS_Y", "HS_Z", "HS_AA"].includes(id) ? '1.5vw' : ["HS_AC","HS_AF"].includes(id) ? '6vw' : ["HS_AD","HS_AE"].includes(id) ? '3.2vw' : id === 'HS_F' ? '8vw' : id === 'HS_A'? '2.5vw' : id === 'HS_AB' ? '18vw' : size,
                        height: ['HS_R','HS_S','HS_T',"HS_U","HS_V","HS_W","HS_X","HS_Y", "HS_Z", "HS_AA"].includes(id) ? '1.5vw' : ["HS_AC","HS_AF"].includes(id) ? '4vw' : ["HS_AD","HS_AE"].includes(id) ? '5.5vw' : id === 'HS_F' ? '8vw' : id === 'HS_A'? '10vw': id === 'HS_AB' ? '12vw' : size,
                        opacity:
                            ["HS_R","HS_S","HS_T","HS_U","HS_V","HS_W","HS_X","HS_Y", "HS_Z", "HS_AA"].includes(id)
                                ? 1
                                : ["HS_F", "HS_A", "HS_AB", "HS_AC","HS_AD", "HS_AE", "HS_AF"].includes(id)
                                ? 0
                                : opacity,
                        transition: "background-color 0.2s ease, transform 0.2s ease",
                        transform: (["HS_G_START", "HS_G_RIGHT", "HS_R","HS_S","HS_T","HS_U","HS_V","HS_W","HS_X","HS_Y", "HS_Z", "HS_AA"].includes(id) && hovered) ? "scale(1.5)" : (id === 'HS_O' && hovered) ? "scale(1.25)" : "scale(1)", 
                        }}
                    />
                    {showLabelOnHover && (hovered || showPermanentLabel) && label && (
                    <div
                        style={{
                        position: 'absolute',
                        top: '0vh',
                        left: '-10.5vw',
                        padding: '0.75vw 1.2vw',
                        borderRadius: '999px',
                        backgroundColor: isSelected
                            ? 'rgba(0, 63, 145, 0.7)'
                            : 'rgba(0,63,145,0.31)',
                        border: isSelected 
                            ? '1.5px solid white'
                            : '1px solid rgba(158,199,255,0.6)',
                        backdropFilter: 'blur(23px)',
                        boxShadow: ` 0 1.84px 1.84px rgba(0,0,0,0.25),
                            inset 0 1.84px 1.84px rgba(74,74,74,0.25)`,
                        color: '#fff',
                        fontSize: '0.852vw',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        zIndex: 50,
                        }}
                    >
                        {label}
                    </div>
                    )}
                </div>
            )}
            {['HS_R','HS_S','HS_T',"HS_U","HS_V","HS_W","HS_X","HS_Y", "HS_Z", "HS_AA"].includes(id) && LIBRARY_LABELS[id] && hovered && ( //&& (autoVisible || hovered)
                <Box
                sx={{
                    position: "absolute",
                    bottom: '2vw',
                    left: '-1.5vw',
                    // backgroundColor: 'rgba(0,72,179,0.85)',
                    // border: '0.8px solid rgba(0,255,212,1)',
                    backgroundColor: 'rgba(0,63,145,0.61)',
                    border: '1px solid rgba(158,199,255,0.6)',
                    backdropFilter: 'blur(23px)',
                    boxShadow: ` 0 1.84px 1.84px rgba(0,0,0,0.25),
                    inset 0 1.84px 1.84px rgba(74,74,74,0.25)`,
                    borderRadius: '28px',
                    padding: '0.4167vw 1.0417vw',
                    boxSizing: 'border-box',
                    color: 'white',
                    fontSize: '0.7292vw',
                    marginBottom: '0.8333vw',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    transition: "transform 0.3s ease",
                    transform: "scale(1.2)",
                }}>
                    {LIBRARY_LABELS[id]}
                </Box>
            )}
            {["HS_AC","HS_AD", "HS_AE", "HS_AF"].includes(id) && LIBRARY_RIGHT_LABELS[id] && (
                <Box
                sx={{
                    position: "absolute",
                    bottom: '100%',
                    left: id === 'HS_AC' ? '-3vw' : id === 'HS_AD' ? '-1vw' : id === 'HS_AE' ? '-1vw' : '-3vw',
                    right: id === 'HS_AC' ? '-1vw' : id === 'HS_AD' ? '-1vw' : id === 'HS_AE' ? '-1vw' : '-2vw',
                    backgroundColor: 'rgba(0,63,145,0.61)',
                    border: '1px solid rgba(158,199,255,0.6)',
                    backdropFilter: 'blur(23px)',
                    boxShadow: ` 0 1.84px 1.84px rgba(0,0,0,0.25),
                    inset 0 1.84px 1.84px rgba(74,74,74,0.25)`,
                    borderRadius: '28px',
                    padding: '0.4167vw 1.0417vw',
                    boxSizing: 'border-box',
                    color: 'white',
                    fontSize: '0.7292vw',
                    marginBottom: '0.8333vw',
                    pointerEvents: 'none',
                    //whiteSpace: 'nowrap',
                    transition: "transform 0.2s ease",
                    transform: hovered ? "scale(1.2)" : "scale(1)", 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography sx={{color: 'white', fontSize: '0.7292vw'}}>
                        {LIBRARY_RIGHT_LABELS[id]}
                    </Typography>
                </Box>
            )}
            {/* {["HS_AC","HS_AD", "HS_AE", "HS_AF"].includes(id) && SPECIAL_IMAGES[id] && hovered && (
                <Box sx={{
                    position: 'absolute',
                    top: id === 'HS_AC' ? '5vw' : id === 'HS_AD' ? '6.5vw' : id === 'HS_AE' ? '6.5vw' : '5vw',
                    right: id === 'HS_AC' ? '-2.5vw' : id === 'HS_AD' ? '-5vw' : id === 'HS_AE' ? '-5vw' : '-7.5vw',
                    padding: '0.2083vw',
                    background: `
                    linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(2,42,64,0.09)),
                    rgba(0, 39, 89, 0.5)
                    `,
                    color: "white",
                    border: '0.5px solid #66E4FF',
                    borderRadius: '10px',
                    boxShadow: "0 4.38px 10.95px rgba(0,43,255,0.37)",
                    boxSizing: 'border-box',
                    backdropFilter: "blur(8px)",
                }}>
                <Box
                    component="img"
                    src={SPECIAL_IMAGES[id]}
                    alt={LIBRARY_LABELS[id]}
                    sx={{
                        //right: id === "HS_AE" ? '-2vw' : id === "HS_AC" ? '1vw' : id === "HS_AF" ? '-3vw' : '-1vw',
                        maxWidth: "20vw",
                        maxHeight: "28vh",
                        objectFit: 'contain',
                        borderRadius: '4px',
                        opacity: 0.8
                    }}
                />
                </Box>
            )} */}
            {id === 'HS_F' && (autoVisible || hovered) && (
                <div style={{
                    position: 'absolute',
                    bottom: '11vw',
                    right: '-6vw',
                    width: '20vw',
                    padding: '0.8333vw',
                    background: `
                    linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(2,42,64,0.09)),
                    rgba(0, 39, 89, 0.5)
                    `,
                    backdropFilter: "blur(10px)",
                    color: "white",
                    border: '0.5px solid #66E4FF',
                    borderRadius: '10px',
                    boxShadow: "0 4.38px 10.95px rgba(0,43,255,0.37)",
                    boxSizing: 'border-box',
                    fontSize: '0.9375vw',
                    textAlign: 'center',
                }}>
                    Click to explore our global network of Ignition and Insights Centers
                </div>
            )}
            {id === 'HS_G_START' && (autoVisible || hovered) && (
                <div style={{
                    position: 'absolute',
                    // bottom: '-2vw',
                    // right: '-16vw',
                    bottom: '-2vw',
                    right: '2.5vw',
                    width: '15vw',
                    padding: '0.8333vw',
                    background: `
                    linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(2,42,64,0.09)),
                    rgba(0, 39, 89, 0.5)
                    `,
                    backdropFilter: "blur(10px)",
                    color: "white",
                    border: '0.5px solid #66E4FF',
                    borderRadius: '10px',
                    boxShadow: "0 4.38px 10.95px rgba(0,43,255,0.37)",
                    boxSizing: 'border-box',
                    backdropFilter: "blur(8px)",
                    fontSize: '0.7292vw',
                    textAlign: 'center',
                }}>
                    Browse through the shelves to discover credentials from our work according to sector or function.
                </div>
            )}
            {id === 'HS_AB' && hovered && (
                <div style={{
                    position: 'absolute',
                    top: '-9vw',
                    right: '6vw',
                    width: '15vw',
                    padding: '0.8333vw',
                    background: `
                    linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(2,42,64,0.09)),
                    #002759 50%
                    `,
                    color: "white",
                    borderRadius: '10px',
                    boxShadow: "0 4.38px 10.95px rgba(0,43,255,0.37)",
                    boxSizing: 'border-box',
                    backdropFilter: "blur(8px)",
                    fontSize: '0.7292vw',
                    textAlign: 'center',
                }}>
                    Browse through the shelves to discover credentials from our work according to sector or function.
                </div>
            )}
            {id === 'HS_G_RIGHT' && (autoVisible || hovered) && (
                <div style={{
                    position: 'absolute',
                    bottom: '-2vw',
                    right: '2vw',
                    width: '15vw',
                    padding: '0.8333vw',
                    background: `
                    linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(2,42,64,0.09)),
                    rgba(0, 39, 89, 0.5)
                    `,
                    color: "white",
                    border: '0.5px solid #66E4FF',
                    borderRadius: '10px',
                    boxShadow: "0 4.38px 10.95px rgba(0,43,255,0.37)",
                    boxSizing: 'border-box',
                    backdropFilter: "blur(8px)",
                    fontSize: '0.7292vw',
                    textAlign: 'center',
                }}>
                    In this section, you can find our rankings 
                    and recognitions from global analysts and 
                    rating agencies around the world.
                </div>
            )}
            {id === 'HS_A' && showWelcomeAI && (
                <div style={{
                    position: 'absolute',
                    bottom: '15vw',
                    right: '-11vw',
                    width: '27.5vw',
                    padding: '0.8333vw',
                    background: `
                    linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(2,42,64,0.09)),
                    rgba(0, 39, 89, 0.5)
                    `,
                    backdropFilter: "blur(10px)",
                    color: "white",
                    border: '0.5px solid #66E4FF',
                    borderRadius: '10px',
                    boxShadow: "0 4.38px 10.95px rgba(0,43,255,0.37)",
                    boxSizing: 'border-box',
                    fontSize: '0.9375vw',
                    textAlign: 'center',
                }}>
                    Hello! I am Lucy, your AI avatar. I will be happy to answer any questions you may have about what KPMG can do with AI.
                    <br />
                    Click on me to begin.
                </div>
            )}
            {/* {id === 'HS_B' && showGlowDiv && ( // && (autoVisible || hovered) 
                <div 
                className="glow-container"
                style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    bottom: '14vw',
                    right: '4.5vw',
                    width: '8vw',
                    padding: '0.625vw 0.4167vw',
                    // background: `
                    // linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(2,42,64,0.09)),
                    // #002759 50%
                    // `,
                    color: "white",
                    borderRadius: '10px',
                    boxShadow: "0 4.38px 10.95px rgba(0,43,255,0.37)",
                    boxSizing: 'border-box',
                    backdropFilter: "blur(8px)",
                    fontSize: '0.8333vw',
                    fontWeight: 500,
                    textAlign: 'center',
                    transform: 'perspective(800px) rotate(0deg) rotateY(-20deg)',
                    transformOrigin: 'center',
                }}>
                    Explore AI Links
                </div>
            )} */}
        </div>
    </Html>
    </>
    );
}

export default BlueHotspot;
