import React, { useEffect, useRef } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const VideoPlayer = ({ user, name, session, onModerate, onPin, pinnedUser, full=false, sharedContentActive, isResized, isFullScreen, onKick }) => {
  const ref = useRef();

  const showTileControls = !isResized;

  const avatarSize = isResized ? '2vw' : '5.208vw';
  const avatarFont = isResized ? '0.75vw' : '1.667vw';

  const buttonSize = sharedContentActive 
    ? isFullScreen 
      ? {width: '1.667vw', height: '1.667vw', '& .MuiSvgIcon-root': {fontSize: '1.0417vw'}}
      : {width: '1.25vw', height: '1.25vw', '& .MuiSvgIcon-root': {fontSize: '0.8333vw'}}
    : {width: '1.667vw', height: '1.667vw', '& .MuiSvgIcon-root': {fontSize: '1.0417vw'}}

  useEffect(() => {
    if (!user || !user.videoTrack) return;
    
    user.videoTrack.play(ref.current);

    const videoEl = ref.current?.querySelector("video");
    if (videoEl) {
      videoEl.style.width = "100%";
      videoEl.style.height = "100%";
      videoEl.style.objectFit = "contain";
    }
    
    return () => {
      user.videoTrack?.stop();
    };
  }, [user]);

  if (!user) {
    return null;
  }
  const isEmployee = session?.role === "employee";
  const isSelf = user.uid === session?.uid;
  const isPinned = pinnedUser === user.uid;
  const firstLetter = name ? name[0].toUpperCase() : "?";

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        aspectRatio: '16/9',
        position: 'relative',
        //backgroundColor: '#000',
        //borderRadius: full ? '8px' : 0,
        borderRadius: '8px',
        overflow: 'hidden',
        border: isSelf ? '2px solid #ffffff' : 'none',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5290 50%, #1e3c72 100%)',
      }}
    >
      {/* Video container */}
      {user.videoTrack ? (
        <Box
          ref={ref}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      ) : (
        <Box
        sx={{
          width: avatarSize,
          height: avatarSize,
          aspectRatio: '1 / 1',
          borderRadius: '50%',
          bgcolor: 'rgba(0,6,37,0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: avatarFont,
          fontWeight: 'bold',
        }}
        >
          {firstLetter}
        </Box>
      )}
      
      {/* Mic Status Overlay */}
      {/* <Box sx={{
        position: 'absolute',
        bottom: 8,
        right: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: '50%',
        width: 24,
        height: 24,
      }}>
        {user.micOn ? (
          <MicIcon sx={{color: 'limegreen', fontSize: 16}} />
        ) : (
          <MicOffIcon sx={{color: 'red', fontSize: 16}} />
        )}
      </Box> */}
      {/* UID overlay */}
      <Typography
        sx={{
          position: 'absolute',
          bottom: '0.4167vw',
          left: '0.4167vw',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '0.7292vw',
          opacity: isResized ? 0 : 1,
          transition: 'opacity 0.2s ease',
          pointerEvents: isResized ? 'none' : 'auto',
        }}
      >
        {name || `${user.uid}`}
      </Typography>

      {/* Moderation + Pin Controls (hidden in 3D) */}
      {showTileControls && (
        <Box sx={{
          position: 'absolute',
          top: '0.4167vw',
          right: '0.4167vw',
          display: 'flex',
          gap: '0.4167vw',
        }}>
          {/* Pin */}
          {/* <IconButton
            size="small"
            onClick={() => onPin(user.uid)}
            sx={{
              ...buttonSize,
              p: '0.2083vw',
              color: 'white',
              backgroundColor: isPinned ? 'rgba(93, 92, 92, 0.9)' : 'rgba(93,92,92,0.9)',
              '&:hover': { backgroundColor: isPinned ? 'rgba(93, 92, 92, 0.7)' : 'rgba(93,92,92,0.7)' },
            }}
          >
            <PushPinIcon sx={{fontSize: '1.0417vw'}}/>
          </IconButton> */}
          {isEmployee && !isSelf && (
            <>
              {/* Mute */}
              {user.micOn && (
                <IconButton
                  size="small"
                  sx={{
                    ...buttonSize,
                    p: '0.2083vw',
                    color: 'white',
                    backgroundColor: 'primary.main',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      transform: 'scale(1.08)',
                      backgroundColor: 'primary.dark' 
                    },
                  }}
                  onClick={() => onModerate("mute", user.uid)}
                >
                  <MicOffIcon />
                </IconButton>
              )}
              {/* Kick (leave for others) */}
              <IconButton
                size="small"
                sx={{
                  ...buttonSize,
                  p: '0.4167vw',
                  color: 'white',
                  backgroundColor: 'error.main',
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    transform: 'scale(1.08)',
                    backgroundColor: 'error.dark' 
                  },
                }}
                //onClick={() => onModerate("kick", user.uid)}
                onClick={() => onKick(user.uid)}
              >
                <ExitToAppIcon />
              </IconButton>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};
