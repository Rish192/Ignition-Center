import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import left_image from "../assets/Library_Right_Rack/left_image.jpg";
import right_image from "../assets/Library_Right_Rack/right_image.jpg";
import MQ_1 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant01.png";
import MQ_2 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant02.png";
import MQ_3 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant03.png";
import MQ_4 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant04.png";
import MQ_5 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant05.png";
import MQ_6 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant06.png";
import MQ_7 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant07.png";
import MQ_8 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant08.png";
import MQ_9 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant09.png";
import MQ_10 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant10.png";
import MQ_11 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant11.png";
import MQ_12 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant12.png";
import MQ_13 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant13.png";
import MQ_14 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant14.png";
import MQ_15 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant15.png";
import MQ_16 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant16.png";
import MQ_17 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant17.png";
import MQ_18 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant18.png";
import MQ_19 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant19.png";
import MQ_20 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant20.png";
import MQ_21 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant21.png";
import MQ_22 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant22.png";
import MQ_23 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant23.png";
import MQ_24 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant24.png";
import MQ_25 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant25.png";
import MQ_26 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant26.png";
import MQ_27 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant27.png";
import MQ_28 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant28.png";
import MQ_29 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant29.png";
import MQ_30 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant30.png";
import MQ_31 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant31.png";
import MQ_32 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant32.png";
import MQ_33 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant33.png";
import MQ_34 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant34.png";
import MQ_35 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant35.png";
import MQ_36 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant36.png";
import MQ_37 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant37.png";
import MQ_38 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant38.png";
import MQ_39 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant39.png";
import MQ_40 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant40.png";
import MQ_41 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant41.png";
import MQ_42 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant42.png";
import MQ_43 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant43.png";
import MQ_44 from "../assets/Library_Right_Rack/MagicQuadrant/MagicQuadrant44.png";
import Forrester_01 from "../assets/Library_Right_Rack/Social_Post_Forrester/Social_Post_Forrester01.png";
import Forrester_02 from "../assets/Library_Right_Rack/Social_Post_Forrester/Social_Post_Forrester02.png";
import Forrester_03 from "../assets/Library_Right_Rack/Social_Post_Forrester/Social_Post_Forrester03.png";
import Forrester_04 from "../assets/Library_Right_Rack/Social_Post_Forrester/Social_Post_Forrester04.png";
import Forrester_05 from "../assets/Library_Right_Rack/Social_Post_Forrester/Social_Post_Forrester05.png";

const IMAGE_MAP = {
    HS_AC: left_image,
    HS_AD: [Forrester_01, Forrester_02, Forrester_03, Forrester_04, Forrester_05],
    HS_AE: [MQ_1, MQ_2, MQ_3, MQ_4, MQ_5, MQ_6, MQ_7, MQ_8, MQ_9, MQ_10, MQ_11, MQ_12, MQ_13, MQ_14, MQ_15, MQ_16, MQ_17, MQ_18, MQ_19, MQ_20, 
        MQ_21, MQ_22, MQ_23, MQ_24, MQ_25, MQ_26, MQ_27, MQ_28, MQ_29, MQ_30, MQ_31, MQ_32, MQ_33, MQ_34, MQ_35, MQ_36, MQ_37, MQ_38, MQ_39, MQ_40, MQ_41, MQ_42, MQ_43, MQ_44],
    HS_AF: right_image,

};

