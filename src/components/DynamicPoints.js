
export const SPAWN_POS = { x: -26, y: 0, z: 24.5 };
export const SPAWN_LOOK_AT = {x: -25.5, y: 1.8, z: 0 };

export const BUSINESSWOMAN_POS = {x: -17.8, y: 0.05, z: 2.7, rotationY: -65};

export const HOTSPOTS = [
    { id: "HS_A", label: "Hotspot A", position: [-18.5, 1.5, 2.8], lookAt: { x: 72.085, y: 1.5, z: -32.3 }, waypoint: 'D' }, //AI hotspots (D) - Avatar
    { id: "HS_B", label: "Hotspot B", position: [-18, 2.6, -3.9], lookAt: { x: 0, y: 1.5, z: -1.7 }, waypoint: 'D' }, //AI hotspots (D) - AI Links
    // { id: "HS_C", label: "Hotspot C", position: [-31.95, 1.46, 2], lookAt: { x: -33.0, y: 1.8, z: 3.0 }, waypoint: 'D' }, //desk hotspots (D)
    { id: "HS_D", label: "Hotspot D", position: [-17, 1.45, 11.65], lookAt: { x: 0, y: 0, z: 13 }, waypoint: 'C' }, //Lobby hotspots (C)
    { id: "HS_P", label: "Hotspot P", position: [-15, 1.45, 10.5], lookAt: { x: 0, y: 0, z: 13 }, waypoint: 'C' }, //Lobby hotspots (C)
    { id: "HS_Q", label: "Hotspot Q", position: [-18.1, 1.2, 8.5], lookAt: { x: 0, y: 0, z: 13 }, waypoint: 'C' }, //Lobby hotspots (C)
    // { id: "HS_E", label: "Hotspot E", position: [-17.5, 0.5, 9], lookAt: { x: 0, y: 0, z: 13 }, waypoint: 'C' }, //Lobby hotspots (C)
    { id: "HS_F", label: "Hotspot F", position: [-290, 14, -275], lookAt: { x: -85.818, y: -0.299, z: -81.235 }, waypoint: 'A' }, //Solution hotspots (A) - Globe
    { id: "HS_SZ1", label: "Hotspot SZ1", position: [-45, 3.8, -0.8], lookAt: { x: -126, y: 5.797, z: -15.54 }, waypoint: 'A' }, //Solution hotspots (A) - Screen
    // { id: "HS_SZ2", label: "Hotspot SZ2", position: [-120, 28, -275], lookAt: { x: -74.872, y: 0, z: -89.202 }, waypoint: 'A' }, //SZ - Digital Gateway
    // { id: "HS_SZ3", label: "Hotspot SZ3", position: [-220, -14, -275], lookAt: { x: -74.872, y: 0, z: -89.202 }, waypoint: 'A' }, //SZ - Velocity
    // { id: "HS_SZ4", label: "Hotspot SZ4", position: [-120, -14, -275], lookAt: { x: -74.872, y: 0, z: -89.202 }, waypoint: 'A' }, 
    // { id: "HS_G", label: "Hotspot G", position: [-250, -30, -150], lookAt: { x: -25, y: 1.5, z: -8.5 }, waypoint: 'A' }, //Solution hotspots (A) 
    // { id: "HS_H", label: "Hotspot H", position: [-125, -19, -175], lookAt: { x: -15, y: 1.5, z: 50 }, waypoint: 'A' }, //Solution hotspots (A)
    // { id: "HS_I", label: "Hotspot I", position: [-121, -28, -185], lookAt: { x: -25, y: 1.5, z: -8.5 }, waypoint: 'A' }, //Solution hotspots (A) [solution_popup1]
    { id: "HS_J", label: "Hotspot J", position: [-40, 5.5, 18.8], lookAt: { x: -127.444, y: 2.584, z: -0.608 }, waypoint: 'B' }, //Impact Wall hotspots (B)
    // { id: "HS_K", label: "Hotspot K", position: [-38, 3.3, 5.5], lookAt: { x: -85, y: 1.8, z: 5 }, waypoint: 'B' }, //Impact Wall hotspots (B)
    // { id: "HS_L", label: "Hotspot L", position: [-38, 0.5, 16], lookAt: { x: -85, y: 1.8, z: 5 }, waypoint: 'B' }, //Impact Wall hotspots (B)
    // { id: "HS_M", label: "Hotspot M", position: [-38, 0.4, 5.5], lookAt: { x: -85, y: 1.8, z: 5 }, waypoint: 'B' }, //Impact Wall hotspots (B)
    { id: "HS_N", label: "Hotspot N", position: [-74, 3, -5.9], lookAt: { x: -51, y: 1.8, z: -2.0 }, waypoint: 'F' }, //Engagement hotspots (F)
    { id: "HS_O", label: "Hotspot O", position: [-19, 3.5, -25], lookAt: { x: -15, y: 1.5, z: -17 }, waypoint: 'E' }, //Breakout hotspots (E)
    { id: "HS_R", label: "Hotspot R", position: [-35.52, 0.7, 7.6], lookAt: { x: -16.5, y: 1.8, z: -86 }, waypoint: 'G' }, //Library hotspots (G) - Audit
    { id: "HS_S", label: "Hotspot S", position: [-38.72, 0.9, 7.6], lookAt: { x: -16.5, y: 1.8, z: -86 }, waypoint: 'G' }, //Library hotspots (G) - Tax
    { id: "HS_T", label: "Hotspot T", position: [-38.72, 1.8, 7.6], lookAt: { x: -16.5, y: 1.8, z: -86 }, waypoint: 'G' }, //Library hotspots (G) - Strategy
    { id: "HS_U", label: "Hotspot U", position: [-37.3, 0.8, 7.6], lookAt: { x: -16.5, y: 1.8, z: -86 }, waypoint: 'G' }, //Library hotspots (G) - Finance
    { id: "HS_V", label: "Hotspot V", position: [-33.89, 1.25, 7.6], lookAt: { x: -16.5, y: 1.8, z: -86 }, waypoint: 'G' }, //Library hotspots (G) - Cyber Forensic
    { id: "HS_W", label: "Hotspot W", position: [-33.88, 1.85, 7.6], lookAt: { x: -16.5, y: 1.8, z: -86 }, waypoint: 'G' }, //Library hotspots (G) - AI
    { id: "HS_X", label: "Hotspot X", position: [-37.67, 0.81, 7.6], lookAt: { x: -16.5, y: 1.8, z: -86 }, waypoint: 'G' }, //Library hotspots (G) - CI/UX
    { id: "HS_Y", label: "Hotspot Y", position: [-35.14, 1.9, 7.6], lookAt: { x: -16.5, y: 1.8, z: -86 }, waypoint: 'G' }, //Library hotspots (G) - HR
    { id: "HS_Z", label: "Hotspot Z", position: [-36.1, 2.4, 7.6], lookAt: { x: -16.5, y: 1.8, z: -86 }, waypoint: 'G' }, //Library hotspots (G) - Emerging Tech
    { id: "HS_AA", label: "Hotspot AA", position: [-37.75, 2.3, 7.6], lookAt: { x: -16.5, y: 1.8, z: -86 }, waypoint: 'G' }, //Library hotspots (G) - GRC
    // { id: "HS_AB", label: "Hotspot AB", position: [-37.2, 2, 7.6], lookAt: { x: -16.5, y: 1.8, z: -86 }, waypoint: 'G' }, //Library hotspots (G) - Impact Stories
    { id: "HS_AC", label: "Hotspot AC", position: [-33.3, 1.73, 11.223], lookAt: { x: 62.985, y: 1.8, z: 19.661 }, waypoint: 'G' }, //Library hotspots (G) - Right Shelf
    { id: "HS_AD", label: "Hotspot AD", position: [-33, 1.5, 12.05], lookAt: { x: 62.985, y: 1.8, z: 19.661 }, waypoint: 'G' }, //Library hotspots (G) - Right Shelf
    { id: "HS_AE", label: "Hotspot AE", position: [-33.4, 1.5, 12.823], lookAt: { x: 62.985, y: 1.8, z: 19.661 }, waypoint: 'G' }, //Library hotspots (G) - Right Shelf
    { id: "HS_AF", label: "Hotspot AF", position: [-33, 1.75, 13.734], lookAt: { x: 62.985, y: 1.8, z: 19.661 }, waypoint: 'G' }, //Library hotspots (G) - Right Shelf
    { id: "HS_G_START", label: "Open Library", position: [-37.85, 1.92, 10.2], lookAt: { x: -16.5, y: 1.8, z: -86 }, waypoint: 'G' },
    { id: "HS_G_RIGHT", label: "Open Library", position: [-37.2, 1.92, 15.33], lookAt: { x: 62.985, y: 1.8, z: 19.661 }, waypoint: 'G' },
];

