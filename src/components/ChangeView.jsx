import { useEffect, useState } from "react";
import {Box, Button, IconButton, Typography} from '@mui/material';
import { Close } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { keyframes } from '@mui/system';
import GridViewIcon from '@mui/icons-material/GridView';
import PublicIcon from '@mui/icons-material/Public';
import impact_stories from '../assets/impact_stories.png';
import global_ranking from '../assets/global_ranking.png';
import solution_demo_icon from '../assets/solution_demo_icon.png';

export default function ChangeView ({changeView, onExplore1, onExplore2, onClose}) {
    return (
      <>
        { !["AI_A", "AI_B"].includes(changeView) ? (
          <Box
            sx={{
              position: 'fixed',
              bottom: '1vw',
              left: 0,
              right: 0,
              margin: '0 auto',
              // height: '5vw',
              width: 'fit-content',
              display: 'flex',
              gap: '0.5vw',
              zIndex: 3000,
            }}
          >
            {['SZ', 'F'].includes(changeView) ? (
            <>
            {/* Button 1 : Explore Solution Demos */}
            <Button
              disableRipple
              onClick={onExplore1}
              sx={{
                minWidth: changeView === 'F' ? '2.8vw' : 'auto', 
                width: 'auto',
                height: '2.8vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0,
                padding: '0 1.2vw',
                borderRadius: '999px',
                border: '1px solid white',
                textTransform: 'none',
                overflow: 'hidden',
                backgroundColor: changeView === 'SZ' ? '#003F91' : 'rgba(0, 51, 141,0.2)',
                backdropFilter: 'blur(120px)',
                color: 'white',
                transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  minWidth: '13vw',
                  gap: '0.6vw',
                  padding: '0vw',
                },
              }}
            >
              {/* ICON */}
              <Box
                component="img" 
                src={solution_demo_icon} 
                sx={{
                  width: '1.5vw', 
                  height: '1.5vw', 
                  flexShrink: 0,
                  opacity: changeView === 'SZ' ? 0 : 1,
                  transform: changeView === 'SZ' ? 'translateX(-20px)' : 'translateX(0)',
                  maxWidth: changeView === 'SZ' ? 0 : '1.5vw',
                  transition: 'all 300ms ease',
                  '.MuiButton-root:hover &': {
                    opacity: 1,
                    transform: 'translateX(0)',
                    maxWidth: '1.5vw',
                  },
              }}/>

              {/* TEXT */}
              <Typography
                sx={{
                  fontSize: '0.8333vw',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  opacity: changeView === 'F' ? 0 : 1,
                  transform: changeView === 'F' ? 'translateX(20px)' : 'translateX(0)',
                  maxWidth: changeView === 'F' ? 0 : '10.417vw',
                  transition: 'opacity 300ms ease, transform 300ms ease, max-width 400ms ease',
                  '.MuiButton-root:hover &': {
                    opacity: 1,
                    transform: 'translateX(0)',
                    maxWidth: '10.417vw',
                  },
                }}
              >
                Global Solutions
              </Typography>
            </Button>

            {/* Button 2 : Explore Global Demos */}
            <Button
              disableRipple
              onClick={onExplore2}
              sx={{
                minWidth: changeView === 'SZ' ? '2.8vw' : 'auto', 
                width: 'auto',
                height: '2.8vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: (changeView === 'SZ' || changeView === 'F') ? 0 : '0.6vw',
                padding: '0 1.2vw',
                borderRadius: '999px',
                border: '1px solid white',
                textTransform: 'none',
                overflow: 'hidden',
                backgroundColor: changeView === 'F' ? '#003F91' : 'rgba(0, 51, 141,0.4)',
                backdropFilter: 'blur(120px)',
                color: 'white',
                transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  minWidth: '13vw',
                  gap: '0.6vw',
                  padding: '0vw',
                },
              }}
            >
              {/* ICON */}
              <PublicIcon
                sx={{
                  fontSize: '1.5vw',
                  flexShrink: 0,
                  opacity: changeView === 'F' ? 0 : 1,
                  transform: changeView === 'F' ? 'translateX(-20px)' : 'translateX(0)',
                  maxWidth: changeView === 'F' ? 0 : '1.5vw',
                  transition: 'all 300ms ease',
                  '.MuiButton-root:hover &': {
                    opacity: 1,
                    transform: 'translateX(0)',
                    maxWidth: '1.5vw',
                  },
                }}
              />
              
              {/* TEXT */}
              <Typography
                sx={{
                  fontSize: '0.8333vw',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  opacity: changeView === 'SZ' ? 0 : 1,
                  transform: changeView === 'SZ' ? 'translateX(20px)' : 'translateX(0)',
                  maxWidth: changeView === 'SZ' ? 0 : '10.417vw',
                  transition: 'opacity 300ms ease, transform 300ms ease, max-width 400ms ease',
                  '.MuiButton-root:hover &': {
                    opacity: 1,
                    transform: 'translateX(0)',
                    maxWidth: '10.417vw',
                  },
                }}
              >
                Global Insights Centers
              </Typography>
            </Button>
            </>
            ) : (
              <>
              {/* Button 1 : Explore Impact Stories */}
            <Button
              disableRipple
              onClick={onExplore1}
              sx={{
                minWidth: changeView === 'Lib2' ? '2.8vw' : 'auto', 
                width: 'auto',
                height: '2.8vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0,
                padding: '0 1.2vw',
                borderRadius: '999px',
                border: '1px solid white',
                textTransform: 'none',
                overflow: 'hidden',
                backgroundColor: changeView === 'Lib1' ? '#003F91' : 'rgba(0, 51, 141,0.2)',
                backdropFilter: 'blur(120px)',
                color: 'white',
                transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',

                '&:hover': {
                  minWidth: '13vw',
                  gap: '0.6vw',
                  padding: '0vw',
                },
              }}
            >
              {/* ICON */}
              <Box
                component="img" 
                src={impact_stories} 
                sx={{
                  width: '1.5vw',
                  height: '1.5vw', 
                  flexShrink: 0,
                  opacity: changeView === 'Lib1' ? 0 : 1,
                  transform: changeView === 'Lib1' ? 'translateX(-20px)' : 'translateX(0)',
                  maxWidth: changeView === 'Lib1' ? 0 : '1.5vw',
                  transition: 'all 300ms ease',
                  '.MuiButton-root:hover &': {
                    opacity: 1,
                    transform: 'translateX(0)',
                    maxWidth: '1.5vw',
                  },
              }}/>

              {/* TEXT */}
              <Typography
                sx={{
                  fontSize: '0.8333vw',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  opacity: changeView === 'Lib2' ? 0 : 1,
                  transform: changeView === 'Lib2' ? 'translateX(20px)' : 'translateX(0)',
                  maxWidth: changeView === 'Lib2' ? 0 : '10.417vw',
                  transition: 'opacity 300ms ease, transform 300ms ease, max-width 400ms ease',
                  '.MuiButton-root:hover &': {
                    opacity: 1,
                    transform: 'translateX(0)',
                    maxWidth: '10.417vw',
                  },
                }}
              >
                Impact Stories
              </Typography>
            </Button>

            {/* Button 2 : Explore Global Rankings */}
            <Button
              disableRipple
              onClick={onExplore2}
              sx={{
                minWidth: changeView === 'Lib1' ? '2.8vw' : 'auto', 
                width: 'auto',
                height: '2.8vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: (changeView === 'Lib1' || changeView === 'Lib2') ? 0 : '0.6vw',
                padding: '0 1.2vw',
                borderRadius: '999px',
                border: '1px solid white',
                textTransform: 'none',
                overflow: 'hidden',
                backgroundColor: changeView === 'Lib2' ? '#003F91' : 'rgba(0, 51, 141,0.4)',
                backdropFilter: 'blur(120px)',
                color: 'white',
                transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  minWidth: '13vw',
                  gap: '0.6vw',
                  padding: '0vw',
                },
              }}
            >
              {/* ICON */}
              <Box
                component="img" 
                src={global_ranking} 
                sx={{
                  width: '1.5vw', 
                  height: '1.5vw', 
                  flexShrink: 0,
                  opacity: changeView === 'Lib2' ? 0 : 1,
                  transform: changeView === 'Lib2' ? 'translateX(-20px)' : 'translateX(0)',
                  maxWidth: changeView === 'Lib2' ? 0 : '1.5vw',
                  transition: 'all 300ms ease',
                  '.MuiButton-root:hover &': {
                    opacity: 1,
                    transform: 'translateX(0)',
                    maxWidth: '1.5vw',
                  },
              }}/>
              
              {/* TEXT */}
              <Typography
                sx={{
                  fontSize: '0.8333vw',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  opacity: changeView === 'Lib1' ? 0 : 1,
                  transform: changeView === 'Lib1' ? 'translateX(20px)' : 'translateX(0)',
                  maxWidth: changeView === 'Lib1' ? 0 : '10.417vw',
                  transition: 'opacity 300ms ease, transform 300ms ease, max-width 400ms ease',
                  '.MuiButton-root:hover &': {
                    opacity: 1,
                    transform: 'translateX(0)',
                    maxWidth: '10.417vw',
                  },
                }}
              >
                Global Rankings
              </Typography>
            </Button>
              </>
            )}
          </Box>
        ) : null}
        {changeView === "SZ" || changeView === "Lib1" ? (
          <IconButton 
          disableRipple
          onClick={onExplore2}
          sx={{
            position: 'fixed',
            top: changeView === "SZ" ? '5vw' : '25vw',
            right: changeView === "SZ" ? '1vw' : '2vw',
            // backgroundColor: 'rgba(0, 63, 145,1)',
            // color: 'white',
            background: 'rgba(1, 75, 172, 0.5)',
            border: '0.8px solid #66E4FF',
            backdropFilter: 'blur(50px)',
            boxShadow: `0px 5.85px 5.85px rgba(0,0,0,0.4)`,
            color: 'white',
            borderRadius: '50%',
            padding: '1.3vw',
            boxSizing: 'border-box',
            zIndex: 3000,
            transition: "transform 0.3s ease",
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}>
            <ArrowForwardIosIcon sx={{ fontSize: '1.5vw' }} />
          </IconButton>
        ) : changeView === "F" || changeView === "Lib2" ? (
          <IconButton 
          disableRipple
          onClick={onExplore1}
          sx={{
            position: 'fixed',
            top: changeView === "F" ? '5vw' : '25vw',
            left: changeView === "F" ? '1vw' : '2vw',
            background: 'rgba(1, 75, 172, 0.5)',
            border: '0.8px solid #66E4FF',
            backdropFilter: 'blur(50px)',
            boxShadow: `0px 5.85px 5.85px rgba(0,0,0,0.4)`,
            color: 'white',
            borderRadius: '50%',
            padding: '1.3vw',
            boxSizing: 'border-box',
            zIndex: 3000,
            transition: "transform 0.3s ease",
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}>
            <ArrowBackIosNewIcon sx={{ fontSize: '1.5vw' }} />
          </IconButton>
        ) : null}
      </>
    )
}