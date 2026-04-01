// ─── SLIDES 1–5: Neuroscience Fundamentals (unchanged) ───────────────────────

export const NEURO_STATS = [
  { n: '86B',     label: 'Neurons',       back: '69 billion are in the cerebellum alone. Only ~16 billion reside in the cerebral cortex.' },
  { n: '100T',    label: 'Synapses',      back: 'Each neuron forms ~7,000 connections on average — more than all stars in the Milky Way.' },
  { n: '120 m/s', label: 'Signal Speed',  back: 'Myelinated axons fire at 120 m/s. Unmyelinated axons travel at just 0.5 m/s.' },
  { n: '20 W',    label: 'Brain Power',   back: 'The brain is 2% of body weight but consumes 20% of the body\'s total energy.' },
];

export const BRAIN_REGIONS = [
  { emoji: '🧠', region: 'Frontal Lobe',   role: 'Decision making · Motor control',  back: "Contains Broca's area (speech production). Damage alters personality & impulse control." },
  { emoji: '📡', region: 'Parietal Lobe',  role: 'Spatial awareness · Sensation',    back: 'Houses the somatosensory cortex — maps touch, pain & body position across the body.' },
  { emoji: '💬', region: 'Temporal Lobe',  role: 'Memory · Language · Hearing',      back: "Contains Wernicke's area. Critical for understanding spoken & written language." },
  { emoji: '👁️', region: 'Occipital Lobe', role: 'Vision · Colour · Motion',         back: 'V1–V5 visual processing areas. Damage causes cortical blindness even with intact eyes.' },
  { emoji: '⚖️', region: 'Cerebellum',     role: 'Balance · Coordination · Timing',  back: 'Contains 50% of all neurons. Essential for motor learning & procedural memory.' },
  { emoji: '❤️', region: 'Limbic System',  role: 'Emotion · Reward · Memory',        back: 'Hippocampus = long-term memory. Amygdala = fear & emotional tagging.' },
];

export const ACTION_POTENTIAL_STEPS = [
  { step: '01', label: 'Resting',     desc: '−70 mV membrane potential' },
  { step: '02', label: 'Depolarise',  desc: 'Na⁺ rush in → spike to +40 mV' },
  { step: '03', label: 'Repolarise',  desc: 'K⁺ exits → voltage restores' },
  { step: '04', label: 'Synapse',     desc: 'Vesicles release neurotransmitters' },
];

export const BRAIN_WAVES = [
  { name: 'Delta', hz: '0.5–4 Hz',  state: 'Deep Sleep',           pct: 18 },
  { name: 'Theta', hz: '4–8 Hz',    state: 'Drowsiness · REM',     pct: 36 },
  { name: 'Alpha', hz: '8–13 Hz',   state: 'Relaxed · Meditative', pct: 55 },
  { name: 'Beta',  hz: '13–30 Hz',  state: 'Active Thinking',      pct: 76 },
  { name: 'Gamma', hz: '30–100 Hz', state: 'Peak Cognition',       pct: 100 },
];

// ─── SLIDES 6–12: Brain Imaging ───────────────────────────────────────────────

export const IMAGING_TIMELINE = [
  { year: '1895', event: 'X-ray discovered by Wilhelm Röntgen' },
  { year: '1971', event: 'First CT scan performed by Hounsfield' },
  { year: '1977', event: 'First clinical MRI scan of a human' },
  { year: '1990', event: 'BOLD signal discovered — fMRI born (Ogawa)' },
  { year: '2003', event: 'Nobel Prize awarded for MRI development' },
  { year: '2013', event: 'Human Connectome Project maps whole-brain wiring' },
];

export const IMAGING_SIGNAL_CHAIN = [
  { step: '01', label: 'Brain Activity',   sub: 'Neurons fire · Blood flows' },
  { step: '02', label: 'Signal Capture',   sub: 'Scanner detects field/photons' },
  { step: '03', label: 'Acquisition',      sub: 'Raw k-space or detector data' },
  { step: '04', label: 'Reconstruction',   sub: 'Fourier / backprojection algo' },
  { step: '05', label: 'Analysis',         sub: 'Statistical maps · AI decode' },
];

export const IMAGING_MODALITIES = [
  {
    type: 'Structural', badge: 'Anatomy',
    examples: ['MRI — soft tissue detail', 'CT — bone & bleeding', 'DTI — white matter tracts', 'X-ray — quick overview'],
  },
  {
    type: 'Functional', badge: 'Activity',
    examples: ['fMRI — BOLD signal', 'PET — glucose metabolism', 'SPECT — blood flow', 'fNIRS — cortical oxygenation'],
  },
  {
    type: 'Electrical', badge: 'Real-Time',
    examples: ['EEG — scalp electrodes', 'MEG — magnetic fields', 'ECoG — cortical grid', 'Depth EEG — stereo recording'],
  },
];

