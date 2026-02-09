import React, { useState } from 'react';
import { Box, IconButton, Typography, styled } from '@mui/material';
import { Close } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import walkicon from '../assets/walk-icon.png';

const BASE_SIZE = 2; // This represents the 68px original size in vw units

const HamburglarContainer = styled(Box)(({ open }) => ({
  width: `${BASE_SIZE}vw`,
  height: `${BASE_SIZE}vw`,
  position: 'relative',
  display: 'block',
  userSelect: 'none',
  
  // Container for the lines
  '& .burger-icon': {
    position: 'absolute',
    padding: `${BASE_SIZE * 0.29}vw ${BASE_SIZE * 0.23}vw`, // 20px 16px
    height: `${BASE_SIZE}vw`,
    width: `${BASE_SIZE}vw`,
  },

  '& .burger-container': {
    position: 'relative',
    height: `${BASE_SIZE * 0.41}vw`, // 28px
    width: `${BASE_SIZE * 0.53}vw`,  // 36px
  },

  '& .burger-bun-top, & .burger-bun-bot, & .burger-filling': {
    position: 'absolute',
    display: 'block',
    height: `${BASE_SIZE * 0.058}vw`, // 4px
    width: `${BASE_SIZE * 0.53}vw`,  // 36px
    borderRadius: `${BASE_SIZE * 0.03}vw`, // 2px
    background: '#fff',
  },

  '& .burger-bun-top': {
    top: 0,
    transformOrigin: `${BASE_SIZE * 0.5}vw ${BASE_SIZE * 0.03}vw`, // 34px 2px
    animation: `${open ? 'bun-top-out' : 'bun-top-in'} 0.6s linear forwards`,
  },

  '& .burger-bun-bot': {
    bottom: 0,
    transformOrigin: `${BASE_SIZE * 0.5}vw ${BASE_SIZE * 0.03}vw`, // 34px 2px
    animation: `${open ? 'bun-bot-out' : 'bun-bot-in'} 0.6s linear forwards`,
  },

  '& .burger-filling': {
    top: `${BASE_SIZE * 0.17}vw`, // 12px
    animation: `${open ? 'burger-fill-out' : 'burger-fill-in'} 0.6s linear forwards`,
  },

  // Ring and Path
  '& .burger-ring, & .svg-ring, & .animate-path': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${BASE_SIZE}vw`,
    height: `${BASE_SIZE}vw`,
  },

  '& .path': {
    strokeDasharray: 240,
    strokeDashoffset: 240,
    strokeLinejoin: 'round',
    animation: `${open ? 'dash-in' : 'dash-out'} 0.6s linear forwards`,
  },

  '& .animate-path': {
    animation: `${open ? 'rotate-in' : 'rotate-out'} 0.6s linear forwards`,
  },

  // Responsive Keyframes
  '@keyframes bun-top-out': {
    '0%': { left: 0, top: 0, transform: 'rotate(0deg)' },
    '100%': { left: `-${BASE_SIZE * 0.07}vw`, top: `${BASE_SIZE * 0.015}vw`, transform: 'rotate(-45deg)' }
  },
  '@keyframes bun-top-in': {
    '0%': { left: `-${BASE_SIZE * 0.07}vw`, top: `${BASE_SIZE * 0.015}vw`, transform: 'rotate(-45deg)' },
    '100%': { left: 0, top: 0, transform: 'rotate(0deg)' }
  },
  '@keyframes bun-bot-out': {
    '0%': { left: 0, transform: 'rotate(0deg)' },
    '100%': { left: `-${BASE_SIZE * 0.07}vw`, transform: 'rotate(45deg)' }
  },
  '@keyframes bun-bot-in': {
    '0%': { left: `-${BASE_SIZE * 0.07}vw`, transform: 'rotate(45deg)' },
    '100%': { left: 0, transform: 'rotate(0deg)' }
  },
  '@keyframes burger-fill-in': {
    '0%': { width: 0, left: `${BASE_SIZE * 0.53}vw` },
    '100%': { width: `${BASE_SIZE * 0.53}vw`, left: '0px' }
  },
  '@keyframes burger-fill-out': {
    '0%': { width: `${BASE_SIZE * 0.53}vw`, left: '0px' },
    '100%': { width: 0, left: `${BASE_SIZE * 0.53}vw` }
  },
  '@keyframes dash-in': { '0%': { strokeDashoffset: 240 }, '100%': { strokeDashoffset: 0 } },
  '@keyframes dash-out': { '0%': { strokeDashoffset: 0 }, '100%': { strokeDashoffset: 240 } },
  '@keyframes rotate-in': { '0%': { transform: 'rotate(360deg)' }, '100%': { transform: 'rotate(0deg)' } },
  '@keyframes rotate-out': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
}));

export default function InnerStepBack ({onClose, onNavigate}) {
  const [open, setOpen] = useState(true);
  const [topHovered, setTopHovered] = useState(false);
  const [bottomHovered, setBottomHovered] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);

  const outerSize = '9.115vw';
  const arcSize = '9.5vw';
  const innerGap = '4.9vw';

  const transitionStyle = {
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth "swing" easing
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '0.3vw',
        left: '0.3vw',
        width: outerSize,
        height: outerSize,
        zIndex: 3000,
        pointerEvents: 'none',
      }}
    >
      {/* The Arc Background */}
        <Box
          sx={{ ...transitionStyle,
            position: 'absolute',
            bottom: '-0.3vw',
            left: '-0.3vw',
            width: arcSize,
            height: arcSize,
            backgroundColor: 'rgba(0, 51, 141, 0.4)',
            borderRadius: '0 100% 0 0',
            pointerEvents: 'auto',
            maskImage: `radial-gradient(circle at 0% 100%, transparent ${innerGap}, black ${innerGap})`,
            WebkitMaskImage: `radial-gradient(circle at 0% 100%, transparent ${innerGap}, black ${innerGap})`,
            opacity: open ? 1 : 0,
            transform: open ? 'scale(1)' : 'scale(0.3)',
            transformOrigin: 'bottom left',
        }}
        >
          {/*Divider Line */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '1px',
              backgroundColor: 'rgba(0,0,0,0.15)',
              transformOrigin: '0% 100%',
              transform: 'rotate(-45deg)',
            }}
          />
        </Box>

      {/*Outer Icon - Top (Exit) */}
        <IconButton
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            setTopHovered(true);
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            setTopHovered(false);
          }}
          onClick={onClose}
          sx={{
            ...transitionStyle,
            position: 'absolute',
            padding: '0.8333vw',
            pointerEvents: 'auto',
            backgroundColor: '#003F91',
            color: 'white',
            border: '1px solid rgb(138, 209, 247)',
            '&:hover': { backgroundColor: '#002a66' },
            bottom: open ? '4.9vw' : '0vw',
            left: open ? '0.6vw' : '0vw',
            opacity: open ? 1 : 0,
            transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
          }}
        >
          <LogoutIcon sx={{ fontSize: '1.25vw', transform: 'scaleX(-1)' }} />
          {topHovered && (
            <Box sx={{
              position: 'absolute', 
              top: '-2.5vw', 
              left: '-0.8vw',
              // top: '0.3vw', 
              // left: '3.5vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(0, 63, 145, 0.8)',
              boxSizing: 'border-box',
              padding: '0.5vw',
              borderRadius: '8px',
            }}>
              <Typography sx={{whiteSpace: 'nowrap', color: 'white', fontSize: '0.7292vw'}}>
                Back To Zone
              </Typography>
            </Box>
          )}
        </IconButton>

      {/*Outer Icon - Right (Control) */}
        <IconButton
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            setBottomHovered(true);
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            setBottomHovered(false);
          }}
          onClick={onNavigate}
          sx={{
            ...transitionStyle,
            position: 'absolute',
            padding: '0.8333vw',
            pointerEvents: 'auto',
            backgroundColor: '#003F91',
            color: 'white',
            border: '1px solid rgb(138, 209, 247)',
            transitionDelay: open ? '50ms' : '0ms',
            '&:hover': { backgroundColor: '#002a66' },
            bottom: open ? '0.7vw' : '0vw',
            left: open ? '5vw' : '0vw',
            opacity: open ? 1 : 0,
            transform: open ? 'rotate(0deg)' : 'rotate(90deg)',
          }}
        >
          <img src={walkicon} style={{ color: 'white', width: '1.25vw', height: '1.25vw'}} />
          {bottomHovered && (
            <Box sx={{
              position: 'absolute', 
              top: '-2.5vw', 
              left: '-1vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(0, 63, 145, 0.8)',
              boxSizing: 'border-box',
              padding: '0.5vw',
              borderRadius: '8px',
            }}>
              <Typography sx={{whiteSpace: 'nowrap', color: 'white', fontSize: '0.7292vw'}}>
                Free Navigation
              </Typography>
            </Box>
          )}
        </IconButton>

      {/*Inner Circle Main Icon */}
      <IconButton
        disableRipple
        onClick={toggleMenu}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          p: '0.625vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'auto',
          backgroundColor: open ? 'rgba(0, 51, 141, 0.4)' : '#003F91',
          color: 'white',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
        }}
      >
        <HamburglarContainer open={open}>
          <div className="burger-icon">
            <div className="burger-container">
              <span className="burger-bun-top"></span>
              <span className="burger-filling"></span>
              <span className="burger-bun-bot"></span>
            </div>
          </div>
          
          <div className="burger-ring">
            <svg className="svg-ring" viewBox="0 0 68 68">
              <path className="path" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="4" d="M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2" />
            </svg>
          </div>

          <div className="path-burger">
            <div className="animate-path">
              <div className="path-rotation"></div>
            </div>
          </div>
        </HamburglarContainer>
      </IconButton>
    </Box>
  );
};