export const HOTSPOT_SPAWN_OVERRIDES = {
    HS_A: {x: -20.471, y: -0.2, z: 3.809},
    HS_B: {x: -22.3, y: 0, z: -1.5},
    HS_C: {x: -27, y: 0, z: 7.5},
    HS_D: {x: -23.5, y: -0.2, z: 10},
    HS_P: {x: -23.5, y: -0.2, z: 10},
    HS_Q: {x: -23.5, y: -0.2, z: 10},
    HS_E: {x: -23.5, y: -0.2, z: 10},
    HS_F: {x: -24.130, y: 0, z: -2.541},
    HS_SZ1:{x: -26.977, y: 0, z: -2.252 },
    HS_SZ2:{x: -24.672, y: 0, z: -2.716 },
    HS_SZ3:{x: -24.672, y: 0, z: -2.716 }, 
    HS_SZ4:{x: -24.672, y: 0, z: -2.716 },
    HS_G: {x: -31, y: 0, z: -1.5 },
    HS_H: {x: -28, y: 0, z: -8 },
    HS_I: {x: -26, y: 0, z: -2 },
    HS_J: {x: -28.383, y: 0.25, z: 12.293 },
    HS_K: {x: -28.3, y: 0.5, z: 12.4 },
    HS_L: {x: -28.3, y: 0.5, z: 12.4 },
    HS_M: {x: -28.3, y: 0.5, z: 12.4 },
    HS_N: {x: -27, y: 0, z: 5.25},
    HS_O: {x: -22.5, y: 0, z: -1 },
    HS_R: { x: -37.3, y: 0, z: 11.1 },
    HS_S: { x: -37.3, y: 0, z: 11.1 },
    HS_T: { x: -37.3, y: 0, z: 11.1 },
    HS_U: { x: -37.3, y: 0, z: 11.1 },
    HS_V: { x: -37.3, y: 0, z: 11.1 },
    HS_W: { x: -37.3, y: 0, z: 11.1 },
    HS_X: { x: -37.3, y: 0, z: 11.1 },
    HS_Y: { x: -37.3, y: 0, z: 11.1 },
    HS_Z: { x: -37.3, y: 0, z: 11.1 },
    HS_AA: { x: -37.3, y: 0, z: 11.1 },
    HS_AB: { x: -37.3, y: 0, z: 11.1 },
    HS_AC: { x: -36.723, y: 0, z: 12.052 },
    HS_AD: { x: -36.723, y: 0, z: 12.052 },
    HS_AE: { x: -36.723, y: 0, z: 12.052 },
    HS_AF: { x: -36.723, y: 0, z: 12.052 },
    HS_G_START: { x: -37.3, y: 0, z: 11.1 },
    HS_G_RIGHT: { x: -36.723, y: 0, z: 12.052 }
};

