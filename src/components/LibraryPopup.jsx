import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import headerline from '../assets/header-line.png';

import AI_1 from "../assets/Library/LE_AI/KPMG Insights Center Credentials 25 by Topics.pdf - Page 3 of 89.png";
import AI_2 from "../assets/Library/LE_AI/KPMG Insights Center Credentials 25 by Topics.pdf - Page 4 of 89.png";
import AI_3 from "../assets/Library/LE_AI/KPMG Insights Center Credentials 25 by Topics.pdf - Page 5 of 89.png";
import AI_4 from "../assets/Library/LE_AI/KPMG Insights Center Credentials 25 by Topics.pdf - Page 6 of 89.png";
import AI_5 from "../assets/Library/LE_AI/KPMG Insights Center Credentials 25 by Topics.pdf - Page 7 of 89.png";
import AI_6 from "../assets/Library/LE_AI/KPMG Insights Center Credentials 25 by Topics.pdf - Page 8 of 89.png";
import AI_7 from "../assets/Library/LE_AI/KPMG Insights Center Credentials 25 by Topics.pdf - Page 9 of 89.png";
import AI_8 from "../assets/Library/LE_AI/KPMG Insights Center Credentials 25 by Topics.pdf - Page 10 of 89.png";
import AI_9 from "../assets/Library/LE_AI/KPMG Insights Center Credentials 25 by Topics.pdf - Page 11 of 89.png";
import AI_10 from "../assets/Library/LE_AI/KPMG Insights Center Credentials 25 by Topics.pdf - Page 12 of 89.png";
import AI_11 from "../assets/Library/LE_AI/KPMG Insights Center Credentials 25 by Topics.pdf - Page 13 of 89.png";
import AI_12 from "../assets/Library/LE_AI/KPMG Insights Center Credentials 25 by Topics.pdf - Page 14 of 89.png";
import AI_13 from "../assets/Library/LE_AI/KPMG Insights Center Credentials 25 by Topics.pdf - Page 15 of 89.png";
import AI_14 from "../assets/Library/LE_AI/KPMG Insights Center Credentials 25 by Topics.pdf - Page 16 of 89.png";
import AI_15 from "../assets/Library/LE_AI/KPMG Insights Center Credentials 25 by Topics.pdf - Page 17 of 89.png";
import Audit_1 from "../assets/Library/LE_Audit/KPMG Insights Center Credentials 25 by Topics.pdf - Page 18 of 89.png";
import Audit_2 from "../assets/Library/LE_Audit/KPMG Insights Center Credentials 25 by Topics.pdf - Page 19 of 89.png";
import Audit_3 from "../assets/Library/LE_Audit/KPMG Insights Center Credentials 25 by Topics.pdf - Page 20 of 89.png";
import Audit_4 from "../assets/Library/LE_Audit/KPMG Insights Center Credentials 25 by Topics.pdf - Page 21 of 89.png";
import Audit_5 from "../assets/Library/LE_Audit/KPMG Insights Center Credentials 25 by Topics.pdf - Page 22 of 89.png";
import CX_1 from "../assets/Library/LE_CX-UX/KPMG Insights Center Credentials 25 by Topics.pdf - Page 23 of 89.png";
import CX_2 from "../assets/Library/LE_CX-UX/KPMG Insights Center Credentials 25 by Topics.pdf - Page 24 of 89.png";
import CX_3 from "../assets/Library/LE_CX-UX/KPMG Insights Center Credentials 25 by Topics.pdf - Page 25 of 89.png";
import CX_4 from "../assets/Library/LE_CX-UX/KPMG Insights Center Credentials 25 by Topics.pdf - Page 26 of 89.png";
import CX_5 from "../assets/Library/LE_CX-UX/KPMG Insights Center Credentials 25 by Topics.pdf - Page 27 of 89.png";
import CX_6 from "../assets/Library/LE_CX-UX/KPMG Insights Center Credentials 25 by Topics.pdf - Page 28 of 89.png";
import Cyber_1 from "../assets/Library/LE_Cyber-Forensic/KPMG Insights Center Credentials 25 by Topics.pdf - Page 29 of 89.png";
import Cyber_2 from "../assets/Library/LE_Cyber-Forensic/KPMG Insights Center Credentials 25 by Topics.pdf - Page 30 of 89.png";
import Cyber_3 from "../assets/Library/LE_Cyber-Forensic/KPMG Insights Center Credentials 25 by Topics.pdf - Page 31 of 89.png";
import Cyber_4 from "../assets/Library/LE_Cyber-Forensic/KPMG Insights Center Credentials 25 by Topics.pdf - Page 32 of 89.png";
import Cyber_5 from "../assets/Library/LE_Cyber-Forensic/KPMG Insights Center Credentials 25 by Topics.pdf - Page 33 of 89.png";
import EmergingTech_1 from "../assets/Library/LE_EmergingTech/KPMG Insights Center Credentials 25 by Topics.pdf - Page 34 of 89.png";
import EmergingTech_2 from "../assets/Library/LE_EmergingTech/KPMG Insights Center Credentials 25 by Topics.pdf - Page 35 of 89.png";
import EmergingTech_3 from "../assets/Library/LE_EmergingTech/KPMG Insights Center Credentials 25 by Topics.pdf - Page 36 of 89.png";
import EmergingTech_4 from "../assets/Library/LE_EmergingTech/KPMG Insights Center Credentials 25 by Topics.pdf - Page 37 of 89.png";
import EmergingTech_5 from "../assets/Library/LE_EmergingTech/KPMG Insights Center Credentials 25 by Topics.pdf - Page 38 of 89.png";
import EmergingTech_6 from "../assets/Library/LE_EmergingTech/KPMG Insights Center Credentials 25 by Topics.pdf - Page 39 of 89.png";
import EmergingTech_7 from "../assets/Library/LE_EmergingTech/KPMG Insights Center Credentials 25 by Topics.pdf - Page 40 of 89.png";
import EmergingTech_8 from "../assets/Library/LE_EmergingTech/KPMG Insights Center Credentials 25 by Topics.pdf - Page 41 of 89.png";
import EmergingTech_9 from "../assets/Library/LE_EmergingTech/KPMG Insights Center Credentials 25 by Topics.pdf - Page 42 of 89.png";
import EmergingTech_10 from "../assets/Library/LE_EmergingTech/KPMG Insights Center Credentials 25 by Topics.pdf - Page 43 of 89.png";
import Finance_1 from "../assets/Library/LE_Finance/KPMG Insights Center Credentials 25 by Topics.pdf - Page 44 of 89.png";
import Finance_2 from "../assets/Library/LE_Finance/KPMG Insights Center Credentials 25 by Topics.pdf - Page 45 of 89.png";
import Finance_3 from "../assets/Library/LE_Finance/KPMG Insights Center Credentials 25 by Topics.pdf - Page 46 of 89.png";
import Finance_4 from "../assets/Library/LE_Finance/KPMG Insights Center Credentials 25 by Topics.pdf - Page 47 of 89.png";
import Finance_5 from "../assets/Library/LE_Finance/KPMG Insights Center Credentials 25 by Topics.pdf - Page 48 of 89.png";
import Finance_6 from "../assets/Library/LE_Finance/KPMG Insights Center Credentials 25 by Topics.pdf - Page 49 of 89.png";
import Finance_7 from "../assets/Library/LE_Finance/KPMG Insights Center Credentials 25 by Topics.pdf - Page 50 of 89.png";
import Finance_8 from "../assets/Library/LE_Finance/KPMG Insights Center Credentials 25 by Topics.pdf - Page 51 of 89.png";
import Finance_9 from "../assets/Library/LE_Finance/KPMG Insights Center Credentials 25 by Topics.pdf - Page 52 of 89.png";
import Finance_10 from "../assets/Library/LE_Finance/KPMG Insights Center Credentials 25 by Topics.pdf - Page 53 of 89.png";
import Finance_11 from "../assets/Library/LE_Finance/KPMG Insights Center Credentials 25 by Topics.pdf - Page 54 of 89.png";
import Finance_12 from "../assets/Library/LE_Finance/KPMG Insights Center Credentials 25 by Topics.pdf - Page 55 of 89.png";
import Finance_13 from "../assets/Library/LE_Finance/KPMG Insights Center Credentials 25 by Topics.pdf - Page 56 of 89.png";
import Finance_14 from "../assets/Library/LE_Finance/KPMG Insights Center Credentials 25 by Topics.pdf - Page 57 of 89.png";
import Finance_15 from "../assets/Library/LE_Finance/KPMG Insights Center Credentials 25 by Topics.pdf - Page 58 of 89.png";
import Finance_16 from "../assets/Library/LE_Finance/KPMG Insights Center Credentials 25 by Topics.pdf - Page 59 of 89.png";
import GRC_1 from "../assets/Library/LE_GRC/KPMG Insights Center Credentials 25 by Topics.pdf - Page 60 of 89.png";
import GRC_2 from "../assets/Library/LE_GRC/KPMG Insights Center Credentials 25 by Topics.pdf - Page 61 of 89.png";
import GRC_3 from "../assets/Library/LE_GRC/KPMG Insights Center Credentials 25 by Topics.pdf - Page 62 of 89.png";
import GRC_4 from "../assets/Library/LE_GRC/KPMG Insights Center Credentials 25 by Topics.pdf - Page 63 of 89.png";
import HR_1 from "../assets/Library/LE_HR/KPMG Insights Center Credentials 25 by Topics.pdf - Page 64 of 89.png";
import HR_2 from "../assets/Library/LE_HR/KPMG Insights Center Credentials 25 by Topics.pdf - Page 65 of 89.png";
import HR_3 from "../assets/Library/LE_HR/KPMG Insights Center Credentials 25 by Topics.pdf - Page 66 of 89.png";
import Strategy_1 from "../assets/Library/LE_Strategy/KPMG Insights Center Credentials 25 by Topics.pdf - Page 67 of 89.png";
import Strategy_2 from "../assets/Library/LE_Strategy/KPMG Insights Center Credentials 25 by Topics.pdf - Page 68 of 89.png";
import Strategy_3 from "../assets/Library/LE_Strategy/KPMG Insights Center Credentials 25 by Topics.pdf - Page 69 of 89.png";
import Strategy_4 from "../assets/Library/LE_Strategy/KPMG Insights Center Credentials 25 by Topics.pdf - Page 70 of 89.png";
import Strategy_5 from "../assets/Library/LE_Strategy/KPMG Insights Center Credentials 25 by Topics.pdf - Page 71 of 89.png";
import Strategy_6 from "../assets/Library/LE_Strategy/KPMG Insights Center Credentials 25 by Topics.pdf - Page 72 of 89.png";
import Strategy_7 from "../assets/Library/LE_Strategy/KPMG Insights Center Credentials 25 by Topics.pdf - Page 73 of 89.png";
import Strategy_8 from "../assets/Library/LE_Strategy/KPMG Insights Center Credentials 25 by Topics.pdf - Page 74 of 89.png";
import Strategy_9 from "../assets/Library/LE_Strategy/KPMG Insights Center Credentials 25 by Topics.pdf - Page 75 of 89.png";
import Strategy_10 from "../assets/Library/LE_Strategy/KPMG Insights Center Credentials 25 by Topics.pdf - Page 76 of 89.png";
import Strategy_11 from "../assets/Library/LE_Strategy/KPMG Insights Center Credentials 25 by Topics.pdf - Page 77 of 89.png";
import Strategy_12 from "../assets/Library/LE_Strategy/KPMG Insights Center Credentials 25 by Topics.pdf - Page 78 of 89.png";
import Strategy_13 from "../assets/Library/LE_Strategy/KPMG Insights Center Credentials 25 by Topics.pdf - Page 79 of 89.png";
import Strategy_14 from "../assets/Library/LE_Strategy/KPMG Insights Center Credentials 25 by Topics.pdf - Page 80 of 89.png";
import Strategy_15 from "../assets/Library/LE_Strategy/KPMG Insights Center Credentials 25 by Topics.pdf - Page 81 of 89.png";
import Tax_1 from "../assets/Library/LE_Tax/KPMG Insights Center Credentials 25 by Topics.pdf - Page 82 of 89.png";
import Tax_2 from "../assets/Library/LE_Tax/KPMG Insights Center Credentials 25 by Topics.pdf - Page 83 of 89.png";
import Tax_3 from "../assets/Library/LE_Tax/KPMG Insights Center Credentials 25 by Topics.pdf - Page 84 of 89.png";
import Tax_4 from "../assets/Library/LE_Tax/KPMG Insights Center Credentials 25 by Topics.pdf - Page 85 of 89.png";
import Tax_5 from "../assets/Library/LE_Tax/KPMG Insights Center Credentials 25 by Topics.pdf - Page 86 of 89.png";
import Tax_6 from "../assets/Library/LE_Tax/KPMG Insights Center Credentials 25 by Topics.pdf - Page 87 of 89.png";
import Tax_7 from "../assets/Library/LE_Tax/KPMG Insights Center Credentials 25 by Topics.pdf - Page 88 of 89.png";
import Tax_8 from "../assets/Library/LE_Tax/KPMG Insights Center Credentials 25 by Topics.pdf - Page 89 of 89.png";
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

