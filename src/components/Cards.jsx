import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";

import headerline from '../assets/header-line.png';
import Card_1 from '../assets/Card_1.png';
import Card_2 from '../assets/Card_2.png';
import Card_3 from '../assets/Card_3.png';
import Brochure_in_1 from '../assets/Brochure_in_1.png';
import Brochure_in_2 from '../assets/Brochure_in_2.png';
import Brochure_in_3 from '../assets/Brochure_in_3.png';
import Brochure_in_4 from '../assets/Brochure_in_4.png';
import Brochure_in_5 from '../assets/Brochure_in_5.png';
import Brochure_in_6 from '../assets/Brochure_in_6.png';
import Brochure_in_7 from '../assets/Brochure_in_7.png';
import Brochure_in_8 from '../assets/Brochure_in_8.png';
import Brochure_in_9 from '../assets/Brochure_in_9.png';

const cardsData = [
  { id: 1, title: "ERM's Role in ESG", text: "", img: Card_1,
    pages: [
      {
        img: Brochure_in_1,
        desc: "Page 1 - This brochure provides insights into the latest industry trends and innovations."
      },
      {
        img: Brochure_in_2,
        desc: "Page 2 - It covers various case studies and success stories from leading companies."
      },
      {
        img: Brochure_in_3,
        desc: "Page 3 - lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    ]
  },
  { id: 2, title: "KPMG Renewable and Emerging Energies Practice", text: "", img: Card_2, 
    pages: [
      {
        img: Brochure_in_4,
        desc: "Page 1 - This brochure provides insights into the latest industry trends and innovations."
      },
      {
        img: Brochure_in_5,
        desc: "Page 2 - It covers various case studies and success stories from leading companies."
      },
      {
        img: Brochure_in_6,
        desc: "Page 3 - lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    ]
  },
  { id: 3, title: "Future of Procurement", text: "", img: Card_3,
    pages: [
      {
        img: Brochure_in_9,
        desc: "Page 1 - This brochure provides insights into the latest industry trends and innovations."
      },
      {
        img: Brochure_in_8,
        desc: "Page 2 - It covers various case studies and success stories from leading companies."
      },
      {
        img: Brochure_in_7,
        desc: "Page 3 - lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    ]
  },
  // { id: 4, title: "Brochure 4", text: "Ut auctor lectus purus non turpis.", img: "https://picsum.photos/id/1020/600/400", pages: [
  //     {img: "https://picsum.photos/id/1020/600/400", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, labore in sapiente odio natus accusamus laboriosam dolores sunt praesentium quibusdam! Iusto rem fugiat cum omnis accusantium, architecto exercitationem quidem quo dicta nisi animi porro consequatur officiis dolorem. Aspernatur, tenetur nulla quo sapiente consectetur assumenda vel voluptatum optio ad sunt quibusdam." }
  //   ]
  // },
  // { id: 5, title: "Brochure 5", text: "Sed at risus venenatis lectus.", img: "https://picsum.photos/id/1021/600/400", pages: [
  //     {img: "https://picsum.photos/id/1021/600/400", desc: "This brochure examines the role of data analytics in driving business decisions." }
  //   ]
  // },
  // { id: 6, title: "Brochure 6", text: "Donec sit amet magna non nisi.", img: "https://picsum.photos/id/1024/600/400", pages: [
  //     {img: "https://picsum.photos/id/1024/600/400", desc: "This brochure explores the benefits of agile development practices." }
  //   ]
  // },
  // { id: 7, title: "Brochure 7", text: "Aenean commodo magna sed nunc.", img: "https://picsum.photos/id/1025/600/400", pages: [
  //     {img: "https://picsum.photos/id/1025/600/400", desc: "This brochure discusses cybersecurity best practices for modern enterprises." }
  //   ]
  // },
];

export default function Cards({onClose, backgroundColor}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cardsData.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        py: '0.8333vw', px: '1.6667vw',
        borderRadius: 3,
        bgcolor: backgroundColor,
        backdropFilter: 'blur(28.5px)',
        boxShadow: '0px 2.28px 2.28px rgba(0,0,0,0.25)',
        border: '1.14px solid rgba(158,199,255,0.6)',
        //backdropFilter: 'blur(12px)',
        //boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
    >
      <IconButton
      onClick={onClose}
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        color: 'white',
        '&:hover': {bgcolor: 'rgba(255,255,255,0.1)'}
      }}>
        <Close sx={{fontSize: '1.25vw'}}/>
      </IconButton>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw', }}>
        <img src={headerline} style={{transform: 'scaleX(-1)', width: '6vw'}}/>
        <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
          Brochures and Thought Leaderships
        </Typography>
        <img src={headerline} style={{ width: '6vw'}}/>
      </Box>
      {/* Title  + Close Button */}
      {/* <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" sx={{fontSize: '1.0417vw', color: "rgba(255,255,255,0.9)", px: '0.2083vw'}}>
          Brochures and Thought Leaderships
        </Typography>
        <IconButton
          onClick={onClose}
        >
          <Close sx={{fontSize: '1.45vw', color: 'rgba(255,255,255,0.9)'}}/>
        </IconButton>
      </Box> */}
      {/* Horizontal Line */}
      {/* <Box
        sx={{
          height: '0.1042vw',
          width: "100%",
          bgcolor: "rgba(255,255,255,0.25)",
          mt: '0.4167vw',
          mb: '0.8333vw'
        }}
      /> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: 'auto',
        }}
      >
        {/* Carousel with arrows */}
        <Box display="flex" alignItems="center" justifyContent="center">
          {/* <IconButton onClick={prevCard}>
            <ArrowBackIos sx={{color: 'white'}}/>
          </IconButton> */}

          <Box
            sx={{
              position: "relative",
              width: '48.82vw',
              height: '19.53vw',
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden"
            }}
          >
            {cardsData.map((card, index) => {
              let position = index - currentIndex;
              if (position < 0) position += cardsData.length;

              let cardStyle = {
                position: "absolute",
                width: '26.04vw',
                height: '16vw',
                borderRadius: 2,
                bgcolor: "background.paper",
                boxShadow: 4,
                display: "flex",
                flexDirection: "column",
                transition: "all 0.6s ease",
                backgroundImage: `url(${card.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                justifyContent: 'flex-end',
                cursor: "pointer"
              };

              if (position === 0) {
                cardStyle = {
                  ...cardStyle,
                  transform: "scale(1) translateX(0px)",
                  opacity: 1,
                  zIndex: 2
                };
              } else if (position === 1) {
                cardStyle = {
                  ...cardStyle,
                  transform: "scale(0.85) translateX(220px)",
                  opacity: 0.6,
                  zIndex: 0
                };
              } else if (position === cardsData.length - 1) {
                cardStyle = {
                  ...cardStyle,
                  transform: "scale(0.85) translateX(-220px)",
                  opacity: 0.6,
                  zIndex: 0
                };
              } else {
                cardStyle = {
                  ...cardStyle,
                  opacity: 0,
                  transform: "scale(0.5)"
                };
              }

              return (
                <Box key={card.id} sx={cardStyle} onClick={() => {
                  setSelectedCard(card);
                  setPageIndex(0);
                }}>
                  {/* Overlay text box */}
                  <Box sx={{
                    bgcolor: "rgba(0,0,0,0.6)",
                    color: "white",
                    p: '0.8333vw',
                    textAlign: "center"
                  }}>
                    <Typography variant="h6" sx={{fontSize: '0.8333vw', fontWeight: 'bold'}}>
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{mt: '0.4167vw', px: '1.25vw',fontSize: '0.7292vw', color: 'white', textAlign: 'center'}}
                    >
                      {card.text}
                    </Typography>
                  </Box>
                </Box>
                
              );
            })}
          </Box>

          {/* <IconButton onClick={nextCard}>
            <ArrowForwardIos sx={{color: 'white'}}/>
          </IconButton> */}
        </Box>

        {/* Bottom Controls (Arrows + Dots) */}
        <Box display="flex" alignItems="center" justifyContent="center" sx={{mt: '1.25vw', gap: '0.8333vw'}}>
          {/* Left Arrow */}
          <IconButton onClick={prevCard} sx={{ p: 0 }}>
            <ArrowBack sx={{ fontSize: '1.25vw', color: 'white' }} />
          </IconButton>

          <Box display="flex" justifyContent="center"sx={{gap: '0.625vw'}}>
            {cardsData.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentIndex(index)}
                sx={{
                  width: '0.5208vw',
                  height: '0.5208vw',
                  borderRadius: "50%",
                  bgcolor: index === currentIndex ? "#38D39F" : "#B0B9C2",
                  cursor: "pointer",
                  transition: "background 0.3s ease"
                }}
              />
            ))}
          </Box>
          
          {/* Right Arrow */}
          <IconButton onClick={nextCard} sx={{ p: 0 }}>
            <ArrowForward sx={{ fontSize: '1.25vw', color: 'white' }} />
          </IconButton>
        </Box>
      </Box>
      {selectedCard && (
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
            zIndex: 1200,
            bgcolor: 'rgba(0, 0, 0, 0.75)',
          }}
        >
          <Box
            sx={{
              height: '80vh',
              backgroundColor: 'rgba(0,63,145,0.31)',
              borderRadius: '1vw',
              padding: '0.4167vw',
              color: 'white',
              position: 'relative',
              backdropFilter: 'blur(28.5px)',
              boxShadow: '0px 2.28px 2.28px rgba(0,0,0,0.25)',
              border: '1.14px solid rgba(158,199,255,0.6)',
            }}
          >
            {/* Close Button */}
            <IconButton
              onClick={() => setSelectedCard(null)}
              sx={{
                position: 'fixed',
                top: '-1.5vw',
                right: '-1.5vw',
                zIndex: 2500,
                bgcolor: "rgba(1,0,37,0.85)",
                color: "white",
                border: "1px solid rgba(0,247,255,0.6)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
                width: '2vw',
                height: '2vw',
              }}
            >
              <Close sx={{ fontSize: '1.5vw' }} />
            </IconButton>
            <Box sx={{
              width: '100%',
              height: '100%',
              boxSizing: 'border-box',
              padding: '0.8333vw',
              color: 'white',
              overflowY: 'auto',
              scrollbarWidth: 'thin',
              '&::-webkit-scrollbar': { width: '0.2083vw' },
              '&::-webkit-scrollbar-track': { background: 'transparent' },
              '&::-webkit-scrollbar-thumb': { borderRadius: '3px' },
              scrollbarColor: '#5fb2e2ff transparent'
            }}>
            {/* Scrollable Images */}
            {selectedCard.pages.map((page, index) => (
              <Box key={index} sx={{ mb: '2vw' }}>
                <Box
                  component="img"
                  src={page.img}
                  alt={`Page ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '0.5vw',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            ))}
            </Box>
          </Box>
        </Box>
      )}

    </Box>
  );
}