export default function LibraryPopup2({onClose,activeHotspot}) {
    const [isMaximized, setIsMaximized] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = Array.isArray(IMAGE_MAP[activeHotspot])
        ? IMAGE_MAP[activeHotspot]
        : [];

    const isCarouselHotspot = activeHotspot === "HS_AD" || activeHotspot === "HS_AE";

    return (
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 3000,
        }}>
            {activeHotspot === "HS_AC" || activeHotspot === "HS_AF" ? (
                <Box sx={{
                    width: 'fit-content',
                    minWidth: '20vw',
                    height: '85vh',
                    boxSizing: 'border-box',
                    backgroundColor: 'rgba(0,63,145,0.31)',
                    borderRadius: '1vw',
                    padding: '0.8333vw',
                    color: 'white',
                    position: 'relative',
                    backdropFilter: 'blur(28.5px)',
                    boxShadow: '0px 2.28px 2.28px rgba(0,0,0,0.25)',
                    border: '1.14px solid rgba(158,199,255,0.6)',
                }}>
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
                        width: '2vw',
                        height: '2vw',
                        transition: 'all 0.2s ease',
                        '&:hover': { 
                            transform: 'scale(1.08)',
                            bgcolor: 'rgba(0,0,0,0.55)' },
                        }}
                    >
                        <Close sx={{ fontSize: '1.4vw' }} />
                    </IconButton>
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        boxSizing: 'border-box',
                        padding: '0.8333vw',
                        color: 'white',
                    }}>
                        <Box sx={{
                            width: "100%",
                            height: "100%",
                            position: "relative",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Box
                            component="img"
                            src={IMAGE_MAP[activeHotspot]}
                            alt="image"
                            sx={{
                                maxHeight: "100%",
                                maxWidth: "100%",
                                width: "auto",
                                height: "auto",
                                objectFit: "contain",
                            }}
                            />
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box sx={{
                    width: isMaximized ? '90vw' : 'fit-content',
                    height: isMaximized ? '84vh' : '80vh',
                    backgroundColor: 'rgba(0,63,145,0.31)',
                    borderRadius: '1vw',
                    padding: '0.4167vw',
                    boxSizing: 'border-box',
                    color: 'white',
                    position: 'relative',
                    backdropFilter: 'blur(28.5px)',
                    boxShadow: '0px 2.28px 2.28px rgba(0,0,0,0.25)',
                    border: '1.14px solid rgba(158,199,255,0.6)',
                }}>
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
                        width: '2vw',
                        height: '2vw',
                        transition: 'all 0.2s ease',
                        '&:hover': { 
                            transform: 'scale(1.08)',
                            bgcolor: 'rgba(0,0,0,0.55)'
                        },
                        }}
                    >
                        {isMaximized ? < FullscreenExitIcon sx={{ fontSize: '1.4vw' }} /> 
                        : < FullscreenIcon sx={{ fontSize: '1.4vw' }} />}
                    </IconButton>
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
                        width: '2vw',
                        height: '2vw',
                        transition: 'all 0.2s ease',
                        '&:hover': { 
                            transform: 'scale(1.08)',
                            bgcolor: 'rgba(0,0,0,0.55)'
                        },
                      }}
                    >
                        <Close sx={{ fontSize: '1.4vw' }} />
                    </IconButton>
                    <Box sx={{
                      width: '100%',
                      height: '100%',
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
                                <Box key={index} sx={{ mb: '2vw' }}>
                                    <Box
                                        component="img"
                                        src={img}
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            objectFit: 'contain',
                                            borderRadius: '0.5vw',
                                        }}
                                    />
                                </Box>
                            ))
                        ) : (
                            <Box sx={{
                                width: "100%",
                                height: "100%",
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: '0.8333vw'
                            }}>
                                <IconButton
                                    onClick={() =>
                                        setCurrentIndex(prev => prev > 0 ? prev - 1 : images.length - 1)
                                    }
                                    sx={{
                                        zIndex: 20,
                                        color: "white",
                                        background: "rgba(0,0,0,0.4)",
                                        transition: 'all 0.2s ease',
                                        "&:hover": { 
                                            transform: 'scale(1.1)',
                                            background: "rgba(0,0,0,0.6)"
                                        },
                                    }}
                                >
                                    <ArrowBack sx={{ fontSize: '1.5vw' }} />
                                </IconButton>

                                <Box
                                    component="img"
                                    src={images[currentIndex]}
                                    sx={{
                                        maxHeight: "100%",
                                        maxWidth: "100%",
                                        objectFit: "contain",
                                    }}
                                />

                                <IconButton
                                    onClick={() =>
                                        setCurrentIndex(prev => prev < images.length - 1 ? prev + 1 : 0)
                                    }
                                    sx={{
                                        zIndex: 20,
                                        color: "white",
                                        background: "rgba(0,0,0,0.4)",
                                        transition: 'all 0.2s ease',
                                        "&:hover": { 
                                            transform: 'scale(1.08)',
                                            background: "rgba(0,0,0,0.6)" 
                                        },
                                    }}
                                >
                                    <ArrowForward sx={{ fontSize: '1.5vw' }} />
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    )
}