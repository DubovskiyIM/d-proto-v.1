import { Component, OnInit } from '@angular/core';
import {AvatarComponent} from "../avatar/avatar.component";

@Component({
  selector: 'app-avatar-detail',
  templateUrl: './avatar-detail.component.html',
  styleUrls: ['./avatar-detail.component.scss']
})
export class AvatarDetailComponent extends AvatarComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
