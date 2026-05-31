import type { User, Chat, ChatMessage, Beat } from './types';
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'User A' },
  { id: 'u2', name: 'User B' }
];
export const MOCK_CHATS: Chat[] = [
  { id: 'c1', title: 'General' },
];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', userId: 'u1', text: 'Hello', ts: Date.now() },
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
    uploadDate: Date.now()
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
    uploadDate: Date.now()
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
    uploadDate: Date.now()
  },
  {
    id: 'b4',
    title: 'Midnight Grid',
    producerId: 'p3',
    producerName: 'RetroWaveGod',
    genre: 'Lo-Fi',
    bpm: 85,
    coverArtUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    uploadDate: Date.now()
  }
];