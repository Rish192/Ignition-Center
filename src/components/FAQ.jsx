import React, {useEffect, useState} from 'react';
import {
    Box,
    Typography,
    IconButton,
    InputBase,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
} from '@mui/material';
import Frame from "./Frame";
import { Close } from "@mui/icons-material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import solution_underline_2 from '../assets/solution_underline_2.png';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import admin_icon from '../assets/admin_icon.png';

import {useSpeechSynthesis} from 'react-speech-kit';

export default function FAQ({onClose, onStepback, mode, setOverlay, setChangeView}) {
    
    const {speak, voices} = useSpeechSynthesis();
    const voiceIndex = 5;
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [frameSrc, setFrameSrc] = useState(null);

    const initialFaqs = [
        {
            question: "What is the Virtual Ignition Center?",
            answer: "The Virtual Ignition Center is a digital twin of the KPMG Insights Centers located in major cities around the world. We offer our clients the option to meet and collaborate in a 3-D digital space that provides the same secure environment and client experience excellence that are hallmarks of our physical centers.",
            isExpanded: false,
        },
        {
            question: "How can AI create impact for a business?",
            answer: "With KPMG AI Jumpstart, you can cut through the hype and begin building lasting AI capabilities that are designed to have an immediate and long-term impact on your operations by leveraging the power of AI. Explore some examples and client success stories here - ",
            linkText: "AI services",
            link: "https://kpmg.com/xx/en/what-we-do/services/ai/ai-services.html",
            isExpanded: false,
        },
        {
            question: "What AI capabilities can KPMG offer?",
            answer: "As an early mover, KPMG has gathered deep industry expertise and experience, which we make available through KPMG Workbench. KPMG Workbench is a multi-agent AI platform that can help you supercharge your business by combining advanced, trusted AI agents with expert insights of KPMG professionals - ",
            linkText: "KPMG Workbench",
            link: "https://kpmg.com/us/en/capabilities-services/ai/kpmg-workbench.html",
            isExpanded: false,
        },
        {
            question: "What are some practical real-world use cases?",
            answer: "As a recognized leader in providing AI solutions and services, KPMG has helped clients transform their businesses to become more resilient, cost efficient and competitive. Read about some real-life use cases from our clients here - ",
            linkText: "KPMG Client Stories",
            link: "https://kpmg.com/xx/en/what-we-do/services/kpmg-client-stories.html",
            isExpanded: false,
        },
        {
            question: "How do you think AI will develop in the future?",
            answer: "Find out more about what our global survey has uncovered about the future of AI in our 2025 global study - ",
            linkText: "Trust, attitudes and use of artificial intelligence: A global study 2025",
            link: "https://kpmg.com/xx/en/our-insights/ai-and-technology/trust-attitudes-and-use-of-ai.html",
            isExpanded: false,
        },
    ]

    const [faqs, setFaqs] = useState(initialFaqs);
    const [showFaqList, setShowFaqList] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);

    const normalizeText = (str) =>
        str.toLowerCase().replace(/[^\w\s]/g, "").trim();

    const handleSendMessage = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;

        // Try to match user message with any FAQ question
        const userNorm = normalizeText(trimmed);
        const matchedFaq = faqs.find((faq) => {
            const qNorm = normalizeText(faq.question);
            // exact match or contains (both directions) for a bit of flexibility
            return (
                qNorm === userNorm ||
                qNorm.includes(userNorm) ||
                userNorm.includes(qNorm)
            );
        });

        const botReply = matchedFaq
            ? matchedFaq.answer
            : "Hi! I am preparing to engage and will be live shortly.\n You may please explore the FAQs menu in the meantime.";

        // Always replace previous messages – keep only the latest Q&A
        const ts = Date.now();
        setMessages([
            { id: ts, sender: "user", text: trimmed },
            {
                id: ts + 1,
                sender: "bot",
                text: botReply,
            },
        ]);

        setInputValue("");
    };
    const handleToggle = (index) => {
        stopSpeech();
        setFaqs(prev => prev.map((faq, i) => ({
            ...faq,
            isExpanded: i === index ? !faq.isExpanded : false,
        })
        ))
    };
    const stopSpeech = () => {
        if(window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        setIsSpeaking(false);
        window.dispatchEvent(new Event("ic:aiStop"));
    };
    const handleSpeak = (text) => {
        if (!voices.length) return;
        stopSpeech();
        speak({ 
            text,
            voice: voices[voiceIndex],
            rate: 0.8,
        });
        setIsSpeaking(true);
        window.dispatchEvent(new Event("ic:aiTalk"));
    };
    
    // const handleClose = () => {
    //     stopSpeech();
    //     setVisible(false);
    //     setTimeout(() => {
    //         onClose();
    //     }, 500);
    // };
    // useEffect(() => {
    //     setVisible(true);
    // }, []);

    useEffect(() => {
        const handleHideFAQ = () => {
            // Stop any ongoing speech
            stopSpeech();
            // Tell parent to actually close/unmount this component
            if (onClose) {
                onClose();
            }
        };
        window.addEventListener("ic:hideFAQ", handleHideFAQ);
        return () => {
            window.removeEventListener("ic:hideFAQ", handleHideFAQ);
        };
    }, [onClose]);
    useEffect(() => {
        const interval = setInterval(() => {
            if (!window.speechSynthesis.speaking && isSpeaking) {
                setIsSpeaking(false);
                window.dispatchEvent(new Event("ic:aiStop"));
            }
        }, 200);
        return () => clearInterval(interval);
    }, [isSpeaking]);
    
    const handleLinkClick = (link) => {
        if (link) {
            console.log("Setting frame source to: ", link);
            setFrameSrc(link);
            setOverlay(null);
            setChangeView(null);
        }
    };

    return (
    <>
        {!frameSrc && (
        <>
            <Box sx={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '45%',
                height: '100%',
                overflow: 'hidden',
                background: 'linear-gradient(to left, rgba(0, 55, 89, 0.85), rgba(0,55,89,0))',
                zIndex: 2000,
            }}>
                {/* FAQ PANEL – same as earlier "faq" mode (right, full height) */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 1,
                    width: '34.89vw',
                    height: '100%',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                    px: '1.302vw',
                    py: '1.0417vw'
                }}>
                    <Box sx={{ border: '1px solid rgba(158,199,255,0.6)',
                        width: '100%',
                        height: 'fit-content',
                        background: 'linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(2,42,64,0.09))',
                        borderRadius: '12px',
                        backdropFilter: 'blur(46.46px)',
                        padding: '0.8333vw',
                        gap: '0.4167vw',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '-0.3vw'
                        }}>
                            <Typography sx={{
                                fontSize: '1.0417vw',
                                fontWeight: 'bold',
                                color: 'rgba(255,255,255,0.9)',
                                alignSelf: 'center'
                            }}>
                                {showFaqList ? "FAQs" : "Chat with me" }
                            </Typography>
                        </Box>

                        <img src={solution_underline_2} alt="underline_2" style={{ width: '100%' }} />

                        {!showFaqList && (
                            <Typography
                                sx={{
                                    mt: '0.35vw',
                                    mb: '0.4vw',
                                    fontSize: '0.8892vw',
                                    color: 'rgba(255,255,255,0.75)',
                                    fontWeight: 400,
                                }}
                            >
                                Browse commonly asked questions, type or voice out any query you have.
                            </Typography>
                        )}

                        {showFaqList ? (
                            <List sx={{
                                flexGrow: 1,
                                px: '0.8333vw',
                                py: '0.4167vw',
                                overflowY: 'auto',
                                '&::-webkit-scrollbar': { width: '0.2083vw' },
                                '&::-webkit-scrollbar-track': { background: 'transparent' },
                                '&::-webkit-scrollbar-thumb': { borderRadius: '3px' },
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#5fb2e2ff transparent'
                            }}>
                                {faqs.map((faq, index) => (
                                    <Box key={index} sx={{ mb: '0.8333vw', borderRadius: '15px', overflow: 'hidden' }}>
                                        <ListItemButton
                                            onClick={() => handleToggle(index)}
                                            sx={{
                                                bgcolor: 'rgba(0,45,103,0.6)',
                                                '&:hover': { 
                                                    bgcolor: 'rgba(1, 65, 149, 0.6)',
                                                    '& .MuiSvgIcon-root': {
                                                        transform: faq.isExpanded 
                                                        ? 'rotate(90deg) scale(1.2)' 
                                                        : 'rotate(0deg) scale(1.2)',
                                                    }
                                                },
                                            }}
                                        >
                                            <ListItemText
                                                primary={faq.question}
                                                primaryTypographyProps={{
                                                    variant: 'body2',
                                                    sx: { color: 'white', fontWeight: 600, fontSize: '0.9375vw' },
                                                }}
                                            />
                                            <KeyboardArrowRightIcon
                                                sx={{
                                                    color: 'white',
                                                    transform: faq.isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                                                    transition: 'transform 0.2s ease',
                                                    fontSize: '1.667vw',
                                                }}
                                            />
                                        </ListItemButton>
                                        <Collapse in={faq.isExpanded} timeout="auto" unmountOnExit>
                                            <Box sx={{ p: '0.8333vw', bgcolor: '#ffffff', position: 'relative' }}>
                                                <Typography variant="body2" sx={{ color: 'rgba(0,45,103,1)', fontSize: '0.8333vw' }}>
                                                    {faq.answer}
                                                    {faq.linkText && (
                                                        <Box
                                                            component="span"
                                                            onClick={() => handleLinkClick(faq.link)}
                                                            sx={{
                                                                color: '#0033cc',
                                                                textDecoration: 'underline',
                                                                cursor: 'pointer',
                                                                fontWeight: 'bold',
                                                                '&:hover': {
                                                                    color: '#3221af',
                                                                }
                                                            }}
                                                        >
                                                            {faq.linkText}
                                                        </Box>
                                                    )}
                                                </Typography>
                                                <IconButton
                                                    disableRipple
                                                    onClick={() => handleSpeak(faq.answer)} //+ (faq.linkText || "")
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        right: 0,
                                                        backgroundColor: 'transparent',
                                                        color: 'rgba(1,65,149,1)',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease',
                                                        '&: hover': {
                                                            transform: 'scale(1.1)'
                                                        }
                                                    }}>
                                                    <VolumeUpIcon sx={{ fontSize: '1.25vw' }} />
                                                </IconButton>
                                            </Box>
                                        </Collapse>
                                    </Box>
                                ))}
                            </List>
                        ) : (
                            <Box sx={{
                                flexGrow: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Box
                                    onClick={() => setShowFaqList(true)}
                                    sx={{
                                        width: '15vw',
                                        height: '6vh',
                                        borderRadius: '30px 8px 8px 30px',
                                        backgroundColor: 'rgba(0,45,103,0.6)',
                                        backdropFilter: 'blur(43.86px)',
                                        boxShadow: '0px 3.51px 3.51px rgba(0,0,0,0.25)',
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                >
                                    <Box sx={{
                                        width: '6vh',
                                        height: '6vh',
                                        border: '0.89px solid #66E4FF',
                                        background: 'rgba(0,72,179,0.49)',
                                        borderRadius: '50%',
                                        zIndex: 1,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <img src={admin_icon} alt="Admin" style={{ width: '1.25vw', height: '1.25vw' }} />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography sx={{ textAlign: 'center', color: 'white', fontSize: '1.0417vw' }}>
                                            FAQs
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
            <Box>
                <Box sx={{
                    position: 'absolute',
                    //top: '60vh',        // previously: mode !== 'faq'
                    bottom: '0vh',
                    left: '34vw',        // previously: mode !== 'faq'
                    zIndex: 2501,
                    width: '32vw',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                    px: '1.302vw',
                    //py: '1.0417vw'
                }}>
                    <Box sx={{
                        width: '100%',
                        height: '30vh', // smaller chat window height
                        borderRadius: '12px',
                        padding: '0.8333vw',
                        gap: '0.8333vw',
                        display: 'flex',
                        flexDirection: 'column',
                        alignSelf: 'center'
                    }}>
                        {/* Messages area with background */}
                        <Box sx={{
                            flex: 1,
                            borderRadius: '12px',
                            background: 'linear-gradient(to top, rgba(0,55,89,0.85) 0%, rgba(0,55,89,0.3) 20%, rgba(0,55,89,0.1) 50%, rgba(0,55,89,0.03) 100%)',
                            mb: '0.025vw',
                            p: '0.625vw',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            gap: '0.4167vw',
                            overflowY: 'auto',
                        }}>
                            {messages.map(msg => (
                                <Box
                                    key={msg.id}
                                    sx={{
                                        display: 'flex',
                                        alignSelf: msg.sender === "user" ? 'flex-start' : 'flex-end', 
                                        alignItems: 'center',
                                        width: msg.sender === "user" ? 'fit-content' : '70%',
                                        //mx: 'auto',
                                        borderRadius: '12px',
                                        backgroundColor: msg.sender === "user"
                                            ? 'linear-gradient(135deg,rgba(85, 51, 234, 0.69) 0%, rgba(38, 40, 180, 1) 60%), rgba(2, 89, 249, 0.9)'    
                                            : 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(24, 110, 157, 0.15) 60%), rgba(30, 103, 199, 0.31)',
                                        backdropFilter: 'blur(46.46px)',
                                        px: msg.sender === "user" ? '0.8333vw' : '0.625vw',
                                        py: '0.4167vw',
                                        whiteSpace: 'pre-line'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '0.8333vw',
                                            color: 'white',
                                        }}
                                    >
                                        {msg.text}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{
                            backgroundColor: 'rgba(14, 22, 40, 0.51)',
                            border: '0.5px solid white',
                            borderRadius: '15px',
                            height: '3.75vw',
                            boxSizing: 'border-box',
                            padding: '0.4167vw',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <InputBase
                                placeholder='Ask or search anything...'
                                sx={{
                                    flex: 1,
                                    fontSize: '0.9375vw',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginX: '0.8333vw',
                                    color: 'white',
                                    '& .MuiInputBase-input::placeholder': {
                                        color: '#D3D3D3',
                                        opacity: 1,
                                    }
                                }}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                            />
                            <IconButton 
                            disableRipple
                            onClick={handleSendMessage}
                            sx={{
                                borderRadius: '50%',
                                marginLeft: 'auto',
                                width: '2.6042vw', height: '2.6042vw',
                                backgroundColor: 'rgba(74,144,226,1)',
                                boxShadow: '0px 4px 8px rgba(73,73,73,0.25)',
                                transition: 'all 0.3s ease',
                                '&: hover': {
                                    transform: 'scale(1.08)'
                                }
                            }}>
                                <SendIcon sx={{ color: 'white', fontSize: '1.25vw' }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
        )}
        {frameSrc && (
            <Frame 
            src={frameSrc}
            minimizedWidth="90vw"
            maximizedWidth="90vw"
            minimizedHeight="83vh"
            maximizedHeight="83vh"
            top="50vh"
            left="50vw"
            showFullscreen={false}
            style={{
                position: "fixed", transform: "translate(-50%, -50%)",
                zIndex: 3200, boxSizing: 'border-box'
            }}
            onStateChange={({ isClosed, isMinimized }) => {
                if (isClosed) {
                setFrameSrc(null);
                setOverlay("aioptions");
                setChangeView("AI_A");
                }
            }}
            />
        )}
    </>
    )
}