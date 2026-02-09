import React, {useState, useEffect} from 'react'
import { Box, Button, IconButton,Typography } from '@mui/material'
import { Close } from "@mui/icons-material";
//import backgroundvideo_5 from '../assets/backgroundvideo_5.mp4';
const backgroundvideo_5 = "https://dfa6lpn2gurde.cloudfront.net/assets/backgroundvideo_5.mp4";
import solution_underline from '../assets/solution_underline.png';
import solution_underline_2 from '../assets/solution_underline_2.png';

export default function Solution_Popup1({onClose}) {
  const [visible, setVisible] = useState(false);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setVisible(true);
  //   }, 500);
  //   return () => clearTimeout(timer);
  // }, []);
  useEffect(() => {
          setVisible(true);
      }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 500); // match transition duration
  };

  return (
    <Box sx={{
        position: 'fixed',
        top: '3.385vw',
        left: '0rem',
        width: '33.85vw',
        height: '100%',
        overflow: 'hidden',
        border: '0.7px solid rgb(3, 208, 218)',
        // borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)',
        boxSizing: 'border-box',
        zIndex: 2000,
        transform : visible ? "translateX(0%)" : "translateX(-100%)",
        transition: "transform 0.5s ease-in-out",
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
            top: 0,
            left: 0,
          }}
          src={backgroundvideo_5}
        />
        <Box sx={{
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'rgba(2,42,64,0.7)',
            //background: 'linear-gradient(to bottom, rgba(0, 9, 126, 0.7), rgba(0,112,182,0.7))',
            backdropFilter: 'blur(2.5px)',
            width: '100%',
            height: '100%',
            color: 'white',
            display: 'flex',
            flexDirection: 'column', 
            boxSizing: 'border-box',
            gap: '0.4167vw', px: '1.0417vw', py: '0.8333vw'
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" sx={{fontSize: '1.1458vw', fontWeight: 'bold', color: "rgba(255,255,255,0.9)",}}>
                Client Credentials
              </Typography>
              <IconButton onClick={handleClose}>
                <Close sx={{fontSize: '1.25vw', color: 'rgba(255,255,255,0.9)'}}/>
              </IconButton>
            </Box>
            <img src={solution_underline} alt="underline" style={{marginTop: '-0.7812vw', marginLeft: '-0.3125vw', width: '11.068vw'}} />

            <Typography variant="subtitle1" sx={{fontSize: '0.8333vw', fontWeight: 'bold', color: "rgba(255,255,255,0.9)",}}>
                Objectives
            </Typography>
            <img src={solution_underline_2} alt="underline_2" style={{marginTop: '-0.2604vw'}} />
            <Typography variant="body2" sx={{fontSize: '0.7812vw', fontFamily: "Gothic A1, sans-serif", fontWeight: 200, color: 'white'}}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur ea sint obcaecati tenetur iure, mollitia inventore quae adipisci natus, numquam non. Dolor libero, porro nam ducimus quam, officia iure, eaque animi neque optio maiores? Nulla doloremque ratione perferendis rerum quo, quam obcaecati magni veritatis fuga. Veritatis rerum velit eum perferendis!
            </Typography>
            
            <Typography variant="subtitle1" sx={{fontSize: '0.8333vw', fontFamily: "Gothic A1, sans-serif", fontWeight: 'bold', color: "rgba(255,255,255,0.9)", mt: 1}}>
                Solutions Provided
            </Typography>
            <img src={solution_underline_2} alt="underline_2" style={{marginTop: '-0.2604vw'}} />
            <Typography variant="body2" sx={{fontSize: '0.7812vw', fontFamily: "Gothic A1, sans-serif", fontWeight: 200, color: 'white'}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur ea sint obcaecati tenetur iure, mollitia inventore quae adipisci natus, numquam non. Dolor libero, porro nam ducimus quam, officia iure, eaque animi neque optio maiores? Nulla doloremque ratione perferendis rerum quo, quam obcaecati magni veritatis fuga. Veritatis rerum velit eum perferendis!
            </Typography>

            <Typography variant="subtitle1" sx={{fontSize: '0.8333vw', fontFamily: "Gothic A1, sans-serif", fontWeight: 'bold', color: "rgba(255,255,255,0.9)", mt: 1}}>
                Benefits
            </Typography>
            <img src={solution_underline_2} alt="underline_2" style={{marginTop: '-0.2604vw'}} />
            <Typography variant="body2" sx={{fontSize: '0.7812vw', fontFamily: "Gothic A1, sans-serif", fontWeight: 200, color: 'white'}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur ea sint obcaecati tenetur iure, mollitia inventore quae adipisci natus, numquam non. Dolor libero, porro nam ducimus quam, officia iure, eaque animi neque optio maiores? Nulla doloremque ratione perferendis rerum quo, quam obcaecati magni veritatis fuga. Veritatis rerum velit eum perferendis!
            </Typography>
        </Box>
    </Box>
  )
}