export const AI_CAMERA_VIEWS = {
    main: {
        spawn: {x: -20.471, y: -0.2, z: 3.809},
        lookAt: {x: 72.085, y: 1.5, z: -32.3},
    },
    alt: {
        spawn: {x: -22.3, y: 0, z: -1.5},
        lookAt: {x: 0, y: 1.5, z: -1.7},
    },
};

export const RED_HOTSPOTS = [
    { id: "HS_R1", label: "Global Use-Cases", position: [-20.08, 1.77, -2.6], lookAt: { x: -5, y: 1.5, z: 0 }, waypoint: 'D', hotspot: 'A' },
    { id: "HS_R2", label: "KPMG Workbench", position: [-20.08, 1.53, -2.6], lookAt: { x: -5, y: 1.5, z: 2 }, waypoint: 'D', hotspot: 'A' },
    { id: "HS_R3", label: "AI Credentials", position: [-20.08, 1.29, -2.6], lookAt: { x: -5, y: 1.5, z: 4 }, waypoint: 'D' , hotspot: 'A'},
    // { id: "HS_R4", label: "", position: [-20.1, 0.9, -2.6], lookAt: { x: -5, y: 1.5, z: 6 }, waypoint: 'D', hotspot: 'A' },
];

export const RED_HOTSPOT_SPAWN_OVERRIDES = {
    HS_R1: { x: -17.8, y: 0, z: 2.7 },
    HS_R2: { x: -21, y: 0, z: 5 },
    HS_R3: { x: -22, y: 0, z: 5 },
    HS_R4: { x: -23, y: 0, z: 5 },
};

