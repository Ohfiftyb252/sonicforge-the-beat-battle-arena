export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number;
}
export interface Beat {
  id: string;
  title: string;
  producerId: string;
  producerName: string;
  genre: string;
  bpm: number;
  coverArtUrl: string;
  audioUrl: string;
  uploadDate: number;
  description?: string;
  comments?: Comment[];
}
export interface Comment {
  id: string;
  beatId: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: number;
}
export interface Battle {
  id: string;
  title: string;
  description: string;
  startDate: number;
  endDate: number;
  status: 'active' | 'completed' | 'upcoming';
  rules: string[];
  coverUrl: string;
  prize?: string;
}
export interface Vote {
  id: string;
  battleId: string;
  beatId: string;
  userId: string;
}