import {Component, input} from '@angular/core';
import {MessageInterface} from "../../../../../data/interfaces/chats.interface";

@Component({
  selector: 'app-chat-workspace-message',
  standalone: true,
  imports: [],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss'
})
export class ChatWorkspaceMessageComponent {
  message = input.required<MessageInterface>()
}