export const SZ_MINI_HOTSPOTS = [
  { id: "SZ_MINI_1", position: [-35.5, 2.8, 2.3] }, // left
  { id: "SZ_MINI_2", position: [-35, 2.8, -1.5] }, // center
  { id: "SZ_MINI_3", position: [-35.5, 2.95, -5.7] }, // right
];

export const WAYPOINTS_WORLD = [
    { 
        id: "A",
        label: "Solution Zone",
        interaction: "Enter",
        desc: "Discover interactive demos and tailored made solutions designed for your industry.",
        tooltipWidth: "12vw",
        wx: -29, wy: 1.5,  wz: -5,
        lookAt: { x: -22,  y: 1.8, z: -6 }
    },//Solution
    {
        id: "B",
        label: "Impact Wall",
        interaction: "Explore",
        desc: "On this wall, learn how the KPMG Ignition Center helps clients navigate change and accelerate transformation. Explore how we combine data, technology, and expertise to cocreate solutions that deliver real business outcomes.",
        tooltipWidth: "22vw",
        wx: -31.828, wy: 1.75, wz: 12.336
    },// Impact Wall
    {
        id: "C",
        label: "Lounge",
        interaction: "Enter",
        desc: "Take a seat and explore our playbooks, thought leadership publications and brochures.",
        tooltipWidth: "12vw",
        wx: -16.5, wy: 0.5,  wz: 9,
        lookAt: { x: -22,  y: 1.8, z: -6 }
    },// Lobby
    {
        id: "D",
        label: "AI Zone",
        interaction: "Interact",
        desc: "Meet Lucy, our AI Assistant and explore our global AI use-cases.",
        tooltipWidth: "14vw",
        wx: -17, wy: 2,  wz: 4,
        lookAt: { x: -22,  y: 1.8, z: -6 }
    },// AI
    {
        id: "E",
        label: "Ignition Experience Zone",
        desc: "Grab a virtual coffee and try our gamified experiments to learn more about KPMG Advisory and Global Technology.",
        tooltipWidth: "16vw",
        wx: -21, wy: 1.8,  wz: -8,
        lookAt: { x: -22,  y: 1.8, z: -6 }
    },// Breakout
    {
        id: "F",
        label: "Conference Room",
        desc: "In this space, join your scheduled session in a secure environment hosted by the KPMG Ignition Center. Collaborate with experts to explore opportunities and co-create solutions tailored to your business needs.",
        tooltipWidth: "24vw",
        wx: -31, wy: 2,  wz: 5,
        lookAt: { x: -22,  y: 1.8, z: -6 }
    },// Engagement
    {
        id: "G",
        label: "Library",
        desc: "Discover the sectors and industries where our Global Ignition and Insights Centers have made an impact, and review how global analysts rate our capabilities.",
        interaction: "Enter",
        tooltipWidth: "20vw",
        wx: -33.93, wy: 1.6, wz: 18.449
    }, // Library
    {
        id: "H",
        label: "FF-1",
        desc: "FF-1",
        interaction: "Enter",
        tooltipWidth: "10vw",
        wx: -21, wy: 5.2,  wz: -8,
    }, // FF-1
    {
        id: "I",
        label: "FF-2",
        desc: "FF-2",
        interaction: "Enter",
        tooltipWidth: "10vw",
        wx: -16.5, wy: 5.2,  wz: 9,
    }, // FF-2
];

