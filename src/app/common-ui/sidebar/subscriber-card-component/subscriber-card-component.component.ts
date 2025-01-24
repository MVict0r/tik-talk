import { Component, Input } from '@angular/core';
import { ProfileInterface } from '../../../data/interfaces/profile.interface';
import { ImgUrlPipe } from "../../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './subscriber-card-component.component.html',
  styleUrl: './subscriber-card-component.component.scss'
})
export class SubscriberCardComponentComponent {
  @Input() profile!: ProfileInterface
}
