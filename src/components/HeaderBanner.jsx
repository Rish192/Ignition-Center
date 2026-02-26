import React from 'react';
import { Typography } from "@mui/material";

export default function HeaderBanner() {
  return (
    <div style={{
          position: 'fixed',
          top: 0,
          left: 0, right: 0,
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1002,
        }}>
          <div style={{
            background: 'linear-gradient(to right, rgba(0,51,141,1), rgba(0,94,184,1))',
            color: 'white',
            padding: '0.7812vw 5.208vw 0.7812vw 1.5625vw',
            borderRadius: '0px 0px 100px 0px',
          }}>
            <Typography variant="h6"
            sx={{
              fontWeight: 'bold', fontSize: '1.25vw',
            }}>
              KPMG Virtual Ignition Center
            </Typography>
          </div>
        </div>
  )
}