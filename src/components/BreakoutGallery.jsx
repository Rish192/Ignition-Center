import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

import headerline from '../assets/header-line.png';
import gallery_1 from '../assets/gallery_1.jpg';
import gallery_2 from '../assets/gallery_2.jpg';
import gallery_3 from '../assets/gallery_3.jpg';
import gallery_4 from '../assets/gallery_4.jpg';
import gallery_5 from '../assets/gallery_5.jpg';
import gallery_6 from '../assets/gallery_6.jpg';

export default function BreakoutGallery({onClose}) {
    return (
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            py: '0.8333vw', px: '1.6667vw',
            borderRadius: 3,
            bgcolor: 'rgba(0,63,145,0.31)',
            backdropFilter: 'blur(28.5px)',
            boxShadow: '0px 2.28px 2.28px rgba(0,0,0,0.25)',
            border: '1.14px solid rgba(158,199,255,0.6)',
            width: '60vw',
            height: '70vh',
            }}
        >
            {/* Close Button */}
            <IconButton
            onClick={onClose}
            sx={{
                position: 'absolute',
                top: '-2.2vw',
                right: '0vw',
                zIndex: 1,
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
            }}>
                <Close sx={{ fontSize: '1.5vw' }} />
            </IconButton>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw', }}>
                <img src={headerline} style={{transform: 'scaleX(-1)', width: '8.5vw'}}/>
                <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
                    Gallery
                </Typography>
                <img src={headerline} style={{ width: '8.5vw'}}/>
            </Box>
            <Box sx={{flex: 1, display: 'flex', p: '0.4167vw', gap: '0.8333vw', overflow: 'hidden'}}>
                {/* Left */}
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '35%', gap: '0.8333vw', overflow: 'hidden'}}>
                    <img src={gallery_1} alt="gallery_1" 
                        style={{
                            height: '69%', 
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-0.4vw) scale(1.03)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'none';
                        }}
                    />
                    <img src={gallery_2} alt="gallery_2" 
                        style={{
                          cursor: 'pointer',
                            transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-0.4vw) scale(1.03)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'none';
                        }}
                    />
                </Box>
                {/* Right */}
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.8333vw', flex: 1, overflow: 'hidden'}}>
                    <img src={gallery_3} alt="gallery_3" 
                        style={{
                          cursor: 'pointer',
                            transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-0.4vw) scale(1.03)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'none';
                        }}
                    />
                    <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', gap: '0.8333vw'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.8333vw', overflow: 'hidden'}}>
                            <img src={gallery_4} alt="gallery_4" 
                                style={{
                                  height: '50%', 
                                  cursor: 'pointer',
                                  transition: 'transform 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-0.4vw) scale(1.03)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'none';
                                }}
                            />
                            <img src={gallery_5} alt="gallery_5" 
                                style={{
                                  cursor: 'pointer',
                                  transition: 'transform 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-0.4vw) scale(1.03)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'none';
                                }}
                            />
                        </Box>
                        <img src={gallery_6} alt="gallery_6" 
                            style={{
                              cursor: 'pointer',
                              transition: 'transform 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-0.4vw) scale(1.03)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'none';
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}