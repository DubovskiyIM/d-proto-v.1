import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() width: any = '100px';

  // @Input() height: string = '100px';

  @Input() radius: string = '50%';

  @Input() ingUrl: string = 'https://source.unsplash.com/c_GmwfHBDzk/200x200';
  constructor() {}
}