export const STEP_BACK = [
    {id: "A", x: -23.080,y: 0,z: 1.705, lookAt: {x: -90.864,y: 5.323,z: -71.222}},
    {id: "B", x: -26.335, y: 0, z: 12.614, lookAt: {x: -125.209,y: -1.075,z: -2.110}},
    {id: "C", x: -25.431,y: 0,z: 7.080, lookAt: {x: 73.151,y: 2.635,z: 23.83}},
    {id: "D", x: -23.240,y: 0,z: 4.962, lookAt: {x: 62.933,y: -0.836,z: -45.715}},
    {id: "E", x: -23.168,y: 0,z: 0.299, lookAt: {x: 7.402,y: 2.352,z: -94.911}},
    {id: "F", x: -25.134,y: 0,z: 5.564, lookAt: {x: -121.076,y: 1.667,z: -22.634}},
    {id: "G", x: -29.918,y: 0,z: 21.446, lookAt: {x: -84.141,y: 2.58,z: -62.571}},
];
export const INNER_STEP_BACK = [
    {id: "Solution_Experience", x: -23.080,y: 0,z: 1.705, lookAt: {x: -90.864,y: 5.323,z: -71.222}},
    {id: "Impact_Wall", x: -26.335, y: 0, z: 12.614, lookAt: {x: -125.209,y: -1.075,z: -2.110}},
    {id: "Lobby", x: -25.431,y: 0,z: 7.080, lookAt: {x: 73.151,y: 2.635,z: 23.83}},
    {id: "AI_In_Action", x: -23.240,y: 0,z: 4.962, lookAt: {x: 62.933,y: -0.836,z: -45.715}},
    {id: "Breakout", x: -23.168,y: 0,z: 0.299, lookAt: {x: 7.402,y: 2.352,z: -94.911}},
    {id: "Engagement_Hub", x: -25.134,y: 0,z: 5.564, lookAt: {x:-121.076,y : 1.667,z : -22.634}},
    {id: "Library", x: -29.918,y: 0,z: 21.446, lookAt: {x: -84.141,y: 2.58,z: -62.571}},
];

export const SPAWN_OVERRIDES = {
    A: { x: -23.5, y: 0, z: 0 },   // Solution
    B: { x: -28.383, y: 0.25, z: 12.293 }, // Impact Wall x: -28.3, y: 0.5, z: 12.4
    C: { x: -23.5, y: -0.2, z: 10 }, // Lobby
    D: { x: -21.949, y: 0, z: 3.879 },// AI   x: -24, y: 0, z: 3.5
    E: { x: -22.5, y: 0, z: -1 },// Breakout
    F: { x: -32,  y: 0, z: 3.2 },// Engagement
    G: { x: -37.3, y: 0, z: 11.1 },// Library
    H: { x: -23.075, y: 3.52, z: -5.775 },// FF-1
    I: { x: -15.048, y: 3.52, z: 4.661 },// FF-2
};

export const PRE_F_SPAWN = { x: -27, y: 0, z: 5.25 };
export const PRE_F_LOOK_AT = {x: -50, y: 1.8, z: -2.0};
export const PRE_G_SPAWN = { x: -38.864, y: 0, z: 16.847 }; //x: -36.693, y: 0, z: 19.311
export const PRE_G_LOOK_AT = { x: 22.265, y: -1.762, z: -62.222 }; //x: -33.053, y: 2.123, z: -80.621

