import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//import KPMG_Video from '../assets/KPMG_Video.mp4';
const KPMG_Video = "https://dfa6lpn2gurde.cloudfront.net/assets/KPMG_Video.mp4";

export default function VideoPopup({onClose, backgroundColor, activeHotspot}) {
  let videoSrc = KPMG_Video;

  if (activeHotspot === "HS_J") videoSrc = "/videos/global_impact_video.mp4";
  if (activeHotspot === "HS_K") videoSrc = "/videos/value_stories_video.mp4";

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        // backdropFilter: 'blur(2px)',
        // backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 2000,
      }}
    >
        <Box
            sx={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            width: '86vw',
            // borderRadius: 3,
            // bgcolor: backgroundColor,
            // backdropFilter: 'blur(12px)',
            // border: '1px solid rgba(255, 255, 255, 0.2)',
            // boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            py: '8.5vh', 
            px: '1.25vw',
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden',
            }}
        >
            <IconButton
            onClick={onClose}
            sx={{
                position: 'absolute',
                top: '5vh',
                right: '0.4167vw',
                zIndex: 2500,
                bgcolor: "rgba(1,0,37,0.85)",
                color: "white",
                border: "1px solid rgba(0,247,255,0.6)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
                width: '2vw',
                height: '2vw',
                '& .MuiSvgIcon-root': { fontSize: '1.5vw' }
                }}
            >
            <CloseIcon sx={{fontSize: '1.45vw'}}/>
            </IconButton>

            <video
            src={videoSrc}
            controls
            muted
            autoPlay
            style={{
                width: '100%',
                height: 'auto',
                borderRadius: '12px',
                outline: 'none',
            }}
            />
        </Box>
    </Box>
  )
}