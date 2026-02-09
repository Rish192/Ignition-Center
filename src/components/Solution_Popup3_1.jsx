import React, {useEffect, useState, useRef} from 'react'
import { Box, Button, IconButton,Typography } from '@mui/material'
import Frame from "./Frame";
import { Close } from "@mui/icons-material";
import PublicIcon from '@mui/icons-material/Public';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const LOCATION_IFRAMES = [
  { name: "Calgary", src: "https://kpmg.com/ca/en/home/services/ignition/calgary.html" },
  { name: "Orlando", src: "https://kpmg.com/us/en/capabilities-services/kpmg-innovation-services/kpmg-ignition/lakehouse.html" },
  { name: "Vancouver", src: "https://kpmg.com/ca/en/home/services/ignition/vancouver.html" },
  { name: "Mexico City", src: "https://kpmg.com/mx/es/servicios/kpmg-ignition-mexico.html" },
  { name: "Atlanta", src: "https://kpmg.com/us/en/capabilities-services/kpmg-innovation-services/kpmg-ignition/atlanta.html" },
  { name: "Chicago", src: "https://kpmg.com/us/en/capabilities-services/kpmg-innovation-services/kpmg-ignition/chicago.html" },
  { name: "Denver", src: "https://kpmg.com/us/en/capabilities-services/kpmg-innovation-services/kpmg-ignition/new-york.html" },
  { name: "New York", src: "https://kpmg.com/us/en/capabilities-services/kpmg-innovation-services/kpmg-ignition/new-york.html" },
  { name: "Washington D.C", src: "https://kpmg.com/us/en/capabilities-services/kpmg-innovation-services/kpmg-ignition/washington-dc.html" },
  { name: "Auckland", src: "https://kpmg.com/nz/en.html" },
  { name: "Bengaluru", src: "https://kpmg.com/in/en/insights/2022/07/kpmg-innovation-kaleidoscope.html" },
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

export default function Solution_Popup3_1({onClose, onRequestClose, setChangeView}) {
    const [visible, setVisible] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState("Americas");
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [frameSrc, setFrameSrc] = useState(null);
    const [frameMaximized, setFrameMaximized] = useState(false);

    const closePopup = () => {
      window.dispatchEvent(new Event("regionPopupClosed"));
      setVisible(false);
      // setTimeout(() => {
      //   onClose();
      // }, 500);
    };
    useEffect(() => {
      if (onRequestClose) {
        onRequestClose(closePopup);
      }
    }, []);

    const Asialocations = [
      'India - Bengaluru',
      'India - Mumbai',
      'Japan - Tokyo'
    ];
    const PacificLocations = [
      'New Zealand - Auckland'
    ];
    const Europelocations = [
      'Belgium - Brussels',
      'France - Paris',
      'Ireland - Dublin',
      'Italy - Milan',
      'Netherlands - Amsterdam',
      'Spain - Madrid',
      'Sweden - Gothenburg',
      'Sweden - Stockholm',
      'Switzerland - Geneva',
      'Switzerland - Zurich',
      'United Kingdom - London',
      'United Kingdom - Manchester',
    ];
    const MiddleEastlocations = [
      'Israel - Tel Aviv',
      'Saudi Arabia - Riyadh',
    ];
    const Africalocations = [
      'Nigeria - Lagos'
    ];

    const item = (isSelected) => ({
      fontSize: "0.8333vw",
      fontWeight: isSelected ? 1000 : 600,
      cursor: "pointer",
      borderBottom: "1.5px solid transparent",
      transition: "transform 0.2s ease",
      width: 'fit-content',
      textDecoration: isSelected ? "underline" : "none",
      textUnderlineOffset: "0.4167vw",
      textDecorationColor: "#07DBFA",
      // color: isSelected ? '#07DBFA' : 'white',
      "&:hover": {
        transform: "scale(1.15)",
        textDecoration: "underline",
        textUnderlineOffset: "0.4167vw",
        textDecorationColor: "#07DBFA",
      }
    });

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
        setChangeView(null);
      }
    };
    const handleEMEAClick = (location) => {
      const city = location.split('-')[1].trim();
      const cfg = LOCATION_IFRAMES.find((loc) => loc.name === city);
      if (cfg && cfg.src) {
        setFrameSrc(cfg.src);
        setChangeView(null);
      }
    }

    return (
      <>
        <Box sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          background: 'linear-gradient(to right, rgba(0,55,89,0), rgba(0, 55, 89, 0.85))',
          boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
          zIndex: 2000,
          transform: visible ? 'translateX(0%)' : 'translateX(100%)',
          transition: 'transform 0.5s ease-in-out',
        }}>
            {!frameMaximized && (
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
              gap: '1.0417vw', 
              p: '1.25vw 1.667vw',
              // paddingTop: '2vw',
            }}>
              {/* <IconButton
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
              </IconButton> */}
              <Box sx={{
                // marginTop: '1vh',
                display: 'flex',
                gap: '1vw',
                alignItems: 'center',
                // justifyContent: 'flex-end',
              }}>
                  <Button 
                  onClick={() => {
                    setSelectedRegion("Americas");
                    window.dispatchEvent(new CustomEvent("regionSelected", { detail: "Americas" }));
                  }}
                  sx={{
                    width: '10vw',
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
                    transition: 'all 0.2s ease',
                    '&: hover': {
                      transform: 'scale(1.08)'
                    }
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
                    width: '10vw',
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
                    transition: 'all 0.2s ease',
                    '&: hover': {
                      transform: 'scale(1.08)'
                    }
                  }}>
                      <Typography sx={{fontSize: '0.8333vw', fontWeight: 'bold', textTransform: 'none'}}>
                          ASPAC
                      </Typography>
                      <PublicIcon sx={{fontSize: '1.25vw'}} />
                  </Button>
                  <Button 
                  onClick={() => {
                    setSelectedRegion("EMEA");
                    window.dispatchEvent(new CustomEvent("regionSelected", { detail: "EMEA" }));
                  }}
                  sx={{
                    width: '10vw',
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
                    transition: 'all 0.2s ease',
                    '&: hover': {
                      transform: 'scale(1.08)'
                    }
                  }}>
                      <Typography sx={{fontSize: '0.8333vw', fontWeight: 'bold', textTransform: 'none'}}>
                          EMEA
                      </Typography>
                      <PublicIcon sx={{fontSize: '1.25vw'}} />
                  </Button>
              </Box>
              <Box sx={{
                position: 'relative',
                background: 'linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06))',
                borderRadius: '11px',
                boxSizing: 'border-box',
                width: '100%',
                padding: '1.0417vw',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4167vw',
                backdropFilter: 'blur(50px)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '11px',
                  pointerEvents: 'none',
                  border: '1px solid transparent',
                  background: `
                    linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0)) top left,
                    linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.5)) bottom right
                  `,
                  backgroundSize: '35% 35%',
                  backgroundRepeat: 'no-repeat',
                  mask:
                    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMask:
                    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'xor',
                  padding: '1px'
                }
              }}>
                <Box sx={{
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  paddingBottom: '0.2083vw', 
                  borderBottom: '2px solid #07DBFA', 
                  boxSizing: 'border-box'}}>
                  <Typography
                    sx={{
                      fontSize: '1.25vw',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    Center Locations
                  </Typography>
                  <LocationOnOutlinedIcon sx={{ color: 'white', fontSize: '1.5vw',}} />
                </Box>
                {selectedRegion === "Americas" ? (
                  <Box sx={{
                    display: 'flex'
                  }}>
                    {/* Left */}
                    <Box sx={{
                      width: '50%',
                      padding: '0vw 0.5vw',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4167vw'
                    }}>
                      <Typography sx={{
                        borderBottom: '3px solid #07DBFA',
                        fontSize: '1.0417vw',
                        fontWeight: 'bold',
                      }}>
                        Canada
                      </Typography>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4167vw',
                        borderLeft: '1.5px solid rgba(255,255,255,0.27)',
                        padding: '0vw 0.4167vw',
                      }}>
                        <Typography 
                          sx={item(selectedLocation === "Calgary")}
                          onClick={() => {
                            setSelectedLocation("Calgary"); 
                            handleLocationClick("Calgary")
                          }}
                        >
                          Calgary
                        </Typography>
                        <Typography 
                          sx={item(selectedLocation === "Vancouver")}
                          onClick={() => {
                            setSelectedLocation("Vancouver"); 
                            handleLocationClick("Vancouver")
                          }}
                        >
                          Vancouver
                        </Typography>
                      </Box>
                      <Typography sx={{
                        borderBottom: '3px solid #07DBFA',
                        fontSize: '1.0417vw',
                        fontWeight: 'bold',
                      }}>
                        Mexico
                      </Typography>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4167vw',
                        borderLeft: '1.5px solid rgba(255,255,255,0.27)',
                        padding: '0vw 0.4167vw',
                      }}>
                        <Typography 
                          sx={item(selectedLocation === "Mexico City")}
                          onClick={() => {
                            setSelectedLocation("Mexico City"); 
                            handleLocationClick("Mexico City")
                          }}
                        >
                          Mexico City
                        </Typography>
                      </Box>
                    </Box>
                    {/* Right */}
                    <Box sx={{
                      width: '50%',
                      padding: '0vw 0.5vw',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4167vw'
                    }}>
                      <Typography sx={{
                        borderBottom: '3px solid #07DBFA',
                        fontSize: '1.0417vw',
                        fontWeight: 'bold',
                      }}>
                        USA
                      </Typography>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4167vw',
                        borderLeft: '1.5px solid rgba(255,255,255,0.27)',
                        padding: '0vw 0.4167vw',
                      }}>
                        <Typography 
                          sx={item(selectedLocation === "Atlanta")}
                          onClick={() => {
                            setSelectedLocation("Atlanta"); 
                            handleLocationClick("Atlanta")
                          }}
                        >
                          Atlanta
                        </Typography>
                        <Typography 
                          sx={item(selectedLocation === "Chicago")}
                          onClick={() => {
                            setSelectedLocation("Chicago"); 
                            handleLocationClick("Chicago")
                          }}
                        >
                          Chicago
                        </Typography>
                        <Typography 
                          sx={item(selectedLocation === "Denver")}
                          onClick={() => {
                            setSelectedLocation("Denver"); 
                            handleLocationClick("Denver")
                          }}
                        >
                          Denver
                        </Typography>
                        <Typography 
                          sx={item(selectedLocation === "New York")}
                          onClick={() => {
                            setSelectedLocation("New York"); 
                            handleLocationClick("New York")
                          }}
                        >
                          New York
                        </Typography>
                        <Typography 
                          sx={item(selectedLocation === "Orlando")}
                          onClick={() => {
                            setSelectedLocation("Orlando"); 
                            handleLocationClick("Orlando")
                          }}
                        >
                          Orlando
                        </Typography>
                        <Typography 
                          sx={item(selectedLocation === "Washington D.C")}
                          onClick={() => {
                            setSelectedLocation("Washington D.C"); 
                            handleLocationClick("Washington D.C")
                          }}
                        >
                          Washington D.C
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ) : selectedRegion === "APAC" ? (
                  <Box sx={{
                    display: 'flex'
                  }}>
                    {/* Left */}
                    <Box sx={{
                      width: '50%',
                      padding: '0vw 0.5vw',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4167vw'
                    }}>
                      <Typography sx={{
                        borderBottom: '3px solid #07DBFA',
                        fontSize: '1.0417vw',
                        fontWeight: 'bold',
                      }}>
                        Asia
                      </Typography>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4167vw',
                        borderLeft: '1.5px solid rgba(255,255,255,0.27)',
                        padding: '0vw 0.4167vw',
                      }}>
                        {Asialocations.map((loc, index) => (
                          <Typography
                            key={index}
                            sx={item(selectedLocation === loc)}
                            onClick={() => {
                              setSelectedLocation(loc);
                              handleEMEAClick(loc);
                            }}
                          >
                            {loc}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                    {/* Right */}
                    <Box sx={{
                      width: '50%',
                      padding: '0vw 0.5vw',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4167vw'
                    }}>
                      <Typography sx={{
                        borderBottom: '3px solid #07DBFA',
                        fontSize: '1.0417vw',
                        fontWeight: 'bold',
                      }}>
                        Pacific
                      </Typography>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4167vw',
                        borderLeft: '1.5px solid rgba(255,255,255,0.27)',
                        padding: '0vw 0.4167vw',
                      }}>
                        {PacificLocations.map((loc, index) => (
                          <Typography
                            key={index}
                            sx={item(selectedLocation === loc)}
                            onClick={() => {
                              setSelectedLocation(loc);
                              handleEMEAClick(loc);
                            }}
                          >
                            {loc}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{
                    display: 'flex'
                  }}>
                    {/* Left */}
                    <Box sx={{
                      width: '50%',
                      padding: '0vw 0.5vw',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4167vw'
                    }}>
                      <Typography sx={{
                        borderBottom: '3px solid #07DBFA',
                        fontSize: '1.0417vw',
                        fontWeight: 'bold',
                      }}>
                        Europe
                      </Typography>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4167vw',
                        borderLeft: '1.5px solid rgba(255,255,255,0.27)',
                        padding: '0vw 0.4167vw',
                      }}>
                        {Europelocations.map((loc, index) => (
                          <Typography
                            key={index}
                            sx={item(selectedLocation === loc)}
                            onClick={() => {
                              setSelectedLocation(loc);
                              handleEMEAClick(loc);
                            }}
                          >
                            {loc}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                    {/* Right */}
                    <Box sx={{
                      width: '50%',
                      padding: '0vw 0.5vw',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4167vw'
                    }}>
                      <Typography sx={{
                        borderBottom: '3px solid #07DBFA',
                        fontSize: '1.0417vw',
                        fontWeight: 'bold',
                      }}>
                        Middle East
                      </Typography>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4167vw',
                        borderLeft: '1.5px solid rgba(255,255,255,0.27)',
                        padding: '0vw 0.4167vw',
                      }}>
                        {MiddleEastlocations.map((loc, index) => (
                          <Typography
                            key={index}
                            sx={item(selectedLocation === loc)}
                            onClick={() => {
                              setSelectedLocation(loc);
                              handleEMEAClick(loc);
                            }}
                          >
                            {loc}
                          </Typography>
                        ))}
                      </Box>
                      <Typography sx={{
                        borderBottom: '3px solid #07DBFA',
                        fontSize: '1.0417vw',
                        fontWeight: 'bold',
                      }}>
                        Africa
                      </Typography>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4167vw',
                        borderLeft: '1.5px solid rgba(255,255,255,0.27)',
                        padding: '0vw 0.4167vw',
                      }}>
                        {Africalocations.map((loc, index) => (
                          <Typography
                            key={index}
                            sx={item(selectedLocation === loc)}
                            onClick={() => {
                              setSelectedLocation(loc);
                              handleEMEAClick(loc);
                            }}
                          >
                            {loc}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
              <Box sx={{
                // position: 'absolute',
                // bottom: '4vh',
                // left: '2vw',
                //width: '80vw',
                backgroundColor: `
                  rgba(0,45,103,0.5),
                  linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(2,42,64,0.06))
                `,
                backdropFilter: 'blur(50px)',
                borderRadius: '11px',
                padding: '0.625vw',
                boxSizing: 'border-box',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '11px',
                  pointerEvents: 'none',
                  border: '1px solid transparent',
                  background: `
                    linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0)) top left,
                    linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.5)) bottom right
                  `,
                  backgroundSize: '35% 35%',
                  backgroundRepeat: 'no-repeat',
                  mask:
                    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMask:
                    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'xor',
                  padding: '1px'
                }
              }}>
                {selectedRegion === "Americas" ? (
                  <Box sx={{padding: '0vw 0.8333vw', display: 'flex', flexDirection: 'column', gap: '1.0417vw'}}>
                  <Typography sx={{
                    fontSize: '0.8333vw',
                    color: 'white',
                  }}>
                    Our Ignition and Insights Centers in the Americas are dynamic, high
                    tech environments designed to help clients unlock value 
                    from data and analytics. 
                    These centers specialize in immersive, interactive 
                    sessions that showcase advanced technologies, industry
                    specific solutions, and innovative methodologies. 
                    With expertise spanning digital transformation, risk 
                    management, ESG strategies, and AI-driven insights, they 
                    enable organizations to tackle complex challenges, 
                    accelerate decision-making, and drive measurable impact.
                  </Typography>
                  <Typography sx={{
                    fontSize: '0.8333vw',
                    fontWeight: 500,
                    color: 'white',
                  }}>
                    Click on the locations to explore
                  </Typography>
                  </Box>
                ) : selectedRegion === "APAC" ? (
                  <Box sx={{padding: '0vw 0.8333vw', display: 'flex', flexDirection: 'column', gap: '1.0417vw'}}>
                  <Typography sx={{
                    fontSize: '0.8333vw',
                    color: 'white',
                  }}>
                    Our ASPAC Ignition and Insights Centers are designed to deliver 
                    immersive, collaborative experiences tailored to the 
                    region's diverse industries. 
                    These centers excel in showcasing advanced 
                    technologies and innovative solutions, with expertise in 
                    digital transformation, supply chain optimization, 
                    sustainability strategies, and AI-driven insights. 
                    Through interactive demos and customized workshops, 
                    they help organizations accelerate growth, enhance 
                    resilience, and achieve measurable impact.
                  </Typography>
                  <Typography sx={{
                    fontSize: '0.8333vw',
                    fontWeight: 500,
                    color: 'white',
                  }}>
                    Click on the locations to explore
                  </Typography>
                  </Box>
                ) : (
                  <Box sx={{padding: '0vw 0.8333vw', display: 'flex', flexDirection: 'column', gap: '1.0417vw'}}>
                  <Typography sx={{
                    fontSize: '0.8333vw',
                    color: 'white',
                  }}>
                    Our EMEA Ignition and Insights Centers are designed to foster 
                    collaboration and innovation. 
                    These centers specialize in delivering immersive 
                    experiences that combine advanced technologies with 
                    industry-specific solutions. 
                    Their strengths include digital transformation, 
                    sustainability and ESG strategies, AI-driven insights, and 
                    risk management. Through tailored workshops and 
                    interactive demos, they help organizations accelerate 
                    decision-making and drive impactful outcomes across 
                    diverse sectors.
                  </Typography>
                  <Typography sx={{
                    fontSize: '0.8333vw',
                    fontWeight: 500,
                    color: 'white',
                  }}>
                    Click on the locations to explore
                  </Typography>
                  </Box>
                )}
                
              </Box>
            </Box>
            )}
            {/* {!frameMaximized && (
              
            )} */}
            {frameSrc && (
              <Frame 
                src={frameSrc}
                minimizedWidth="62vw"
                maximizedWidth="90vw"
                minimizedHeight="75vh"
                maximizedHeight="83vh"
                popupMode={true}
                top={frameMaximized ? "50vh" : "50vh"}
                left={frameMaximized ? "22vw" : "18vw"}
                style={{
                  position: "absolute",
                  zIndex: 3000, boxSizing: 'border-box'
                }}
                onStateChange={({ isClosed, isMinimized }) => {
                  if (isClosed) {
                    setFrameSrc(null);
                    setFrameMaximized(false);
                    setSelectedLocation(null);
                    setChangeView("F");
                  }
                }}
                onMinimizeChange={(isMinimized) => setFrameMaximized(!isMinimized)}
              />
            )}
        </Box>
      </>
    )
}