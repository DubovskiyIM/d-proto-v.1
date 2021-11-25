import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../_services/product.service";
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private fileList = [];
  private uploadFilesList = []

  constructor(private productService: ProductService, private userService: UserService) { }

  ngOnInit(): void {
  }

  changeFileList(event) {
    this.fileList = event;
    this.userService.setAvatarImage(event[0]).subscribe((res) => {
      console.log(res);
    })
    // this.productService.pushImages(event).subscribe((res) => {
    //   this.uploadFilesList.push(res[1]?.url);
    // });
  }
}
