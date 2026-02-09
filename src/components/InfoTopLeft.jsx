import React, {useEffect, useState, useRef} from 'react';
import { Box, Button, IconButton,Typography } from '@mui/material';
import { Close } from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import MinimizeIcon from '@mui/icons-material/Minimize';
import InfoIcon from '@mui/icons-material/Info';
import solution_underline from '../assets/solution_underline.png';

export default function InfoTopLeft ({location, open, setOpen, librarySection, headersHidden, hideUI}) {

    const contentMap = {
        Lobby: {
            heading: "Lounge",
            description1: "Welcome to the Lounge.",
            description2: "Here you can find a brochure of the Global Ignition Center products and services as well as a selection of interactive thought leadership publications."
        },
        Impact_Wall : {
            heading: "Impact Wall",
            description1: "Explore how we leverage data, technology, innovation and AI to accelerate transformation and deliver real results.",
            description2: ""
        },
        Engagement_Hub: {
            heading: "Conference",
            description1: "Welcome to the Conference Hub - a secure collaboration space for scheduled meetings.",
            description2: "Click Enter to join your session and connect with KPMG experts to share ideas and co-create solutions."
        },
        Solution_Experience: {
            heading: "Solution Zone",
            description1: "Explore our Global Ignition and Insights Center network, click on the interactive globe to discover locations worldwide.",
            description2: ""
        },
        Breakout: {
            heading: "Ignition Experience Zone",
            description1: "Welcome to the Ignition Experience Zone. Feel free to sit back and relax or look around. You might want to try out some gamified experiments and learn some fun facts about KPMG.",
            description2: "Click the hotspot to begin."
        },
        AI_In_Action: {
            heading: "AI Zone",
            description1: "Engage with our intelligent avatar to explore KPMG's vision, key offerings, and innovations.",
            description2: "Click the avatar and use the interactive menu to begin a conversation."
        },
        Library: {
            heading: "Library",
            description1: "Impact Stories & Global Rankings",
            description2: "Click on the respective shelves to discover credentials, rankings and recognitions from global analysts."
        }
    }
    const content = contentMap[location];
    const libraryDescription1 = librarySection === "left"
        ? "Impact Stories"
        : librarySection === "right"
        ? "Global Rankings"
        : contentMap.Library.description1;
    const libraryDescription2 = librarySection === "left"
        ? "Browse through the shelves to discover credentials from our work according to sector or function."
        : librarySection === "right"
        ? "Click on the publications for details."
        : contentMap.Library.description2;

    return (
        <Box sx={{
            position: 'absolute',
            top: '5vw',
            right: '1vw',
            zIndex: 2000,
            transform: headersHidden || hideUI ? 'translateY(-150%)' : 'translateY(0)', 
            transition: 'transform 0.5s ease',
        }}>
            <IconButton 
              disableRipple
              onClick={() => setOpen(!open)}
              sx={{
                p: '0.2083vw',
                backgroundColor: 'rgba(0,63,145,0.8)',
                transition: 'all 0.3s ease',
                "&:hover": {
                    backgroundColor: 'rgb(1, 77, 170)',
                    transform: 'scale(1.1)'
                },
                zIndex: 2001,
              }}>
                {open ? <DoNotDisturbOnIcon sx={{color: 'white', fontSize: '1.75vw'}} /> : <InfoIcon sx={{color: 'white', fontSize: '1.75vw'}} />}
            </IconButton>

            {open && (
                <Box sx={{
                    position: 'absolute',
                    top: '0.75vw',
                    right: '1vw',
                    width: '21vw',
                    backgroundColor: 'rgba(0,63,145,0.31)',
                    color: "white",
                    border: '1px solid rgba(158,199,255,0.6)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(23px)',
                    boxShadow: ` 0 1.84px 1.84px rgba(0,0,0,0.25),
                    inset 0 1.84px 1.84px rgba(74,74,74,0.25)`,
                    p: "1vw",
                    zIndex: 1001,
                }}>
                    {/* <IconButton 
                      onClick={() => setOpen(false)}
                        sx={{
                            position : 'absolute',
                            top: '0.3vw',
                            right: '0.3vw',
                            color: 'white',
                        }}>
                        <Close sx={{ fontSize: '1.25vw' }}/>
                    </IconButton> */}
                    <Box  sx={{display:"flex", alignItems: "center", padding: 0, gap: '0.4167vw'}}>
                        <IconButton 
                            disableRipple
                            sx={{
                            padding: 0,
                            marginTop: '-0.25vw',
                            zIndex: 2001,
                            }}>
                            <InfoIcon sx={{color: 'white', fontSize: '1.75vw'}} />
                        </IconButton>
                        <Typography variant="h6" sx={{padding: 0, fontSize: '1.25vw', fontWeight: 'bold'}}>
                            {content.heading}
                        </Typography>
                    </Box>
                    <img src={solution_underline} alt="underline" style={{marginTop: '-0.7812vw', marginLeft: '-0.3125vw', width: '100%'}} />
                    {/* transform: 'scaleX(-1)' */}
                    <Typography variant="body2" sx={{fontSize: '0.9375vw', mt: '0.5vw'}}>
                        {location === "Library" ? libraryDescription1 : content.description1}
                    </Typography>
                    <Typography variant="body2" sx={{fontSize: '0.9375vw', mt: '0.5vw'}}>
                        {location === "Library" ? libraryDescription2 : content.description2}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}