import {Component, inject, input, signal} from '@angular/core';
import {ChatWorkspaceMessageComponent} from "./chat-workspace-message/chat-workspace-message.component";
import {MessageInputComponent} from "../../../../common-ui/message-input/message-input.component";
import {ChatsService} from "../../../../data/services/chats.service";
import {ChatInterface, MessageInterface} from "../../../../data/interfaces/chats.interface";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [
    ChatWorkspaceMessageComponent,
    MessageInputComponent
  ],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss'
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatServices = inject(ChatsService)

  chat = input.required<ChatInterface>()

  messages = signal<MessageInterface[]>([])

  ngOnInit(){
    this.messages.set(this.chat().messages)
  }

  async onSendMessage(messageText: string){
    await firstValueFrom(
      this.chatServices.sendMessage(this.chat().id, messageText)
    )

    const chat = await firstValueFrom(
      this.chatServices.getChatById(this.chat().id)
    )
    this.messages.set(chat.messages)
  }
}
