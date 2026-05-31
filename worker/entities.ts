import { IndexedEntity } from "./core-utils";
import type { User, Chat, ChatMessage, Beat, Battle, Comment } from "@shared/types";
import { MOCK_CHAT_MESSAGES, MOCK_CHATS, MOCK_USERS, MOCK_BEATS, MOCK_BATTLES } from "@shared/mock-data";
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "" };
  static seedData = MOCK_USERS;
}
export class ChatBoardEntity extends IndexedEntity<Chat & { messages: ChatMessage[] }> {
  static readonly entityName = "chat";
  static readonly indexName = "chats";
  static readonly initialState = { id: "", title: "", messages: [] as ChatMessage[] };
  static seedData = MOCK_CHATS.map(c => ({ ...c, messages: MOCK_CHAT_MESSAGES.filter(m => m.chatId === c.id) }));
  async listMessages(): Promise<ChatMessage[]> {
    const { messages } = await this.getState();
    return messages;
  }
  async sendMessage(userId: string, text: string): Promise<ChatMessage> {
    const msg: ChatMessage = { id: crypto.randomUUID(), chatId: this.id, userId, text, ts: Date.now() };
    await this.mutate(s => ({ ...s, messages: [...s.messages, msg] }));
    return msg;
  }
}
export class BeatEntity extends IndexedEntity<Beat> {
  static readonly entityName = "beat";
  static readonly indexName = "beats";
  static readonly initialState: Beat = {
    id: "", title: "", producerId: "", producerName: "",
    genre: "", bpm: 0, coverArtUrl: "", audioUrl: "", uploadDate: 0
  };
  static seedData = MOCK_BEATS;
  async addComment(comment: Comment): Promise<void> {
    await this.mutate(s => ({
      ...s,
      comments: [...(s.comments || []), comment]
    }));
  }
}
export class BattleEntity extends IndexedEntity<Battle> {
  static readonly entityName = "battle";
  static readonly indexName = "battles";
  static readonly initialState: Battle = {
    id: "", title: "", description: "", startDate: 0, endDate: 0,
    status: 'upcoming', rules: [], coverUrl: ""
  };
  static seedData = MOCK_BATTLES;
}