const LIBRARY_THUMBS = {
  HS_R: Audit_1,
  HS_S: Tax_1,
  HS_T: Strategy_1,
  HS_U: Finance_1,
  HS_V: Cyber_1,
  HS_W: AI_1,
  HS_X: CX_1,
  HS_Y: HR_1,
  HS_Z: EmergingTech_1,
  HS_AA: GRC_1,
};

const LIBRARY_IMAGES = {
  HS_R: [Audit_1, Audit_2, Audit_3, Audit_4, Audit_5],
  HS_S: [Tax_1, Tax_2, Tax_3, Tax_4, Tax_5, Tax_6, Tax_7, Tax_8],
  HS_T: [Strategy_1, Strategy_2, Strategy_3, Strategy_4, Strategy_5, Strategy_6, Strategy_7, Strategy_8, Strategy_9, Strategy_10, Strategy_11, Strategy_12, Strategy_13, Strategy_14, Strategy_15],
  HS_U: [Finance_1, Finance_2, Finance_3, Finance_4, Finance_5, Finance_6, Finance_7, Finance_8, Finance_9, Finance_10, Finance_11, Finance_12, Finance_13, Finance_14, Finance_15, Finance_16],
  HS_V: [Cyber_1, Cyber_2, Cyber_3, Cyber_4, Cyber_5],
  HS_W: [AI_1, AI_2, AI_3, AI_4, AI_5, AI_6, AI_7, AI_8, AI_9, AI_10, AI_11, AI_12, AI_13, AI_14, AI_15],
  HS_X: [CX_1, CX_2, CX_3, CX_4, CX_5, CX_6],
  HS_Y: [HR_1, HR_2, HR_3],
  HS_Z: [EmergingTech_1, EmergingTech_2, EmergingTech_3, EmergingTech_4, EmergingTech_5, EmergingTech_6, EmergingTech_7, EmergingTech_8, EmergingTech_9, EmergingTech_10],
  HS_AA: [GRC_1, GRC_2, GRC_3, GRC_4],
};

