import React, {useEffect, useState} from 'react';
import { Box, Button, Typography, Fade } from '@mui/material';
import KPMG_Logo from '../assets/KPMG_Logo.png';
import Loading_Underline from '../assets/Loading_Underline.png';
// import Globe_bg from '../assets/Globe_bg.mp4';
//const Globe_bg = "https://dfa6lpn2gurde.cloudfront.net/assets/Globe_bg.mp4";
// import Globe_bg from '../assets/globe_video_final.mp4';
//import Globe_bg from '../assets/globe_video_2.mp4';
import Globe_bg from '../assets/globe_video_blue_final.mp4';

import Explore from '../assets/explore.png';
import Join_Meeting from '../assets/join_meeting.png';

export default function LoadingScreen({onEnter, onJoinAMeeting}) {
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("Initializing...");
    const [showEnter, setShowEnter] = useState(false);

    useEffect(() => {
        const duration = 5000;
        const interval = 100;
        const step = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                const newProgress = Math.min(oldProgress + step, 100);

                if (newProgress >= 75 && oldProgress < 75) {
                    setStatusText("Almost ready...");
                } else if (newProgress >= 50 && oldProgress < 50) {
                    setStatusText("Loading assets...");
                } else if (newProgress >= 25 && oldProgress < 25) {
                    setStatusText("Preparing your virtual journey...");
                }

                if(newProgress === 100) {
                    clearInterval(timer);
                    setTimeout(() => setShowEnter(true), 500);
                }
                return newProgress;
            });
        }, interval);

        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#00041C',
            //background: 'linear-gradient(to right, #2331A9, #3B259B)',
            zIndex: 1000,
        }}>
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
                }}
                src={Globe_bg}
            />
            <div style={{position: 'relative', zIndex: 1}}>
                <img src={KPMG_Logo} alt="KPMG" style={{ 
                    display: 'block',
                    width: '9vw',
                    margin: '0 auto' 
                }}/>
                <Box>
                    <Typography sx={{textAlign: 'center', fontSize: '2.8646vw', fontWeight: 'bold', color: 'white', marginTop: '0.8333vw'}}>
                        Virtual Ignition Center
                    </Typography>
                    <img src={Loading_Underline} style={{width: '33.333vw', marginTop: '-1.667vw'}} />
                </Box>
            </div>

            {/* Conditional Render: Loading Bar Container OR Enter Buttons */}
            {!showEnter ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '47.917vw',
                    zIndex: 1,
                    marginTop: '-1.25vw',
                    boxSizing: 'border-box'
                }}>
                    {/* Percentage */}
                    <Typography sx={{
                        color: '#4CC3FF',
                        fontSize: '1.25vw',
                        marginBottom: '0.4167vw'
                    }}>
                        {Math.floor(progress)}%
                    </Typography>
                    {/* Loading Bar */}
                    <Box sx={{
                        width: '100%',
                        height: '2.7083vw',
                        backgroundColor: 'rgba(0,55,89,0.2)',
                        border: '0.5px solid #66E4FF',
                        borderRadius: '12.95px',
                        overflow: 'hidden',
                        padding: '0.8333vw',
                        boxSizing: 'border-box'
                    }}>
                        <Box sx={{
                            width: `${progress}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #209CD9, #1D7DEE)',
                            border: '0.5px solid #66E4FF',
                            borderRadius: '10px 0px 0px 10px',
                            transition: 'width 0.1s linear',
                        }} />
                    </Box>
                    {/* Status Text */}
                    <Typography sx={{
                        color: '#4CC3FF',
                        fontSize: '1.25vw',
                        marginTop: '0.4167vw'
                    }}>
                        {statusText}
                    </Typography>
                </Box>
            ) : (
                <>
                <Box sx={{
                    width: '46.875vw',
                    height: '5.89vw',
                    backgroundColor: 'rgba(11,42,69,0.8)',
                    border: '0.5px solid #4FA3E3',
                    borderRadius: '12.95px',
                    backdropFilter: 'blur(30px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.8333vw',
                    color: '#CFE6F7'
                }}>
                    <Typography sx={{fontSize: '1.25vw', fontWeight: 500}}>Welcome to KPMG Virtual Ignition Center.</Typography>
                    <Typography sx={{fontSize: '1.25vw', fontWeight: 500, textAlign: 'center'}}>Select <b>'Explore Ignition Center'</b> to experience immersive insights and interactive solutions, or <b>'Join Meeting'</b> to join your live session.</Typography>
                </Box>
                <Box sx={{
                    display: 'flex', gap: '1.667vw', marginTop: '1.667vw', zIndex: 1
                }}>
                    <Box onClick={onEnter}
                    sx={{
                        width: '17.188vw', 
                        height: '7.78vh',
                        borderRadius: '30px 0px 0px 30px',
                        backgroundColor: 'rgba(11,42,69,0.8)',
                        backdropFilter: 'blur(49.13px)',
                        boxShadow: '0px 3.93px 3.93px rgba(0,0,0,0.25)',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8333vw',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&: hover': {
                            transform: 'scale(1.08)',
                        }
                    }}>
                        <Box sx={{
                            width: '7.78vh',
                            height: '7.78vh',
                            border: '1px solid #4FA3E3',
                            background: 'rgba(11,42,69,0.8)',
                            borderRadius: '50%',
                            zIndex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <img src={Explore} alt="Explore" style={{ width: '3vw', height: '3vw' }} />
                        </Box>
                        <Typography sx={{color: 'white', fontSize: '1.0417vw'}}>
                            Explore Ignition Center
                        </Typography>
                    </Box>
                    <Box 
                    onClick={() => {
                        onEnter(); 
                        onJoinAMeeting();
                    }}
                    sx={{
                        width: '17.188vw', 
                        height: '7.78vh',
                        borderRadius: '30px 0px 0px 30px',
                        backgroundColor: 'rgba(11,42,69,0.8)',
                        backdropFilter: 'blur(49.13px)',
                        boxShadow: '0px 3.93px 3.93px rgba(0,0,0,0.25)',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2.0833vw',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&: hover': {
                            transform: 'scale(1.08)',
                        }
                    }}>
                        <Box sx={{
                            width: '7.78vh',
                            height: '7.78vh',
                            border: '1px solid #4FA3E3',
                            background: 'rgba(11,42,69,0.8)',
                            borderRadius: '50%',
                            zIndex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <img src={Join_Meeting} alt="Join Meeting" style={{ width: '2.5vw', height: '2.5vw' }} />
                        </Box>
                        <Typography sx={{pr: '2.6042vw', color: 'white', fontSize: '1.0417vw'}}>
                            Join a Meeting
                        </Typography>
                    </Box>
                </Box>
                </>
            )}
        </div>
    );
}
