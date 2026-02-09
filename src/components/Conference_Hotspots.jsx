import React, { useEffect, useMemo, useRef, useState } from "react";
import { Billboard, useCursor, Html } from "@react-three/drei";
import { Box } from '@mui/material';

export function Conference_Hotspots({
    id,
    position = [0, 0.02, 0],
    color = "#b32e1fff",
    size,
    onClick,
}) {

    return(
        <Html
        position={id === "temp1" ? [-37, 1.9, 4.25] : position} //-33,1.5,3.5
        transform={false}
        occlude={false}
        pointerEvents="auto"
        >
            <button
                // className="wp2d"
                onClick={(e) => {
                    e.stopPropagation();
                    onClick?.(e);
                }}
                style={{
                    ["--wp-color"]: color, 
                    width: id === "temp1" ? '8vw' : '11.5vw',
                    height: id === "temp1" ? '15vh' : '12vh',
                    zIndex: 10000,
                    cursor: 'pointer',
                    opacity: 0
                }}
            />
        </Html>
    )
}