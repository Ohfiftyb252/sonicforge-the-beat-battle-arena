export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface User {
  id: string;
  name: string;
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
}