const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 44100;

function createWavHeader(numSamples, numChannels = 2) {
  const byteRate = SAMPLE_RATE * numChannels * 2;
  const blockAlign = numChannels * 2;
  const dataSize = numSamples * numChannels * 2;
  const buffer = Buffer.alloc(44);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // audio format (1 = PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // bits per sample
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  return buffer;
}

// Synthesize a rich Dhemsa track
function generateDhemsaTrack({
  bpm = 124,
  durationSec = 30,
  melodyScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25], // Desia pentatonic/folk
  fluteTimbre = 'mahuri',
  swing = 0.08
}) {
  const totalSamples = Math.floor(durationSec * SAMPLE_RATE);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  const beatDuration = 60 / bpm;
  const subBeatDuration = beatDuration / 4; // 16th note

  // Drum hits generator
  function addDhol(startTime, strength = 1.0, pan = 0.0) {
    const startSample = Math.floor(startTime * SAMPLE_RATE);
    const hitSamples = Math.floor(0.28 * SAMPLE_RATE);
    for (let i = 0; i < hitSamples && startSample + i < totalSamples; i++) {
      const t = i / SAMPLE_RATE;
      const freq = 65 + 140 * Math.exp(-t * 30);
      const env = Math.exp(-t * 12);
      const click = Math.sin(2 * Math.PI * 400 * t) * Math.exp(-t * 80) * 0.3;
      const val = (Math.sin(2 * Math.PI * freq * t) + click) * env * strength * 0.45;
      
      left[startSample + i] += val * (1 - pan * 0.5);
      right[startSample + i] += val * (1 + pan * 0.5);
    }
  }

  function addTamak(startTime, pitch = 220, strength = 0.8, pan = -0.3) {
    const startSample = Math.floor(startTime * SAMPLE_RATE);
    const hitSamples = Math.floor(0.18 * SAMPLE_RATE);
    for (let i = 0; i < hitSamples && startSample + i < totalSamples; i++) {
      const t = i / SAMPLE_RATE;
      const freq = pitch * Math.exp(-t * 8);
      const env = Math.exp(-t * 22);
      const overtone = Math.sin(2 * Math.PI * freq * 2.3 * t) * 0.3;
      const val = (Math.sin(2 * Math.PI * freq * t) + overtone) * env * strength * 0.35;
      left[startSample + i] += val * (1 - pan);
      right[startSample + i] += val * (1 + pan);
    }
  }

  function addNishan(startTime, strength = 0.7, pan = 0.4) {
    const startSample = Math.floor(startTime * SAMPLE_RATE);
    const hitSamples = Math.floor(0.12 * SAMPLE_RATE);
    for (let i = 0; i < hitSamples && startSample + i < totalSamples; i++) {
      const t = i / SAMPLE_RATE;
      const ring = (Math.sin(2 * Math.PI * 880 * t) + Math.sin(2 * Math.PI * 1320 * t) * 0.5) * Math.exp(-t * 35);
      const snap = (Math.random() * 2 - 1) * Math.exp(-t * 90) * 0.5;
      const val = (ring + snap) * strength * 0.25;
      left[startSample + i] += val * (1 - pan);
      right[startSample + i] += val * (1 + pan);
    }
  }

  function addGhungroo(startTime, strength = 0.4) {
    const startSample = Math.floor(startTime * SAMPLE_RATE);
    const hitSamples = Math.floor(0.08 * SAMPLE_RATE);
    for (let i = 0; i < hitSamples && startSample + i < totalSamples; i++) {
      const t = i / SAMPLE_RATE;
      const metallic = Math.sin(2 * Math.PI * 4800 * t) * 0.4 + Math.sin(2 * Math.PI * 7200 * t) * 0.3;
      const noise = (Math.random() * 2 - 1) * 0.3;
      const env = Math.exp(-t * 50);
      const val = (metallic + noise) * env * strength * 0.2;
      const p = (Math.random() - 0.5) * 0.6;
      left[startSample + i] += val * (1 - p);
      right[startSample + i] += val * (1 + p);
    }
  }

  // Populate rhythm loop
  const totalSubBeats = Math.floor(durationSec / subBeatDuration);
  for (let s = 0; s < totalSubBeats; s++) {
    const beatPos = s % 16;
    let t = s * subBeatDuration;
    if (s % 2 === 1) t += swing * subBeatDuration;

    // Dhol pattern (deep kick on 0, 6, 10)
    if (beatPos === 0 || beatPos === 10) {
      addDhol(t, 1.0, -0.1);
    } else if (beatPos === 6 || beatPos === 14) {
      addDhol(t, 0.7, 0.1);
    }

    // Tamak (accent syncopations on 2, 4, 8, 12)
    if ([2, 4, 8, 12].includes(beatPos)) {
      addTamak(t, 240, 0.75, -0.3);
    } else if (beatPos === 7 || beatPos === 15) {
      addTamak(t, 310, 0.5, -0.2);
    }

    // Nishan (iron sharp snap on 4, 12)
    if (beatPos === 4 || beatPos === 12) {
      addNishan(t, 0.85, 0.4);
    } else if (beatPos === 9 || beatPos === 13) {
      addNishan(t, 0.45, 0.3);

    }

    // Ghungroo ankle bells continuous groove
    if (beatPos % 2 === 0) {
      addGhungroo(t, 0.35);
    } else {
      addGhungroo(t, 0.2);
    }
  }

  // Mahuri / Folk Flute Melody Lines
  const melodyPatterns = [
    [0, 1, 2, 4, 3, 2, 1, 0, 2, 4, 5, 4, 2, 1, 2, 0],
    [2, 2, 4, 5, 4, 2, 1, 2, 4, 5, 4, 2, 1, 0, 1, 2],
    [4, 4, 5, 4, 2, 4, 2, 1, 0, 1, 2, 1, 0, 2, 1, 0],
    [5, 4, 2, 1, 2, 4, 5, 4, 2, 1, 0, 1, 2, 0, 1, 0]
  ];

  const noteDuration = beatDuration; // 1 note per beat
  const totalNotes = Math.floor(durationSec / noteDuration);

  for (let n = 0; n < totalNotes; n++) {
    const bar = Math.floor(n / 16) % melodyPatterns.length;
    const noteInBar = n % 16;
    const scaleDeg = melodyPatterns[bar][noteInBar];
    const baseFreq = melodyScale[scaleDeg % melodyScale.length];
    
    const startSample = Math.floor(n * noteDuration * SAMPLE_RATE);
    const durSamples = Math.floor(noteDuration * 0.92 * SAMPLE_RATE);

    for (let i = 0; i < durSamples && startSample + i < totalSamples; i++) {
      const t = i / SAMPLE_RATE;
      const vib = Math.sin(2 * Math.PI * 5.5 * t) * (0.015 * baseFreq);
      const freq = baseFreq + vib;

      let reed = 0;
      if (fluteTimbre === 'mahuri') {
        reed = Math.sin(2 * Math.PI * freq * t) * 0.5
          + Math.sin(2 * Math.PI * freq * 2 * t) * 0.35
          + Math.sin(2 * Math.PI * freq * 3 * t) * 0.25
          + Math.sin(2 * Math.PI * freq * 4 * t) * 0.15
          + Math.sin(2 * Math.PI * freq * 5 * t) * 0.1;
      } else {
        reed = Math.sin(2 * Math.PI * freq * t) * 0.7
          + Math.sin(2 * Math.PI * freq * 2 * t) * 0.18
          + Math.sin(2 * Math.PI * freq * 3 * t) * 0.08;
      }

      const attack = Math.min(1.0, t / 0.04);
      const release = Math.min(1.0, (durSamples - i) / (0.08 * SAMPLE_RATE));
      const env = attack * release;

      const val = reed * env * 0.28;
      left[startSample + i] += val * 0.85;
      right[startSample + i] += val * 0.95;
    }
  }

  // Crickets / atmosphere
  for (let i = 0; i < totalSamples; i++) {
    const t = i / SAMPLE_RATE;
    const ambient = (Math.sin(2 * Math.PI * 5200 * t) * Math.sin(2 * Math.PI * 4 * t)) * 0.008;
    const pop = (Math.random() < 0.0003) ? (Math.random() * 0.08) : 0;
    left[i] += ambient + pop;
    right[i] += ambient - pop;
  }

  // Convert to 16-bit PCM
  const pcmData = Buffer.alloc(totalSamples * 4);
  for (let i = 0; i < totalSamples; i++) {
    let l = Math.tanh(left[i]);
    let r = Math.tanh(right[i]);
    
    if (i < 4410) {
      const f = i / 4410;
      l *= f;
      r *= f;
    } else if (i > totalSamples - 4410) {
      const f = (totalSamples - i) / 4410;
      l *= f;
      r *= f;
    }

    const intL = Math.floor(l * 32767);
    const intR = Math.floor(r * 32767);

    pcmData.writeInt16LE(intL, i * 4);
    pcmData.writeInt16LE(intR, i * 4 + 2);
  }

  const header = createWavHeader(totalSamples, 2);
  return Buffer.concat([header, pcmData]);
}

