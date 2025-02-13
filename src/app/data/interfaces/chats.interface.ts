import {ProfileInterface} from "./profile.interface";

export interface ChatInterface {
  id: number
  userFirst: ProfileInterface
  userSecond: ProfileInterface
  messages: MessageInterface[]
  companion?:ProfileInterface
}

export interface MessageInterface {
  id: number
  userFromId: number
  personalChatId: number
  text: string
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export interface LastMessageResInterface{
  id: number
  userFrom: ProfileInterface
  message: string,
  createdAt: string | null,
  unreadMessages: number

}
