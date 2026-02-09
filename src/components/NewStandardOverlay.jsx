import React, {useEffect, useState, useRef} from 'react';
import { Html } from "@react-three/drei";
import { Box, Button, IconButton,Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import solution_underline from '../assets/solution_underline.png';

export default function NewStandardOverlay({
    position,
    location,
}) {
    const [showBox, setShowBox] = useState(true);
    const [iconColor, setIconColor] = useState('white');

    useEffect(() => {
        const colors = ['white', '#8dccf1ff'];
        let index = 0;

        const interval = setInterval(() => {
            index = (index + 1)%colors.length;
            setIconColor(colors[index]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const contentMap = {
        Lobby: {
            heading: "Lounge",
            width: '20vw',
            description1: "Welcome to the Lounge. Explore our signature playbooks, interactive brochures, and thought leadership pieces.",
            description2: "Click the hotspots on the tables to discover more."
        },
        Impact_Wall: {
            heading: "Impact Wall",
            width: '20vw',
            description1: "A showcase of our client success stories, key milestones, and transformative outcomes.",
            description2: "Interact with the screens to explore further."
        },
        Engagement_Hub: {
            heading: "Conference",
            width: '20vw',
            description1: "Welcome to the Meeting Room  a secure collaboration space for scheduled meetings.",
            description2: "Click enter to set up a meeting or join an ongoing session."
        },
        Engagement_Hub: {
            heading: "Reading Zone",
            width: '20vw',
            description1: "Impact Stories.",
            description2: "Click on the respective stories to explore."
        },
        Solution_Experience: {
            heading: "Solution Zone",
            width: '20vw',
            // description1: "Discover our accelerators, frameworks and offerings across industries. Click the rotating globe to explore. Our immersive solution world is coming soon!",
            // description2: "For now you may use the on-screen menu to navigate by industry or theme."
            description1: "Discover our accelerators, frameworks and offerings across industries.",
            description2: "Click the rotating globe to explore."
        },
        Breakout: {
            heading: "Breakout Zone",
            width: '14vw',
            description1: "Welcome to the Breakout Area. Sit back, relax, and browse through KPMG's memorable highlights.",
            description2: "Click the hotspots to explore."
        },
        AI_In_Action: {
            heading: "AI Zone",
            width: '20vw',
            description1: "Engage with our intelligent avatar to explore KPMG's vision, key offerings, and innovations.",
            description2: "Click the avatar and use the interactive menu to begin a conversation."
        }
    }
    const content = contentMap[location];

    useEffect(() => {
        let timer;
        if (showBox) {
            timer = setTimeout(() => {
                setShowBox(false);
            }, 10000);
        }
        return () => clearTimeout(timer);
    }, [showBox]);

    const handleInfoClick = () => {
        setShowBox(true);
    }
    return (
    <Html 
    position={position}
    transform={false}
    occlude={false}
    pointerEvents="auto"
    >
        <Box sx={{
            display: 'flex',
            alignItems: 'flex-start',
            position: 'relative',
        }}>
            {/* Info Button */}
            <IconButton 
            onClick={handleInfoClick}
            sx={{
                zIndex: 2,
                p: 0,
                width: '3.5vw',
                height: '3.5vw',
            }}>
                <InfoIcon sx={{
                    width: '100%',
                    height: '100%',
                    color: iconColor,
                    transition: 'color 0.5s ease',
                    '&:hover': {color: 'rgba(255,255,255,0.7)'}
                }}/>
            </IconButton>

            {/* Info Box */}
            {showBox && (
                <Box sx={{
                    width: content.width,
                    position: (location === 'Solution_Experience' || location ==='Impact_Wall') ? 'absolute' : 'relative',
                    left : (location === 'Solution_Experience' || location ==='Impact_Wall') ? `-${content.width}` : 'auto',
                    marginLeft: (location === 'Solution_Experience' || location ==='Impact_Wall') ? '-3vw' : '0.5vw',
                    color: 'white',
                    backgroundColor: 'rgba(0,63,145,0.31)',
                    border: '0.97px solid rgba(158,199,255)',
                    borderRadius: '10px',
                    padding: '1vw',
                    zIndex: 2000,
                    backdropFilter: 'blur(50px)',
                    boxShadow: '0px 4.24px 10.56px rgba(0,43,255,0.37)',
                    animation: 'fadeIn 0.3s ease',
                }}>
                    <Box display="flex" alignItems="center">
                        <Typography variant="h6" sx={{fontSize: '1.25vw', fontWeight: 'bold', color: "rgba(255,255,255,0.9)"}}>
                            {content.heading}
                        </Typography>
                    </Box>
                    <img src={solution_underline} alt="underline" style={{marginTop: '-0.7812vw', marginLeft: '-0.3125vw', width: '100%'}} />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.8333vw'
                    }}>
                        <Typography sx={{fontSize: '0.9375vw', color: 'white'}}>
                            {content.description1}
                        </Typography>
                        <Typography sx={{fontSize: '0.9375vw', color: 'white', fontWeight: 'lighter'}}>
                            {content.description2}
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>      
    </Html>
    )
}