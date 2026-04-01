export const NEURO_STATS = [
  { n: '86B',    label: 'Neurons',      back: '69 billion are in the cerebellum alone. Only ~16B in the cerebral cortex.' },
  { n: '100T',   label: 'Synapses',     back: 'Each neuron forms ~7,000 connections on average. More than stars in the Milky Way.' },
  { n: '120 m/s',label: 'Signal Speed', back: 'Myelinated axons = 120 m/s. Unmyelinated axons travel at just 0.5 m/s.' },
  { n: '20 W',   label: 'Brain Power',  back: 'The brain is 2% of body weight but burns 20% of all energy consumed.' },
];

export const BRAIN_REGIONS = [
  { emoji: '🧠', region: 'Frontal Lobe',   role: 'Decision making · Motor control',   back: "Contains Broca's area (speech). Damage alters personality & impulse control." },
  { emoji: '📡', region: 'Parietal Lobe',  role: 'Spatial awareness · Sensation',     back: 'Houses the somatosensory cortex — maps touch, pain & body position in space.' },
  { emoji: '💬', region: 'Temporal Lobe',  role: 'Memory · Language · Hearing',       back: "Contains Wernicke's area. Critical for understanding spoken & written language." },
  { emoji: '👁️', region: 'Occipital Lobe', role: 'Vision · Color · Motion',           back: 'V1–V5 visual areas. Damage causes cortical blindness even with intact eyes.' },
  { emoji: '⚖️', region: 'Cerebellum',     role: 'Balance · Coordination · Timing',   back: 'Contains 50% of all neurons. Key for motor learning & procedural memory.' },
  { emoji: '❤️', region: 'Limbic System',  role: 'Emotion · Reward · Memory',         back: 'Hippocampus = long-term memory. Amygdala = fear & emotional tagging.' },
];

export const ACTION_POTENTIAL_STEPS = [
  { step: '01', label: 'Resting',     desc: '−70 mV membrane potential' },
  { step: '02', label: 'Depolarise',  desc: 'Na⁺ rush in → spike to +40 mV' },
  { step: '03', label: 'Repolarise',  desc: 'K⁺ exits → voltage restores' },
  { step: '04', label: 'Synapse',     desc: 'Vesicles release neurotransmitters' },
];

export const BRAIN_WAVES = [
  { name: 'Delta', hz: '0.5–4 Hz',   state: 'Deep Sleep',            pct: 18 },
  { name: 'Theta', hz: '4–8 Hz',     state: 'Drowsiness · REM',      pct: 36 },
  { name: 'Alpha', hz: '8–13 Hz',    state: 'Relaxed · Meditative',  pct: 55 },
  { name: 'Beta',  hz: '13–30 Hz',   state: 'Active Thinking',       pct: 76 },
  { name: 'Gamma', hz: '30–100 Hz',  state: 'Peak Cognition',        pct: 100 },
];

export const BCI_TIMELINE = [
  { year: '1973', event: 'Jacques Vidal coins "BCI"' },
  { year: '1988', event: 'First EEG-based cursor control' },
  { year: '1998', event: 'First human intracortical implant' },
  { year: '2006', event: 'BrainGate — paralysed patient controls PC' },
  { year: '2019', event: 'Speech decoded at 97% accuracy' },
  { year: '2024', event: 'Neuralink N1 — first human trial' },
];

export const SIGNAL_CHAIN = [
  { step: '01', label: 'Acquisition', sub: 'EEG · ECoG · Utah Array' },
  { step: '02', label: 'Filtering',   sub: 'Noise & artifact removal' },
  { step: '03', label: 'Features',    sub: 'Power bands · ERPs' },
  { step: '04', label: 'Classify',    sub: 'ML · Deep Learning' },
  { step: '05', label: 'Output',      sub: 'Cursor · Prosthetic · Speech' },
];

