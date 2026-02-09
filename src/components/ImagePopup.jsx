import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import solution_img_2 from "../assets/solution_img_2.png";

export default function ImagePopup ({onClose}) {
    return (
        <Box
        sx={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
        }}>
            <Box
                sx={{
                mt: '1.667vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '50vw',
                boxSizing: 'border-box',
                py: '0.8333vw',
                px: '1.6667vw',
                position: 'relative',
                }}
            >
                <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    top: '-0.4167vw',
                    right: '-0.4167vw',
                    zIndex: 2500,
                    bgcolor: "rgba(1,0,37,0.85)",
                    color: "white",
                    border: "1px solid rgba(0,247,255,0.6)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
                    width: '2vw',
                    height: '2vw',
                    '& .MuiSvgIcon-root': { fontSize: '1.5vw' }
                    }}
                >
                <CloseIcon sx={{fontSize: '1.45vw'}}/>
                </IconButton>
                <Box
                component="img"
                src={solution_img_2}
                alt="Information"
                sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                }}
                />
            </Box>
        </Box>
    );
}
