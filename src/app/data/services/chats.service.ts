import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ChatInterface, LastMessageResInterface, MessageInterface} from "../interfaces/chats.interface";
import {ProfileService} from "./profile.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ChatsService {
  http = inject(HttpClient)
  me = inject(ProfileService).me

  chatsUrl = 'https://icherniakov.ru/yt-course/chat/';
  messageUrl = 'https://icherniakov.ru/yt-course/message/';

  createChat(userId: number) {
    return this.http.post<ChatInterface>(`${this.chatsUrl}${userId}`, {})
  }

  getMyChats(){
    return this.http.get<LastMessageResInterface[]>(`${this.chatsUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<ChatInterface>(`${this.chatsUrl}${chatId}`)
      .pipe(
        map(chat => {
          return{
            ...chat,
            companion: chat.userFirst.id === this.me()!.id ? chat.userSecond : chat.userFirst
          }
        })
      )
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<MessageInterface>(`${this.messageUrl}send/${chatId}`, {}, {
      params: {
        message
      }
    })
  }
}
