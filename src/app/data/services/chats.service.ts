import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ChatInterface, LastMessageResInterface, MessageInterface} from "../interfaces/chats.interface";

@Injectable({
  providedIn: 'root'
})

export class ChatsService {
  http = inject(HttpClient)
  chatsUrl = 'https://icherniakov.ru/yt-course/chat/';
  messageUrl = 'https://icherniakov.ru/yt-course/message/';

  createChat(userId: number) {
    return this.http.post<ChatInterface>(`${this.chatsUrl}${userId}`, {})
  }

  getMyChats(){
    return this.http.get<LastMessageResInterface[]>(`${this.chatsUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<ChatInterface>(`${this.chatsUrl}${chatId}`);
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<MessageInterface>(`${this.messageUrl}${chatId}`, {}, {
      params: {
        message
      }
    })
  }
}