export const LOOK_AT_OVERRIDES = {
    A: { x: -34, y: 1.5, z: -8.5 },// Solution
    B: { x: -127.444, y: 2.584, z: -0.608 },// Impact Wall x: -80, y: 1, z: 5
    C: { x: 0, y: 0, z: 13 }, // Lobby
    D: { x: 68.588, y: -0.378, z: -38.537 },// AI   x: -6, y: 0, z: -1
    E: { x: -15, y: 1.5, z: -17 },// Breakout
    F: {x: -50, y: 1.8, z: -2.0},// Engagement
    G: { x: -16.5, y: 1.8, z: -86 },//Library
    H: { x: 47.373, y: -2.315, z: -76.358 },// FF-1
    I: { x: -54.215, y: -1.189, z: 96.455 },// FF-2
};

export const CONFERENCE_HOTSPOT_POSITIONS = {
    temp1: {x: -67, y: 3.6, z: 10}, //left panel
    temp2: {x: -50, y: 2.7, z: -0.35}, //center panel
    temp3: {x: -36, y: 1.2, z: 1.8},
};
export const CONFERENCE_SPAWN_OVERRIDES = {
    temp1: {x: -43.4, y: 0, z: 2}, //left panel >z -> towards wall ; >x -> towards right
    temp2: {x: -44, y: 0, z: -0.5}, //center panel
    temp3: {x: -35, y: 0, z: 1.8}, //right table
};
export const CONFERENCE_LOOK_AT_OVERRIDES = {
    temp1: {x: -49, y: 1.8, z: 20.5}, //left panel
    temp2: {x: -49, y: 1.8, z: -2}, //center panel
    temp3: {x: -50, y: 1.8, z: -2.0}, //right table
};
export const CONFERENCE_CLOSE_ICON_POSITIONS = {
    temp1: {top: '12.8vw', right: '19vw'},
    temp2: {top: '37vw', right: '55vw'},
};

export const MINI_CONFERENCE_HOTSPOTS = [
    { id: "MINI_1", position: [ -41.5, 1.6, 14.5 ] }, 
    { id: "MINI_2", position: [ -45.7, 1.6, 15 ] }, 
    { id: "MINI_3", position: [ -49.2, 1.6, 11.9 ] },
    { id: "MINI_4", position: [ -56, 5.6, 14.5 ] },
    { id: "MINI_5", position: [ -50, 3.3, -5.1 ] }
]

export const CAMERA_FLIP_POINTS = [
    { x: -44, y: 0, z: -0.5, lookAt: {x: -49, y: 1.8, z: -2}},
    { ...SPAWN_OVERRIDES.F, lookAt: LOOK_AT_OVERRIDES.F },
];


// --- Whiteboard  ---
export const WHITEBOARD_SCREENS = [
    {
        id: "WB1",
        position: [-25, 2, -18],
        size: [4.4, 2.5],
        rotationY: 0
    }
];

export const VIDEO_SCREENS = [
    {
        id: "VR1",
        position: [-26.9, 1.88, -10.1], 
        radius: 1.9,       
        height: 1.71,       
        arcDeg: 80,        
        rotationY: 225       
    }
];

export const SCREENSHARE_SCREENS = [
    {
        id: "SS1",
        position: [-24.15, 1.88, -9.9], 
        radius: 1.91,
        height: 1.71,
        arcDeg: -80,
        rotationY: -50       
    }
];

