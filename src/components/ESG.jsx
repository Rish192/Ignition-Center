import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import Brochure_1_1 from '../assets/Lounge_Brochure_1/CEOOutlook2025_InsightSummary.pdf - Page 1 of 17.png';
import Brochure_1_2 from '../assets/Lounge_Brochure_1/CEOOutlook2025_InsightSummary.pdf - Page 2 of 17.png';
import Brochure_1_3 from '../assets/Lounge_Brochure_1/CEOOutlook2025_InsightSummary.pdf - Page 3 of 17.png';
import Brochure_1_4 from '../assets/Lounge_Brochure_1/CEOOutlook2025_InsightSummary.pdf - Page 4 of 17.png';
import Brochure_1_5 from '../assets/Lounge_Brochure_1/CEOOutlook2025_InsightSummary.pdf - Page 5 of 17.png';
import Brochure_1_6 from '../assets/Lounge_Brochure_1/CEOOutlook2025_InsightSummary.pdf - Page 6 of 17.png';
import Brochure_1_7 from '../assets/Lounge_Brochure_1/CEOOutlook2025_InsightSummary.pdf - Page 7 of 17.png';
import Brochure_1_8 from '../assets/Lounge_Brochure_1/CEOOutlook2025_InsightSummary.pdf - Page 8 of 17.png';
import Brochure_1_9 from '../assets/Lounge_Brochure_1/CEOOutlook2025_InsightSummary.pdf - Page 9 of 17.png';
import Brochure_1_10 from '../assets/Lounge_Brochure_1/CEOOutlook2025_InsightSummary.pdf - Page 10 of 17.png';
import Brochure_1_11 from '../assets/Lounge_Brochure_1/CEOOutlook2025_InsightSummary.pdf - Page 11 of 17.png';
import Brochure_1_12 from '../assets/Lounge_Brochure_1/CEOOutlook2025_InsightSummary.pdf - Page 12 of 17.png';
import Brochure_1_13 from '../assets/Lounge_Brochure_1/CEOOutlook2025_InsightSummary.pdf - Page 13 of 17.png';
import Brochure_1_14 from '../assets/Lounge_Brochure_1/CEOOutlook2025_InsightSummary.pdf - Page 14 of 17.png';
import Brochure_1_15 from '../assets/Lounge_Brochure_1/CEOOutlook2025_InsightSummary.pdf - Page 15 of 17.png';
import Brochure_1_16 from '../assets/Lounge_Brochure_1/CEOOutlook2025_InsightSummary.pdf - Page 16 of 17.png';
import Brochure_1_17 from '../assets/Lounge_Brochure_1/CEOOutlook2025_InsightSummary.pdf - Page 17 of 17.png';

import Brochure_2_1 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 1 of 46.png';
import Brochure_2_2 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 2 of 46.png';
import Brochure_2_3 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 3 of 46.png';
import Brochure_2_4 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 4 of 46.png';
import Brochure_2_5 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 5 of 46.png';
import Brochure_2_6 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 6 of 46.png';
import Brochure_2_7 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 7 of 46.png';
import Brochure_2_8 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 8 of 46.png';
import Brochure_2_9 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 9 of 46.png';
import Brochure_2_10 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 10 of 46.png';
import Brochure_2_11 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 11 of 46.png';
import Brochure_2_12 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 12 of 46.png';
import Brochure_2_13 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 13 of 46.png';
import Brochure_2_14 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 14 of 46.png';
import Brochure_2_15 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 15 of 46.png';
import Brochure_2_16 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 16 of 46.png';
import Brochure_2_17 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 17 of 46.png';
import Brochure_2_18 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 18 of 46.png';
import Brochure_2_19 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 19 of 46.png';
import Brochure_2_20 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 20 of 46.png';
import Brochure_2_21 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 21 of 46.png';
import Brochure_2_22 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 22 of 46.png';
import Brochure_2_23 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 23 of 46.png';
import Brochure_2_24 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 24 of 46.png';
import Brochure_2_25 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 25 of 46.png';
import Brochure_2_26 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 26 of 46.png';
import Brochure_2_27 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 27 of 46.png';
import Brochure_2_28 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 28 of 46.png';
import Brochure_2_29 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 29 of 46.png';
import Brochure_2_30 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 30 of 46.png';
import Brochure_2_31 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 31 of 46.png';
import Brochure_2_32 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 32 of 46.png';
import Brochure_2_33 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 33 of 46.png';
import Brochure_2_34 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 34 of 46.png';
import Brochure_2_35 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 35 of 46.png';
import Brochure_2_36 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 36 of 46.png';
import Brochure_2_37 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 37 of 46.png';
import Brochure_2_38 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 38 of 46.png';
import Brochure_2_39 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 39 of 46.png';
import Brochure_2_40 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 40 of 46.png';
import Brochure_2_41 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 41 of 46.png';
import Brochure_2_42 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 42 of 46.png';
import Brochure_2_43 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 43 of 46.png';
import Brochure_2_44 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 44 of 46.png';
import Brochure_2_45 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 45 of 46.png';
import Brochure_2_46 from '../assets/Lounge_Brochure_2/GM-TL-01804_ADV_CEE-Report_FY25_V11_High.pdf - Page 46 of 46.png';

