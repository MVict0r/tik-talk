import {Component, inject} from '@angular/core';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';
import {
  SubscriberCardComponentComponent
} from './subscriber-card-component/subscriber-card-component.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ProfileService} from '../../data/services/profile.service';
import {AsyncPipe} from '@angular/common';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    SubscriberCardComponentComponent,
    RouterLink,
    AsyncPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  me = this.profileService.me;

  subscribers$ = this.profileService.getSubscribersShortList();

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home1',
      link: 'profile/me',
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
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