export const BCI_MODALITIES = [
  {
    type: 'Non-Invasive', badge: 'Safest',
    examples: ['EEG — scalp electrodes', 'fNIRS — blood oxygen', 'MEG — magnetic fields', 'fMRI — hemodynamics'],
  },
  {
    type: 'Semi-Invasive', badge: 'Balanced',
    examples: ['ECoG — cortical surface grid', 'Subdural electrode arrays', 'Epidural strips', 'Stereo-EEG'],
  },
  {
    type: 'Invasive', badge: 'Max Signal',
    examples: ['Utah Array — 96 electrodes', 'Neuralink N1 — 1024 channels', 'Stentrode — endovascular', 'Depth electrodes'],
  },
];

export const APPLICATIONS = [
  { icon: '🦾', title: 'Motor Restoration', desc: 'Bypass paralysis',           back: 'Ian Burkhart moved his paralysed hand via BCI + functional electrical stimulation (2016).' },
  { icon: '💬', title: 'Speech Decoding',   desc: 'Inner speech → text',        back: 'UCSF decoded 15 words/min at 75% accuracy from neural signals (2021).' },
  { icon: '⚡', title: 'Seizure Control',   desc: 'Detect & abort events',      back: 'NeuroPace RNS monitors signals & delivers micro-pulses to abort seizures before onset.' },
  { icon: '🤖', title: 'Prosthetics',       desc: 'Feel & move limbs',          back: 'Johnny Matheny used a neural prosthetic arm for 2+ years with near-natural control.' },
  { icon: '🎮', title: 'AR / HCI',          desc: 'Hands-free control',         back: 'Valve CEO believes neural interfaces will replace keyboards within 20 years.' },
  { icon: '🔬', title: 'Research',          desc: 'Map cognition & memory',     back: 'Kyoto Univ decoded dream content at ~60% accuracy using fMRI (2013).' },
];

export const INDUSTRY_LEADERS = [
  { co: 'Neuralink',    tag: 'Elon Musk · 2016',    stat: '1024 channels', desc: 'Wireless implant · 1 Mbps · First human 2024',          back: 'Patient Noland Arbaugh played chess & Mario Kart using only his thoughts.' },
  { co: 'Synchron',     tag: 'Endovascular · 2016',  stat: 'Stentrode™',   desc: 'Deployed via blood vessel · No open-brain surgery',     back: 'Patient home 48 hrs post-procedure. First FDA-approved BCI implant trial.' },
  { co: 'OpenBCI',      tag: 'Open Source · 2013',   stat: 'Galea headset', desc: 'Open-source EEG · VR-ready · Research platform',       back: 'Used by NASA, Harvard & Stanford. Ganglion board starts at ~$200.' },
  { co: 'CTRL-Labs',    tag: 'Meta · 2015',          stat: 'EMG wristband', desc: 'Wrist motor neurons → device control',                  back: 'Acquired by Meta for $500M–$1B. Decodes neural handwriting from wrist EMG.' },
];

export const ETHICS = [
  { icon: '🔒', title: 'Mental Privacy',    desc: 'Who owns your neural data?',             back: 'Neural data reveals emotions, intentions & medical history. More intimate than DNA.' },
  { icon: '🛡️', title: 'Neural Security',   desc: 'Implants can be hacked',                 back: 'Pacemakers were hacked from 30 ft away in 2011. BCIs face the same physical threat.' },
  { icon: '⚖️', title: 'Cognitive Liberty', desc: 'Right to mental self-determination',     back: 'UN flagged "neurorights" as a legal category needing protection — Chile led in 2021.' },
  { icon: '🌍', title: 'Equity & Access',   desc: 'Augmented vs non-augmented divide',      back: 'Neural implants may cost $50K+. Enhancement risk becoming a privilege of the wealthy.' },
];

export const BCI_FUTURE = [
  { year: '2030', event: 'Therapeutic BCI — clinical mainstream',              icon: '🏥' },
  { year: '2035', event: 'Consumer non-invasive BCI for AR/productivity',      icon: '🥽' },
  { year: '2040', event: 'Cognitive augmentation — memory & learning boost',   icon: '🧬' },
  { year: '2050', event: 'Brain-to-brain communication networks?',             icon: '🌐' },
];

export const TAKEAWAYS = [
  'Brain processes 11M bits/sec — BCIs decode only ~40',
  'Non-invasive near-term · Invasive = maximum potential',
  'Neuroscience + AI are converging rapidly',
];
