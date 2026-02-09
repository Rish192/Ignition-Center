import React, {useEffect, useState, useRef} from 'react';
import { Box, Button, IconButton,Typography } from '@mui/material';
import { Close } from "@mui/icons-material";
import solution_underline from '../assets/solution_underline.png';
import solution_underline_2 from '../assets/solution_underline_2.png';
import solution_img_6 from '../assets/solution_img_6.png';
import EastIcon from '@mui/icons-material/East';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

export default function Standard_Overlay({onClose, onSelectOverlay, content}) {
    const [visible, setVisible] = useState(false);

    const { header, subtitle, description, listItems } = content;

    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <Box sx={{
            position: 'fixed',
            top: '0',
            right: '0',
            width: '80%',
            height: '100%',
            overflow: 'hidden',
            background: 'linear-gradient(to left, rgba(0, 55, 89, 0.85), rgba(0,55,89,0))',
            //boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)',
            zIndex: 2000,
            transform: visible ? 'translateX(0%)' : 'translateX(100%)',
            transition: 'transform 0.5s ease-in-out',
        }}>
            <Box sx={{
                position: 'absolute', 
                top: 0, 
                right: 0,
                zIndex: 1,
                backdropFilter: 'blur(6px)',
                width: '34.89vw',
                height: '100%',
                color: 'white',
                display: 'flex',
                flexDirection: 'column', 
                boxSizing: 'border-box',
                gap: '0.5208vw', px: '1.302vw', py: '1.0417vw'
            }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" sx={{fontSize: '1.5625vw', fontWeight: 'bold', color: "rgba(255,255,255,0.9)"}}>
                        {header}
                    </Typography>
                    <Box
                    onClick={() => {
                    setVisible(false);
                    setTimeout(() => {
                        onClose();
                    }, 500);
                    }}
                    sx={{
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4vw',
                    }}
                    >
                        <TrendingFlatIcon sx={{fontSize: '1.5vw'}} />
                        <Typography sx={{fontSize: '0.9896vw'}}>
                            Explore
                        </Typography>
                    </Box>
                </Box>
                <img src={solution_underline} alt="underline" style={{marginTop: '-0.7812vw', marginLeft: '-0.3125vw', width: '11.068vw'}} />
                <Box sx={{
                    padding: '0.8333vw',
                    borderRadius: '12px',
                    backdropFilter: 'blur(11.78px)',
                    background: 'linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(2,42,64,0.09))',
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        px: '0.2604vw', marginBottom: '-0.3vw'
                    }}>
                        <Typography variant="subtitle1" sx={{fontSize: '0.9896vw', fontWeight: 'bold', color: "rgba(255,255,255,0.9)",}}>
                            {subtitle}
                        </Typography>
                        <Box
                            component="img"
                            src={solution_img_6}
                            alt="icon"
                            sx={{
                            width: '1.6vw',
                            height: '1.6vw'
                            }} 
                        />
                    </Box>
                    <img src={solution_underline_2} alt="underline_2" style={{width: '100%'}} />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.8333vw'
                    }}>
                        <Typography sx={{fontSize: '0.9375vw'}}>
                            {description}
                        </Typography>
                        {/* List */}
                        <Box component="ul" sx={{
                            listStyleType: 'disc',
                            paddingLeft: '1.2vw',
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.1vw',
                        }}>
                            {listItems.map((item, idx) => (
                                <Box
                                  key={idx}
                                  component="li"
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.8333vw',
                                    cursor: 'pointer',
                                    color: 'rgba(255,255,255,0.85)',
                                    fontSize: '0.9375vw',
                                    transition: '0.2s',
                                    '&:hover': {
                                        transform: 'translateX(0.2vw)',
                                        color: '#fff'
                                    }
                                  }}
                                  onClick={() => {
                                    setVisible(false);
                                    setTimeout(() => {
                                        onClose();
                                        if (item.label === "Interactive Brochures") {
                                            onSelectOverlay("cards");
                                        }
                                        if (item.label === "Join a Meeting") {
                                            onSelectOverlay("roomslobby");
                                        }
                                    }, 500);
                                  }}
                                >
                                    <Typography sx={{fontSize: '0.9375vw'}}>{item.label}</Typography>
                                    <TrendingFlatIcon sx={{fontSize: '1vw'}} />
                                </Box>
                            ))}
                        </Box>
                        <Typography sx={{fontSize: '0.9375vw'}}>
                            New immersive features are on their way. Stay tuned for the next evolution of the experience.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}