import { useEffect, useState } from "react";
import StepBack from "../assets/StepBack.png";
import {Box} from '@mui/material';

export default function StepBackButton ({onClose}) {
    const [hovered, setHovered] = useState(false);
    const [autoShow, setAutoShow] = useState(true);

    useEffect(() => {
        setAutoShow(true);
        const timer = setTimeout(() => {
            setAutoShow(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    const shouldShowTooltip = hovered || autoShow;

    return (
    <>
        <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClose}
        style={{
            position: "fixed",
            bottom: "0.8333vw",
            right: "7.6vw",
            width: "2.6042vw",
            height: "2.6042vw",
            borderRadius: "50%",
            border: "1px solid #00F7FF",
            background: "rgba(1,0,37,0.5)",
            cursor: "pointer",
            zIndex: 3000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
            {/* <VideocamIcon style={{ color: "white", fontSize: "1.25vw", transform: "rotate(-90deg)" }} /> */}
            <img src={StepBack} style={{ width: "1.25vw", height: "1.25vw" }}/>
        </button>
        {shouldShowTooltip && (
            <Box
              sx={{
                position: "fixed",
                bottom: "4vw",
                right: "5.4vw",
                bgcolor: 'rgba(0,63,145,0.5)',
                border: '0.8px solid rgba(158,199,255,0.9)',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.35)',
                backdropFilter: 'blur(10px)',
                color: "white",
                padding: "0.5vw 1vw",
                borderRadius: "0.5vw",
                fontSize: "0.8333vw",
                zIndex: 3001,
              }}
            >
                Align to Zone View
            </Box>
        )}
    </>
    )
}