import Brochure_3_1 from '../assets/Lounge_Flyer_1/Slide0.png';
import Brochure_3_2 from '../assets/Lounge_Flyer_1/Slide1.png';
import Brochure_3_3 from '../assets/Lounge_Flyer_1/Slide2.png';
import Brochure_3_4 from '../assets/Lounge_Flyer_1/Slide3.png';
import Brochure_3_5 from '../assets/Lounge_Flyer_1/Slide4.png';

export default function ESG({onClose, hotspotId}) {
    const [isMaximized, setIsMaximized] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    let images = [];

    if (hotspotId === "HS_D") {
        images = [Brochure_1_1, Brochure_1_2, Brochure_1_3, Brochure_1_4, Brochure_1_5, Brochure_1_6, Brochure_1_7, Brochure_1_8,
             Brochure_1_9, Brochure_1_10, Brochure_1_11, Brochure_1_12, Brochure_1_13, Brochure_1_14, Brochure_1_15, Brochure_1_16, Brochure_1_17];
    } else if (hotspotId === "HS_P") {
        images = [Brochure_2_1, Brochure_2_2, Brochure_2_3, Brochure_2_4, Brochure_2_5, Brochure_2_6, Brochure_2_7, Brochure_2_8, Brochure_2_9,
            Brochure_2_10, Brochure_2_11, Brochure_2_12, Brochure_2_13, Brochure_2_14, Brochure_2_15, Brochure_2_16, Brochure_2_17, Brochure_2_18, Brochure_2_19,
            Brochure_2_20, Brochure_2_21, Brochure_2_22, Brochure_2_23, Brochure_2_24, Brochure_2_25, Brochure_2_26, Brochure_2_27, Brochure_2_28, Brochure_2_29,
            Brochure_2_30, Brochure_2_31, Brochure_2_32, Brochure_2_33, Brochure_2_34, Brochure_2_35, Brochure_2_36, Brochure_2_37, Brochure_2_38, Brochure_2_39,
            Brochure_2_40, Brochure_2_41, Brochure_2_42, Brochure_2_43, Brochure_2_44, Brochure_2_45, Brochure_2_46
        ];
    } else if (hotspotId === "HS_Q") {
        images = [Brochure_3_1, Brochure_3_2, Brochure_3_3, Brochure_3_4, Brochure_3_5];
    }

    return (
        <Box
            sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            }}
        >
            <Box
            sx={{
                width: isMaximized ? '90vw' : 'fit-content', //hotspotId === "HS_Q" ? '40vw' : '70vw'
                height: isMaximized ? '84vh' : hotspotId === "HS_Q" ? '80vh' : '70vh',
                backgroundColor: 'rgba(0,63,145,0.31)',
                borderRadius: '1vw',
                padding: '0.4167vw',
                boxSizing: 'border-box',
                color: 'white',
                position: 'relative',
                backdropFilter: 'blur(28.5px)',
                boxShadow: '0px 2.28px 2.28px rgba(0,0,0,0.25)',
                border: '1.14px solid rgba(158,199,255,0.6)',
            }}
            >
                {/* Maximize/Minimize Button */}
                {/* {hotspotId !== "HS_Q" ? (
                    <IconButton 
                        onClick={() => setIsMaximized((prev) => !prev)}
                        sx={{
                        position: 'fixed',
                        top: '-2.2vw',
                        right: '2.2vw',
                        zIndex: 2500,
                        bgcolor: "rgba(1,0,37,0.85)",
                        color: "white",
                        border: "1.14px solid rgba(158,199,255,0.6)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
                        width: '2vw',
                        height: '2vw',
                        }}
                    >
                        {isMaximized ? < FullscreenExitIcon sx={{ fontSize: '1.4vw' }} /> 
                        : < FullscreenIcon sx={{ fontSize: '1.4vw' }} />}
                    </IconButton>
                ) : (<></>)} */}
                <IconButton 
                    onClick={() => setIsMaximized((prev) => !prev)}
                    sx={{
                    position: 'fixed',
                    top: '-2.2vw',
                    right: '2.2vw',
                    zIndex: 2500,
                    bgcolor: "rgba(1,0,37,0.85)",
                    color: "white",
                    border: "1.14px solid rgba(158,199,255,0.6)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                        bgcolor: 'rgba(0,0,0,0.55)', 
                        transform: 'scale(1.08)' 
                    },
                    width: '2vw',
                    height: '2vw',
                    }}
                >
                    {isMaximized ? < FullscreenExitIcon sx={{ fontSize: '1.4vw' }} /> 
                    : < FullscreenIcon sx={{ fontSize: '1.4vw' }} />}
                </IconButton>

                {/* Close Button */}
                <IconButton
                    onClick={onClose}
                    sx={{
                    position: 'fixed',
                    top: '-2.2vw',
                    right: '0vw',
                    zIndex: 2500,
                    bgcolor: "rgba(1,0,37,0.85)",
                    color: "white",
                    border: "1.14px solid rgba(158,199,255,0.6)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                        bgcolor: 'rgba(0,0,0,0.55)', 
                        transform: 'scale(1.08)' 
                    },
                    width: '2vw',
                    height: '2vw',
                    }}
                >
                    <Close sx={{ fontSize: '1.4vw' }} />
                </IconButton>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    // border: '1px solid green',
                    boxSizing: 'border-box',
                    padding: '0.4167vw',
                    color: 'white',
                    overflowY: 'auto',
                    scrollbarWidth: 'thin',
                    '&::-webkit-scrollbar': { width: '0.2083vw' },
                    '&::-webkit-scrollbar-track': { background: 'transparent' },
                    '&::-webkit-scrollbar-thumb': { borderRadius: '3px' },
                    scrollbarColor: '#5fb2e2ff transparent'
                }}>
                    {isMaximized ? (
                        images.map((img, index) => (
                            <Box key={index} sx={{ mb: "2vw", }}>
                                <Box
                                    component="img"
                                    src={img}
                                    alt={`Brochure Page ${index + 1}`}
                                    sx={{
                                        width: "100%",
                                        height: "auto",
                                        objectFit: "contain",
                                        borderRadius: "0.5vw",
                                    }}
                                />
                            </Box>
                        ))
                    ) : (
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                position: "relative",
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: '0.8333vw',
                                paddingX: '0.2083vw',
                                boxSizing: 'border-box'
                            }}
                        >
                            <IconButton
                                onClick={() =>
                                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
                                }
                                sx={{
                                    // position: "absolute",
                                    // left: "0vw",
                                    zIndex: 20,
                                    color: "white",
                                    background: "rgba(0,0,0,0.4)",
                                    transition: 'all 0.2s ease',
                                    "&:hover": { 
                                        background: "rgba(0,0,0,0.6)",
                                        transform: 'scale(1.1)',
                                    },
                                }}
                            >
                                <ArrowBack sx={{fontSize: '1.5vw'}}/>
                            </IconButton>

                            <Box
                                component="img"
                                src={images[currentIndex]}
                                alt="HS_Q Slide"
                                sx={{
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                    width: "auto",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />

                            <IconButton
                                onClick={() =>
                                    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
                                }
                                sx={{
                                    // position: "absolute",
                                    // right: "0vw",
                                    zIndex: 20,
                                    color: "white",
                                    background: "rgba(0,0,0,0.4)",
                                    transition: 'all 0.2s ease',
                                    "&:hover": { 
                                        background: "rgba(0,0,0,0.6)",
                                        transform: 'scale(1.1)',
                                    },
                                }}
                            >
                                <ArrowForward sx={{fontSize: '1.5vw'}}/>
                            </IconButton>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}