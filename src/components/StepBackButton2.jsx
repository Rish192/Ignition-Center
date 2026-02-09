import { useEffect, useState } from "react";
import {Box, IconButton, Typography} from '@mui/material';
import walkicon from '../assets/walk-icon.png';

export default function StepBackButton2 ({onClick}) {
    const [hovered, setHovered] = useState(false);

    return (
    <>
        <Box sx={{
            position: 'fixed',
            bottom: '0.3vw',
            left: '0.3vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            padding: '0.3vw',
            borderRadius: '50vw 50vw 50vw 50vw',
            border: '2px solid rgba(255,255,255,0.5)',
            boxSizing: 'border-box',
            zIndex: 3000
        }}>
            <IconButton 
            disableRipple
            onMouseOver={(e) => {
                setHovered(true);
            }}
            onMouseOut={(e) => {
                setHovered(false);
            }}
            onClick={onClick}
            sx={{
                padding: '0.8333vw',
                pointerEvents: 'auto',
                backgroundColor: '#003F91',
                color: 'white',
                transition: 'all 0.3s ease',
                '&: hover': {
                    transform: 'scale(1.05)'
                }
            }}>
                <img src={walkicon} style={{width: '1.667vw', height: '1.667vw'}} />
            </IconButton>
            {hovered && (
                <Box sx={{
                    position: 'absolute', 
                    top: '0.7vw', 
                    left: '4.5vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(0,63,145,0.5)',
                    padding: '0.5vw',
                    borderRadius: '8px',
                }}>
                    <Typography sx={{whiteSpace: 'nowrap', color: 'white', fontSize: '0.7292vw'}}>
                        Free Navigation
                    </Typography>
                </Box>
            )}
        </Box>
        {/* <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        style={{
            position: "fixed",
            bottom: "1.25vw",
            left: "1.25vw",
            // width: "2.6042vw",
            // height: "2.6042vw",
            borderRadius: "25px",
            border: "1px solid #00F7FF",
            background: "rgba(1,0,37,0.5)",
            padding: '0.4167vw 0.8333vw',
            color: 'white',
            fontSize: '0.8333vw',
            cursor: "pointer",
            zIndex: 3000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
            Navigate
        </button>
        {hovered && (
            <Box
                sx={{
                    position: "fixed",
                    bottom: "4vw",
                    left: "0vw",
                    bgcolor: 'rgba(0,63,145,0.5)',
                    border: '0.8px solid rgba(158,199,255,0.9)',
                    boxShadow: '0px 4px 10px rgba(0,0,0,0.35)',
                    backdropFilter: 'blur(10px)',
                    color: "white",
                    padding: "0.5vw 1vw",
                    borderRadius: "0.5vw",
                    fontSize: "0.8333vw",
                    zIndex: 3001,
                }}
            >
                Switch to free navigation mode
            </Box>
        )} */}
    </>
    )
}