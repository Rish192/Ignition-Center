import { useEffect, useState } from "react";
import { Box } from '@mui/material';
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

export default function FullScreenButton () {
    const [isFs, setIsFs] = useState(false);
    const [canUseFs, setCanUseFs] = useState(false);
    const [hovered, setHovered] = useState(false);

    const fullscreenElement = () =>
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        null;

    const fullscreenEnabled = () =>
        document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.msFullscreenEnabled ||
        false;

    const requestFsTarget = () =>
        document.documentElement ||
        document.getElementById("root") ||
        document.body;

    const requestFsFn = (el) =>
        el.requestFullscreen ||
        el.webkitRequestFullscreen ||
        el.msRequestFullscreen ||
        null;

    const exitFsFn = () =>
        document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen ||
        null;

    const isStandalonePWA = () => {
        return (
        (window.matchMedia &&
            window.matchMedia("(display-mode: standalone)").matches) ||
        (typeof navigator !== "undefined" &&
            "standalone" in navigator &&
            navigator.standalone)
        );
    };

    const canOfferFullscreen = () => {
        const el = requestFsTarget();
        return !!requestFsFn(el) && fullscreenEnabled() && !isStandalonePWA();
    };

    const enterFullscreen = async () => {
        const el = requestFsTarget();
        const req = requestFsFn(el);
        if (!req) return;

        try {
        await req.call(el, { navigationUI: "hide" });
        } catch (e) {}

        if (screen.orientation && screen.orientation.lock) {
        try {
            await screen.orientation.lock("landscape");
        } catch (e) {}
        }
    };

    const exitFullscreen = async () => {
        const exit = exitFsFn();
        if (!exit) return;

        try {
        await exit.call(document);
        } catch (e) {}

        if (screen.orientation && screen.orientation.unlock) {
        try {
            screen.orientation.unlock();
        } catch (e) {}
        }
    };

    useEffect(() => {
        setCanUseFs(canOfferFullscreen());

        const handleChange = () => setIsFs(!!fullscreenElement());

        document.addEventListener("fullscreenchange", handleChange);
        document.addEventListener("webkitfullscreenchange", handleChange);

        return () => {
        document.removeEventListener("fullscreenchange", handleChange);
        document.removeEventListener("webkitfullscreenchange", handleChange);
        };
    }, []);

    if (!canUseFs) return null;

    return (
    <>
        <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
            if (isFs) exitFullscreen();
            else enterFullscreen();
        }}
        style={{
            position: "fixed",
            bottom: "0.8333vw",
            right: "4.2vw",
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
        title={isFs ? "Exit Fullscreen" : "Fullscreen"}
        >
        {isFs ? (
            <FullscreenExitIcon style={{ color: "white", fontSize: "1.5vw" }} />
        ) : (
            <FullscreenIcon style={{ color: "white", fontSize: "1.5vw" }} />
        )}
        </button>
        {hovered && (
            <Box
                sx={{
                    position: "fixed",
                    bottom: "4vw",
                    right: "2vw",
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
                Fullscreen View
            </Box>
        )}
    </>
    )
}