export const IMAGING_APPLICATIONS = [
  { icon: '🧬', title: 'Alzheimer\'s',     desc: 'Early neurodegeneration',   back: 'PET amyloid imaging detects Alzheimer\'s plaques 15+ years before symptoms appear.' },
  { icon: '🎯', title: 'Surgical Mapping', desc: 'Preserve eloquent cortex',  back: 'fMRI pre-op mapping identifies language & motor areas so surgeons avoid damaging them.' },
  { icon: '💊', title: 'Drug Response',    desc: 'Measure treatment effect',  back: 'Neuroimaging tracks how antidepressants change prefrontal-amygdala connectivity.' },
  { icon: '🏥', title: 'Stroke',          desc: 'Detect ischemia fast',       back: 'DWI-MRI detects acute stroke within minutes, guiding life-saving thrombolysis decisions.' },
  { icon: '🧪', title: 'Cognitive Sci.',   desc: 'Decode thought & memory',   back: 'Kyoto Univ. decoded visual dream content at ~60% accuracy using fMRI pattern analysis (2013).' },
  { icon: '🧠', title: 'Connectomics',    desc: 'Map the wiring of the mind', back: 'The Human Connectome Project produced the first high-res map of 90+ brain region connections.' },
];

export const LANDMARK_DISCOVERIES = [
  {
    co: 'Default Mode Network', tag: 'Raichle et al. · 2001', stat: 'Resting fMRI',
    desc: 'Brain stays active even at rest — key for self-referential thought',
    back: 'DMN was discovered serendipitously — brain costs 20× more energy at rest than during tasks.',
  },
  {
    co: 'Mirror Neurons', tag: 'Rizzolatti · PET/fMRI', stat: 'Social Cognition',
    desc: 'Neurons that fire both when acting and observing',
    back: 'Imaged via PET & fMRI. May explain empathy, imitation & language acquisition.',
  },
  {
    co: 'Adult Neurogenesis', tag: 'Eriksson · 1998', stat: 'PET Confirmation',
    desc: 'New neurons grow in adult hippocampus — proven by PET',
    back: 'Used C-14 from Cold War nuclear tests to radiocarbon-date neurons — confirmed new growth.',
  },
  {
    co: 'Functional Connectivity', tag: 'Biswal · 1995', stat: 'Resting-State fMRI',
    desc: 'Distant brain regions synchronise at rest',
    back: 'Led to the "resting-state fMRI" paradigm — revealing 7+ major brain networks without any task.',
  },
];

export const IMAGING_CHALLENGES = [
  { icon: '💰', title: 'Cost & Access',       desc: '$3M+ per MRI scanner',           back: 'Most low-income countries have fewer than 1 MRI per million people. Inequality limits global neuroscience.' },
  { icon: '⏱️', title: 'Temporal Resolution', desc: 'fMRI lags neural activity by 5s', back: 'The BOLD signal peaks 5–6 seconds after firing. EEG has ms resolution but poor spatial localisation.' },
  { icon: '🔇', title: 'Signal Noise',         desc: 'Motion & cardiac artifacts',     back: 'Head motion of just 1mm can corrupt fMRI data. Breathing & heartbeat add noise to every scan.' },
  { icon: '🧩', title: '"Blobology" Critique', desc: 'Correlation ≠ brain function',   back: 'Vul et al. (2009) showed many fMRI studies used circular statistics, inflating activation correlations.' },
  { icon: '📐', title: 'Spatial Limits',       desc: 'Can\'t resolve individual neurons', back: 'Standard fMRI "voxels" are ~1–3mm³ containing ~500K neurons. Single-cell resolution requires invasive recording.' },
  { icon: '🧬', title: 'Individual Variation', desc: 'Every brain atlas is approximate', back: 'Brain morphology varies ~15% across adults. Functional maps show even greater person-to-person variability.' },
];

export const IMAGING_FUTURE = [
  { year: '2026', event: '7-Tesla MRI becoming clinical standard',          icon: '🔬' },
  { year: '2027', event: 'AI real-time scan interpretation in radiology',   icon: '🤖' },
  { year: '2028', event: 'Wearable fMRI — OPM-MEG portable scanners',      icon: '🧢' },
  { year: '2032', event: 'Single-neuron non-invasive imaging possible',     icon: '⚡' },
];

export const TAKEAWAYS = [
  'Brain imaging lets us observe thought, memory & emotion without surgery',
  'Different modalities reveal structure, function & real-time electrical activity',
  'fMRI\'s BOLD signal transformed cognitive neuroscience since the 1990s',
  'High-resolution imaging is reshaping early diagnosis of neurological disorders',
];
