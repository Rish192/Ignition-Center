import React, {useEffect, useState, useRef} from 'react'
import { Box, Button, IconButton,Typography } from '@mui/material'
import { Close } from "@mui/icons-material";
//import KPMG_Video from '../assets/KPMG_Video.mp4';
const KPMG_Video = "https://dfa6lpn2gurde.cloudfront.net/assets/KPMG_Video.mp4";
import solution_underline from '../assets/solution_underline.png';
import solution_underline_2 from '../assets/solution_underline_2.png';
import solution_img from '../assets/solution_img.png';
import solution_img_2 from '../assets/solution_img_2.png';
import solution_img_4 from '../assets/solution_img_4.png';
import solution_img_5 from '../assets/solution_img_5.png';
import solution_img_6 from '../assets/solution_img_6.png';
import graph_1 from '../assets/graph_1.png';
import graph_2 from '../assets/graph_2.png';
import graph_3 from '../assets/graph_3.png';
import watch_sol_1 from '../assets/watch_sol_1.png';
import watch_sol_2 from '../assets/watch_sol_2.png';
import watch_sol_3 from '../assets/watch_sol_3.png';
import Oil_Gas from '../assets/Oil&Gas.png';
import Retail from '../assets/Retail.png';
import HealthCare from '../assets/HealthCare.png';
import Finance from '../assets/Finance.png';
import Energy from '../assets/Energy.png';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import EastIcon from '@mui/icons-material/East';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

