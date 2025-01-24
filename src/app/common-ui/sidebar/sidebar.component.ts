import { Component } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscriberCardComponentComponent } from "./subscriber-card-component/subscriber-card-component.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, SubscriberCardComponentComponent, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home1',
      link: '',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search2',
      link: 'search',
    }
  ]
}
