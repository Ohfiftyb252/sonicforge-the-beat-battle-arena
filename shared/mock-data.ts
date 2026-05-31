import type { User, Chat, ChatMessage, Beat, Battle } from './types';
export const MOCK_USERS: User[] = [
  { id: 'p1', name: 'CyberPunk88', bio: 'Constructing rhythms for the digital void.' },
  { id: 'p2', name: 'GhostLogic', bio: 'Phonk and drift specialist. Based in Neo-Tokyo.' },
  { id: 'p3', name: 'RetroWaveGod', bio: 'Master of the 80s aesthetic. Vintage gear only.' }
];
export const MOCK_CHATS: Chat[] = [
  { id: 'c1', title: 'General' },
];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', userId: 'p1', text: 'Just uploaded a new synthwave pack!', ts: Date.now() },
];
export const MOCK_BEATS: Beat[] = [
  {
    id: 'b1',
    title: 'Neon Drift',
    producerId: 'p1',
    producerName: 'CyberPunk88',
    genre: 'Synthwave',
    bpm: 112,
    coverArtUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    uploadDate: Date.now() - 86400000,
    description: "A mid-tempo journey through a neon-lit metropolis. Heavy on the Juno-60 pads.",
    comments: [
      { id: 'cm1', beatId: 'b1', userId: 'p2', userName: 'GhostLogic', text: 'Those pads are massive! Love the vibe.', timestamp: Date.now() - 40000 }
    ]
  },
  {
    id: 'b2',
    title: 'Void Runner',
    producerId: 'p2',
    producerName: 'GhostLogic',
    genre: 'Phonk',
    bpm: 160,
    coverArtUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    uploadDate: Date.now() - 172800000
  },
  {
    id: 'b3',
    title: 'Plasma Pulse',
    producerId: 'p1',
    producerName: 'CyberPunk88',
    genre: 'Techno',
    bpm: 128,
    coverArtUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    uploadDate: Date.now() - 3600000
  }
];
export const MOCK_BATTLES: Battle[] = [
  {
    id: 'battle1',
    title: 'Neon Knight Open',
    description: 'Forge the best synthwave track using the provided sample pack. Heavy emphasis on gated reverb and cinematic tension.',
    startDate: Date.now() - 432000000,
    endDate: Date.now() + 172800000,
    status: 'active',
    rules: ['Must use main lead sample', 'Max 4 minutes', 'Original drum patterns only'],
    coverUrl: 'https://images.unsplash.com/photo-1514525253361-bee8718a340b?auto=format&fit=crop&q=80&w=800',
    prize: '$500 + Exclusive VST Pack'
  },
  {
    id: 'battle2',
    title: 'Phonk Dynasty',
    description: 'Drift-inspired Phonk battle. Show us your best cowbell leads and lo-fi vocal chops.',
    startDate: Date.now() - 864000000,
    endDate: Date.now() - 432000000,
    status: 'completed',
    rules: ['No external loops allowed'],
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    prize: 'Producer Toolkit Vol 1'
  }
];