export default function Solution_Popup1({onClose}) {
    const [visible, setVisible] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hovered, setHovered] = useState(false);
    const videoRef = useRef(null);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState('oil');

    const contentData = {
      oil: {
        header: "AI-Powered Digital Twin for Smart Refinery",
        summary: "The client operates one of the world's largest integrated refineries, facing challenges in unplanned equipment downtime, energy losses, and rising sustainability mandates. An AI-powered digital twin was deployed across core process units to create a real-time intelligent operations layer — predicting, optimizing, and advising at scale.",
        boxes: [
          { title: "Cumulative ROI (3 years)", value: "325%", trend: "up", img: solution_img_6 },
          { title: "CO₂ Emissions Intensity", value: "23%", trend: "down", img: solution_img_5 },
          { title: "Predictive Alerts Accuracy", value: "94%", trend: "up", img: solution_img_4 },
        ],
        images: [graph_2, watch_sol_1],
      },
      health: {
        header: "Predictive Healthcare Insights",
        summary: "A national healthcare network leveraged predictive analytics to optimize patient flow, reduce wait times, and enhance care delivery. AI models analyze patient data in real time to predict admission rates, improve staffing, and personalize treatment paths.",
        boxes: [
          { title: "Patient Wait Time", value: "35%", trend: "down", img: solution_img_6 },
          { title: "Bed Utilization Efficiency", value: "21%", trend: "up", img: solution_img_5 },
          { title: "Predictive Model Accuracy", value: "93%", trend: "up", img: solution_img_4 },
        ],
        images: [graph_3, watch_sol_2],
      },
      finance: {
        header: "AI-Powered Risk Intelligence Platform",
        summary: "A multinational bank adopted a real-time fraud detection system powered by machine learning to identify anomalies across billions of transactions. The platform improved detection accuracy, reduced false positives, and ensured compliance through automated monitoring.",
        boxes: [
          { title: "Fraud Detection Accuracy", value: "35%", trend: "down", img: solution_img_6 },
          { title: "False Positives", value: "21%", trend: "up", img: solution_img_5 },
          { title: "Investigation Time", value: "93%", trend: "up", img: solution_img_4 },
        ],
        images: [graph_1, watch_sol_3],
      },
    }
    const current = contentData[selectedIndustry];

    useEffect(() => {
        setVisible(true);
    }, []);
    const handlePlayPause = () => {
        if (videoRef.current) {
        if (!isPlaying) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
        }
    };

  return (
    <>
    {videoOpen && (
        <Box sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1500,
        }}
        />
    )}
    <Box sx={{
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
    }}
    >
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
        gap: '0.8333vw', p: '1.0417vw'
      }}>
        <IconButton
        onClick={() => {
          setVisible(false);
          setTimeout(() => {
            onClose();
          }, 500);
        }}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          color: 'white',
          '&:hover': {bgcolor: 'rgba(255,255,255,0.1)'}
        }}>
          <Close sx={{fontSize: '1.25vw'}}/>
        </IconButton>
        <Box sx={{
          display: 'flex',
          gap: '1vw',
          alignItems: 'center',
        }}>
          <Button sx={{
            borderRadius: '11px',
            border: '1px solid white',
            background: `
              linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06)),
              linear-gradient(to right, rgba(32,156,217,1), rgba(29,125,238,1))
            `,
            backdropFilter: 'blur(50px)',
            boxShadow: '0 4px 8px rgba(32,32,32,0.25)',
            color: 'white',
            textTransform: 'none',
            fontSize: '0.8333vw',
            px: '2.0833vw'
          }}>
            Solutions
          </Button>
          <Button sx={{
            borderRadius: '11px',
            background: `
              linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06)),
              rgba(0,45,103,0.31)
            `,
            backdropFilter: 'blur(50px)',
            boxShadow: '0 4px 8px rgba(32,32,32,0.25)',
            color: 'white',
            textTransform: 'none',
            fontSize: '0.8333vw',
            px: '2.0833vw'
          }}>
            Frameworks
          </Button>
          <Button sx={{
            borderRadius: '11px',
            background: `
              linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06)),
              rgba(0,45,103,0.31)
            `,
            backdropFilter: 'blur(50px)',
            boxShadow: '0 4px 8px rgba(32,32,32,0.25)',
            color: 'white',
            textTransform: 'none',
            fontSize: '0.8333vw',
            px: '2.0833vw'
          }}>
            Accelerators
          </Button>
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Typography variant="h6" sx={{fontSize: '1.25vw', fontWeight: 'bold', color: "rgba(255,255,255,0.9)"}}>
            {current.header}
          </Typography>
        </Box>
        <img src={solution_underline} alt="underline" style={{marginTop: '-0.7812vw', width: '11.068vw'}} />

        <Typography sx={{fontSize: '0.9375vw', fontWeight: 'bold', color: "rgba(255,255,255,0.9)",}}>
            Solution Summary
        </Typography>
        <img src={solution_underline_2} alt="underline_2" style={{marginTop: '-0.8333vw'}} />
        <Typography variant="body2" sx={{fontSize: '0.8333vw', color: 'white'}}>
          {current.summary}
        </Typography>
        <Typography variant="body2" sx={{fontSize: '0.8333vw', color: 'white'}}>
          Our immersive solution world is coming soon! For now you may use the on-screen menu to navigate by industry or theme.
        </Typography>
        {/* 3 boxes */}
        <Box sx={{ display: 'flex', gap: '0.625vw', justifyContent: 'space-between', my: '0.5208vw' }}>
          {current.boxes.map((box, idx) => (
            <Box key={idx} sx={{
              flex: 1,
              aspectRatio: "1 / 1",
              borderRadius: 2,
              backdropFilter: 'blur(50px)',
              background: 'linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06))',
              padding: '0.8333vw',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8333vw',
            }}>
              <Box component="img" src={box.img} alt="icon" sx={{ width: '1.6vw' }} />
              <Typography sx={{flex: 1, fontSize: '0.8333vw'}}>{box.title}</Typography>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography sx={{fontWeight: 600, fontSize: '1.25vw'}}>{box.value}</Typography>
                <TrendingFlatIcon
                  sx={{
                    fontSize: '1.25vw',
                    transform: box.trend === 'up' ? 'rotate(-90deg)' : 'rotate(90deg)',
                    color: box.trend === 'up' ? '#00FF26' : '#FF4F4F',
                    position: 'relative',
                    bottom: '0.1vw'
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{display: 'flex', gap: '0.4167vw', width: '100%'}}>
          {current.images.map((img, i) => (
            <Box key={i} sx={{overflow: 'hidden', borderRadius: 2, }}>
              <Box
                component="img"
                src={img}
                alt="solution img"
                onClick={i === 1 ? () => setVideoOpen(true) : undefined}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.1)' },
                }}
              />
            </Box>
          ))}
        </Box>
        {/* {!showDetails && (
          <Box
            onClick={() => setShowDetails(true)}
            sx={{
              color: 'white',
              cursor: 'pointer',
              textDecoration: 'underline',
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5vw'
            }}
          >
            <Typography sx={{fontSize: '0.7812vw'}}>
              Learn More
            </Typography>
            <EastIcon sx={{fontSize: '1vw'}} />
          </Box>
        )} */}
        {showDetails && (
          <>
            <Box sx={{overflow: 'hidden', borderRadius: 2}}>
                <Box 
                  component="img"
                  src={solution_img}
                  alt="solution img"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                />
            </Box>
            <Box sx={{display: 'flex', gap: '0.4167vw', width: '100%',mt: '0.4167vw'}}>
              <Box sx={{overflow: 'hidden', borderRadius: 2, flex: 0.5}}>
                <Box 
                component="img"
                src={solution_img_2}
                alt="solution img_2"
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                }}
                />
              </Box>
              <Box sx={{overflow: 'hidden', borderRadius: 2, flex: 0.5}}>
                <Box
                  onClick={() => setVideoOpen(true)}
                  component="img"
                  src={watch_sol_3}
                  alt="watch_sol_3"
                  sx={{
                      cursor: 'pointer',
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                  }}
                />
              </Box>
            </Box>
          </>
        )}
      </Box>
      <Box sx={{
        position: 'absolute', 
        top: '12vh', 
        right: '34vw',
        borderRight: '1px solid rgba(255,255,255,0.09)',
        boxSizing: 'border-box',
        paddingX: '0.4167vw',
        zIndex: 1,
        //height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.0417vw'
      }}>
        <Box sx={{position: 'relative', display: 'flex', alignItems: 'center'}}
          onMouseEnter={() => setHovered('oil')}
          onMouseLeave={() => setHovered(null)}
        >
          {hovered === 'oil' && (
            <Box sx={{
              position: 'absolute',
              right: '5vw',
              background: 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(2,42,64,0.06))',
              backdropFilter: 'blur(50px)',
              color: 'white',
              padding: '0.4vw 0.8vw',
              borderRadius: '0.4vw',
              fontSize: '0.8333vw',
              whiteSpace: 'nowrap',
            }}>
              Oil & Gas
            </Box>
          )}
          <Button 
          onClick={() => setSelectedIndustry('oil')}
          sx={{
            backdropFilter: 'blur(50px)',
            background: selectedIndustry === 'oil'
              ? `linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06)),
                linear-gradient(to right, rgba(32,156,217,1), rgba(29,125,238,1))`
              : 'linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06))',
            border: '0.5px solid white',
            width: '3.125vw',
            height: '3.125vw',
            transition: 'all 0.2s ease',
            transform: hovered === 'oil' ? 'translateX(-0.2vw) scale(1.05)' : 'none',
          }}>
            <img src={Oil_Gas} alt="oil&gas" style={{width: '1.5vw'}} />
          </Button>
        </Box>
        <Box sx={{position: 'relative', display: 'flex', alignItems: 'center'}}
          onMouseEnter={() => setHovered('retail')}
          onMouseLeave={() => setHovered(null)}
        >
          {hovered === 'retail' && (
            <Box sx={{
              position: 'absolute',
              right: '5vw',
              background: 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(2,42,64,0.06))',
              backdropFilter: 'blur(50px)',
              color: 'white',
              padding: '0.4vw 0.8vw',
              borderRadius: '0.4vw',
              fontSize: '0.8333vw',
              whiteSpace: 'nowrap',
            }}>
              Retail
            </Box>
          )}
          <Button sx={{
            backdropFilter: 'blur(50px)',
            background: 'linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06))',
            border: '0.5px solid white',
            width: '3.125vw',
            height: '3.125vw',
            transition: 'all 0.2s ease',
            transform: hovered === 'retail' ? 'translateX(-0.2vw) scale(1.05)' : 'none',
          }}>
            <img src={Retail} alt="oil&gas" style={{width: '1.5vw'}}  />
          </Button>
        </Box>
        <Box sx={{position: 'relative', display: 'flex', alignItems: 'center'}}
          onMouseEnter={() => setHovered('health')}
          onMouseLeave={() => setHovered(null)}
        >
          {hovered === 'health' && (
            <Box sx={{
              position: 'absolute',
              right: '5vw',
              background: 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(2,42,64,0.06))',
              backdropFilter: 'blur(50px)',
              color: 'white',
              padding: '0.4vw 0.8vw',
              borderRadius: '0.4vw',
              fontSize: '0.8333vw',
              whiteSpace: 'nowrap',
            }}>
              Healthcare
            </Box>
          )}
          <Button 
          onClick={() => setSelectedIndustry('health')}
          sx={{
            backdropFilter: 'blur(50px)',
            background: selectedIndustry === 'health'
              ? `linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06)),
                linear-gradient(to right, rgba(32,156,217,1), rgba(29,125,238,1))`
              : 'linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06))',
            border: '0.5px solid white',
            width: '3.125vw',
            height: '3.125vw',
            transition: 'all 0.2s ease',
            transform: hovered === 'health' ? 'translateX(-0.2vw) scale(1.05)' : 'none',
          }}>
            <img src={HealthCare} alt="oil&gas" style={{width: '1.5vw'}}  />
          </Button>
        </Box>
        <Box sx={{position: 'relative', display: 'flex', alignItems: 'center'}}
          onMouseEnter={() => setHovered('finance')}
          onMouseLeave={() => setHovered(null)}
        >
          {hovered === 'finance' && (
            <Box sx={{
              position: 'absolute',
              right: '5vw',
              background: 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(2,42,64,0.06))',
              backdropFilter: 'blur(50px)',
              color: 'white',
              padding: '0.4vw 0.8vw',
              borderRadius: '0.4vw',
              fontSize: '0.8333vw',
              whiteSpace: 'nowrap',
            }}>
              Finance
            </Box>
          )}
          <Button 
          onClick={() => setSelectedIndustry('finance')}
          sx={{
            backdropFilter: 'blur(50px)',
            background: selectedIndustry === 'finance'
              ? `linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06)),
                linear-gradient(to right, rgba(32,156,217,1), rgba(29,125,238,1))`
              : 'linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06))',
            border: '0.5px solid white',
            width: '3.125vw',
            height: '3.125vw',
            transition: 'all 0.2s ease',
            transform: hovered === 'finance' ? 'translateX(-0.2vw) scale(1.05)' : 'none',
          }}>
            <img src={Finance} alt="oil&gas" style={{width: '1.5vw'}}  />
          </Button>
        </Box>
        <Box sx={{position: 'relative', display: 'flex', alignItems: 'center'}}
          onMouseEnter={() => setHovered('energy')}
          onMouseLeave={() => setHovered(null)}
        >
          {hovered === 'energy' && (
            <Box sx={{
              position: 'absolute',
              right: '5vw',
              background: 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(2,42,64,0.06))',
              backdropFilter: 'blur(50px)',
              color: 'white',
              padding: '0.4vw 0.8vw',
              borderRadius: '0.4vw',
              fontSize: '0.8333vw',
              whiteSpace: 'nowrap',
            }}>
              Energy
            </Box>
          )}
          <Button sx={{
            backdropFilter: 'blur(50px)',
            background: 'linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06))',
            border: '0.5px solid white',
            width: '3.125vw',
            height: '3.125vw',
            transition: 'all 0.2s ease',
            transform: hovered === 'energy' ? 'translateX(-0.2vw) scale(1.05)' : 'none',
          }}>
            <img src={Energy} alt="oil&gas" style={{width: '1.5vw'}}  />
          </Button>
        </Box>
      </Box>
    </Box>

    {/* Video Popup */}
    {videoOpen && (
    <Box
        sx={{
        position: "fixed",
        top: "50%",
        left: "calc(50% - 47.52vw)", // left side of current popup
        transform: "translateY(-50%) scale(0.8)",
        width: '61.84vw',
        height: '63vh',
        bgcolor: 'black',
        borderRadius: 2,
        zIndex: 2500,
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >
        <IconButton
        onClick={() => {
            setVideoOpen(false);
            setIsPlaying(false);
        }}
        sx={{
            position: "absolute",
            top: '0.4167vw',
            right: '0.4167vw',
            color: "white",
            zIndex: 10,
        }}>
        <Close sx={{fontSize: '1.25vw'}}/>
        </IconButton>
        <video
        ref={videoRef}
        src={KPMG_Video}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        controls={false}
        playsInline
        />
        {!isPlaying && (
            <IconButton
              onClick={handlePlayPause}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "4.16vw",
                backgroundColor: "rgba(0,0,0,0.4)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
              }}
            >
              <PlayArrowIcon sx={{ fontSize: "4.16vw" }} />
            </IconButton>
          )}

          {/* Pause icon on hover */}
          {isPlaying && hovered && (
            <IconButton
              onClick={handlePlayPause}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "4.16vw",
                backgroundColor: "rgba(0,0,0,0.4)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
              }}
            >
              <PauseIcon sx={{ fontSize: "4.16vw" }} />
            </IconButton>
          )}
    </Box>
    )}
    </>
  )
}
