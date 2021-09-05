import { Component, OnInit } from '@angular/core';
import {SocialService} from "../../_services/social.service";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  constructor(private socialService: SocialService) { }

  ngOnInit(): void {
    this.socialService.getLikedProducts().subscribe((res) => {
      console.log(res);
    });
  }

}
