import React, {useEffect, useState, useRef} from 'react'
import { Box, Button, IconButton,Typography } from '@mui/material'
import Frame from "./Frame";
import { Close } from "@mui/icons-material";
import PublicIcon from '@mui/icons-material/Public';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import solution_underline from "../assets/solution_underline.png";
import solution_underline_3 from "../assets/solution_underline_3.png";
import LeftBorder from "../assets/LeftBorder.png";
import CountryHeader from "../assets/CountryHeader.png";


const LOCATION_IFRAMES = [
  { name: "Calgary", src: "https://kpmg.com/ca/en/home/services/ignition/calgary.html" },
  { name: "Orlando", src: "https://kpmg.com/us/en/capabilities-services/kpmg-innovation-services/kpmg-ignition/lakehouse.html" },
  { name: "Vancouver", src: "https://kpmg.com/ca/en/home/services/ignition/vancouver.html" },
  { name: "Mexico City", src: "https://kpmg.com/mx/es/servicios/kpmg-ignition-mexico.html" },
  { name: "Atlanta", src: "https://kpmg.com/us/en/capabilities-services/kpmg-innovation-services/kpmg-ignition/atlanta.html" },
  { name: "Chicago", src: "https://kpmg.com/us/en/capabilities-services/kpmg-innovation-services/kpmg-ignition/chicago.html" },
  { name: "Denver", src: "https://kpmg.com/us/en/capabilities-services/kpmg-innovation-services/kpmg-ignition/new-york.html" },
  { name: "New York", src: "https://kpmg.com/us/en/capabilities-services/kpmg-innovation-services/kpmg-ignition/new-york.html" },
  { name: "Washington DC", src: "https://kpmg.com/us/en/capabilities-services/kpmg-innovation-services/kpmg-ignition/washington-dc.html" },
  { name: "Auckland", src: "https://kpmg.com/nz/en.html" },
  { name: "Banglore", src: "https://kpmg.com/in/en/insights/2022/07/kpmg-innovation-kaleidoscope.html" },
  { name: "Mumbai", src: "https://kpmg.com/in/en/insights/2022/07/kpmg-innovation-kaleidoscope.html" },
  { name: "Tokyo", src: "https://kpmg.com/jp/en/home/about/kit/kit-facility.html" },
  { name: "Stockholm", src: "https://kpmg.com/se/en/services/ai/kpmg-signature-ai-experiences.html" },
  { name: "Gothenburg", src: "https://kpmg.com/se/en/services/ai/kpmg-signature-ai-experiences.html" },
  { name: "London", src: "https://kpmg.com/uk/en/services/ignition.html" },
  { name: "Manchester", src: "https://kpmg.com/uk/en/services/ignition.html" },
  { name: "Dublin", src: "https://kpmg.com/ie/en/services/platform-x.html" },
  { name: "Amsterdam", src: "https://kpmg.com/nl/en/home.html" },
  { name: "Brussels", src: "https://kpmg.com/be/en/home/services/innovation-services/kpmg-ignition-belgium.html" },
  { name: "Paris", src: "https://kpmg.com/fr/fr/insights/innovation.html" },
  { name: "Frankfurt", src: "" },
  { name: "Zurich", src: "https://kpmg.com/ch/en/insights/technology/kpmg-ignition.html" },
  { name: "Geneva", src: "https://kpmg.com/ch/en/insights/technology/kpmg-ignition.html" },
  { name: "Milan", src: "https://kpmg.com/it/it/services/advisory/insights-centre.html" },
  { name: "Madrid", src: "https://kpmg.com/es/es.html" },
  { name: "Riyadh", src: "https://kpmg.com/sa/en/home/insights/2023/05/data-insights-center.html" },
  { name: "Tel Aviv", src: "https://kpmg.com/il/en/home.html" },
  { name: "Lagos", src: "https://kpmg.com/ng/en/home/insights/2019/06/kpmg-nigeria-insights-centre.html" },
];

