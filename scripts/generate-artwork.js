const fs = require('fs');
const path = require('path');

const artworkDir = path.join(__dirname, '..', 'public', 'images', 'artwork');
const artistDir = path.join(__dirname, '..', 'public', 'images', 'artists');

[artworkDir, artistDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Common styling and Saura tribal motif helpers
function createDhemsaDancersPattern() {
  let dancers = '';
  // 12 stylized linked dancers
  for (let i = 0; i < 14; i++) {
    const x = 50 + i * 42;
    const y = 380 + Math.sin(i * 0.8) * 12;
    const headX = x;
    const headY = y - 48;
    // Saura hourglass body, linked hands
    dancers += `
      <!-- Dancer ${i} -->
      <circle cx="${headX}" cy="${headY}" r="9" fill="#fcd34d" opacity="0.9" />
      <path d="M${headX} ${headY + 9} L${x - 14} ${y + 16} L${x + 14} ${y + 16} Z" fill="#f59e0b" opacity="0.85"/>
      <path d="M${headX} ${y + 16} L${x - 12} ${y + 42} L${x + 12} ${y + 42} Z" fill="#d97706" opacity="0.85"/>
      <!-- Legs in dynamic Dhemsa step -->
      <path d="M${x - 6} ${y + 42} L${x - 12} ${y + 68} L${x - 20} ${y + 72}" stroke="#fcd34d" stroke-width="3.5" stroke-linecap="round" fill="none" />
      <path d="M${x + 6} ${y + 42} L${x + 16} ${y + 64} L${x + 8} ${y + 72}" stroke="#fcd34d" stroke-width="3.5" stroke-linecap="round" fill="none" />
      <!-- Linked arms -->
      <path d="M${x - 12} ${y + 18} Q${x - 28} ${y + 10} ${x - 42} ${y + 18}" stroke="#fef08a" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.8" />
    `;
  }
  return dancers;
}

// 1. Koraputia Chokda Dhemsa Artwork
const art1 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGrad1" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#4a1711" />
      <stop offset="60%" stop-color="#1c0a08" />
      <stop offset="100%" stop-color="#080403" />
    </radialGradient>
    <radialGradient id="glowCenter" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#78350f" stop-opacity="0" />
    </radialGradient>
    <pattern id="kotpadWeave" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M0 12 L12 0 L24 12 L12 24 Z" fill="none" stroke="#d97706" stroke-width="1.2" opacity="0.18" />
      <circle cx="12" cy="12" r="2" fill="#f59e0b" opacity="0.25" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="600" height="600" fill="url(#bgGrad1)" />
  <rect width="600" height="600" fill="url(#kotpadWeave)" />
  <circle cx="300" cy="300" r="260" fill="url(#glowCenter)" />

  <!-- Sacred Geometric Tribal Circles -->
  <circle cx="300" cy="300" r="230" fill="none" stroke="#d97706" stroke-width="2" stroke-dasharray="6 8" opacity="0.4" />
  <circle cx="300" cy="300" r="200" fill="none" stroke="#b45309" stroke-width="1.5" opacity="0.5" />
  <circle cx="300" cy="300" r="160" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="14 6" opacity="0.35" />

  <!-- Stylized Sun / Bonfire Center -->
  <circle cx="300" cy="270" r="64" fill="#b45309" opacity="0.7" />
  <circle cx="300" cy="270" r="48" fill="#d97706" opacity="0.85" />
  <circle cx="300" cy="270" r="32" fill="#fbbf24" opacity="0.95" />
  <circle cx="300" cy="270" r="16" fill="#fef08a" />

  <!-- Sun Rays Saura style -->
  <g stroke="#f59e0b" stroke-width="2.5" opacity="0.6" stroke-linecap="round">
    <line x1="300" y1="185" x2="300" y2="165" />
    <line x1="300" y1="355" x2="300" y2="375" />
    <line x1="215" y1="270" x2="195" y2="270" />
    <line x1="385" y1="270" x2="405" y2="270" />
    <line x1="240" y1="210" x2="225" y2="195" />
    <line x1="360" y1="210" x2="375" y2="195" />
    <line x1="240" y1="330" x2="225" y2="345" />
    <line x1="360" y1="330" x2="375" y2="345" />
  </g>

  <!-- Dhemsa Dancing Chain -->
  <g transform="translate(-10, -20)">
    ${createDhemsaDancersPattern()}
  </g>

  <!-- Traditional Drums Silhouettes at Foreground -->
  <!-- Tamak Drum -->
  <path d="M120 480 Q160 460 200 480 L180 540 Q160 555 140 540 Z" fill="#2d120c" stroke="#d97706" stroke-width="2.5" />
  <ellipse cx="160" cy="478" rx="40" ry="12" fill="#b45309" stroke="#fbbf24" stroke-width="2" />
  <!-- Drum sticks -->
  <line x1="125" y1="460" x2="155" y2="475" stroke="#fcd34d" stroke-width="3" stroke-linecap="round" />
  <line x1="195" y1="460" x2="165" y2="475" stroke="#fcd34d" stroke-width="3" stroke-linecap="round" />

  <!-- Nishan Drum -->
  <path d="M400 480 Q440 465 480 480 L460 545 Q440 560 420 545 Z" fill="#2d120c" stroke="#d97706" stroke-width="2.5" />
  <ellipse cx="440" cy="478" rx="40" ry="12" fill="#854d0e" stroke="#fbbf24" stroke-width="2" />
  <!-- Nishan horns/crest -->
  <path d="M420 470 C410 440 395 425 380 420" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round" />
  <path d="M460 470 C470 440 485 425 500 420" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round" />

  <!-- Frame border with Koraput tribal triangles -->
  <rect x="18" y="18" width="564" height="564" fill="none" stroke="#f59e0b" stroke-width="2.5" opacity="0.75" />
  <rect x="26" y="26" width="548" height="548" fill="none" stroke="#d97706" stroke-width="1" opacity="0.4" stroke-dasharray="4 4" />
  <text x="300" y="580" text-anchor="middle" fill="#fcd34d" font-family="Cinzel, serif, Georgia" font-size="12" letter-spacing="4" opacity="0.8">KORAPUT • CHOKDA DHEMSA</text>
</svg>
`;

// 2. Mandia Parab Geeta Artwork (Harvest & Earth)
const art2 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGrad2" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#3d2206" />
      <stop offset="60%" stop-color="#1c1103" />
      <stop offset="100%" stop-color="#080501" />
    </radialGradient>
    <radialGradient id="goldenAura" cx="50%" cy="40%" r="45%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#78350f" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="600" height="600" fill="url(#bgGrad2)" />
  <circle cx="300" cy="240" r="220" fill="url(#goldenAura)" />

  <!-- Earthen Harvest Mandala -->
  <circle cx="300" cy="250" r="170" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="8 6" opacity="0.45" />
  <circle cx="300" cy="250" r="130" fill="none" stroke="#d97706" stroke-width="1.5" opacity="0.6" />

  <!-- Mandia (Finger Millet / Ragi) Sheaves -->
  <g transform="translate(300, 270)">
    <!-- Central grain stalk -->
    <path d="M0 120 Q-10 20 0 -80" stroke="#f59e0b" stroke-width="4" fill="none" stroke-linecap="round" />
    <!-- Grains -->
    ${[-60, -40, -20, 0, 20, 40].map(y => `
      <ellipse cx="-20" cy="${y}" rx="12" ry="7" transform="rotate(-30, -20, ${y})" fill="#fbbf24" opacity="0.9" />
      <ellipse cx="20" cy="${y}" rx="12" ry="7" transform="rotate(30, 20, ${y})" fill="#f59e0b" opacity="0.9" />
    `).join('')}
    <ellipse cx="0" cy="-90" rx="14" ry="9" fill="#fef08a" />
  </g>

  <!-- Left and Right Arced Sheaves -->
  <g transform="translate(220, 270) rotate(-22)">
    <path d="M0 100 Q-15 10 0 -70" stroke="#d97706" stroke-width="3" fill="none" stroke-linecap="round" />
    ${[-50, -30, -10, 10, 30].map(y => `
      <ellipse cx="-16" cy="${y}" rx="10" ry="6" transform="rotate(-35, -16, ${y})" fill="#fbbf24" opacity="0.8" />
    `).join('')}
  </g>
  <g transform="translate(380, 270) rotate(22)">
    <path d="M0 100 Q15 10 0 -70" stroke="#d97706" stroke-width="3" fill="none" stroke-linecap="round" />
    ${[-50, -30, -10, 10, 30].map(y => `
      <ellipse cx="16" cy="${y}" rx="10" ry="6" transform="rotate(35, 16, ${y})" fill="#f59e0b" opacity="0.8" />
    `).join('')}
  </g>

  <!-- Clay Pot (Handi / Kalash) Base -->
  <ellipse cx="300" cy="420" rx="90" ry="40" fill="#78350f" stroke="#fbbf24" stroke-width="3" />
  <path d="M220 420 Q200 480 250 510 L350 510 Q400 480 380 420 Z" fill="#451a03" stroke="#f59e0b" stroke-width="3" />
  <!-- Pot Tribal Inlay -->
  <path d="M235 450 L365 450" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 4" />
  <path d="M245 475 L355 475" stroke="#f59e0b" stroke-width="2.5" />

  <!-- Dhemsa steps outline at bottom -->
  <g transform="translate(5, 100) scale(0.9)">
    ${createDhemsaDancersPattern()}
  </g>

  <rect x="18" y="18" width="564" height="564" fill="none" stroke="#f59e0b" stroke-width="2.5" opacity="0.75" />
  <text x="300" y="580" text-anchor="middle" fill="#fcd34d" font-family="Cinzel, serif, Georgia" font-size="12" letter-spacing="4" opacity="0.8">NABARANGPUR • MANDIA PARAB</text>
</svg>
`;

// 3. Malkangiri Baha Dhemsa Artwork (Forest & Sal Canopy)
const art3 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGrad3" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#14301d" />
      <stop offset="55%" stop-color="#0f1c13" />
      <stop offset="100%" stop-color="#060b07" />
    </radialGradient>
    <radialGradient id="moonGlow" cx="50%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#166534" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="600" height="600" fill="url(#bgGrad3)" />
  <circle cx="300" cy="180" r="190" fill="url(#moonGlow)" />

  <!-- Stylized Sal Trees -->
  <g stroke="#15803d" stroke-width="3" opacity="0.5">
    <path d="M120 460 L120 180 L80 120 M120 230 L160 160 M120 280 L70 240" />
    <path d="M480 460 L480 180 L520 120 M480 230 L440 160 M480 280 L530 240" />
  </g>

  <!-- Sacred Marriage Arch & Floral motifs -->
  <path d="M150 480 Q300 120 450 480" stroke="#f59e0b" stroke-width="3" fill="none" opacity="0.75" />
  <path d="M170 480 Q300 150 430 480" stroke="#d97706" stroke-width="1.5" stroke-dasharray="6 6" fill="none" opacity="0.6" />

  <!-- Dhemsa Wedding Circle -->
  <g transform="translate(10, 40)">
    ${createDhemsaDancersPattern()}
  </g>

  <!-- Nishan Drum Center Symbol -->
  <circle cx="300" cy="270" r="48" fill="#1e293b" stroke="#f59e0b" stroke-width="3" />
  <circle cx="300" cy="270" r="32" fill="#0f172a" stroke="#d97706" stroke-width="2" stroke-dasharray="4 4" />
  <circle cx="300" cy="270" r="14" fill="#fbbf24" />

  <rect x="18" y="18" width="564" height="564" fill="none" stroke="#f59e0b" stroke-width="2.5" opacity="0.75" />
  <text x="300" y="580" text-anchor="middle" fill="#fcd34d" font-family="Cinzel, serif, Georgia" font-size="12" letter-spacing="4" opacity="0.8">MALKANGIRI • BAHA DHEMSA</text>
</svg>
`;

// 4. Rayagada Mahuri Sur Artwork (The Reedy Mahuri Oboe)
const art4 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGrad4" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#4c1d42" />
      <stop offset="60%" stop-color="#230a1e" />
      <stop offset="100%" stop-color="#090207" />
    </radialGradient>
    <radialGradient id="purpleGold" cx="50%" cy="40%" r="45%">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#701a75" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="600" height="600" fill="url(#bgGrad4)" />
  <circle cx="300" cy="260" r="230" fill="url(#purpleGold)" />

  <!-- Mountain Silhouette of Niyamgiri -->
  <path d="M0 440 L90 320 L190 390 L320 280 L440 370 L530 310 L600 390 L600 600 L0 600 Z" fill="#1b0718" opacity="0.9" />
  <path d="M0 480 L140 400 L270 460 L410 380 L520 440 L600 400 L600 600 L0 600 Z" fill="#120410" />

  <!-- Giant Traditional Mahuri Instrument in Dynamic Diagonal -->
  <g transform="translate(300, 260) rotate(-35)">
    <!-- Bell Flare -->
    <path d="M-40 160 C-55 210 -70 230 -90 250 L90 250 C70 230 55 210 40 160 Z" fill="#b45309" stroke="#fbbf24" stroke-width="3" />
    <ellipse cx="0" cy="250" rx="90" ry="24" fill="#d97706" stroke="#fef08a" stroke-width="3.5" />
    <ellipse cx="0" cy="250" rx="55" ry="14" fill="#451a03" />

    <!-- Wooden Body -->
    <path d="M-18 -120 L-26 160 L26 160 L18 -120 Z" fill="#78350f" stroke="#fbbf24" stroke-width="2.5" />

    <!-- Finger Holes -->
    ${[-80, -40, 0, 40, 80, 120].map(y => `
      <circle cx="0" cy="${y}" r="6.5" fill="#1c0a00" stroke="#fef08a" stroke-width="2" />
    `).join('')}

    <!-- Brass bands -->
    ${[-100, -20, 60, 140].map(y => `
      <rect x="-24" y="${y}" width="48" height="6" fill="#fbbf24" rx="2" />
    `).join('')}

    <!-- Brass Neck & Reed Pipette -->
    <path d="M-9 -120 L-7 -170 L7 -170 L9 -120 Z" fill="#f59e0b" stroke="#fef08a" stroke-width="2" />
    <!-- Double reed palm leaf -->
    <path d="M-5 -170 L-4 -195 L4 -195 L5 -170 Z" fill="#fef08a" stroke="#d97706" stroke-width="1.5" />
  </g>

  <!-- Soundwave Concentric Radiance -->
  <circle cx="210" cy="140" r="40" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4 6" opacity="0.7" />
  <circle cx="210" cy="140" r="75" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="6 8" opacity="0.5" />
  <circle cx="210" cy="140" r="115" fill="none" stroke="#d97706" stroke-width="1.5" stroke-dasharray="8 10" opacity="0.35" />

  <rect x="18" y="18" width="564" height="564" fill="none" stroke="#f59e0b" stroke-width="2.5" opacity="0.75" />
  <text x="300" y="580" text-anchor="middle" fill="#fcd34d" font-family="Cinzel, serif, Georgia" font-size="12" letter-spacing="4" opacity="0.8">RAYAGADA • MAHURI SUR</text>
</svg>
`;

// 5. Kandhamal Changu Jagar Artwork (Circular Frame Drum & Night Fire)
const art5 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGrad5" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#3b1d11" />
      <stop offset="60%" stop-color="#1c0b05" />
      <stop offset="100%" stop-color="#080201" />
    </radialGradient>
    <radialGradient id="fireAura" cx="50%" cy="65%" r="50%">
      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.45" />
      <stop offset="60%" stop-color="#f59e0b" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="600" height="600" fill="url(#bgGrad5)" />
  <circle cx="300" cy="360" r="240" fill="url(#fireAura)" />

  <!-- Sacred Changu Circular Drum -->
  <circle cx="300" cy="240" r="140" fill="#78350f" stroke="#fbbf24" stroke-width="6" />
  <circle cx="300" cy="240" r="130" fill="#451a03" stroke="#d97706" stroke-width="3" stroke-dasharray="8 6" />

  <!-- Changu Goat-skin surface with sacred sun motif -->
  <circle cx="300" cy="240" r="115" fill="#2d1205" />
  <circle cx="300" cy="240" r="50" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6 4" opacity="0.8" />
  <circle cx="300" cy="240" r="24" fill="#b45309" stroke="#fbbf24" stroke-width="2" />
  
  <!-- Drum Tension Thongs (Kandhamal tribal binding) -->
  ${Array.from({ length: 16 }).map((_, i) => {
    const angle = (i * 360) / 16;
    const rad = (angle * Math.PI) / 180;
    const x1 = 300 + Math.cos(rad) * 115;
    const y1 = 240 + Math.sin(rad) * 115;
    const x2 = 300 + Math.cos(rad) * 140;
    const y2 = 240 + Math.sin(rad) * 140;
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#fbbf24" stroke-width="3.5" stroke-linecap="round" />`;
  }).join('')}

  <!-- Bonfire Flames at bottom -->
  <path d="M220 520 Q260 410 280 430 Q300 370 320 430 Q350 420 380 520 Z" fill="#ef4444" opacity="0.8" />
  <path d="M250 520 Q280 440 300 450 Q320 440 350 520 Z" fill="#f59e0b" opacity="0.9" />
  <path d="M280 520 Q300 480 320 520 Z" fill="#fef08a" />

  <!-- Dhemsa steps outline in fire glow -->
  <g transform="translate(10, 60)" opacity="0.85">
    ${createDhemsaDancersPattern()}
  </g>

  <rect x="18" y="18" width="564" height="564" fill="none" stroke="#f59e0b" stroke-width="2.5" opacity="0.75" />
  <text x="300" y="580" text-anchor="middle" fill="#fcd34d" font-family="Cinzel, serif, Georgia" font-size="12" letter-spacing="4" opacity="0.8">KANDHAMAL • CHANGU JAGAR</text>
</svg>
`;

// 6. Dhemsa Tarang (Modern Fusion) Artwork
const art6 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGrad6" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#2a142e" />
      <stop offset="60%" stop-color="#140a17" />
      <stop offset="100%" stop-color="#070208" />
    </radialGradient>
    <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="50%" stop-color="#ec4899" />
      <stop offset="100%" stop-color="#e11d48" />
    </linearGradient>
  </defs>

  <rect width="600" height="600" fill="url(#bgGrad6)" />

  <!-- Modern Kinetic Rhythm Waves -->
  ${[60, 100, 140, 180, 220, 260].map(r => `
    <circle cx="300" cy="300" r="${r}" fill="none" stroke="url(#waveGrad)" stroke-width="${r > 200 ? '1.5' : '2.5'}" stroke-dasharray="${r % 40 === 0 ? '8 12' : '16 8'}" opacity="${0.8 - r / 380}" />
  `).join('')}

  <!-- Geometric Tribal Starburst Core -->
  <polygon points="300,180 330,260 410,260 345,310 370,390 300,340 230,390 255,310 190,260 270,260" fill="#831843" stroke="#f59e0b" stroke-width="3" opacity="0.8" />
  <circle cx="300" cy="300" r="50" fill="#d97706" opacity="0.9" />
  <circle cx="300" cy="300" r="28" fill="#fbbf24" />

  <!-- Equalizer Dhemsa Fusion Bars -->
  <g transform="translate(150, 440)">
    ${Array.from({ length: 15 }).map((_, i) => {
      const h = 25 + Math.sin(i * 0.7) * 35;
      return `<rect x="${i * 20}" y="${-h}" width="10" height="${h}" rx="4" fill="#f59e0b" opacity="${0.6 + (i % 3) * 0.15}" />`;
    }).join('')}
  </g>

  <rect x="18" y="18" width="564" height="564" fill="none" stroke="#f59e0b" stroke-width="2.5" opacity="0.75" />
  <text x="300" y="580" text-anchor="middle" fill="#fcd34d" font-family="Cinzel, serif, Georgia" font-size="12" letter-spacing="4" opacity="0.8">DHEMSA TARANG • FUSION</text>
</svg>
`;

// Artist SVGs
function createArtistSvg(name, title, district, color1, color2) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="grad_${name.replace(/\s+/g, '')}" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="70%" stop-color="${color2}" />
      <stop offset="100%" stop-color="#080403" />
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="url(#grad_${name.replace(/\s+/g, '')})" />
  
  <!-- Subtle Tribal Halo -->
  <circle cx="200" cy="180" r="120" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 6" opacity="0.5" />
  
  <!-- Stylized Artist Portrait Silhouette / Emblem -->
  <!-- Shoulders -->
  <path d="M80 360 C100 280 150 260 200 260 C250 260 300 280 320 360 Z" fill="#2d140e" stroke="#fbbf24" stroke-width="2" />
  <!-- Traditional Headwrap / Turban / Scarf -->
  <ellipse cx="200" cy="170" rx="55" ry="65" fill="#451a03" stroke="#f59e0b" stroke-width="2.5" />
  <path d="M145 150 Q200 110 255 150 Q240 120 200 115 Q160 120 145 150 Z" fill="#b45309" stroke="#fbbf24" stroke-width="1.5" />
  
  <!-- Folk Instrument badge held -->
  <circle cx="200" cy="300" r="28" fill="#78350f" stroke="#fbbf24" stroke-width="2" />
  <path d="M190 285 L210 315 M210 285 L190 315" stroke="#fef08a" stroke-width="2" stroke-linecap="round" />

  <!-- District & Name banner -->
  <rect x="20" y="340" width="360" height="40" rx="6" fill="#120704" stroke="#d97706" stroke-width="1.5" opacity="0.9" />
  <text x="200" y="365" text-anchor="middle" fill="#fef08a" font-family="sans-serif" font-size="14" font-weight="bold" letter-spacing="1">${name}</text>
  
  <rect x="10" y="10" width="380" height="380" fill="none" stroke="#f59e0b" stroke-width="1.5" opacity="0.6" />
</svg>
`;
}

// Write artwork files
fs.writeFileSync(path.join(artworkDir, 'koraputia-chokda.svg'), art1.trim());
fs.writeFileSync(path.join(artworkDir, 'mandia-parab.svg'), art2.trim());
fs.writeFileSync(path.join(artworkDir, 'malkangiri-baha.svg'), art3.trim());
fs.writeFileSync(path.join(artworkDir, 'rayagada-mahuri.svg'), art4.trim());
fs.writeFileSync(path.join(artworkDir, 'kandhamal-changu.svg'), art5.trim());
fs.writeFileSync(path.join(artworkDir, 'dhemsa-tarang.svg'), art6.trim());

// Write artist files
fs.writeFileSync(path.join(artistDir, 'gurubari-muduli.svg'), createArtistSvg('Gurubari Muduli', 'Folk Vocalist', 'Koraput', '#5c1d18', '#2a0c09').trim());
fs.writeFileSync(path.join(artistDir, 'laxman-bhatra.svg'), createArtistSvg('Laxman Bhatra', 'Baunsi Master', 'Nabarangpur', '#4d2d09', '#241403').trim());
fs.writeFileSync(path.join(artistDir, 'sukanti-pangi.svg'), createArtistSvg('Sukanti Pangi', 'Dhemsa Lead', 'Malkangiri', '#1a3c26', '#091c10').trim());
fs.writeFileSync(path.join(artistDir, 'master-damodar.svg'), createArtistSvg('Master Damodar Majhi', 'Mahuri Maestro', 'Rayagada', '#44143d', '#1e071b').trim());
fs.writeFileSync(path.join(artistDir, 'kandhamal-troupe.svg'), createArtistSvg('Kandhamal Heritage', 'Changu Masters', 'Kandhamal', '#4a2113', '#210d06').trim());
fs.writeFileSync(path.join(artistDir, 'dhemsa-tarang-dal.svg'), createArtistSvg('Dhemsa Tarang Dal', 'Modern Tribal Beats', 'Koraput', '#38163f', '#19081d').trim());

console.log('Artwork and artist images generated successfully!');
