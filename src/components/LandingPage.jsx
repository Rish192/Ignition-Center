import { useEffect, useState } from "react";
import {Box, Button, IconButton, Typography} from '@mui/material';
import { Close } from "@mui/icons-material";
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import headerline from '../assets/header-line.png';
import navigate_1 from '../assets/navigate_1.png';
import navigate_2 from '../assets/navigate_2.png';
import Joystick from '../assets/Joystick-BG-3.png';
import Top_Menu from '../assets/Top_Menu.png';
import walkicon from '../assets/walk-icon.png';
import ui_instruction_arc from '../assets/ui_instruction_arc.png';
import mouseicon from '../assets/mouse-icon2.png';
import joystick_icon from '../assets/joystick-icon.png';

export default function LandingPage ({onClose}) {
    const [page, setPage] = useState(1);

    const handleNext = () => {
        if (page === 1) {
            setPage(2);
        } else {
            onClose();
        }
    };

    const handleBack = () => {
        if (page === 2) {
            setPage(1);
        } else {
            onClose();
        }
    }

    return (
        <Box sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(3, 57, 129, 0.49)',
          border: '1px solid rgba(158,199,255,0.6)',
          borderRadius: '12px',
          backdropFilter: 'blur(25px)',
          boxShadow: ` 0 3.27px 3.27px rgba(0,0,0,0.25),
            inset 0 3.27px 3.27px rgba(74,74,74,0.25)`,
          boxSizing: 'border-box',
          padding: '1.0417vw',
          width: '55vw', //60.9375vw
          //height: '59vh',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8333vw',
          transition: 'all 0.3s ease',
          zIndex: 1000
        }}>
            {/* <IconButton 
            onClick={onClose}
            sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                color: 'white',
                '&:hover': {bgcolor: 'rgba(255,255,255,0.1)'}
            }}>
                <Close sx={{fontSize: '1.25vw'}}/>
            </IconButton> */}
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4167vw'}}>
                <img src={headerline} style={{width: '8.5vw'}} />
                <Typography sx={{color: 'white', fontSize: '1.4583vw', fontWeight: 'bold', textAlign: 'center'}}>
                    Welcome to the Ignition Center
                </Typography>
                <img src={headerline} style={{transform: 'scaleX(-1)', width: '8.5vw'}}/>
            </Box>
            <Box>
                <Typography sx={{color: 'white', fontSize: '1.0417vw', fontWeight: 'lighter', textAlign: 'center', px: '5.5vw'}}>
                    Step into a dynamic collaboration space where you can join live meetings, host discussions, or connect with teams in real time. Select a zone or hotspot to begin exploring.
                </Typography>
            </Box>
            <Box sx={{
                backgroundColor: 'rgba(0,0,0,0.10)',
                //backdropFilter: 'blur(40px)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                boxSizing: 'border-box',
                gap: '0.8333vw',
                padding: '0.8333vw',
                alignItems: 'flex-start',
                boxSizing: 'border-box'
            }}>
                {page === 1 ? (
                    <>
                    <Box sx={{
                        // width: 'fit-content',
                        marginX: 'auto',
                    }}>
                        <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold'}}>
                            Getting Started
                        </Typography>
                        <hr style={{
                        width: '8vw',
                        border: 'none',
                        height: '0.1302vw',
                        background: 'linear-gradient(to right, rgba(0,148,153,0), rgba(0,246,255,1), rgba(0,204,211,0))', 
                        }} />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '1.25vw'}}>
                        <Box sx={{
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            borderRadius: '16px',
                            backdropFilter: 'blur(71.51px)',
                            width: '100%',
                            padding: '0.4167vw',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '0.8333vw',
                            gap: '0.4167vw',
                            boxSizing: 'border-box'
                        }}>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: '0.8333vw'}}>
                                <HomeFilledIcon sx={{fontSize: '1.25vw', color: '#a3eeff'}}/>
                                <Typography sx={{color: 'white', fontSize: "0.8333vw"}}>
                                    Use the top menu to move between zones
                                </Typography>
                            </Box>
                            <Box 
                            component="img"
                            src={Top_Menu}
                            sx={{width: '100%', borderRadius: '3px'}}
                            />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            gap: '0.4167vw',
                            width: '100%'
                        }}>
                            <Box sx={{
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.8333vw',
                                gap: '0.8333vw',
                                width: '17vw',
                                backdropFilter: 'blur(71.51px)'
                            }}>
                                <img src={navigate_2} alt="navigate 2" style={{ width: '1.5625vw', height: '1.5625vw' }} />
                                <Typography sx={{ color: 'white', fontSize: "0.8333vw"}}>
                                    Select a hotspot to explore
                                </Typography>
                            </Box>
                            <Box sx={{
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.8333vw',
                                gap: '0.8333vw',
                                width: '14.5vw',
                                backdropFilter: 'blur(71.51px)'
                            }}>
                                <InfoIcon sx={{color: 'white', fontSize: '1.25vw'}} />
                                <Typography sx={{ color: 'white', fontSize: "0.8333vw"}}>
                                    View zone information
                                </Typography>
                            </Box>
                            <Box sx={{
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.8333vw',
                                gap: '0.8333vw',
                                flex: 1,
                                backdropFilter: 'blur(71.51px)'
                            }}>
                                <img src={navigate_1} alt="navigate 2" style={{ width: '1.5625vw', height: '1.5625vw' }} />
                                <Typography sx={{ color: 'white', fontSize: "0.8333vw"}}>
                                    Drag to look around
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    </>
                ) : (
                    <>
                    {/* Top */}
                    <Box sx={{
                        display: 'flex',
                        gap: '0.4167vw',
                        //border: '1px solid red',
                        width: '100%'
                    }}>
                        {/* Left */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.8333vw',
                            flex: 0.9
                        }}>
                            <Box sx={{
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.8333vw',
                                gap: '0.8333vw',
                                flex: 1,
                                backdropFilter: 'blur(71.51px)'
                            }}>
                                <LogoutIcon sx={{ color: 'white', fontSize: '1.5vw', transform: 'scaleX(-1)' }} />
                                <Typography sx={{ color: 'white', fontSize: "0.8333vw"}}>
                                    Use this option to exit the current view and return to the zone entrance
                                </Typography>
                            </Box>
                            <Box sx={{
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.8333vw',
                                gap: '0.8333vw',
                                flex: 1,
                                backdropFilter: 'blur(71.51px)'
                            }}>
                                <Box component="img" src={walkicon} sx={{ color: 'white', width: '1.5vw', height: '1.5vw'}} />
                                <Typography sx={{ color: 'white', fontSize: "0.8333vw"}}>
                                    Select free navigation option to explore the Ignition Center
                                </Typography>
                            </Box>
                        </Box>
                        {/* Right */}
                        <Box sx={{
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            border: '1px solid rgba(158,199,255,0.6)',
                            borderRadius: '15px',
                            backdropFilter: 'blur(66.54px)',
                            flex: 0.3,
                            display: 'flex',
                            alignItems: 'flex-end',
                            boxSizing: 'border-box',
                            //paddingLeft: '0.1vw'
                        }}>
                            <Box
                              component="img"
                              src={ui_instruction_arc}
                              sx={{ width: '7vw', height: '6.6vw'}}
                            />
                        </Box>
                    </Box>
                    {/* Bottom */}
                    <Box sx={{
                        display: 'flex',
                        gap: '0.4167vw',
                        //border: '1px solid red',
                        width: '100%'
                    }}>
                        {/* Left */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.8333vw',
                            flex: 0.9
                        }}>
                            <Box sx={{
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.8333vw',
                                gap: '0.8333vw',
                                flex: 1,
                                backdropFilter: 'blur(71.51px)'
                            }}>
                                <Box component="img" src={joystick_icon} sx={{ color: 'white', width: '1.5vw', height: '1.5vw'}} />
                                <Typography sx={{ color: 'white', fontSize: "0.8333vw"}}>
                                    Use the joystick or WASD keys to move freely around the Ignition Center
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                gap: '0.4167vw'
                            }}>
                                <Box sx={{
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0.8333vw',
                                    gap: '0.8333vw',
                                    flex: 0.75,
                                    backdropFilter: 'blur(71.51px)'
                                }}>
                                    <FullscreenIcon sx={{ color: 'white', fontSize: '1.5vw', transform: 'scaleX(-1)' }} />
                                    <Typography sx={{ color: 'white', fontSize: "0.8333vw"}}>
                                        Switch to full screen view
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0.8333vw',
                                    gap: '0.8333vw',
                                    flex: 1,
                                    backdropFilter: 'blur(71.51px)'
                                }}>
                                    <Box component="img" src={mouseicon} sx={{ color: 'white', width: '1.5vw', height: '1.5vw'}} />
                                    <Typography sx={{ color: 'white', fontSize: "0.8333vw"}}>
                                        Click to adjust the drag sensitivity
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        {/* Right */}
                        <Box sx={{
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            border: '1px solid rgba(158,199,255,0.6)',
                            borderRadius: '15px',
                            backdropFilter: 'blur(66.54px)',
                            flex: 0.3,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxSizing: 'border-box',
                            paddingTop: '0.5vw'
                        }}>
                            <Box
                              component="img"
                              src={Joystick}
                              sx={{width: '6.5vw', height: '6.5vw',}}
                            />
                        </Box>
                    </Box>
                    </>
                )}
            </Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 'auto',
            }}>
                <Button
                onClick={handleBack}
                sx={{
                    // mt: '1.0417vw',
                    textTransform: 'none',
                    background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), rgba(0,174,255,1)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '0.9375vw',
                    width: '6.25vw',
                    transition: 'all 0.2s ease',
                    '&: hover': {
                        bgcolor: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), #1976d2',
                        transform: 'scale(1.08)',
                    }
                }}>
                    {page === 1 ? "Skip" : "Prev"}
                </Button>
                <Button 
                onClick={handleNext}
                sx={{
                    // mt: '1.0417vw',
                    textTransform: 'none',
                    background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), rgba(0,174,255,1)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '0.9375vw',
                    width: page === 1 ? '6.250vw' : '10vw',
                    transition: 'all 0.2s ease',
                    '&: hover': {
                        bgcolor: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), #1976d2',
                        transform: 'scale(1.08)',
                    }
                }}>
                    { page === 1 ? "Next" : "Get Started" }
                </Button>
            </Box>
        </Box>
    )
}