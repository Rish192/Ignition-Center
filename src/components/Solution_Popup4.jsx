import React, {useEffect, useState, useRef} from 'react'
import { Box, Button, IconButton,Typography } from '@mui/material'
import Frame from "./Frame";
import { Close } from "@mui/icons-material";

const SOLUTION_IFRAMES = [
    { name: "Digital Gateway", src: "https://kpmg.com/ca/en/home/services/ignition/calgary.html" },
    { name: "Clara", src: "https://kpmg.com/ca/en/home/services/ignition/calgary.html" },
    { name: "Velocity", src: "https://kpmg.com/ca/en/home/services/ignition/calgary.html" },
];

export default function Solution_Popup3({onClose}) {
    const [visible, setVisible] = useState(false);
    const [selectedSolution, setSelectedSolution] = useState("Digital Gateway");
    const [frameSrc, setFrameSrc] = useState(null);
    const [isMinimized, setIsMinimized] = useState(true);

    useEffect(() => {
        setVisible(true);
        // window.dispatchEvent(new CustomEvent("regionSelected", { detail: "Americas" }));
    }, []);

    const handleLocationClick = (name) => {
      const sf = SOLUTION_IFRAMES.find((sol) => sol.name === name);
      if (sf) {
        setFrameSrc(sf.src);
      }
    };
    
    return (
        <>
            <Box sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              zIndex: 2100,          // above the main overlay (zIndex: 2000)
              pointerEvents: 'none',  // let clicks pass through except on the button
            }}>
                <IconButton
                onClick={() => {
                        // window.dispatchEvent(new Event("regionPopupClosed"));
                        setVisible(false);
                        setTimeout(() => {
                        onClose();
                        }, 500);
                    }}
                sx={{
                    position: 'absolute',
                    top: '1.5vw',
                    left: '45vw',
                    width: '10vw',
                    pointerEvents: 'auto',
                    width: '10vw',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4167vw',
                    borderRadius: '999px',
                    px: '0.8333vw',
                    py: '0.8333vw',
                    zIndex: '10000000000000000',
                    bgcolor: 'rgba(0,63,145,0.31)',
                    border: '0.8px solid rgba(158,199,255,0.9)',
                    boxShadow: '0px 4px 10px rgba(0,0,0,0.35)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        bgcolor: 'rgba(0, 94, 255, 0.51)',
                        transform: 'translateY(-1px) scale(1.02)',
                        boxShadow: '0px 6px 14px rgba(0,0,0,0.45)',
                    },
                }}
                >
                <Typography
                    sx={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: '0.75vw',
                        fontWeight: 500,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                    }}
                >
                    Step Back
                </Typography>
                </IconButton>
            </Box>
            {/*<Box sx={{
                position: 'fixed',
                top: '0',
                right: '0',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                background: 'linear-gradient(to right, rgba(0,55,89,0), rgba(0, 55, 89, 0.85))',
                boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
                zIndex: 2000,
                transform: visible ? 'translateX(0%)' : 'translateX(100%)',
                transition: 'transform 0.5s ease-in-out',
            }}>
                <Box sx={{
                    position: 'absolute', 
                    top: 0, 
                    right: 0,
                    zIndex: 1,
                    width: '33.85vw',
                    height: '100%',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column', 
                    boxSizing: 'border-box',
                    gap: '1.25vw', p: '1.0417vw',
                }}>
                    <Box sx={{
                      display: 'flex',
                      gap: '1vw',
                      alignItems: 'center',

                    }}>
                        <Button 
                          onClick={() => {
                            setSelectedSolution("Digital Gateway");
                          }}
                          sx={{
                            width: '9vw',
                            borderRadius: '11px',
                            border: selectedSolution === "Digital Gateway" ? '1px solid white' : 'none',
                            background: selectedSolution === "Digital Gateway" ? (`
                                linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06)),
                                linear-gradient(to right, rgba(32,156,217,1), rgba(29,125,238,1))
                            `) : (`
                                linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06)),
                                rgba(0,45,103,0.31)
                            `),
                            backdropFilter: 'blur(50px)',
                            boxShadow: '0 4px 8px rgba(32,32,32,0.25)',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <Typography sx={{fontSize: '0.8333vw', fontWeight: 'bold', textTransform: 'none'}}>
                                Digital Gateway
                            </Typography>
                        </Button>
                        <Button 
                          onClick={() => {
                            setSelectedSolution("Clara");
                          }}
                          sx={{
                            width: '8vw',
                            borderRadius: '11px',
                            border: selectedSolution === "Clara" ? '1px solid white' : 'none',
                            background: selectedSolution === "Clara" ? (`
                                linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06)),
                                linear-gradient(to right, rgba(32,156,217,1), rgba(29,125,238,1))
                            `) : (`
                                linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06)),
                                rgba(0,45,103,0.31)
                            `),
                            backdropFilter: 'blur(50px)',
                            boxShadow: '0 4px 8px rgba(32,32,32,0.25)',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <Typography sx={{fontSize: '0.8333vw', fontWeight: 'bold', textTransform: 'none'}}>
                                Clara
                            </Typography>
                        </Button>
                        <Button 
                          onClick={() => {
                            setSelectedSolution("Velocity");
                          }}
                          sx={{
                            width: '8vw',
                            borderRadius: '11px',
                            border: selectedSolution === "Velocity" ? '1px solid white' : 'none',
                            background: selectedSolution === "Velocity" ? (`
                                linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06)),
                                linear-gradient(to right, rgba(32,156,217,1), rgba(29,125,238,1))
                            `) : (`
                                linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06)),
                                rgba(0,45,103,0.31)
                            `),
                            backdropFilter: 'blur(50px)',
                            boxShadow: '0 4px 8px rgba(32,32,32,0.25)',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <Typography sx={{fontSize: '0.8333vw', fontWeight: 'bold', textTransform: 'none'}}>
                                Velocity
                            </Typography>
                        </Button>
                    </Box>
                    <Box sx={{py: '1.0417vw', px: '0.8333vw'}}>
                        <Typography sx={{fontSize: '0.9375vw', color: 'white'}}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ratione nemo molestiae odit quaerat nam enim soluta perferendis itaque aspernatur?
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        px: '1.0417vw'
                    }}>
                        <Button
                        onClick={() => handleLocationClick(selectedSolution)}
                        variant='contained'
                        sx={{
                            width: '6vw',
                            height: '2vw',
                            textTransform: 'none',
                            borderRadius: '6px',
                            px: 0,
                            fontSize: '0.7812vw',
                            fontWeight: 700,
                            border: '1.28px solid #66E4FF',
                            background: 'linear-gradient(to right, #209CD9, #1D7DEE)',
                            '&:hover': {bgcolor: '#1976d2'},
                        }}>
                            Explore
                        </Button>
                    </Box>
                </Box>
                {frameSrc && (
                  <Frame 
                    src={frameSrc}
                    minimizedWidth="64vw"
                    maximizedWidth="96vw"
                    minimizedHeight="75vh"
                    maximizedHeight="87vh"
                    popupMode={true}
                    top={isMinimized ? "55vh" : "54vh"}
                    left={isMinimized ? "18vw" : "20vw"}
                    style={{
                      position: "absolute",
                      zIndex: 3000,
                    }}
                    onStateChange={({ isMinimized: val, isClosed }) => {
                      if (isClosed) setFrameSrc(null);
                      if (typeof val === "boolean") setIsMinimized(val);
                    }}
                  />
                )}
            </Box> */}
        </>
    )
}