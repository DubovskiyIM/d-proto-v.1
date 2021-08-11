import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-right-profile-navbar',
  templateUrl: './right-profile-navbar.component.html',
  styleUrls: ['./right-profile-navbar.component.scss']
})
export class RightProfileNavbarComponent implements OnInit {
  @Input() profile;
  constructor() { }

  ngOnInit(): void {
  }

}