const tracks = [
  {
    filename: 'koraputia-chokda-dhemsa.wav',
    bpm: 132,
    durationSec: 28,
    melodyScale: [293.66, 329.63, 369.99, 440.00, 493.88, 587.33],
    fluteTimbre: 'mahuri',
    swing: 0.09
  },
  {
    filename: 'mandia-parab-geeta.wav',
    bpm: 116,
    durationSec: 28,
    melodyScale: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25],
    fluteTimbre: 'flute',
    swing: 0.06
  },
  {
    filename: 'malkangiri-baha-dhemsa.wav',
    bpm: 138,
    durationSec: 28,
    melodyScale: [277.18, 311.13, 369.99, 415.30, 466.16, 554.37],
    fluteTimbre: 'mahuri',
    swing: 0.11
  },
  {
    filename: 'rayagada-mahuri-sur.wav',
    bpm: 104,
    durationSec: 30,
    melodyScale: [261.63, 277.18, 329.63, 349.23, 392.00, 415.30, 493.88],
    fluteTimbre: 'mahuri',
    swing: 0.04
  },
  {
    filename: 'kandhamal-changu-jagar.wav',
    bpm: 120,
    durationSec: 28,
    melodyScale: [220.00, 261.63, 293.66, 329.63, 392.00, 440.00],
    fluteTimbre: 'flute',
    swing: 0.08
  },
  {
    filename: 'dhemsa-tarang-fusion.wav',
    bpm: 128,
    durationSec: 28,
    melodyScale: [293.66, 349.23, 392.00, 440.00, 523.25, 587.33],
    fluteTimbre: 'mahuri',
    swing: 0.07
  }
];

const outDir = path.join(__dirname, '..', 'public', 'audio');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Generating authentic Desia Dhemsa audio tracks...');
tracks.forEach(track => {
  console.log(`Synthesizing ${track.filename}...`);
  const wavBuffer = generateDhemsaTrack(track);
  fs.writeFileSync(path.join(outDir, track.filename), wavBuffer);
  console.log(`Saved ${track.filename} (${(wavBuffer.length / 1024 / 1024).toFixed(2)} MB)`);
});
console.log('All audio tracks generated successfully!');