const LIBRARY_LABELS = {
  HS_R: "Audit",
  HS_S: "Tax",
  HS_T: "Strategy",
  HS_U: "Finance",
  HS_V: "Cyber/Forensic",
  HS_W: "AI",
  HS_X: "CX/UX",
  HS_Y: "HR",
  HS_Z: "Emerging Tech",
  HS_AA: "GRC",
};

const LIBRARY_RIGHT_RACK_THUMBS = {
  HS_AD: MQ_1,
  HS_AE: Forrester_01
};
const LIBRARY_RIGHT_RACK_IMAGES = {
  HS_AD: [MQ_1, MQ_2, MQ_3, MQ_4, MQ_5, MQ_6, MQ_7, MQ_8, MQ_9, MQ_10, MQ_11, MQ_12, MQ_13, MQ_14, MQ_15, MQ_16, MQ_17, MQ_18, MQ_19, MQ_20, 
    MQ_21, MQ_22, MQ_23, MQ_24, MQ_25, MQ_26, MQ_27, MQ_28, MQ_29, MQ_30, MQ_31, MQ_32, MQ_33, MQ_34, MQ_35, MQ_36, MQ_37, MQ_38, MQ_39, MQ_40, MQ_41, MQ_42, MQ_43, MQ_44],
  HS_AE: [Forrester_01, Forrester_02, Forrester_03, Forrester_04, Forrester_05]
};
const LIBRARY_RIGHT_RACK_LABELS = {
  HS_AD: "Magic Quadrant",
  HS_AE: "Forrester Wave"
}