export const AVATAR_POINTS = [
    { id: "Av01", position: [-38.6, -0.5, 4.2],  rotationY:  150 },
    { id: "Av02", position: [-39.5, -0.5, 3.9],  rotationY:  150 },
    { id: "Av03", position: [-40.5, -0.5, 3.5],  rotationY:  150 },
    { id: "Av04", position: [-41.6, -0.5, 3.3],  rotationY:  150 },
    { id: "Av05", position: [-42.5, -0.5, 3], rotationY:  150 },
    { id: "Av06", position: [-36.9, -0.5, -1.2], rotationY:  310 },
    { id: "Av07", position: [-38, -0.5, -1.4], rotationY:  310 },
    { id: "Av08", position: [-39, -0.5, -1.7], rotationY:  310 },
    { id: "Av09", position: [-39.9, -0.5, -1.9],  rotationY:  310 },
    { id: "Av10", position: [-40.8, -0.5, -2],  rotationY:  310 },
];

export const LobbyOverlay = {
    header: "Lobby",
    subtitle: "Explore",
    description: "Welcome to the Virtual Insights Center — your gateway to innovation, ideas, and interaction. Explore upcoming events, download brochures, or connect instantly through e-meetings.",
    listItems: [
        {label: "Interactive Brochures"},
        { label: "Event Carousel", onClick: () => console.log("Event Carousel clicked")},
        { label: "Digital Concierge", onClick: () => console.log("Digital Concierge clicked")},
    ]
};
export const ImpactWallOverlay = {
    header: "Impact Wall",
    subtitle: "Discover",
    description: "Uncover the values shaping our global impact — from sustainability and inclusion to digital transformation. Explore stories and data that reflect who we are and what we stand for.",
    listItems: [
        {label: "Global Impact", onClick: () => console.log("Global Impact clicked")},
        { label: "Value Stories", onClick: () => console.log("Value Stories clicked")},
        { label: "Interactive Data Dashboard", onClick: () => console.log("Interactive Data Dashboard clicked")},
    ]
}
export const BreakoutOverlay = {
    header: "Breakout Zone",
    subtitle: "Connect",
    description: "Unwind and connect beyond business. Network with peers, explore CSR initiatives, play interactive games, or browse curated merchandise from our innovation journey.",
    listItems: [
        {label: "Networking Pods", onClick: () => console.log("Networking Pods clicked")},
        { label: "Interactive Games", onClick: () => console.log("Interactive Games clicked")},
        { label: "CSR Explorer", onClick: () => console.log("CSR Explorer clicked")},
    ]
}
export const SolutionZoneOverlay = {
    header: "Solution Zone",
    subtitle: "Explore",
    description: "Experience client success stories through an interactive globe and dynamic value-chain journeys. Discover how our solutions transform industries, empower people, and drive sustainable growth.",
    listItems: [
        {label: "Interactive Solution Globe", onClick: () => console.log("Interactive Solution Globe clicked")},
        { label: "Value-Chain Explorer", onClick: () => console.log("Value-Chain Explorer clicked")},
    ]
}
export const AIOverlay = {
    header: "AI In Action",
    subtitle: "Engage",
    description: "Meet your virtual guide — an AI-powered avatar designed to help you navigate the Virtual Insights Center. Ask questions, explore insights, or get instant assistance on solutions, meetings, or organizational information.",
    listItems: [
        {label: "Chat with the Avatar ", onClick: () => console.log("Chat with the Avatar clicked")},
    ]
}
export const EngagementHubOverlay = {
    header: "Engagement Zone",
    subtitle: "Collaborate",
    description: "Engage with our experts and partners in real time. Schedule meetings, brainstorm in shared digital spaces, and experience meaningful collaboration.",
    listItems: [
        {label: "Join a Meeting", onClick: () => console.log("Join a Meeting clicked")},
        {label: "Meeting Scheduler", onClick: () => console.log("Meeting Scheduler clicked")},
    ]
}

export const OVERLAY_POSITIONS = {
    Lobby: [-5, 4.5, 19.5],
    Solution_Experience: [-52, 29, -180],
    Impact_Wall: [-37.5, 5, 3],
    AI_In_Action: [4, 7, 7],
    Breakout: [-29, 6.5, -25],
    Engagement_Hub: [-45, 4.2, -6.6],
}

export const AiOptions_Pos = [20, 5, -15] ;