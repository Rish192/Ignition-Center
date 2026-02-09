import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Close, ArrowBack, ArrowForward } from "@mui/icons-material";

const videoData = [
    { id: 1, src: "/videos/Vid_4.mp4" },
    { id: 2, src: "/videos/Vid_5.mp4" },
];

export default function IWCarousel({ iwVideoIndex, setIwVideoIndex }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const nextVideo = () => {
        setIwVideoIndex((prev) => (prev + 1) % videoData.length);
    };
    const prevVideo = () => {
        setIwVideoIndex((prev) => (prev - 1 + videoData.length) % videoData.length);
    };

    return (
    <>
        <Box sx={{
            position: 'fixed',
            bottom: '2vw',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 3000
        }}>
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '1.0417vw',
                background: `
                    linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(2,42,64,0.09)),
                    rgba(0, 39, 89, 0.5)
                `,
                padding: '0.4167vw 0.8333vw',
                borderRadius: '1.25vw'
            }}>
                <IconButton 
                disableRipple
                onClick={prevVideo} 
                sx={{ 
                    p: 0,
                    background: 'transparent',
                    transition: 'all 0.2s ease',
                    '&: hover': {
                        transform: 'scale(1.2)'
                    }
                }}>
                    <ArrowBack sx={{ fontSize: '1.25vw', color: 'white' }} />
                </IconButton>
                <Box
                    sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.8333vw",
                    }}
                >
                    {videoData.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => setIwVideoIndex(index)}
                        sx={{
                        width: "0.6vw",
                        height: "0.6vw",
                        borderRadius: "50%",
                        backgroundColor: index === iwVideoIndex ? "#38D39F" : "#B0B9C2",
                        cursor: "pointer",
                        transition: "background 0.3s ease, transform 0.2s ease",
                        transform: index === iwVideoIndex ? "scale(1.3)" : "scale(1)",
                        '&: hover': {
                            transform: 'scale(1.2)'
                        }
                        }}
                    />
                    ))}
                </Box>
                <IconButton 
                disableRipple
                onClick={nextVideo} 
                sx={{ 
                    p: 0,
                    background: 'transparent',
                    transition: 'all 0.2s ease',
                    '&: hover': {
                        transform: 'scale(1.2)'
                    }
                }}>
                    <ArrowForward sx={{ fontSize: '1.25vw', color: 'white' }} />
                </IconButton>
            </Box>
        </Box>
        {/* <Box sx={{
            bgcolor: 'rgba(0,63,145,0.31)',
            border: '1.14px solid rgba(158,199,255,0.6)',
            // borderRadius: '1vw',
            backdropFilter: 'blur(28.5px)',
            boxShadow: '0px 2.28px 2.28px rgba(0,0,0,0.25)',
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: '80vw',
            height: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.4167vw',
            pb: '0.8333vw',
            zIndex: 2000,
            overflow: 'hidden',
        }}>
            <Box sx={{
                // border: '1px solid green',
                position: 'relative',
                width: '100%',
                height: 'calc(100% - 5vh)',
                overflow: 'hidden',
                borderRadius: '1vw',
            }}>
                {videoData.map((video, index) => (
                    <Box 
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: `${(index - currentIndex) * 100}%`,
                        width: '100%',
                        height: '100%',
                        transition: 'left 0.8s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}>
                        <video 
                        src={video.src}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '1vw',
                        }}
                        autoPlay
                        muted
                        loop
                        />
                    </Box>
                ))}
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.0417vw'}}>
                <IconButton onClick={prevVideo} sx={{ p: 0 }}>
                    <ArrowBack sx={{ fontSize: '1.25vw', color: 'white' }} />
                </IconButton>
                <Box
                    sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.8333vw",
                    }}
                >
                    {videoData.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => setIwVideoIndex(index)}
                        sx={{
                        width: "0.6vw",
                        height: "0.6vw",
                        borderRadius: "50%",
                        backgroundColor: index === currentIndex ? "#38D39F" : "#B0B9C2",
                        cursor: "pointer",
                        transition: "background 0.3s ease, transform 0.3s ease",
                        transform: index === currentIndex ? "scale(1.3)" : "scale(1)",
                        }}
                    />
                    ))}
                </Box>
                <IconButton onClick={nextVideo} sx={{ p: 0 }}>
                    <ArrowForward sx={{ fontSize: '1.25vw', color: 'white' }} />
                </IconButton>
            </Box>
        </Box> */}

        {/* {selectedVideo && (
            <Box sx={{
                position: "fixed",
                top: '50%',
                left: '50%',
                transform: "translate(-50%, -50%)",
                width: "90%",
                height: "85%",
                bgcolor: "rgba(0, 0, 0, 0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 3000, 
            }}>
                <IconButton
                    onClick={() => setSelectedVideo(null)}
                    sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                    }}
                >
                    <Close />
                </IconButton>
                <video
                    src={selectedVideo.src}
                    controls
                    autoPlay
                    style={{
                    width: "95%",
                    height: "95%",
                    objectFit: "contain",
                    borderRadius: "1vw",
                    }}
                />
            </Box>
        )} */}
    </>
    )
}