export default function LibraryPopup({
  activeHotspot,
  setActiveHotspot,
  impactStories,
  onClose,
}) {

  const [imgIndex, setImgIndex] = useState(0);
  const [isFull, setIsFull] = useState(false);
  useEffect(() => {
    setImgIndex(0);
  }, [activeHotspot]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      {/* POPUP CARD */}
      {!isFull && (
      <Box
        sx={{
          width: '95vw',
          height: "79%",
          //bgcolor: 'rgba(13,23,65,0.5)',
          backgroundColor: 'rgba(0,63,145,0.31)',
          border: '1px solid rgba(13,23,65,1)',
          //borderRadius: "12px",
          display: "flex",
          position: "relative",
          boxShadow: 3,
        }}
      >
        {/* CLOSE BUTTON */}
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
              transform: 'scale(1.1)'
            },
            width: '2vw',
            height: '2vw',
          }}
        >
          <CloseIcon sx={{ fontSize: '1.25vw' }} />
        </IconButton>
        {/* FULLSCREEN BUTTON */}
        <IconButton
        onClick={() => setIsFull(true)}
        sx={{
          position: 'absolute',
          top: '-2.2vw',
          right: '2.2vw',
          zIndex: 10,
          bgcolor: "rgba(1,0,37,0.85)",
          color: "white",
          border: "1.14px solid rgba(158,199,255,0.6)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          transition: 'all 0.2s ease',
          '&:hover': { 
            bgcolor: 'rgba(0,0,0,0.55)',
            transform: 'scale(1.1)'
          },
          width: '2vw',
          height: '2vw',
        }}>
            <FullscreenIcon sx={{fontSize: '1.25vw'}} />
        </IconButton>

        {/* LEFT — HOTSPOT LIST */}
        <Box sx={{
            flex: 0.2,
            //width: '18%',
            backgroundColor: 'rgba(13,23,65,1)',
            //backgroundColor: 'rgba(0,63,145,0.5)',
            display: "flex",
            flexDirection: "column",
            alignItems: 'center',
            p: '0.8333vw',
            paddingTop: '1.25vw',
            gap: '1.5vw',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': { width: '0.2083vw' },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': { borderRadius: '3px' },
            scrollbarColor: '#5fb2e2ff transparent'
        }}>
            {impactStories ? (
            <>
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2083vw'}}>
                <img src={headerline} style={{width: '3vw'}}/>
                <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
                  Practice Areas
                </Typography>
                <img src={headerline} style={{transform: 'scaleX(-1)', width: '3vw'}}/>
              </Box>
              {Object.keys(LIBRARY_LABELS).map((hsId) => {
                  const selected = hsId === activeHotspot;
                  return (
                      <Box
                        key={hsId}
                        onClick={() => setActiveHotspot(hsId)}
                        sx={{
                          width: '100%',
                          borderRadius: '10px',
                          border: selected ? "0.5px solid white" : 'none',
                          boxSizing: 'border-box',
                          padding: '0.8333vw 0vw',
                          cursor: 'pointer',
                          backgroundImage: "linear-gradient(to top right, rgba(24,145,246,0.17), rgba(255,255,255,0))",
                          backgroundColor: "rgba(255,255,255,0.05)",
                          backgroundBlendMode: "overlay",
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.4167vw',
                          transition: 'all 0.2s ease',
                          "&:hover": {
                              // backgroundColor: "#004f85",
                              transform: 'scale(1.04)'
                          },
                        }}
                      >
                          <Box 
                            component="img"
                            src={LIBRARY_THUMBS[hsId]}
                            sx={{
                              width: '90%',
                              // borderRadius: '6px',
                              objectFit: "cover",
                              // marginTop: '-2vh',
                            }}
                          />
                      </Box>
                  )
              })}
            </>
            ) : (
            <>
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4167vw', }}>
                <img src={headerline} style={{width: '3vw'}}/>
                <Typography sx={{color: 'white', fontSize: '1.25vw', fontWeight: 'bold', textAlign: 'center'}}>
                  Rankings
                </Typography>
                <img src={headerline} style={{transform: 'scaleX(-1)', width: '3vw'}}/>
              </Box>
              {Object.keys(LIBRARY_RIGHT_RACK_LABELS).map((hsId) => {
                  const selected = hsId === activeHotspot;
                  return (
                      <Box
                        key={hsId}
                        onClick={() => setActiveHotspot(hsId)}
                        sx={{
                          width: '100%',
                          borderRadius: '10px',
                          border: selected ? "0.5px solid white" : 'none',
                          boxSizing: 'border-box',
                          padding: '0.8333vw 0vw',
                          cursor: 'pointer',
                          backgroundImage: "linear-gradient(to top right, rgba(24,145,246,0.17), rgba(255,255,255,0))",
                          backgroundColor: "rgba(255,255,255,0.05)",
                          backgroundBlendMode: "overlay",
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.625vw',
                          transition: '0.2s',
                        }}
                      >
                          <Box 
                            component="img"
                            src={LIBRARY_RIGHT_RACK_THUMBS[hsId]}
                            sx={{
                              width: '90%',
                              objectFit: "cover",
                            }}
                          />
                          <Typography sx={{
                            fontSize: '1.0417vw',
                            fontWeight: 700,
                            textAlign: 'center',
                            color: 'white',
                        }}>
                            {LIBRARY_RIGHT_RACK_LABELS[hsId]}
                        </Typography>
                      </Box>
                  )
              })}
            </>
            )}
        </Box>

        {/* RIGHT — IMAGE */}
        <Box
        sx={{
            flex: 0.8,
            //width: "82%",
            p: '0.8333vw 0.4167vw',
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: '0.4167vw',
            position: "relative",
            boxSizing: 'border-box',
        }}
        >
            <IconButton
                onClick={() =>
                setImgIndex((prev) =>
                    prev === 0 ? LIBRARY_IMAGES[activeHotspot].length - 1 : prev - 1
                )
                }
                sx={{
                // position: "absolute",
                // left: '0vw',
                // top: "50%",
                // transform: "translateY(-50%)",
                bgcolor: "rgba(1,0,37,0.85)",
                color: "white",
                border: "1.14px solid rgba(158,199,255,0.6)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                transition: 'all 0.2s ease',
                '&:hover': { 
                  bgcolor: 'rgba(0,0,0,0.55)',
                  transform: 'scale(1.1)'
                },
                }}
            >
                <KeyboardArrowLeftIcon sx={{fontSize: '1.5vw'}} />
            </IconButton>

            <Box
                component="img"
                src={LIBRARY_IMAGES[activeHotspot][imgIndex]}
                alt=""
                sx={{ 
                  width: "auto", height: "100%", 
                  objectFit: "contain" }}
            />

            <IconButton
              onClick={() =>
              setImgIndex((prev) =>
                  prev === LIBRARY_IMAGES[activeHotspot].length - 1 ? 0 : prev + 1
              )
              }
              sx={{
              // position: "absolute",
              // right: '0vw',
              // top: "50%",
              // transform: "translateY(-50%)",
              bgcolor: "rgba(1,0,37,0.85)",
              color: "white",
              border: "1.14px solid rgba(158,199,255,0.6)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
              transition: 'all 0.2s ease',
                '&:hover': { 
                  bgcolor: 'rgba(0,0,0,0.55)',
                  transform: 'scale(1.1)'
                },
              }}
            >
                <KeyboardArrowRightIcon sx={{fontSize: '1.5vw'}} />
            </IconButton>
        </Box>
      </Box>
      )}

      {isFull && (
        <Box sx={{
            width: impactStories ? '90%' : '80vw',
            //width: '90%',
            height: '85%',
            padding: '0.5vw 0vw',
            boxSizing: 'border-box',
            bgcolor: 'rgba(13,23,65,0.5)',
            zIndex: 2000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: 'relative',
            //overflow: 'hidden'
        }}>
            {/* CLOSE (FullscreenExit) */}
            <IconButton
            onClick={() => setIsFull(false)}
            sx={{
              position: 'absolute',
              top: '-2.7vw',
              right: '0vw',
              zIndex: 1,
              bgcolor: "rgba(1,0,37,0.85)",
              color: "white",
              border: "1.14px solid rgba(158,199,255,0.6)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
              '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
              width: '2.5vw',
              height: '2.5vw',
            }}
            >
            <FullscreenExitIcon sx={{ fontSize: "1.8vw" }} />
            </IconButton>
            {impactStories ? (
            <>
            {/* LEFT ARROW */}
              <IconButton
              onClick={() => setImgIndex((prev) =>
                  prev === 0
                      ? LIBRARY_IMAGES[activeHotspot].length - 1
                      : prev - 1
                  )
              }
              sx={{
                  position: "absolute",
                  left: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(1,0,37,0.85)",
                  color: "white",
                  border: "1.14px solid rgba(158,199,255,0.6)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
              }}
              >
              <KeyboardArrowLeftIcon sx={{ fontSize: "2vw" }} />
              </IconButton>
              {/* IMAGE */}
              <Box
              component="img"
              src={LIBRARY_IMAGES[activeHotspot][imgIndex]}
              sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
              }}
              />
              {/* RIGHT ARROW */}
              <IconButton
              onClick={() => setImgIndex((prev) =>
                  prev === LIBRARY_IMAGES[activeHotspot].length - 1
                      ? 0
                      : prev + 1
                  )
              }
              sx={{
                  position: "absolute",
                  right: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(1,0,37,0.85)",
                  color: "white",
                  border: "1.14px solid rgba(158,199,255,0.6)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
              }}
              >
              <KeyboardArrowRightIcon sx={{ fontSize: "2vw" }} />
              </IconButton>
            </>
            ) : (
            // <>
            //   <IconButton
            //   onClick={() => setImgIndex((prev) =>
            //       prev === 0
            //           ? LIBRARY_RIGHT_RACK_IMAGES[activeHotspot].length - 1
            //           : prev - 1
            //       )
            //   }
            //   sx={{
            //       position: "absolute",
            //       left: 20,
            //       top: "50%",
            //       transform: "translateY(-50%)",
            //       bgcolor: "rgba(1,0,37,0.85)",
            //       color: "white",
            //       border: "1.14px solid rgba(158,199,255,0.6)",
            //       boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
            //       '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
            //   }}
            //   >
            //   <KeyboardArrowLeftIcon sx={{ fontSize: "2vw" }} />
            //   </IconButton>
            //   <Box
            //   component="img"
            //   src={LIBRARY_RIGHT_RACK_IMAGES[activeHotspot][imgIndex]}
            //   sx={{
            //       width: "100%",
            //       height: "100%",
            //       objectFit: "contain",
            //   }}
            //   />
            //   <IconButton
            //   onClick={() => setImgIndex((prev) =>
            //       prev === LIBRARY_RIGHT_RACK_IMAGES[activeHotspot].length - 1
            //           ? 0
            //           : prev + 1
            //       )
            //   }
            //   sx={{
            //       position: "absolute",
            //       right: 20,
            //       top: "50%",
            //       transform: "translateY(-50%)",
            //       bgcolor: "rgba(1,0,37,0.85)",
            //       color: "white",
            //       border: "1.14px solid rgba(158,199,255,0.6)",
            //       boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
            //       '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
            //   }}
            //   >
            //   <KeyboardArrowRightIcon sx={{ fontSize: "2vw" }} />
            //   </IconButton>
            // </>
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
              {LIBRARY_RIGHT_RACK_IMAGES[activeHotspot].map((img, index) => (
                  <Box key={index} sx={{ mb: "2vw", }}>
                      <Box
                          component="img"
                          src={img}
                          alt={`Image ${index + 1}`}
                          sx={{
                              width: "100%",
                              height: "auto",
                              objectFit: "contain",
                              borderRadius: "0.5vw",
                          }}
                      />
                  </Box>
              ))}
            </Box>
            )}
        </Box>
      )}
    </Box>
  );
}
