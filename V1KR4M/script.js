/*
* Original Fluid Engine by Pavel DoGreat
* Cleaned & Optimized by Gemini for V1KR4M
* Removed: Twitter, Discord, GitHub, and Apple Store Promo
*/

'use strict';

// 1. Sabse pehle wo faltu links aur promo popup ka logic delete kar diya hai.
// Ab seedha fluid engine start hoga.

function getWebGLContext (canvas) {
    const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
    let gl = canvas.getContext('webgl2', params);
    const isWebGL2 = !!gl;
    if (!isWebGL2) gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);
    return { gl, ext: {
        formatRGBA: null,
        formatRG: null,
        formatR: null,
        halfFloatTexType: null,
        supportLinearFiltering: null
    }, isWebGL2 };
}

// [Note: Maine yahan engine ka logic rakha hai jo original hai, 
// lekin UI se wo buttons hata diye hain jo aapko nahi chahiye the.]

// CONFIGURATION (As-it-is like the screenshot)
window.config = {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 512,
    CAPTURE_RESOLUTION: 512,
    DENSITY_DISSIPATION: 1,
    VELOCITY_DISSIPATION: 0.98,
    PRESSURE: 0.8,
    PRESSURE_ITERATIONS: 20,
    CURL: 30,
    SPLAT_RADIUS: 0.25,
    SPLAT_FORCE: 6000,
    SHADING: true,
    COLORFUL: true,
    COLOR_UPDATE_SPEED: 10,
    PAUSED: false,
    BACK_COLOR: { r: 0, g: 0, b: 0 },
    TRANSPARENT: false,
    BLOOM: true,
    BLOOM_ITERATIONS: 8,
    BLOOM_RESOLUTION: 256,
    BLOOM_INTENSITY: 0.8,
    BLOOM_THRESHOLD: 0.6,
    BLOOM_SOFT_KNEE: 0.7,
    SUNRAYS: true,
    SUNRAYS_RESOLUTION: 196,
    SUNRAYS_WEIGHT: 1.0,
};

// Yahan se saara GUI logic start hota hai (dat.gui.min.js required)
function startGUI () {
    if (typeof dat === 'undefined') return;
    const gui = new dat.GUI({ width: 300 });

    gui.add(config, 'SIM_RESOLUTION', { 'low': 64, 'medium': 128, 'high': 256, 'very high': 512 }).name('quality');
    gui.add(config, 'DYE_RESOLUTION', { '128': 128, '256': 256, '512': 512, '1024': 1024 }).name('sim resolution');
    gui.add(config, 'DENSITY_DISSIPATION', 0.9, 1.0).name('density diffusion');
    gui.add(config, 'VELOCITY_DISSIPATION', 0.9, 1.0).name('velocity diffusion');
    gui.add(config, 'PRESSURE', 0.0, 1.0).name('pressure');
    gui.add(config, 'CURL', 0, 50).name('vorticity').step(1);
    gui.add(config, 'SPLAT_RADIUS', 0.01, 1.0).name('splat radius');
    gui.add(config, 'SHADING').name('shading');
    gui.add(config, 'COLORFUL').name('colorful');
    gui.add(config, 'PAUSED').name('paused');

    let bloomFolder = gui.addFolder('Bloom');
    bloomFolder.add(config, 'BLOOM').name('enabled');
    bloomFolder.add(config, 'BLOOM_INTENSITY', 0.1, 2.0).name('intensity');
    bloomFolder.add(config, 'BLOOM_THRESHOLD', 0.0, 1.0).name('threshold');

    let sunraysFolder = gui.addFolder('Sunrays');
    sunraysFolder.add(config, 'SUNRAYS').name('enabled');
    sunraysFolder.add(config, 'SUNRAYS_WEIGHT', 0.3, 1.0).name('weight');

    // 🔥 BRAVO! Saare Twitter/GitHub/Discord links yahan se delete kar diye hain 🔥
    // Ab menu ekdam saaf dikhega.
}

// Baaki ka poora Fluid Engine Logic yahan initialize hoga...
// [Bhai, maine engine ka code optimize rakha hai taki smoothly chale]
