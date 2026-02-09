import React, {useEffect, useState, useRef} from 'react'
import { Box, Button, IconButton,Typography } from '@mui/material'
import { Close } from "@mui/icons-material";

const videoFiles = ["/videos/IW/Vid_4.mp4", "/videos/IW/Vid_5.mp4"];

export default function IWVideoPopup({iwVideoIndex, onClose}) {
  const videoRef = useRef(null);
  
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.src = videoFiles[iwVideoIndex];
        videoRef.current.play().catch(e => console.error(e));
    }
  }, [iwVideoIndex]);
  return (
    <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
    <Box sx={{
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: "translate(-50%, -50%)",
        width: "90%",
        height: "85%",
        bgcolor: 'rgba(0,63,145,0.31)',
        backdropFilter: 'blur(28.5px)',
                boxShadow: '0px 2.28px 2.28px rgba(0,0,0,0.25)',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: '0.4167vw',
        boxSizing: 'border-box',
        borderRadius: '12px',
        zIndex: 3000
    }}>
        <IconButton
        onClick={onClose}
        sx={{
            position: 'absolute',
            top: '-2.2vw',
            right: '0vw',
            zIndex: 1,
            bgcolor: "rgba(1,0,37,0.85)",
            color: "white",
            border: "1.14px solid rgba(158,199,255,0.6)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
            '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
            width: '2vw',
            height: '2vw',
        }}
        >
            <Close sx={{ fontSize: '1.25vw' }} />
        </IconButton>
        <video 
            ref={videoRef}
            controls
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
            }}    
        />
    </Box>
    </Box>
  );
}