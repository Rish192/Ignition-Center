import React, { useState } from "react";
import { Box, Typography, IconButton, Button  } from "@mui/material";
import { Close } from "@mui/icons-material";
import headerline from '../assets/header-line.png';
import Data_Monetization from '../assets/Data_Monetization.png';
import Data_Monetization2 from '../assets/Data_Monetization2.png';
import AI_Acceleration from '../assets/AI_Acceleration.png';
import OT_Security from '../assets/OT_Security.png';
import Frame from "./Frame";
import DM_IMG from '../assets/DM.png';
import AI_IMG from '../assets/AI.png';
import OTS_IMG from '../assets/OTS.png';

const IMAGE_TO_URL_MAP = {
    [DM_IMG]: 'https://indialogue.io/clients/reports/kpmg/authenticate?returnUrl=%2Fclients%2Freports%2Fkpmg%2F67c19ff374b34da7238d8048%2F',
    [AI_IMG]: 'https://indialogue.io/clients/reports/kpmg/authenticate?returnUrl=%2Fclients%2Freports%2Fkpmg%2F67d13d7e06087001c8a0024d%2F',
    [OTS_IMG]: 'https://indialogue.io/clients/reports/kpmg/authenticate?returnUrl=%2Fclients%2Freports%2Fkpmg%2F67d7e8102497319cc1adc8c6%2F'
};

export default function LeftScreenPopup({selectedImage, onClose}) {
    const [showFrame, setShowFrame] = useState(false);

    const getFrameUrl = (imageAsset) => {
        return IMAGE_TO_URL_MAP[imageAsset] || null;
    };

    return (
        <>
        {selectedImage && !showFrame &&(
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: "rgba(0,0,0,0.7)",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8333vw',
                zIndex: 10000,
            }}>
                <Box
                    sx={{
                        position: 'relative',
                        width: 'fit-content',
                        height: '80vh',
                        //maxHeight: '80vh',
                        borderRadius: '0.5vw',
                        boxSizing: 'border-box',
                    }}
                >
                    <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: '-1.5vw',
                        right: '-1.5vw',
                        height: '1.5vw',
                        width: '1.5vw',
                        border: "1px solid white",
                        color: 'white',
                        transition: 'all 0.2s ease',
                        '&: hover': {
                            transform: 'scale(1.08)',
                        }
                    }}>
                        <Close sx={{fontSize: '1.0417vw'}}/>
                    </IconButton>
                    <Box
                        component="img"
                        src={selectedImage}
                        style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block',
                        }}
                    />
                </Box>
                <Button
                variant="contained"
                size="small"
                    sx={{
                    textTransform: 'none',
                    fontSize: '0.8333vw',
                    padding: '0.4167vw 1.0417vw',
                    borderRadius: '999px',
                    transition: 'all 0.3s ease',
                    '&: hover': {
                        transform: 'scale(1.2)',
                    }
                    }}
                onClick={() => {
                    setShowFrame(true);
                }}
                >
                    Explore
                </Button>
            </Box>
        )}
        {showFrame && (
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: "rgba(0,0,0,0.7)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
        }}>
            <Frame 
                //src="https://indialogue.io/clients/reports/kpmg/authenticate?returnUrl=%2Fclients%2Freports%2Fkpmg%2F67c19ff374b34da7238d8048%2F"
                src={getFrameUrl(selectedImage)}
                minimizedWidth="90vw"
                maximizedWidth="90vw"
                minimizedHeight="85vh"
                maximizedHeight="85vh"
                style={{ position: "fixed", transform: "translate(-50%, -50%)", zIndex: 100005300 }}
                top="52.5vh"
                left="50vw"
                showFullscreen={false}
                onStateChange={({ isClosed }) => {
                    if (isClosed) setShowFrame(false);
                }}
            />
        </Box>
        )}
        </>
    )
}
