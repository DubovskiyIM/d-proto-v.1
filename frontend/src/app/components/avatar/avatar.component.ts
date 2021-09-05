import {Component, Input, OnInit} from '@angular/core';
import {getImageUrl} from '../../_helpers/file-helper'

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input() width: any = '100px';

  // @Input() height: string = '100px';

  @Input() radius: string = '50%';

  @Input() imageUrl: string;

  constructor() {

  }

  ngOnInit() {
    if (!this.imageUrl) {
      this.imageUrl = 'https://source.unsplash.com/c_GmwfHBDzk/200x200';
      return;
    }
    // console.log('IMAGE URL', this.imageUrl);
    // debugger;
    this.imageUrl = getImageUrl(this.imageUrl)
  }
}
