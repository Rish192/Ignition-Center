import React, {useEffect, useState, useRef} from 'react';
import { Html } from "@react-three/drei";
import { Box, Button, IconButton,Typography } from '@mui/material';
import { AI_CAMERA_VIEWS } from './DynamicPoints';
import { keyframes } from '@mui/system';

const aiPulse = keyframes`
    0%   { transform: translateY(0) scale(1); opacity: 0.95; }
    50%  { transform: translateY(-0.25vw) scale(1.02); opacity: 1; }
    100% { transform: translateY(0) scale(1); opacity: 0.95; }
`;
const aiGlow = keyframes`
    0%   { filter: drop-shadow(0 0 0 rgba(102,228,255,0.0)); }
    50%  { filter: drop-shadow(0 0 0.9vw rgba(102,228,255,0.45)); }
    100% { filter: drop-shadow(0 0 0 rgba(102,228,255,0.0)); }
`;
const arcSpin = keyframes`
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(-360deg); }
`;

export default function AiOptions ({position, openFAQ, onClose, expRef, onAIQuickLinksClick, onAiAssistantClick, atAltView, setAtAltView}) {
    // const [atAltView, setAtAltView] = useState(false);

    useEffect(() => {
        if (atAltView === true) {
            onAIQuickLinksClick?.();
            window.dispatchEvent(new Event("ic:hideFAQ"));
        } else {
            onAiAssistantClick?.();
        }
    }, [atAltView]);

    useEffect(() => {
        if (!atAltView) {
            openFAQ("faq");
        }
    }, [atAltView]);

    const moveCamera = (view) => {
        const {spawn, lookAt} = AI_CAMERA_VIEWS[view];
        expRef?.current?.teleportTo({
            x: spawn.x,
            y: spawn.y,
            z: spawn.z,
            duration: 0.5,
            lookAt,
        });
    };
    return (
        <>
            {!atAltView ? (
            <>
                <Html
                    //position={!atAltView ? position : [20, 12, -12]}
                    position={position}
                    transform={false}
                    occlude={false}
                    pointerEvents="auto"
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.625vw'
                    }}>
                        {/* <Box sx={{ position: 'relative', width: '100%' }}>
                            <IconButton
                                onClick={onClose}
                                sx={{
                                    position: 'absolute',
                                    top: '-20vw',
                                    left: '-3vw',
                                    width: '10vw',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4167vw',
                                    borderRadius: '999px',
                                    px: '0.8333vw',
                                    py: '0.8333vw',
                                    bgcolor: 'rgba(0,63,145,0.31)',
                                    border: '0.8px solid rgba(158,199,255,0.9)',
                                    boxShadow: '0px 4px 10px rgba(0,0,0,0.35)',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        bgcolor: 'rgba(0, 94, 255, 0.51)',
                                        transform: 'translateY(-1px) scale(1.02)',
                                        boxShadow: '0px 6px 14px rgba(0,0,0,0.45)',
                                    },
                                }}
                            >
                                <Typography
                                    sx={{
                                        textAlign: 'center',
                                        color: 'white',
                                        fontSize: '0.75vw',
                                        fontWeight: 500,
                                        letterSpacing: '0.06em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Step Back
                                </Typography>
                            </IconButton>
                        </Box> */}
                        {!atAltView ? (
                        <>
                            {/*<Box
                            onClick={() => openFAQ("faq")}
                            sx={{
                                width: '15vw', 
                                height: '6vh',
                                borderRadius: '30px 8px 8px 30px',
                                backgroundColor: 'rgba(0,45,103,0.6)',
                                backdropFilter: 'blur(43.86px)',
                                boxShadow: '0px 3.51px 3.51px rgba(0,0,0,0.25)',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}>
                                <Box sx={{
                                    width: '6vh',
                                    height: '6vh',
                                    border: '0.89px solid #66E4FF',
                                    background: 'rgba(0,72,179,0.49)',
                                    borderRadius: '50%',
                                    zIndex: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <img src={admin_icon} alt="Admin" style={{ width: '1.25vw', height: '1.25vw' }} />
                                </Box>
                                <Box sx={{flex: 1}}>
                                    <Typography sx={{textAlign: 'center', color: 'white', fontSize: '1.0417vw'}}>
                                        FAQs
                                    </Typography>
                                </Box>
                            </Box> */}
                            {/* <Box
                            onClick={() => openFAQ("chat")}
                            sx={{
                                width: '15vw',
                                height: '6vh',
                                borderRadius: '30px 8px 8px 30px',
                                backgroundColor: 'rgba(0,45,103,0.6)',
                                backdropFilter: 'blur(43.86px)',
                                boxShadow: '0px 3.51px 3.51px rgba(0,0,0,0.25)',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}>
                                <Box sx={{
                                    width: '6vh',
                                    height: '6vh',
                                    border: '0.89px solid #66E4FF',
                                    background: 'rgba(0,72,179,0.49)',
                                    borderRadius: '50%',
                                    zIndex: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <img src={admin_icon} alt="Admin" style={{ width: '1.25vw', height: '1.25vw' }} />
                                </Box>
                                <Box sx={{flex: 1}}>
                                <Typography sx={{textAlign: 'center', color: 'white', fontSize: '1.0417vw'}}>
                                    AI Assistant
                                </Typography>
                                </Box>
                            </Box> */}
                        </>
                        ) : (<></>)}    
                    </Box>
                </Html>
                <Html
                position={[15, 3, -50]}
                transform={false}
                occlude={false}
                pointerEvents="auto"
                >
                    <Button 
                    onClick={() => {
                        moveCamera("alt");
                        setAtAltView(true);
                        onAIQuickLinksClick();
                        window.dispatchEvent(new Event("ic:hideFAQ"));
                    }}
                    disableRipple
                    sx={{
                        animation: 'aiPulse 2.4s ease-in-out infinite, aiGlow 3.2s ease-in-out infinite',
                        cursor: 'pointer',
                        willChange: 'transform, filter',
                        transition: 'transform 180ms ease, box-shadow 180ms ease, background 180ms ease',
                        position: 'relative',
                        borderRadius: '50%',
                        width: '8vw',
                        height: '8vw',
                        background: 'rgba(0,63,145,0.31)',
                        backdropFilter: 'blur(730px)',
                        boxShadow: `
                            0px 5.85px 5.85px rgba(0,0,0,0.25),
                            inset 0px 5.85px 5.85px rgba(0,0,0,0.25)
                        `,
                        color: 'white',
                        textTransform: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            pointerEvents: 'none',
                            background: 'conic-gradient(from 0deg, rgba(7,219,250,1) 0deg, rgba(7,219,250,0.1) 270deg, rgba(255,255,255,0) 270deg 360deg)',
                            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 0.18vw), #000 calc(100% - 0.18vw))',
                            mask: 'radial-gradient(farthest-side, transparent calc(100% - 0.18vw), #000 calc(100% - 0.18vw))',
                            animation: `${arcSpin} 3.35s linear infinite`,
                        },
                        '& > *': { position: 'relative', zIndex: 1 },
                        '&:hover': {
                            transform: 'translateY(-0.35vw) scale(1.04)',
                            background: 'rgba(0, 94, 255, 0.35)',
                            boxShadow: `
                            0px 7.5px 16px rgba(0,0,0,0.35),
                            inset 0px 5.85px 5.85px rgba(0,0,0,0.20)
                            `,
                        },
                        '&:active': {
                            transform: 'translateY(-0.1vw) scale(0.98)',
                        },
                    }}>
                        <Typography sx={{fontSize: '1.0417vw'}}>AI</Typography>
                        <Typography sx={{fontSize: '1.0417vw'}}>Quick</Typography>
                        <Typography sx={{fontSize: '1.0417vw'}}>Links</Typography>
                        
                    </Button>
                </Html>
            </>
            ) : (
            <Html
                position={[18, 3, 12]}
                transform={false}
                occlude={false}
                pointerEvents="auto"
            >
                <Button 
                onClick={() => {
                    moveCamera("main");
                    setAtAltView(false);
                    onAiAssistantClick();
                    if (openFAQ) {
                        // reopen the FAQ/chat overlay when coming back from Quick Links
                        openFAQ("chat"); // or "faq" if you prefer that mode
                    }
                }}
                disableRipple
                sx={{
                    animation: 'aiPulse 2.4s ease-in-out infinite, aiGlow 3.2s ease-in-out infinite',
                    cursor: 'pointer',
                    willChange: 'transform, filter',
                    transition: 'transform 180ms ease, box-shadow 180ms ease, background 180ms ease',
                    position: 'relative',
                    borderRadius: '50%',
                    width: '8vw',
                    height: '8vw',
                    background: 'rgba(0,63,145,0.31)',
                    backdropFilter: 'blur(730px)',
                    boxShadow: `
                        0px 5.85px 5.85px rgba(0,0,0,0.25),
                        inset 0px 5.85px 5.85px rgba(0,0,0,0.25)
                    `,
                    color: 'white',
                    textTransform: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        background: 'conic-gradient(from 0deg, rgba(7,219,250,1) 0deg, rgba(7,219,250,0.1) 270deg, rgba(255,255,255,0) 270deg 360deg)',
                        WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 0.18vw), #000 calc(100% - 0.18vw))',
                        mask: 'radial-gradient(farthest-side, transparent calc(100% - 0.18vw), #000 calc(100% - 0.18vw))',
                        animation: `${arcSpin} 3.35s linear infinite`,
                    },
                    '& > *': { position: 'relative', zIndex: 1 },
                    '&:hover': {
                        transform: 'translateY(-0.35vw) scale(1.04)',
                        background: 'rgba(0, 94, 255, 0.35)',
                        boxShadow: `
                        0px 7.5px 16px rgba(0,0,0,0.35),
                        inset 0px 5.85px 5.85px rgba(0,0,0,0.20)
                        `,
                    },
                    '&:active': {
                        transform: 'translateY(-0.1vw) scale(0.98)',
                    },
                }}>
                    <Typography sx={{fontSize: '1.0417vw'}}>AI</Typography>
                    <Typography sx={{fontSize: '1.0417vw'}}>Assistant</Typography>
                    
                </Button>
            </Html>
            )}
        </>
    )
}