const LocationLabel = ({ children }) => {
  const text = children || "";
  const match = text.match(/^(.*?)(\([^()]+\))(.*)$/);

  if (!match) return text;

  return (
    <>
      {match[1]}
      <Box component="span" sx={{ color: '#07DBFA' }}>
        {match[2]}
      </Box>
      {match[3]}
    </>
  );
};

export default function Solution_Popup3({onClose, onRequestClose}) {
    const [visible, setVisible] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState("Americas");
    const [frameSrc, setFrameSrc] = useState(null);
    const [frameMaximized, setFrameMaximized] = useState(false);

    const closePopup = () => {
      window.dispatchEvent(new Event("regionPopupClosed"));
      setVisible(false);
      setTimeout(() => {
        onClose();
      }, 500);
    };
    useEffect(() => {
      if (onRequestClose) {
        onRequestClose(closePopup);
      }
    }, []);

    const item = {
      position: "relative",
      paddingBottom: "0.1042vw",
      paddingLeft: "0.4167vw",
      fontSize: "0.8333vw",
      fontWeight: 600,
      cursor: "pointer",
      borderBottom: "1.5px solid transparent",
      transition: "transform 0.2s ease",
      width: 'fit-content',
      "&:hover": {
        transform: "scale(1.15)",
        textDecoration: "underline",
        textUnderlineOffset: "0.2083vw",
        textDecorationColor: "#07DBFA",
      }
      // Fake dual-color bottom border using background gradient
      // backgroundImage: `
      //   linear-gradient(
      //     to right,
      //     rgba(255,255,255,0.5) 0%,
      //     rgba(255,255,255,0.5) 95%,
      //     #07DBFA 95%,
      //     #07DBFA 100%
      //   )
      // `,
      // backgroundSize: "100% 2px",
      // backgroundRepeat: "no-repeat",
      // backgroundPosition: "0 100%",
    };

    const country = {
      borderBottom: '2px solid #07DBFA', 
      marginLeft: '0.4167vw',
      width: 'fit-content', 
      marginBottom: '0.2083vw', 
      fontSize: '0.8333vw', 
      fontWeight: 600, 
      cursor: 'pointer'
    }

    const EMEAcountry = {
      marginLeft: '0.4167vw',
      width: 'fit-content', 
      marginBottom: '0.2083vw', 
      fontSize: '0.8333vw', 
      fontWeight: 600, 
      cursor: 'pointer'
    }
    
    useEffect(() => {
        setVisible(true);
        window.dispatchEvent(new CustomEvent("regionSelected", { detail: "Americas" }));
    }, []);

    const handleLocationClick = (name) => {
      const cfg = LOCATION_IFRAMES.find((loc) => loc.name === name);
      if (cfg) {
        setFrameSrc(cfg.src);
      }
    };

    return (
      <>
        {/* {!frameMaximized && (<Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 2100,          // above the main overlay (zIndex: 2000)
            pointerEvents: 'none',  // let clicks pass through except on the button
          }}
        >
          <IconButton
            onClick={() => {
                  window.dispatchEvent(new Event("regionPopupClosed"));
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
        </Box>)} */}
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
        }}>
            {!frameMaximized && (<Box sx={{
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
              gap: '1.0417vw', p: '1.25vw 1.667vw',
            }}>
                <IconButton
                onClick={() => {
                    window.dispatchEvent(new Event("regionPopupClosed"));
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
                  justifyContent: 'flex-end',
                }}>
                    <Button 
                    onClick={() => {
                      setSelectedRegion("Americas");
                      window.dispatchEvent(new CustomEvent("regionSelected", { detail: "Americas" }));
                    }}
                    sx={{
                      width: '8vw',
                      borderRadius: '11px',
                      border: selectedRegion === "Americas" ? '1px solid white' : 'none',
                      background: selectedRegion === "Americas" ? (`
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
                            Americas
                        </Typography>
                        <PublicIcon sx={{fontSize: '1.25vw'}} />
                    </Button>
                    <Button 
                    onClick={() => {
                      setSelectedRegion("APAC");
                      window.dispatchEvent(new CustomEvent("regionSelected", { detail: "APAC" }));
                    }}
                    sx={{
                      width: '8vw',
                      borderRadius: '11px',
                      border: selectedRegion === "APAC" ? '1px solid white' : 'none',
                      background: selectedRegion === "APAC" ? (`
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
                            APAC
                        </Typography>
                        <PublicIcon sx={{fontSize: '1.25vw'}} />
                    </Button>
                    <Button 
                    onClick={() => {
                      setSelectedRegion("EMEA");
                      window.dispatchEvent(new CustomEvent("regionSelected", { detail: "EMEA" }));
                    }}
                    sx={{
                      width: '8vw',
                      borderRadius: '11px',
                      border: selectedRegion === "EMEA" ? '1px solid white' : 'none',
                      background: selectedRegion === "EMEA" ? (`
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
                            EMEA
                        </Typography>
                        <PublicIcon sx={{fontSize: '1.25vw'}} />
                    </Button>
                </Box>
                <Box sx={{
                  display: 'flex',
                  // justifyContent: 'space-between',
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  gap: '1.25vw',
                  borderTop: '0.5px solid rgba(255,255,255,0.25)',
                  borderBottom: '0.5px solid rgba(255,255,255,0.25)'
                }}>
                  <Box sx={{display: 'flex', alignItems: 'center', gap: '0.5vw'}}>
                    <Box
                      component="img"
                      src={LeftBorder}
                      alt="Left border"
                      sx={{ height: '2.25vw' }}
                    />
                    <Typography
                    sx={{
                      fontSize: '1.25vw',
                      fontWeight: 'bold',
                      marginLeft: '-1vw',
                      display: 'flex',
                      alignItems: 'center',
                      lineHeight: 1,        
                    }}
                  >
                      Insights Center Locations
                    </Typography>
                  </Box>
                  <LocationOnOutlinedIcon sx={{ color: 'white', fontSize: '1.5vw'}} />
                </Box>
                {selectedRegion === "Americas" ? (
                <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '-.5417vw'}}>
                  <Box sx={{borderLeft: '1.5px solid rgba(255,255,255,0.25)', width: '50%', display: 'flex', flexDirection: 'column', gap: '0.4167vw'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1083vw'}}>
                      <Typography sx={{alignSelf: 'flex-end', fontSize: '1.0417vw', fontWeight: 'bold', marginRight: '0.5vw'}}>
                        Canada
                      </Typography>
                      <img src={CountryHeader} />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.2083vw'}}>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography
                        onClick={() => handleLocationClick("Calgary")}
                        sx={item}>
                          Calgary
                        </Typography>
                      </Box>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography 
                        onClick={() => handleLocationClick("Vancouver")}
                        sx={item}>
                          Vancouver
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.2083vw'}}>
                      <Typography sx={{alignSelf: 'flex-end', fontSize: '1.0417vw', fontWeight: 'bold', marginRight: '0.5vw'}}>
                        Mexico
                      </Typography>
                      <img src={CountryHeader} />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.2083vw'}}>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Mexico City")}
                        sx={item}>
                          Mexico City
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.2083vw'}}>
                      <Typography sx={{alignSelf: 'flex-end', fontSize: '1.0417vw', fontWeight: 'bold', marginRight: '0.5vw'}}>
                        USA
                      </Typography>
                      <img src={CountryHeader} />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1083vw'}}>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Atlanta")}
                        sx={item}>
                          Atlanta
                        </Typography>
                      </Box>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Chicago")}
                        sx={item}>
                          Chicago
                        </Typography>
                      </Box>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Denver")}
                        sx={item}>
                          Denver
                        </Typography>
                      </Box>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("New York")}
                        sx={item}>
                          New York
                        </Typography>
                      </Box>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography 
                        onClick={() => handleLocationClick("Orlando")}
                        sx={item}>
                          Orlando
                        </Typography>
                      </Box>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Washington DC")}
                        sx={item}>
                          Washington DC
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{
                      alignSelf: 'flex-end',
                      justifyContent: 'flex-end',
                      marginTop: '11.75vw',
                      marginLeft: '1.5vw',
                      borderRadius: '11px',
                      background: `linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06))`,
                      border: '0.5px solid white',
                      backdropFilter: 'blur(50px)',
                      padding: '0.4167vw',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4167vw'
                    }}>
                      {/* <Typography sx={{fontSize: '0.8333vw', fontWeight: 300}}>
                        Our global network of Insights Centers brings data to life through immersive, collaborative environments.
                      </Typography> */}
                      <Typography sx={{fontSize: '0.8333vw', fontWeight: 700}}>
                        Click on the locations to explore our Global Insights Centers.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ) : selectedRegion === "APAC" ? (
                <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '-.5417vw'}}>
                  <Box sx={{borderLeft: '1.5px solid rgba(255,255,255,0.25)', width: '50%', display: 'flex', flexDirection: 'column', gap: '0.4167vw'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1083vw'}}>
                      <Typography sx={{alignSelf: 'flex-end', fontSize: '1.0417vw', fontWeight: 'bold', marginRight: '0.5vw'}}>
                        India
                      </Typography>
                      <img src={CountryHeader} />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.2083vw'}}>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Banglore")}
                        sx={item}>
                          Banglore
                        </Typography>
                      </Box>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Mumbai")}
                        sx={item}>
                          Mumbai
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1083vw'}}>
                      <Typography sx={{alignSelf: 'flex-end', fontSize: '1.0417vw', fontWeight: 'bold', marginRight: '0.5vw'}}>
                        Japan
                      </Typography>
                      <img src={CountryHeader} />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.2083vw'}}>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Tokyo")}
                        sx={item}>
                          Tokyo
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1083vw'}}>
                      <Typography sx={{alignSelf: 'flex-end', fontSize: '1.0417vw', fontWeight: 'bold', marginRight: '0.5vw'}}>
                        New Zealand
                      </Typography>
                      <img src={CountryHeader} />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.2083vw'}}>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Auckland")}
                        sx={item}>
                          Auckland
                        </Typography>
                      </Box>
                    </Box>
                    {/* Bottom-right description (same width, right side) */}
                    <Box sx={{
                      alignSelf: 'flex-end',
                      marginTop: '19.75vw',
                      marginLeft: '1.5vw',
                      borderRadius: '11px',
                      background: `linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06))`,
                      border: '0.5px solid white',
                      backdropFilter: 'blur(50px)',
                      padding: '0.4167vw',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4167vw'
                    }}>
                      {/* <Typography sx={{fontSize: '0.8333vw', fontWeight: 300}}>
                        Our global network of Insights Centers brings data to life through immersive, collaborative environments.
                      </Typography> */}
                      <Typography sx={{fontSize: '0.8333vw', fontWeight: 700}}>
                        Click on the locations to explore our Global Insights Centers.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                ) : (
                <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '-.5417vw'}}>
                  {/* Right [Middle East*/}
                  <Box sx={{display: 'flex', flexDirection: 'column', width: '49%', gap: '0.4167vw'}}>
                    <Box sx={{borderLeft: '1.5px solid rgba(255,255,255,0.25)', width: '100%', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '0.4167vw', marginTop: '-0.5vw'}}>
                      <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1083vw'}}>
                      <Typography sx={{alignSelf: 'flex-end', fontSize: '1.0417vw', fontWeight: 'bold', marginRight: '0.5vw'}}>
                        Europe
                      </Typography>
                      <img src={CountryHeader} />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1083vw'}}>
                        {/* <Typography sx={country}>
                          Belgium
                        </Typography> */}
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Brussels")}
                        sx={item}>
                          <LocationLabel>Belgium - Brussels </LocationLabel>
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1083vw'}}>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Paris")}
                        sx={item}>
                          <LocationLabel>France - Paris</LocationLabel>
                        </Typography>
                        {/* <img src={solution_underline} style={{transform: 'scaleX(-1)', width: '100%'}}/> */}
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1083vw'}}>
                        {/* <Typography sx={country}>
                          Germany
                        </Typography> */}
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Frankfurt")}
                        sx={item}>
                          <LocationLabel>Germany - Frankfurt</LocationLabel>
                        </Typography>
                        {/* <img src={solution_underline} style={{transform: 'scaleX(-1)', width: '100%'}}/> */}
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1083vw'}}>
                        {/* <Typography sx={country}>
                          Ireland
                        </Typography> */}
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Dublin")}
                        sx={item}>
                          <LocationLabel>Ireland - Dublin</LocationLabel>
                        </Typography>
                        {/* <img src={solution_underline} style={{transform: 'scaleX(-1)', width: '100%'}}/> */}
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1083vw'}}>
                        {/* <Typography sx={country}>
                          Italy
                        </Typography> */}
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Milan")}
                        sx={item}>
                          <LocationLabel>Italy - Milan</LocationLabel>
                        </Typography>
                        {/* <img src={solution_underline} style={{transform: 'scaleX(-1)', width: '100%'}}/> */}
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1083vw'}}>
                        {/* <Typography sx={country}>
                          Netherlands
                        </Typography> */}
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Amsterdam")}
                        sx={item}>
                          <LocationLabel>Netherlands - Amsterdam</LocationLabel>
                        </Typography>
                        {/* <img src={solution_underline} style={{transform: 'scaleX(-1)', width: '100%'}}/> */}
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1083vw'}}>
                        {/* <Typography sx={country}>
                          Spain
                        </Typography> */}
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Madrid")}
                        sx={item}>
                          <LocationLabel>Spain - Madrid</LocationLabel>
                        </Typography>
                        {/* <img src={solution_underline} style={{transform: 'scaleX(-1)', width: '100%'}}/> */}
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1083vw'}}>
                        {/* <Typography sx={country}>
                          Sweden
                        </Typography> */}
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Stockholm")}
                        sx={item}>
                          <LocationLabel>Sweden - Stockholm</LocationLabel>
                        </Typography>
                        {/* <img src={solution_underline} style={{transform: 'scaleX(-1)', width: '100%'}}/> */}
                      </Box>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Gothenburg")}
                        sx={item}>
                          <LocationLabel>Sweden - Gothenburg</LocationLabel>
                        </Typography>
                        {/* <img src={solution_underline} style={{transform: 'scaleX(-1)', width: '100%'}}/> */}
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1083vw'}}>
                        {/* <Typography sx={country}>
                          Switzerland
                        </Typography> */}
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Geneva")}
                        sx={item}>
                          <LocationLabel>Switzerland - Geneva</LocationLabel>
                        </Typography>
                        {/* <img src={solution_underline} style={{transform: 'scaleX(-1)', width: '100%'}}/> */}
                      </Box>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Zurich")}
                        sx={item}>
                          <LocationLabel>Switzerland - Zurich</LocationLabel>
                        </Typography>
                        {/* <img src={solution_underline} style={{transform: 'scaleX(-1)', width: '100%'}}/> */}
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1083vw'}}>
                        {/* <Typography sx={country}>
                          United Kingdom
                        </Typography> */}
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("London")}
                        sx={item}>
                          <LocationLabel>United Kingdom - London</LocationLabel>
                        </Typography>
                        {/* <img src={solution_underline} style={{transform: 'scaleX(-1)', width: '100%'}}/> */}
                      </Box>
                      <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography onClick={() => handleLocationClick("Manchester")}
                        sx={item}>
                          <LocationLabel>United Kingdom - Manchester</LocationLabel>
                        </Typography>
                        {/* <img src={solution_underline} style={{transform: 'scaleX(-1)', width: '100%'}}/> */}
                      </Box>
                    </Box>
                    
                    
                    
                    
                      <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.2083vw'}}>
                        <Typography sx={{alignSelf: 'flex-end', fontSize: '1.0417vw', fontWeight: 'bold', marginRight: '0.5vw'}}>
                          Middle East
                        </Typography>
                        <img src={CountryHeader} />
                      </Box>
                      <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1083vw'}}>
                          {/* <Typography sx={country}>
                            Israel
                          </Typography> */}
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                          <Typography onClick={() => handleLocationClick("Tel Aviv")}
                          sx={item}>
                            <LocationLabel>Israel - Tel Aviv</LocationLabel>
                          </Typography>
                          {/* <img src={solution_underline} style={{transform: 'scaleX(-1)', width: '100%'}}/> */}
                        </Box>
                      </Box>
                      <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1083vw'}}>
                          {/* <Typography sx={country}>
                            Saudi Arabia
                          </Typography> */}
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                          <Typography onClick={() => handleLocationClick("Riyadh")}
                          sx={item}>
                            <LocationLabel>Saudi Arabia - Riyadh</LocationLabel>
                          </Typography>
                          {/* <img src={solution_underline} style={{transform: 'scaleX(-1)', width: '100%'}}/> */}
                        </Box>
                      </Box>
                      <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.2083vw'}}>
                        <Typography sx={{alignSelf: 'flex-end', fontSize: '1.0417vw', fontWeight: 'bold', marginRight: '0.5vw'}}>
                          Africa
                        </Typography>
                        <img src={CountryHeader} />
                      </Box>
                      <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.2083vw'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                          {/* <Typography sx={item}>
                            Nigeria
                          </Typography> */}
                          {/* <img src={solution_underline} style={{transform: 'scaleX(-1)', width: '100%'}}/> */}
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                          <Typography onClick={() => handleLocationClick("Lagos")}
                          sx={item}>
                            <LocationLabel>Nigeria - Lagos</LocationLabel>
                          </Typography>
                          {/* <img src={solution_underline} style={{transform: 'scaleX(-1)', width: '100%'}}/> */}
                        </Box>
                      </Box> 
                    </Box>
                    <Box sx={{
                      borderRadius: '11px',
                      background: `linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06))`,
                      border: '0.5px solid white',
                      backdropFilter: 'blur(50px)',
                      padding: '0.4167vw',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4167vw',
                      marginTop: '0.4167vw',
                    }}>
                      {/* <Typography sx={{fontSize: '0.8333vw', fontWeight: 300}}>
                        Our global network of Insights Centers brings data to life through immersive, collaborative environments.
                      </Typography> */}
                      <Typography sx={{fontSize: '0.8333vw', fontWeight: 700}}>
                        Click on the locations to explore our Global Insights Centers.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                )} 
            </Box>)}
            {frameSrc && (
              <Frame 
                src={frameSrc}
                minimizedWidth="70vw"
                maximizedWidth="95vw"
                minimizedHeight="75vh"
                maximizedHeight="85vh"
                popupMode={true}
                top={frameMaximized ? "52.5vh" : "55vh"}
                left={frameMaximized ? "20vw" : "20vw"}
                style={{
                  position: "absolute",
                  zIndex: 3000,
                }}
                onStateChange={({ isClosed, isMinimized }) => {
                  if (isClosed) {
                    setFrameSrc(null);
                    setFrameMaximized(false);
                  }
                }}
                onMinimizeChange={(isMinimized) => setFrameMaximized(!isMinimized)}
              />
            )}
        </Box>
      </>
    )
}