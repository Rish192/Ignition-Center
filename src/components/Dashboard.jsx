import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import headerline from '../assets/header-line.png';
import Dash_Tiles_1 from '../assets/Dash_Tiles_1.png';
import Dash_Tiles_2 from '../assets/Dash_Tiles_2.png';
import Dash_Tiles_3 from '../assets/Dash_Tiles_3.png';
import Dash_Tiles_4 from '../assets/Dash_Tiles_4.png';
import Dash_Tiles_5 from '../assets/Dash_Tiles_5.png';
import Dash_Tiles_6 from '../assets/Dash_Tiles_6.png';
import Dash_Tiles_7 from '../assets/Dash_Tiles_7.png';
import Dash_Tiles_8 from '../assets/Dash_Tiles_8.png';
import Dash_Tiles_9 from '../assets/Dash_Tiles_9.png';
import Dash_Tiles_10 from '../assets/Dash_Tiles_10.png';
import Dash_Tiles_11 from '../assets/Dash_Tiles_11.png';
import Dash_Tiles_12 from '../assets/Dash_Tiles_12.png';
import Dash_Tiles_13 from '../assets/Dash_Tiles_13.png';
import Dash_Tiles_14 from '../assets/Dash_Tiles_14.png';
import Dash_Tiles_15 from '../assets/Dash_Tiles_15.png';

export default function Dashboard({onClose}) {
    return (
        <Box sx={{
            width: '90vw',
            height: '80vh',
            backgroundColor: 'rgba(0,63,145,0.31)',
            borderRadius: '1vw',
            padding: '0.4167vw',
            color: 'white',
            position: 'relative',
            backdropFilter: 'blur(28.5px)',
            boxShadow: '0px 2.28px 2.28px rgba(0,0,0,0.25)',
            border: '1.14px solid rgba(158,199,255,0.6)',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            p: '0.8333vw',
            gap: '0.8333vw',
        }}>
            {/* Close Button */}
            <IconButton
                onClick={onClose}
                sx={{
                position: 'fixed',
                top: '-1.5vw',
                right: '-1.5vw',
                zIndex: 2500,
                bgcolor: "rgba(1,0,37,0.85)",
                color: "white",
                border: "1px solid rgba(0,247,255,0.6)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
                width: '2vw',
                height: '2vw',
                }}
            >
                <Close sx={{ fontSize: '1.5vw' }} />
            </IconButton>
            {/* Header */}
            {/* <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw', }}>
                <img src={headerline} style={{transform: 'scaleX(-1)', width: '8.5vw'}}/>
                <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
                    Interactive Dashboard
                </Typography>
                <img src={headerline} style={{ width: '8.5vw'}}/>
            </Box>
            
            <Box sx={{
                border: '1px solid blue',
                display: 'flex',
                gap: '0.8333vw',
                boxSizing: 'border-box',
                overflow: 'hidden',
                justifyContent: 'space-between'
            }}>
                {[Dash_Tiles_13, Dash_Tiles_12, Dash_Tiles_11, Dash_Tiles_10, Dash_Tiles_9, Dash_Tiles_8, Dash_Tiles_7].map((img, i) => (
                    <Box
                    key={i}
                    component="img"
                    src={img}
                    sx={{
                        flex: 1,
                        objectFit: 'cover',
                        height: '4vw',
                        borderRadius: '0.4vw',
                    }}
                    />
                ))}
            </Box>
            
            <Box sx={{
                flex: 1.5,
                border: '1px solid red',
                display: 'flex',
                gap: '0.8333vw',
                boxSizing: 'border-box',
                overflow: 'hidden',
                justifyContent: 'space-between'
            }}>
                <Box
                component="img"
                src={Dash_Tiles_6}
                sx={{
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '0.4vw',
                }}
                />
                <Box
                component="img"
                src={Dash_Tiles_5}
                sx={{
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '0.4vw',
                }}
                />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8333vw',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                }}>

                </Box>
            </Box>
            
            <Box sx={{
                flex: 0.85,
                border: '1px solid red',
                display: 'flex',
                gap: '0.8333vw',
                boxSizing: 'border-box',
                overflow: 'hidden',
            }}>
                <Box
                component="img"
                src={Dash_Tiles_2}
                sx={{
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '0.4vw',
                }}
                />
                <Box
                component="img"
                src={Dash_Tiles_1}
                sx={{
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '0.4vw',
                }}
                />
                <Box
                component="img"
                src={Dash_Tiles_15}
                sx={{
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '0.4vw',
                }}
                />
            </Box> */}
        </Box>
    )
}