
import React, {useEffect, useState} from 'react'
import { Box, Button, IconButton,Typography } from '@mui/material'
//import backgroundvideo from '../assets/backgroundvideo_5.mp4';
const backgroundvideo_5 = "https://dfa6lpn2gurde.cloudfront.net/assets/backgroundvideo_5.mp4";
import navigate_2 from '../assets/navigate_2.png';
import solution_underline from '../assets/solution_underline.png';
import solution_img from '../assets/solution_img.png';
import right_popup_img from '../assets/right_popup_img.png';
import { Close } from "@mui/icons-material";

export default function RightPopup({onClose, onGoToG}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
      setVisible(true);
  }, []);

  return (
    <Box sx={{
        position: 'fixed',
        top: '3.6458vw',
        right: '0rem',
        width: '33.85vw',
        height: '82vh',
        overflow: 'hidden',
        borderRadius: '12px 0px 0px 12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)', 
        zIndex: 100,
        transform: visible ? 'translateX(0%)' : 'translateX(100%)',
        transition: 'transform 0.5s ease-in-out',
    }}>
        {/* Background Video */}
        <Box sx={{position: 'absolute', inset: 0, zIndex: 0}}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              // position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              // top: 0,
              // left: 0,
              // zIndex: 0,
            }}
            src={backgroundvideo_5}
          />
        </Box>
        <Box sx={{
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'rgba(2,42,64,0.4)',
            backdropFilter: 'blur(6px)',
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4167vw',
            '&::-webkit-scrollbar': { 
                width: '0.2083vw' 
            },
            '&::-webkit-scrollbar-track': { 
                background: 'transparent'
            },
            '&::-webkit-scrollbar-thumb': {
                borderRadius: '3px',
            },
            scrollbarWidth: 'thin',
            scrollbarColor: '#5fb2e2ff transparent'
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center"
            sx={{px: '1.0417vw', py: '0.8333vw'}}>
              <Typography variant="h6" sx={{fontSize: '1.1458vw', color: "rgba(255,255,255,0.9)"}}>
                Welcome to the Solution Experience
              </Typography>
              <IconButton onClick={() => {
                setVisible(false);
                setTimeout(onClose, 500);
              }}>
                <Close sx={{fontSize: '1.25vw', color: 'rgba(255,255,255,0.9)'}}/>
              </IconButton>
            </Box>
            <img src={solution_underline} alt="underline" style={{marginTop: '-1.7188vw', marginLeft: '0.6250vw', width: '23vw'}} />

            <Box sx={{boxSizing: 'border-box', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0.8333vw', gap: '0.625vw'}}>
              <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.625vw'}}>
                <Typography sx={{fontFamily: 'Gothic A1', fontSize: '0.8333vw'}}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non repellat facere quaerat dicta debitis? Dolorem, id. Natus unde amet sapiente tenetur dolores nulla aliquid fugiat sit veritatis magni, dolorum repellendus sequi similique omnis iusto deserunt corporis hic? Tempora magnam vel veniam debitis corporis labore, recusandae illo ut. Qui, quibusdam itaque.
                </Typography>
                <Box sx={{width: '100%', overflow: 'hidden', border: '0.5px solid #00F7FF', borderRadius: 2}}>
                    <Box 
                      component="img"
                      src={solution_img}
                      alt="solution img"
                      sx={{
                        width: '100%',
                        border: '0.5px solid #00F7FF', borderRadius: 2,
                        objectFit: 'cover',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    />
                </Box>
                <Box sx={{width: '100%', overflow: 'hidden', border: '0.5px solid #00F7FF', borderRadius: 2}}>
                    <Box 
                      component="img"
                      src={right_popup_img}
                      alt="solution img"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    />
                </Box>
              </Box>
              <Button 
              onClick={onGoToG}
              sx={{
                width: '6.51vw',
                mt: '0.4167vw',
                mb: '0.5208vw',
                textTransform: 'none',
                bgcolor: 'primary.main',
                color: 'white',
                transition: "transform 0.3s ease,",
                fontSize: '0.8333vw',
                alignSelf: 'center'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
              >
                Explore
              </Button>
            </Box>
        </Box>
    </Box>
  )
}
